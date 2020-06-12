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

The DepthAI API python module is prebuilt for Ubuntu 18.04 and Raspbian 10. 
To download the library run (WIP):
```
python3 -m pip install depthai
```

For other operating systems and/or Python versions, depthai-python library can be [built from source](#build_from_source).


* [Ubuntu 18.04](#ubuntu) - Python 3.6
* [Raspbian](#raspbian) - Python 3.7
* [macOS](#macos) (Mac OS X) - Homebrew installation settings/permutations vary quite a bit so we currently require build from source for macOS, see [here](#macos) to do so.
* [Windows 10](https://discuss.luxonis.com/d/39-depthai-sneak-peak-into-windows-support) - Currently experimental (as of 18 May 2020). 
* [Other Operating Systems](#compile_api) - The DepthAI codebase is open source, so it can be built from source on all sorts of other platforms.  See [here] to do so. We also are soon releasing a variant which doesn't even require the host to be running an operating system or even have USB support.  
* Embedded Platforms - We're working on supporting SPI, I2C, and/or UART communication to processors like the MSP430, STM32, and so forth (and will have a set of reference libaries for SPI, I2C, and UART for the Raspberry Pi, which helps debugging when integrating custom applications with DepthAI over these interfaces).

## Prerequisites
To enable user access to DepthAI devices run the following:
```
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
```

## Dependencies to build from source
- CMake > 3.2.0
- Generation tool (Ninja, make, ...)
- C/C++ compiler
- libusb1 development package

{: #debian}
### Ubuntu, Raspberry Pi OS, ... (Debian based systems)
On Debian based systems (Raspberyy Pi OS, Ubuntu, ...) these can be acquired by running:
```
sudo apt-get -y install cmake libusb-1.0-0-dev build-essential
```

{: #macos}
### macOS (Mac OS X)

Assuming a stock Mac OS X install, depthai-python library needs following dependencies

- HomeBrew (If it's not installed already)
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)" 
```
- Python, libusb, CMake, wget 
```
brew install coreutils python3 cmake libusb wget
```
And now you're ready to clone the depthai-python from Github and build it for Mac OS X.

## Build DepthAI Python Library from Source
To build the wheel:
```
git clone https://github.com/luxonis/depthai-api.git --branch develop --recursive
cd depthai-api
python3 -m pip wheel . -w wheelhouse/
```
Or just the dynamic library
```
git clone https://github.com/luxonis/depthai-api.git --branch develop --recursive
cd depthai-api
mkdir -p build && cd build
cmake ..
cmake --build . --parallel
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
    # Possible streams:
    # ['left', 'right','previewout', 'metaout', 'depth_sipp', 'disparity', 'depth_color_h']
    # If "left" is used, it must be in the first position.
    # To test depth use:
    # 'streams': [{'name': 'depth_sipp', "max_fps": 12.0}, {'name': 'previewout', "max_fps": 12.0}, ],
    'streams': stream_list,
    'depth':
    {
        'calibration_file': consts.resource_paths.calib_fpath,
        'padding_factor': 0.3,
        'depth_limit_m': 10.0, # In meters, for filtering purpose during x,y,z calc
        'confidence_threshold' : 0.5, #Depth is calculated for bounding boxes with confidence higher than this number 
    },
    'ai':
    {
        'blob_file': blob_file,
        'blob_file_config': blob_file_config,
        'calc_dist_to_bb': calc_dist_to_bb,
        'keep_aspect_ratio': not args['full_fov_nn'],
    },
    # object tracker
    'ot':
    {
        'max_tracklets'        : 20, #maximum 20 is supported
        'confidence_threshold' : 0.5, #object is tracked only for detections over this threshold
    },
    'board_config':
    {
        'swap_left_and_right_cameras': args['swap_lr'], # True for 1097 (RPi Compute) and 1098OBC (USB w/onboard cameras)
        'left_fov_deg': args['field_of_view'], # Same on 1097 and 1098OBC
        'rgb_fov_deg': args['rgb_field_of_view'],
        'left_to_right_distance_cm': args['baseline'], # Distance between stereo cameras
        'left_to_rgb_distance_cm': args['rgb_baseline'], # Currently unused
        'store_to_eeprom': args['store_eeprom'],
        'clear_eeprom': args['clear_eeprom'],
        'override_eeprom': args['override_eeprom'],
    },
    
    #'video_config':
    #{
    #    'rateCtrlMode': 'cbr',
    #    'profile': 'h265_main', # Options: 'h264_baseline' / 'h264_main' / 'h264_high' / 'h265_main'
    #    'bitrate': 8000000, # When using CBR
    #    'maxBitrate': 8000000, # When using CBR
    #    'keyframeFrequency': 30,
    #    'numBFrames': 0,
    #    'quality': 80 # (0 - 100%) When using VBR
    #}
}
    ```

#### Example

```py
pipeline = depthai.create_pipelinedepthai.create_pipeline(config={
    'streams': ['previewout'],
    'ai': {'blob_file': consts.resource_paths.blob_fpath}
})
```

