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

The DepthAI API python module is prebuilt for Ubuntu 18.04 and Raspbian 10 for the following Python versions:

* Ubuntu 18.04 - Python 3.6
* Raspbian - Python 3.7

DepthAI is supported on other platforms and Python versions but the pymodule needs to be built from source.  See [here](#compile_api) to do so.  

## Install System Dependencies
<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Using the RPi Compute Edition or a pre-flashed DepthAI Raspberry Pi µSD card? <strong>Skip this step.</strong><br/>
  <span class="small">All dependencies are installed and the repository is checked out to `~/Desktop/depthai-python-extras`.</span>
</div>
 

### Ubuntu and Raspbian
```
sudo apt install git python3-pip
pip3 install numpy opencv-python --user
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && udevadm trigger
git clone https://github.com/luxonis/depthai-python-extras.git
cd depthai-python-extras
```

## Quick Test

Run `python3 test.py` from within depthai-python-extras to make sure everything is working:

```
python3 test.py
```

If all goes well a small window video display with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai-python-extras/blob/master/resources/nn/object_detection_4shave/labels_for_mobilenet_ssd.txt)).

<h2 id="install" data-toc-title="Installation">Installing the DepthAI API</h2>

Since we are not yet using a standard `pip install` (we will be in the near future), the DepthAI Python Module and extras (utilities, examples, and tutorials) are installed by checking out our [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) GitHub repository. 

So it is necessary to instruct pip to install this repo globally available.  Do so with the command below:

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

The DepthAI API is open source so can be compiled for various permutations of platforms and Python3 versions.

Below is a quick summary of what's been tried by Luxonis staff and DepthAI users:

* Mac OS X - Compile from source, instructions [below](#mac-os-x).
* Linux Mint - Appears to work with Ubuntu 18.04 prebuilt python modules
* Other Linux Distros - Check if the Ubuntu pymodule works (by using `ldd` to check for broken dependencies), or compile from source [below](/api#compile_linux).



### Mac OS X
Assuming a stock Mac OS X install, DepthAI can be installed and tested with the following commands, thanks to [HomeBrew](https://brew.sh/)
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
You should see a small preview window with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai-python-extras/blob/master/resources/nn/object_detection_4shave/labels_for_mobilenet_ssd.txt)), including 'person' and strangely, 'sheep'.

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
git clone https://github.com/luxonis/depthai-python-extras.git
cd depthai-python-extras
git submodule update --init
./depthai-api/install_dependencies.sh
./depthai-api/build_py_module.sh
python3 test.py
```

Same here, you should see a small preview window with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai-python-extras/blob/master/resources/nn/object_detection_4shave/labels_for_mobilenet_ssd.txt)), including 'person', 'car', 'dog' and strangely, 'sheep'.
