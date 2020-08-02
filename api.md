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
* [Other Operating Systems](#compile_api) - The DepthAI codebase is open source, so it can be built from source on all sorts of other platforms.  See [here](#compile_api) to do so. We also are soon releasing a variant which doesn't even require the host to be running an operating system or even have USB support.  
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
Many folks will have a lot of the following installed, but this details how to go from a fresh Raspbian install (the one with *and recommended software* [here](https://www.raspberrypi.org/downloads/raspbian/) was tested).

With a fresh install, below are the following dependencies needed to get DepthAI (and megaAI) up and running.  Make sure to connect your Pi to the internet to run the following commands:
```
sudo apt update
sudo apt upgrade
sudo apt install python3-opencv libcurl4
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
git clone https://github.com/luxonis/depthai.git
cd depthai
python3 -m pip install -r requirements.txt
sudo apt-get install libatlas-base-dev 
sudo apt-get install libjasper-dev 
sudo apt-get install libqtgui4 
sudo apt-get install python3-pyqt5 
sudo apt install libqt4-test
```

Note that the longest part of this process will be updating and upgrading the Pi via `apt`.

After running these commands, jump to [Quick Test](#quicktest) below to run your DepthAI for the first time on your Raspberry Pi.

{: #ubuntu}
### Ubuntu 
```
sudo apt install git python3-pip python3-opencv libcurl4 libatlas-base-dev libhdf5-dev libhdf5-serial-dev libatlas-base-dev libjasper-dev libqtgui4 libqt4-test
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
git clone https://github.com/luxonis/depthai.git
cd depthai
python3 -m pip install -r requirements.txt
```

{: #quicktest}
## Quick Test

Run `python3 test.py` from within depthai to make sure everything is working:

```
python3 test.py
```

If all goes well a small window video display with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai/blob/master/resources/nn/mobilenet-ssd/mobilenet-ssd.json#L22)).

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
if not depthai.init_device(consts.resource_paths.device_cmd_fpath):
    raise RuntimeError("Error initializing device. Try to reset it.")
```

{: #depthai_create_pipeline}
### depthai.create_pipeline(config=dict) → CNNPipeline

Initializes a DepthAI Pipeline, returning the created `CNNPipeline` if successful and `None` otherwise.

#### Parameters

* __config(dict)__ -  A `dict` of pipeline configuration settings.
    <br/>Example key/values for the config:
    ```py
    {
        # Possible streams:
        #   'left' - left mono camera preview
        #   'right' - right mono camera preview
        #   'previewout' - 4K color camera preview
        #   'metaout' - CNN output tensors
        #   'depth_raw' - the raw depth map, disparity converted to real life distance
        #   'disparity' - disparity map, the diaparity between left and right cameras, in pixels
        #   'disparity_color' - disparity map colorized
        #   'meta_d2h' - device metadata stream
        #   'video' - H.264/H.265 encoded color camera frames
        #   'jpegout' - JPEG encoded color camera frames
        #   'object_tracker' - Object tracker results
        'streams': [
            'left',  # if left is used, it must be in the first position
            'right',
            {'name': 'previewout', 'max_fps': 12.0},  # streams can be specified as objects with additional params
            'metaout',
            # depth-related streams
            {'name': 'depth_raw', 'max_fps': 12.0},
            {'name': 'disparity', 'max_fps': 12.0},
            {'name': 'disparity_color', 'max_fps': 12.0},
        ],
        'depth':
        {
            'calibration_file': consts.resource_paths.calib_fpath,
            'padding_factor': 0.3,
            'depth_limit_m': 10.0, # In meters, for filtering purpose during x,y,z calc
            'confidence_threshold' : 0.5, #Depth is calculated for bounding boxes with confidence higher than this number 
        },
        'ai':
        {
            'blob_file': blob_file,  # MyriadX CNN blob file path
            'blob_file_config': blob_file_config,  # Configuration file for CNN output tensor mapping on host side
            'calc_dist_to_bb': True,  # if True, will include depth information to CNN output tensor
            'keep_aspect_ratio': not args['full_fov_nn'],
        },
        # object tracker
        'ot':
        {
            'max_tracklets'        : 20, # maximum 20 is supported
            'confidence_threshold' : 0.5, # object is tracked only for detections over this threshold
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
pipeline = depthai.create_pipeline(config={
    'streams': ['previewout'],
    'ai': {
        'blob_file': consts.resource_paths.blob_fpath,
        'blob_file_config': consts.resource_paths.blob_config_fpath
    }
})
```

{: #depthai_cnnpipeline}
### depthai.CNNPipeline

Pipeline object using which the device is able to send it's result to the host. Created using [depthai.create_pipeline]

* __get_available_data_packets() -> depthai.DataPacketList__

    Returns only data packets produced by device itself, without CNN results

* __get_available_nnet_and_data_packets() -> tuple[depthai.NNetPacketList, depthai.DataPacketList]__

    Return both neural network results and data produced by device

{: #depthai_nnetpacket}
### depthai.NNetPacket

Neural network results packet. It's not a single result, but a batch of results with additional metadata attached

* __entries() -> depthai.TensorEntryContainer__

    Returns list of depthai.TensorEntry over which you can iterate

* __getMetadata() -> depthai.FrameMetadata__

    Returns metadata object containing all proprietary data related to this packet 

* __get_tensor(Union[int, str]) -> numpy.ndarray__

    Returns raw output from specific tensor, which you can choose by index or by `output_tensor_name` property specified
    in [blob config file](#creating-blob-configuration-file)
    
{: #depthai_datapacket}
### depthai.DataPacket

DepthAI data packet, containing information generated on the device. Unlike NNetPacket, it contains a single "result" 
with source stream info

* __getData() -> numpy.ndarray__

    Returns the data as NumPy array, which you can e.x. display the data using OpenCV `imshow`.
    
    Used with streams that returns frames e.x. `previewout`, `left`, `right`, or encoded data e.x. `video`, `jpegout`.

* __getDataAsStr() -> str__

    Returns the data as a string, capable to be parsed further. 
    
    Used with streams that returns non-array results e.x. `meta_d2h` which returns JSON object

* __getMetadata() -> depthai.FrameMetadata__

    Returns metadata object containing all proprietary data related to this packet 

* __getObjectTracker() -> ObjectTracker__

    Returns result as an ObjectTracker instance, used only with packets from `object_tracker` stream

* __size() -> int__

    Returns packet data size

* __stream_name: str__

    Returns packet source stream. Used to determine the origin of the packet and therefore allows to handle the packets
    correctly, applying proper handling based on this value

## Preparing MyriadX blob file and it's config

As you can see in [this example](#example-1), basic usage of `create_pipeline` method consists of specifying desired output
streams and AI section, where you specify MyriadX blob and it's config.

In this section, we'll describe how to obtain both `blob_file` and `blob_file_config`.

### Obtaining MyriadX blob

Since we're utilizing MyriadX VPU, your model needs to be compiled (or accurately - optimized and converted) into
the MyriadX blob file, which will be sent to the device and executed.

Easiest way to obtain this blob is to use our [online BlobConverter app](http://69.164.214.171:8080/). It has all
tools needed for compilation so you don't need to setup anything - and you can even download a blob for the model
from [OpenVINO model zoo](https://github.com/openvinotoolkit/open_model_zoo)

If you'd like, you can also compile the blob yourself. You'll need to install [OpenVINO toolkit](https://docs.openvinotoolkit.org/latest/index.html),
then use [Model Optimizer](https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_Deep_Learning_Model_Optimizer_DevGuide.html) and [Myriad Compiler](https://docs.openvinotoolkit.org/latest/openvino_inference_engine_tools_compile_tool_README.html#myriad_platform_option)
in order to obtain MyriadX blob.
We've documented example usage of these compilers [here](https://github.com/luxonis/depthai#conversion-of-existing-trained-models-into-intel-movidius-binary-format)
    
### Creating Blob configuration file
    
Config file is required to create a mapping between CNN output and Python API on host side. 
Basically, whole configuration resolves around `tensors` array. One tensor represents one CNN output, so usually
you'll have just one object in there, but if you'd like to use e.x. [age gender recognition](https://docs.openvinotoolkit.org/latest/omz_models_intel_age_gender_recognition_retail_0013_description_age_gender_recognition_retail_0013.html)
you'll need to define two tenors


Let's take a template config file (based on MobileNetSSD) and go through tensor object fields and describe them

```json
{
"tensors":
[
    {       
        "output_tensor_name": "out",
        "output_dimensions": [1, 1, 100, 7],
        "output_entry_iteration_index": 2,
        "output_properties_dimensions": [3],
        "property_key_mapping":
        [
            [],
            [],
            [],
            ["id", "label", "confidence", "left", "top", "right", "bottom"]
        ],
        "output_properties_type": "f16"
    }
]
}
```

* `output_tensor_name` - is a custom name as a string that you choose for this specific tensor. In the code, you can access a specific tensor by this name using [`get_tensor`](#depthai_nnetpacket) method ([example](https://github.com/luxonis/depthai/blob/master/depthai_helpers/tiny_yolo_v3_handler.py#L120))
* `output_dimensions` - determines the dimensions of the CNN model output. If your model, e.x. [mobilenet-ssd](https://docs.openvinotoolkit.org/latest/omz_models_public_mobilenet_ssd_mobilenet_ssd.html), contains `N` as one of the output dimentions.
(specifying that it's dependent of the number of detected items), you should set this variable to a relatively high value - like in the example above, it's `100`. If your network produces a fixed-size output, and you insert the dimensions that are higher than actual output, the DepthAI will crash. If less, it will work but sometimes won't produce results (depending on the network)
* `output_entry_iteration_index` - if your network returns multiple results (just like mentioned above with mobilenet having `N` as a dimension), you can specify the index to iterate over. Since in our case we set `100` as third argument in array, iteration index should be set to `2` (third index).  You can set it to `0` if you don't need iteration.
* `property_key_mapping` - contains field names as string which you can change according to your preference, it's how you'll access the fields in the code, it has to match the number of properties returned by your network. Taking mobilenet as an example, for non-depth it will be __7__, and with depth info will be __10__ (as distances x, y and z are added). If you don't need the mapping, you can set it to `[]`
* `output_properties_type` - c-type data type specifying size of the output variables


If your network returns tensors with only one dimension other than `1`, you can ship the leading empty arrays (which are added to fit the output dimensions)

For instamce,  MobienetSSD returns results in array with dimensions `1, 1, N, 7`, so in `property_key_mapping` we have 4 leading arrays

On the other hand, Age/Gender detector, one of the tensors returns results in array with dimensions `1, 2, 1, 1`, so in `property_key_mapping` we have a single array with two fields specified, no need to follow it with 3 empty leading arrays

#### Examples

##### MobilenetSSD

```json
{
    "tensors":
    [
        {       
            "output_tensor_name": "out",
            "output_dimensions": [1, 1, 100, 7],
            "output_entry_iteration_index": 2,
            "output_properties_dimensions": [3],
            "property_key_mapping":
            [
                [],
                [],
                [],
                ["id", "label", "confidence", "left", "top", "right", "bottom"]
            ],
            "output_properties_type": "f16"
        }
    ]
}
```

##### MobilenetSSD with depth info

```json
{
    "tensors":
    [
        {       
            "output_tensor_name": "out",
            "output_dimensions": [1, 1, 100, 10],
            "output_entry_iteration_index": 2,
            "output_properties_dimensions": [3],
            "property_key_mapping":
            [
                [],
                [],
                [],
                ["id", "label", "confidence", "left", "top", "right", "bottom", "distance_x", "distance_y", "distance_z"]
            ],
            "output_properties_type": "f16"
        }
    ]
}
```

##### Age Gender recognition

```json
{
    "tensors":
    [
        {       
            "output_tensor_name": "out",
            "output_dimensions": [1, 1, 1, 1],
            "output_entry_iteration_index": 0,
            "output_properties_dimensions": [0],
            "property_key_mapping":
            [
                ["age"]
            ],
            "output_properties_type": "f16"
        },
	{       
            "output_tensor_name": "out1",
            "output_dimensions": [1, 2, 1, 1],
            "output_entry_iteration_index": 0,
            "output_properties_dimensions": [0],
            "property_key_mapping":
            [
                ["female", "male"]
            ],
            "output_properties_type": "f16"
       }
    ]
}
```
    

{: #compile_api }
## Compiling the DepthAI API for Other Platforms

The DepthAI API is open source so can be compiled for various permutations of platforms and Python3 versions.

Below is a quick summary of what's been tried by Luxonis staff and DepthAI users:

* Mac OS X - Compile from source, instructions [below](#mac-os-x).
* Linux Mint - Appears to work with Ubuntu 18.04 prebuilt python modules
* Manjaro/Arch - Works when [compiled from source](#compile_linux)
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
brew install coreutils python3 cmake libusb wget opencv curl
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
### Building DepthAI from Source 

If you are using non-standard Python versions (such as an older Python on an older OS), or are modifying the DepthAI API yourself, or for whatever reason you need to build from source, it's fairly straightforward to so so.

#### Install Developer Tools
To compile the Python API from scratch, it may be necessary, depending on the configuration of the machine, to install build essentials such as through your Linux distro's package manager, or building them from source if needed, in order for building the DepthAI python module from source to be successful.
* cmake
* gcc
* g++
* libusb
* opencv
* libcurl4-openssl-dev
* python3
  * including `pip3 install numpy opencv-python --user`
  
It's worth noting that cmake, gcc, g++, etc. can often be installed via something like `build-essential` (as in Ubuntu).

Once these dependencies are installed (which may already be the case), use the following commands to build the pymodule from source and test it:

#### Build DepthAI from Source
```
git clone https://github.com/luxonis/depthai.git
cd depthai
git submodule update --init --recursive
./depthai-api/install_dependencies.sh
./depthai-api/build_py_module.sh
python3 test.py
```

Same here, you should see a small preview window with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai/blob/master/resources/nn/mobilenet-ssd/mobilenet-ssd.json)), including 'person', 'car', 'dog' and strangely, 'sheep'.

#### Re-building DepthAI from Source from a Specific (Experimental) Branch
The following commands are somewhat overkill, but ensure everything is fully updated for the experimental build.  And the main delay comes the --recursive update.  Once you've done this once on a machine though, it shouldn't take long excepting if there are huge upstream dependency changes.

```
git checkout [commit-hash or branch_name] --recurse-submodules=yes -f
git submodule update --init --recursive && ./depthai-api/install_dependencies.sh && ./depthai-api/build_py_module.sh --clean
```
