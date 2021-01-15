#!/bin/bash

set -e

readonly ubuntu_pkgs=(
    python3
    python3-pip
    udev
    # https://docs.opencv.org/master/d7/d9f/tutorial_linux_install.html
    build-essential
    cmake
    git
    libgtk2.0-dev
    pkg-config
    libavcodec-dev
    libavformat-dev
    libswscale-dev
    python-dev
    python-numpy
    libtbb2
    libtbb-dev
    libjpeg-dev
    libpng-dev
    libtiff-dev
    libdc1394-22-dev
    # https://stackoverflow.com/questions/55313610
    ffmpeg
    libsm6
    libxext6
    libgl1-mesa-glx
)

readonly ubuntu_arm_pkgs=(
    # https://stackoverflow.com/a/53402396/5494277
    libhdf5-dev
    libhdf5-dev
    libatlas-base-dev
    libjasper-dev
    libqtgui4
    libqt4-test
    # https://github.com/EdjeElectronics/TensorFlow-Object-Detection-on-the-Raspberry-Pi/issues/18#issuecomment-433953426
    libilmbase-dev
    libopenexr-dev
    libgstreamer1.0-dev
)

print_action () {
    green="\e[0;32m"
    reset="\e[0;0m"
    printf "\n$green >>$reset $*\n"
}
print_and_exec () {
    print_action $*
    $*
}

if [[ $(uname) == "Darwin" ]]; then
    echo "During Homebrew install, certain commands need 'sudo'. Requesting access..."
    sudo true
    arch_cmd=
    if [[ $(uname -m) == "arm64" ]]; then
        arch_cmd="arch -x86_64"
        echo "Running in native arm64 mode, will prefix commands with: $arch_cmd"
        # Check if able to run with x86_64 emulation
        retcode=0
        $arch_cmd true || retcode=$?
        if [[ $retcode -ne 0 ]]; then
            print_action "=== Installing Rosetta 2 - Apple binary translator"
            # Prompts the user to agree to license: <A> <Enter>
            # Could be automated by adding: --agree-to-license
            print_and_exec softwareupdate --install-rosetta
        fi
    fi
    homebrew_install_url="https://raw.githubusercontent.com/Homebrew/install/master/install.sh"
    print_action "Installing Homebrew from $homebrew_install_url"
    # CI=1 will skip some interactive prompts
    CI=1 $arch_cmd /bin/bash -c "$(curl -fsSL $homebrew_install_url)"
    print_and_exec $arch_cmd brew install python3 git
    print_and_exec python3 -m pip install -U pip
    echo
    echo "=== Installed successfully!  IMPORTANT: For changes to take effect,"
    echo "please close and reopen the terminal window, or run:  exec \$SHELL"
elif [[ ! $(uname -m) =~ ^arm* ]]; then
    # shellcheck source=/etc/os-release
    source /etc/os-release
    case "$NAME" in
    Ubuntu)
        sudo apt-get update
        sudo apt-get install -y "${ubuntu_pkgs[@]}"
        echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
        sudo udevadm control --reload-rules && sudo udevadm trigger
        python3 -m pip install --upgrade pip
        ;;
    *)
        echo "ERROR: Distribution not supported"
        exit 99
        ;;
    esac
elif [[ $(uname -m) =~ ^arm* ]]; then
    sudo apt-get update
    sudo apt-get install -y "${ubuntu_pkgs[@]}" "${ubuntu_arm_pkgs[@]}"
    echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
    sudo udevadm control --reload-rules && sudo udevadm trigger
    python3 -m pip install --upgrade pip
else
    echo "ERROR: Host not supported"
    exit 99
fi
