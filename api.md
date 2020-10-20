---
layout: default
title: DepthAI Python API
toc_title: Python API
description: The official API for interacting with your DepthAI board.
order: 5
---

# {{page.title}}

Instructions for installing, upgrading, and using the DepthAI Python API.

{: #supported_platforms data-toc-title="Supported platforms"}
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

## Other installation methods

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

Now, run the demo script from within depthai to make sure everything is working:

```
python3 depthai_demo.py
```

If all goes well a small window video display with overlays for any items for which the class exists in the example 20-class object detector (class list [here](https://github.com/luxonis/depthai/blob/master/resources/nn/mobilenet-ssd/mobilenet-ssd.json#L22)).

{: #reference }
## API Reference

{: #depthai_device}
### depthai.Device

Represents the DepthAI device with the methods to interact with it

#### Example

```py
import depthai
device = depthai.Device('', False)
pipeline = device.create_pipeline(config={
    'streams': ['previewout', 'metaout'],
    'ai': {
        "blob_file": "/path/to/model.blob",
        "blob_file_config": "/path/to/config.json",
    },
})
```

#### Methods

{: #device_init}
* [__\_\_init\_\___](#device_init)(device_id: str, usb2_mode: bool) -> Device
    
    Standard and recomended way to set up the object.
    
    __device_id__ represents the USB port id that the device is connected to. If set to specific value (e.x. `"1"`) it will
    look for the device in specific USB port, whereas if left empty - `''` - it will look for the device on all ports.
    It's useful when we have more than one DepthAI devices connected and want to specify which one to use in the code

    __usb2_mode__, being `True/False`, allows the DepthAI to communicate using USB2 protocol, not USB3. This lowers the 
    throughput of the pipeline, but allows to use >1m USB cables for connection
    

{: #device_init_debug}
* [__\_\_init\_\___](#device_init_debug)(cmd_file: str, device_id: str) -> Device
    
    Development and debug way to initialize the DepthAI device.
    
    __cmd_file__ is a path to firmware `.cmd` file that will be loaded onto the device for boot.
    
    __device_id__ represents the USB port id that the device is connected to. If set to specific value (e.x. `"1"`) it will
    look for the device in specific USB port, whereas if left empty - `''` - it will look for the device on all ports.    
    It's useful when we have more than one DepthAI devices connected and want to specify which one to use in the code


{: #device_create_pipeline}
* [__create_pipeline__](#device_create_pipeline)(config: dict) -> [CNNPipeline](#cnnpipeline)

    Initializes a DepthAI Pipeline, returning the created `CNNPipeline` if successful and `None` otherwise.

    __config(dict)__ -  A `dict` of pipeline configuration settings. Example key/values for the config:
    ```py
    {
        # Possible streams:
        #   'left' - left mono camera preview
        #   'right' - right mono camera preview
        #   'rectified_left' - left mono camera preview after stereo rectification 
        #   'rectified_right' - right mono camera preview after stereo rectification 
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

{: #device_get_available_streams}
* [__get_available_streams__](#device_get_available_streams)() -> List[str]
    
    Return a list of all streams supported by the DepthAI library. 
    Requires `create_pipeline` to be run prior to this call,
    otherwise it will return an empty array
    
    ```
    >>> device.get_available_streams()
    ['meta_d2h', 'left', 'right', 'disparity', 'depth_raw', 'metaout', 'previewout', 'jpegout', 'video', 'object_tracker']
    ```

{: #device_get_nn_to_depth_bbox_mapping}
* [__get_nn_to_depth_bbox_mapping__](#device_get_nn_to_depth_bbox_mapping)() -> dict
    
    Returns dict that allows to match the CNN output with the disparity info.
    
    Since the RGB camera has a 4K resolution and the neural networks accept only images with specific resolution
    (like 300x300), the original image is cropped to meet the neural network requirements.
    On the other side, the disparity frames returned by the neural network are in full resolution available on the mono cameras.
    
    To be able to determine where the CNN previewout image is on the disparity frame, this method should be used as it
    specifies the offsets and dimensions to use.
    
    ```
    >>> device.get_nn_to_depth_bbox_mapping()
    {'max_h': 681, 'max_w': 681, 'off_x': 299, 'off_y': 59}
    ```

{: #device_request_af_mode}
* [__request_af_mode__](#device_request_af_mode)(mode: [AutofocusMode](#autofocus_mode))
    
    Return a list of all streams supported by the DepthAI library. 

{: #device_request_af_trigger}
* [__request_af_trigger__](#device_request_af_trigger)(mode: [AutofocusMode](#autofocus_mode))
    
    Return a list of all streams supported by the DepthAI library. 

{: #device_request_jpeg}
* [__request_jpeg__](#device_request_jpeg)()
    
    Capture a JPEG frame from the RGB camera and send it to `jpegout` stream. 
    The frame is in full available resolution, not cropped to meet the CNN input dimensions.

{: #device_send_disparity_confidence_threshold}
* [__send_disparity_confidence_threshold__](#device_send_disparity_confidence_threshold)()
    
   Function to send disparity confidence threshold for StereoSGBM algorithm.
   If the disparity value confidence is below the threshold, the value is marked as invalid disparity
   and treated as background


{: #get_right_homography}
* [__get_right_homography__](#get_right_homography)()
    
    Return a 3x3 homography matrix used to rectify the right stereo camera image. 

{: #get_left_homography}
* [__get_left_homography__](#get_left_homography)()
    
    Return a 3x3 homography matrix used to rectify the left stereo camera image. 
    
<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
Note: Requires [dual-homography calibration](/faq/#dualhomography).
</div>

{: #get_left_intrinsic}
* [__get_left_intrinsic__](#get_left_intrinsic)()
    
    Return a 3x3 intrinisc calibration matrix of the left stereo camera.
    
<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
Note: Requires [dual-homography calibration](/faq/#dualhomography).
</div>


{: #get_right_intrinsic}
* [__get_right_intrinsic__](#get_right_intrinsic)()
    
    Return a 3x3 intrinisc calibration matrix of the right stereo camera.
    
<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
Note: Requires [dual-homography calibration](/faq/#dualhomography).
</div>

{: #get_rotation}
* [__get_rotation__](#get_rotation)()
    
    Return a 3x3 rotation matrix representing the rotation of the right stereo camera w.r.t left stereo camera. 
    
<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
Note: Requires [dual-homography calibration](/faq/#dualhomography).
</div>

{: #get_translation}
* [__get_translation__](#get_translation)()
    
    Return a 3x1 vector repesenting the position of the right stereo camera center w.r.t left stereo camera center.

<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
Note: Requires [dual-homography calibration](/faq/#dualhomography).
</div>

{: #autofocus_mode}
### depthai.AutofocusMode

An enum with all autofocus modes available

#### Members

{: #autofocus_auto}
* [__AF_MODE_AUTO__](#autofocus_auto)
    This mode sets the Autofocus to a manual mode, where you need to call [`request_af_trigger`](#request_af_trigger)
    to start focusing procedure.
{: #autofocus_continuous_picture}
* [__AF_MODE_CONTINUOUS_PICTURE__](#autofocus_continuous_picture)
    This mode adjusts the focus continually to provide the best in-focus image stream and should be used when the
    camera is standing still while capturing. Focusing procedure is done as fast as possible.
    
    This is the defaut mode the DepthAI operates in.

{: #autofocus_continuous_video}
* [__AF_MODE_CONTINUOUS_VIDEO__](#autofocus_continuous_video)
    This mode adjusts the focus continually to provide the best in-focus image stream and should be used when the
    camera is trying to capture a smooth video steam. Focusing procedure is slower and avoids focus overshoots
{: #autofocus_edof}
* [__AF_MODE_EDOF__](#autofocus_edof)
    This mode disables the autofocus. EDOF stands for Enhanced Depth of Field and is a digital focus.
{: #autofocus_macro}
* [__AF_MODE_MACRO__](#autofocus_macro)
    It's the same operating mode as [AF_MODE_AUTO](#autofocus_auto)


{: #cnnpipeline}
### depthai.CNNPipeline

Pipeline object using which the device is able to send it's result to the host. Created using [depthai.create_pipeline]

#### Methods

{: #cnnpipeline_get_available_data_packets}
* [__get_available_data_packets__](#cnnpipeline_get_available_data_packets)() -> List[[depthai.DataPacket](#datapacket)]

    Returns only data packets produced by the device itself, without CNN results

{: #cnnpipeline_get_available_nnet_and_data_packets}
* [__get_available_nnet_and_data_packets__](#cnnpipeline_get_available_nnet_and_data_packets)() -> tuple[List[[NNetPacket](#nnetpacket)], List[[depthai.DataPacket](#datapacket)]]

    Return both neural network results and data produced by device

{: #nnetpacket}
### depthai.NNetPacket

Neural network results packet. It's not a single result, but a batch of results with additional metadata attached

#### Methods

{: #nnetpacket_entries}
* [__entries__](#nnetpacket_entries})() -> depthai.TensorEntryContainer

    Returns list of depthai.TensorEntry over which you can iterate

{: #nnetpacket_getmetadata}
* [__getMetadata__](#nnetpacket_getmetadata)() -> [depthai.FrameMetadata](#metadata)

    Returns metadata object containing all proprietary data related to this packet 

{: #nnetpacket_gettensor}
* [__get_tensor__](#nnetpacket_gettensor)(Union[int, str]) -> numpy.ndarray

    Returns raw output from specific tensor, which you can choose by index or by `output_tensor_name` property specified
    in [blob config file](#creating-blob-configuration-file)
    
{: #datapacket}
### depthai.DataPacket

DepthAI data packet, containing information generated on the device. Unlike NNetPacket, it contains a single "result" 
with source stream info

#### Methods

{: #datapacket_getdata}
* [__getData__](#datapacket_getdata)() -> numpy.ndarray

    Returns the data as NumPy array, which you can e.x. display the data using OpenCV `imshow`.
    
    Used with streams that returns frames e.x. `previewout`, `left`, `right`, or encoded data e.x. `video`, `jpegout`.

{: #datapacket_getdataasstr}
* [__getDataAsStr__](#datapacket_getdataasstr)() -> str

    Returns the data as a string, capable to be parsed further. 
    
    Used with streams that returns non-array results e.x. `meta_d2h` which returns JSON object

{: #datapacket_getmetadata}
* [__getMetadata__](#datapacket_getmetadata)() -> [depthai.FrameMetadata](#metadata)

    Returns metadata object containing all proprietary data related to this packet 

{: #datapacket_getobjecttracker}
* [__getObjectTracker__](#datapacket_getobjecttracker)() -> ObjectTracker

    Returns result as an ObjectTracker instance, used only with packets from `object_tracker` stream

{: #datapacket_size}
* [__size__](#datapacket_size)() -> int

    Returns packet data size

{: #datapacket_streamname}
* [__stream_name__](#datapacket_streamname): str

    Returns packet source stream. Used to determine the origin of the packet and therefore allows to handle the packets
    correctly, applying proper handling based on this value

{: #metadata}
### depthai.FrameMetadata

Metadata object attached to the packets sent via pipeline.

#### Methods

{: #metadata_getcameraname}
* [__getCameraName__](#metadata_getcameraname)() -> str

    Returns the name of the camera that produced the frame.
    

{: #metadata_getcategory}
* [__getCategory__](#metadata_getcategory)() -> int

    Returns the type of the packet, whether it's a regular frame or arrived from taking a still
    

{: #metadata_getframebytespp}
* [__getFrameBytesPP__](#metadata_getframebytespp)() -> int

    Returns number of bytes per pixel in the packet's frame
    

{: #metadata_getframeheight}
* [__getFrameHeight__](#metadata_getframeheight)() -> int

    Returns the height of the packet's frame
    

{: #metadata_getframewidth}
* [__getFrameWidth__](#metadata_getframewidth)() -> int

    Returns the width of the packet's frame
    

{: #metadata_getframetype}
* [__getFrameType__](#metadata_getframetype)() -> int

    Returns the type of the data that this packet contains.
    

{: #metadata_getinstancenum}
* [__getInstanceNum__](#metadata_getinstancenum)() -> int

    Returns the camera id that is the source of the current packet
    

{: #metadata_getsequencenum}
* [__getSequenceNum__](#metadata_getsequencenum)() -> int

    Sequence number is assigned for each frame produced by the camera.
    It can be used to assure the frames are captured at the same time - e.x. if frames from left and right camera have
    the same sequence number, you can assume they were taken at the same time
    

{: #metadata_getstride}
* [__getStride__](#metadata_getstride)() -> int

    Specifies number of bytes till the next row of pixels in the packet's frame
    

{: #metadata_gettimestamp}
* [__getTimestamp__](#metadata_gettimestamp)() -> float

    When packet is created, it is assigned a creation timestamp, which can be obtained using this method
    

{: #objecttracker}
### depthai.ObjectTracker

Object representing current state of the tracker, obtained by calling [`getObjectTracker`](#datapacket_getobjecttracker)
method on a packet from `object_tracker` stream

#### Methods

{: #objecttracker_getnrtracklets}
* [__getNrTracklets__](#objecttracker_getnrtracklets)() -> int

    Return the number of available tracklets
    

{: #objecttracker_gettracklet}
* [__getTracklet__](#objecttracker_gettracklet)(tracklet_nr: int) -> [Tracklet](#tracklet})

    Returns the tracklet with specified `tracklet_nr`. To check how many tracklets there are, please use
    [`getNrTracklets`](#objecttracker_getnrtracklets) method


{: #tracklet}
### depthai.Tracklet

Tracklet is representing a single tracked object, is produced by [`ObjectTracker`](##objecttracker) class.
To obtain it, call [`getTracklet`](#objecttracker_gettracklet) method.

#### Methods

{: #tracklet_getid}
* [__getId__](#tracklet_getid)() -> int

    Return the tracklet id

{: #tracklet_getlabel}
* [__getLabel__](#tracklet_getlabel)() -> int

    Return the tracklet label, being the neural network returned result. Used to identify a class of recognized objects


{: #tracklet_getstatus}
* [__getLabel__](#tracklet_getstatus)() -> str

    Return the tracklet status - either __`NEW`__, __`TRACKED`__, or __`LOST`__.

{: #tracklet_getleftcoord}
* [__getLeftCoord__](#tracklet_getleftcoord)() -> int

    Return the left coordinate of the bounding box of a tracked object

{: #tracklet_getrightcoord}
* [__getRightCoord__](#tracklet_getrightcoord)() -> int

    Return the right coordinate of the bounding box of a tracked object

{: #tracklet_gettopcoord}
* [__getTopCoord__](#tracklet_gettopcoord)() -> int

    Return the top coordinate of the bounding box of a tracked object

{: #tracklet_getbottomcord}
* [__getBottomCoord__](#tracklet_getbottomcoord)() -> int

    Return the bottom coordinate of the bounding box of a tracked object
   

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
