---
layout: default
title: DepthAI Python API
toc_title: Python API
description: The official API for interacting with your DepthAI board.
order: 5
---

# {{page.title}}

Instructions for installing, upgrading, and using the DepthAI Python API.

{: #python_version data-toc-title="Python Versions"}
## Supported Platforms

The DepthAI API python module is prebuilt for Ubuntu 18.04 and Raspbian 10. For other operating systems and/or Python versions, DepthAI can be [built from source](#compile_api).

* [Ubuntu 18.04](#ubuntu) - Python 3.6
* [Raspbian](#raspbian) - Python 3.7
* [macOS](#macos) (Mac OS X) - Homebrew installation settings/permutations vary quite a bit so we currently require build from source for macOS, see [here](#macos) to do so.
* [Windows 10](https://discuss.luxonis.com/d/39-depthai-sneak-peak-into-windows-support) - Currently experimental (as of 18 May 2020). 
* [Other Operating Systems](#compile_api) - The DepthAI codebase is open source, so it can be built from source on all sorts of other platforms.  See [here] to do so. We also are soon releasing a variant which doesn't even require the host to be running an operating system or even have USB support.  
* Embedded Platforms - We're working on supporting SPI, I2C, and/or UART communication to processors like the MSP430, STM32, and so forth (and will have a set of reference libaries for SPI, I2C, and UART for the Raspberry Pi, which helps debugging when integrating custom applications with DepthAI over these interfaces).

## Install System Dependencies
<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Using the RPi Compute Edition or a pre-flashed DepthAI Raspberry Pi µSD card? <strong>Skip this step.</strong><br/>
  <span class="small">All dependencies are installed and the repository is checked out to `~/Desktop/depthai-python-extras`.</span>
</div>
 
{: #raspbian}
### Raspbian
Many folks will have a lot of the following installed, but this details how to go from a fresh Raspbian install (the one with *and recommended software* [here](https://www.raspberrypi.org/downloads/raspbian/) was tested.

With a fresh install, below are the following dependencies needed to get DepthAI (and megaAI) up and running.  Make sure to connect your Pi to the internet to run the following commands:
```
sudo apt update
sudo apt upgrade
sudo apt install python3-opencv
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
git clone https://github.com/luxonis/depthai.git
cd depthai
```

Note that the longest part of this process will be updating and upgrading the Pi via `apt`.

After running these commands, jump to [Quick Test](#quicktest) below to run your DepthAI for the first time on your Raspberry Pi.

{: #ubuntu}
### Ubuntu 
```
sudo apt install git python3-pip
pip3 install numpy opencv-python --user
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
git clone https://github.com/luxonis/depthai.git
cd depthai
```

{: #quicktest}
## Quick Test

Run `python3 test.py` from within depthai to make sure everything is working:

```
python3 test.py
```

If all goes well a small window video display with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai/blob/master/resources/nn/object_detection_4shave/labels_for_mobilenet_ssd.txt)).

<h2 id="install" data-toc-title="Installation">Installing the DepthAI API</h2>

Since we are not yet using a standard `pip install` (we will be in the near future), the DepthAI Python Module and extras (utilities, examples, and tutorials) are installed by checking out our [depthai](https://github.com/luxonis/depthai) GitHub repository. 

So it is necessary to instruct pip to install this repo globally available.  Do so with the command below:

```
pip3 install --user -e depthai
```

<h2 id="upgrade" data-toc-title="Upgrading">Upgrading the DepthAI API</h2>

<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Using the RPi Compute edition or a pre-flashed DepthAI µSD card?<br/>
  <span class="small">The repository has been checked out to `~/Desktop/depthai`.</span>
</div>


To upgrade your DepthAI Python API to the latest version:

1. `cd` to your local copy of our [depthai](https://github.com/luxonis/depthai) repository.
2. Pull the latest changes:
    ```
    git pull
    ```
3. Ensure `depthai` is available to all of your Python scripts:
    ```
    pip3 install --user -e .
    ```

{: #reference }
## API Reference

{: #depthai_init_device}
### depthai.init_device(cmd_file_path) → bool

Initializes the DepthAI device, returning `True` if the device was successfully initialized and `False` otherwise.

#### Parameters

* cmd_file_path(str) - The full path to the DepthAI `cmd` file.

#### Example

```py
import depthai
import consts.resource_paths
res = depthai.init_device(consts.resource_paths.device_cmd_fpath)
```

{: #depthai_create_pipeline}
### depthai.create_pipeline(config=dict) → Pipeline

Initializes a DepthAI Pipeline, returning the created `Pipeline` if successful and `False` otherwise.

#### Parameters

* __config(dict)__ -  A `dict` of pipeline configuration settings.
    <br/>Example key/values for the config:
    ```py
    {
      # ['previewout', 'metaout', 'left', 'right', 'depth_sipp']
      # If "left" is used, it must be in the first position.
      'streams': ['previewout','metaout'],
      'depth':
      {
          'calibration_file': consts.resource_paths.calib_fpath,
          'padding_factor': 0.3 # The ratio of the bounding box used for object detection
      },
      'ai':
      {
          'blob_file': consts.resource_paths.blob_fpath,
          'blob_file_config': consts.resource_paths.blob_config_fpath
      },
      'board_config':
      {
          'swap_left_and_right_cameras': True, # True for 1097 and 1098OBC
          'left_fov_deg': 69.0, # same on 1097 and 1098OBC
          'left_to_right_distance_cm': 9.0, # distance between left & right grayscale cameras
      }
    }
    ```

#### Example

```py
pipeline = depthai.create_pipelinedepthai.create_pipeline(config={
    'streams': ['previewout'],
    'ai': {'blob_file': consts.resource_paths.blob_fpath}
})
```

{: #compile_api }
## Compiling the DepthAI API for Other Platforms

The DepthAI API is open source so can be compiled for various permutations of platforms and Python3 versions.

Below is a quick summary of what's been tried by Luxonis staff and DepthAI users:

* Mac OS X - Compile from source, instructions [below](#mac-os-x).
* Linux Mint - Appears to work with Ubuntu 18.04 prebuilt python modules
* Other Linux Distros - Check if the Ubuntu pymodule works (by using `ldd` to check for broken dependencies), or compile from source [below](/api#compile_linux).


{: #macos}
### macOS (Mac OS X)
Assuming a stock Mac OS X install, DepthAI can be installed and tested with the following commands, thanks to [HomeBrew](https://brew.sh/).

#### Install HomeBrew
(If it's not installed already)
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)" 
```
#### Install Python and Other Developer Tools
(If they're also not already installed)
```
brew install coreutils python3 cmake libusb wget opencv
pip3 install numpy opencv-python --user
```
And now you're ready to clone the DepthAI Github and build DepthAI for Mac OS X.

#### Build DepthAI and Test for Mac OS X:
```
git clone https://github.com/luxonis/depthai.git
cd depthai
git submodule update --init --recursive
./depthai-api/install_dependencies.sh
./depthai-api/build_py_module.sh
python3 test.py
```
You should see a small preview window with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai/blob/master/resources/nn/mobilenet-ssd/mobilenet-ssd.json)), including 'person' and strangely, 'sheep'.

{: #compile_linux }
### Building from Source for Other Linux Distros

To compile the Python API from scratch, it may be necessary, depending on the configuration of the machine, to install build essentials such as through your Linux distro's package manager, or building them from source if needed, in order for building the DepthAI python module from source to be successful.
* cmake
* gcc
* g++
* libusb
* opencv
* python3
  * including `pip3 install numpy opencv-python --user`
  
It's worth noting that cmake, gcc, g++, etc. can often be installed via something like `build-essential` (as in Ubuntu).

Once these dependencies are installed (which may already be the case), use the following commands to build the pymodule from source and test it:

```
git clone https://github.com/luxonis/depthai.git
cd depthai
git submodule update --init --recursive
./depthai-api/install_dependencies.sh
./depthai-api/build_py_module.sh
python3 test.py
```

Same here, you should see a small preview window with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai/blob/master/resources/nn/mobilenet-ssd/mobilenet-ssd.json)), including 'person', 'car', 'dog' and strangely, 'sheep'.

