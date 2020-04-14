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

The DepthAI API python module is prebuilt for Ubuntu 18.04 and Raspbian 10

* Ubuntu 18.04 - Python 3.6 (`depthai.cpython-36m-x86_64-linux-gnu.so`)
* Raspbian - Python 3.7 (`depthai.cpython-37m-arm-linux-gnueabihf.so`)

DepthAI is supported on other platforms but pre-built python modules are not included, so need to be built from source.  Below is a quick summary of what's been tried by Luxonis staff and DepthAI users:

* Mac OS X - Compile from source ([See OS X instructions](/api#compile_api)).
* Linux Mint - Appears to work with Ubuntu 18.04 prebuilt python modules

## System Dependencies & Quick Test
The dependencies for DepthAI are pretty light, and most developers will already have them on their development machines.  In case you don't, here are the dependencies for each operating system, including checking out and running test.py to make sure DepthAI is running properly with your system.

* Ubuntu and Raspbian
```
sudo apt install git python3-pip
pip3 install numpy opencv-python --user
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && udevadm trigger
git clone https://github.com/luxonis/depthai-python-extras.git
python3 test.py
```
* Mac OS X
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)" #install HomeBrew
brew install coreutils python3 cmake libusb wget opencv #install python and developer tools
pip3 install numpy opencv-python --user
git clone https://github.com/luxonis/depthai-python-extras.git
cd depthai-python-extras
git submodule update --init
./depthai-api/install_dependencies.sh
./depthai-api/build_py_module.sh
python3 test.py
```
Running `python3 test.py` at the end should result in a small window video display with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai-python-extras/blob/master/resources/nn/object_detection_4shave/labels_for_mobilenet_ssd.txt)).

<h2 id="install" data-toc-title="Installation">Installing the DepthAI API</h2>

<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Using the RPi Compute edition or a pre-flashed DepthAI µSD card? <strong>Skip this step.</strong><br/>
  <span class="small">The repository has already been checked out to `~/Desktop/depthai-python-extras`.</span>
</div>

The DepthAI Python Module and extras (utilities, examples, and tutorials) are installed by checking out our [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) GitHub repository. This will change to a standard `pip install` in the future.

To get started:

0. Make DepthAI accessible over USB:

    a. Run these commands (which set up the udev rules):

    ```
    echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
    sudo udevadm control --reload-rules && udevadm trigger
    ```
    
    b. Reset or reconnect (USB) the DepthAI device.

1. Checkout the [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) GitHub rep:
    ```
    git clone https://github.com/luxonis/depthai-python-extras.git
    ```
2. Make the checked out repo globally available:
    ```
    pip3 install --user -e depthai-python-extras
    ```

<h2 id="upgrade" data-toc-title="Upgrading">Upgrading the DepthAI API</h2>

<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Using the RPi Compute edition or a pre-flashed DepthAI µSD card?<br/>
  <span class="small">The repository has been checked out to `~/Desktop/depthai-python-extras`.</span>
</div>


To upgrade your DepthAI Python API to the latest version:

1. `cd` to your local copy of our [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) repository.
2. Pull the latest changes:
    ```
    git pull
    ```
3. Ensure `depthai-python-extras` is available to all of your Python scripts:
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

The DepthAI API is open source so can be compiled for platforms for which we have not yet build shared libaries for the Python API.

To compile the Python API from scratch, please follow the instructions on our Github [here](https://github.com/luxonis/depthai-python-extras#python-modules).
```
git submodule update --init
./depthai-api/install_dependencies.sh
./depthai-api/build_py_module.sh
```

{: #compile_api_osx }
## Compiling the DepthAI API for Mac OS X with HomeBrew

The DepthAI API can be compiled from source for OS X, with some light modifications.
We're working to improve our build scripts to make this easier.  For now, use the instructions below,
and feel free to contribute PRs to improve the build process on OS X.

[Mac OS X Setup and Compilation Instructions](https://docs.google.com/document/d/15NcdEKgfQb5Azhx6I67To6ew-RK7M2ezpTXSEVs5Hmk/edit?usp=sharing)






