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

The DepthAI API python module is prebuilt for Ubuntu, MaxOS and Windows. 
For other operating systems and/or Python versions, DepthAI can be [built from source](#compile_api).

## Enabling the USB device

Since the DepthAI is a USB device, in order to communicate with it on the systems that use `udev` tool, you
need to add the udev rules in order to make the device accessible.

The following command will add a new udev rule to your system

```
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
```

## Install from PyPi

Our packages are distributed [via PyPi](https://pypi.org/project/depthai/), to install it in your environment use

```
python3 -m pip install depthai
```

## Install from source

To get the latest and yet unreleased features from our source code, you can go ahead and compile depthai package manually.

### Dependencies to build from source
- CMake > 3.2.0
- Generation tool (Ninja, make, ...)
- C/C++ compiler
- libusb1 development package

{: #debian}
#### Ubuntu, Raspberry Pi OS, ... (Debian based systems)
On Debian based systems (Raspberyy Pi OS, Ubuntu, ...) these can be acquired by running:
```
sudo apt-get -y install cmake libusb-1.0-0-dev build-essential
```

{: #macos}
#### macOS (Mac OS X)

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

You can install them all with the following command (if using Ubuntu)

### Install using GitHub commit

Pip allows users to install the packages from specific commits, even if they are not yet released on PyPi.

To do so, use the command below - and be sure to replace the `<commit_sha>` with the correct commit hash [from here](https://github.com/luxonis/depthai-python/commits)

```
python3 -m pip install git+https://github.com/luxonis/depthai-python.git@<commit_sha>
```

{: #compile_api}
### Install from source

If desired, you can also install the package from the source code itself - it will allow you to make the changes
to the API and see them live in action.

To do so, first download the repository and then add the package to your python interpreter in development mode

```
git clone https://github.com/luxonis/depthai-python.git
cd depthai-python
python3 setup.py develop
```

{: #quicktest}
## Test installation

We have [`depthai`](https://github.com/luxonis/depthai) repository on our GitHub that contains many helpful examples and 
prepared neural networks you can use to make your prototyping faster. It also includes the test script, maintained by
our contributors, that should help you verify if your setup was correct.

First, clone the `depthai` repository

```
git clone https://github.com/luxonis/depthai.git
cd depthai
```

Now, run the test script from within depthai to make sure everything is working:

```
python3 test.py
```

If all goes well a small window video display with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai/blob/master/resources/nn/mobilenet-ssd/mobilenet-ssd.json#L22)).

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
