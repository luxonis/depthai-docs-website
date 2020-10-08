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

## Installing system dependencies

A couple of basic system dependencies are required to run the DepthAI library. Most of them should be already installed
in most of the systems, but in case they are not, we prepared an install script that will make sure all dependencies are installed:

```
curl -fL http://docs.luxonis.com/install_dependencies.sh | bash
```

If using Windows, please use [this batch script](/install_dependencies.bat) for dependencies installation 

## Enabling the USB device (only on Linux)

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

For other installation options, see [Ohter Installation Options](#otherinstall).

{: #quicktest}
## Test installation

We have [`depthai`](https://github.com/luxonis/depthai) repository on our GitHub that contains many helpful examples and 
prepared neural networks you can use to make your prototyping faster. It also includes the test script, maintained by
our contributors, that should help you verify if your setup was correct.

First, clone the `depthai` repository and install its dependencies

```
git clone https://github.com/luxonis/depthai.git
cd depthai
python3 -m pip install -r requirements.txt
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

{: #nnetpacket_getmetadata}
* [__getMetadata__](#nnetpacket_getmetadata)() -> [depthai.FrameMetadata](#metadata)

    Returns metadata object containing all proprietary data related to this packet 

{: #nnetpacket_gettensor}
* [__get_tensor__](#nnetpacket_gettensor)(Union[int, str]) -> numpy.ndarray

    Can be used if in [blob config file](#creating-blob-configuration-file) `output_format` is set to `raw`.
    It returns a shaped numpy array for the specific network output tensor, based on the neural network's output layer information. 
    
    For example: in case of `Mobilenet-SSD` it returns a `[1, 1, 100, 7]` shaped array, where `numpy.dtype` is `float16`.
    
    Example of usage:
    `nnetpacket.get_tensor(0)` or `nnetpacket.get_tensor('detection_out')`

{: #nnetpacket_getitem}
* [__[ Union[int, str] ]__](#nnetpacket_getitem) -> numpy.ndarray

    Same as [__get_tensor__](#nnetpacket_gettensor). 
    
    Example of usage for `Mobilenet-SSD`: 
    
    `nnetpacket[0]` or `nnetpacket['detection_out']`, where `'detection_out'` is the name of output layer in case of `Mobilenet-SSD`

{: #getOutputsList}
* [__getOutputsList__](#getOutputsList)() -> list

    Returns all the output tensors in a list for the network.

{: #getOutputsDict}
* [__getOutputsDict__](#getOutputsDict)() -> dict

    Returns all the output tensors in a dictionary for the network.
    The `key` is the `name` of the output layer, the `value` is the `shaped numpy array`. 

{: #getOutputLayersInfo}
* [__getOutputLayersInfo__](#getOutputLayersInfo)() -> [depthai.TensorInfo](#TensorInfo)

    Returns informations about the output layers for the network.

{: #getInputLayersInfo}
* [__getInputLayersInfo__](#getInputLayersInfo)() -> [depthai.TensorInfo](#TensorInfo)

    Returns informations about the input layers for the network.

{: #getDetectedObjects}
* [__getDetectedObjects__](#getDetectedObjects)() -> [depthai.Detections](#Detections)

    ONLY for detection networks (`Mobilenet-SSD`, `(tiny-)YOLO-v3` based networks)
    Should be used when in [blob config file](#creating-blob-configuration-file) `output_format` is set to `detection`.
    Returns the detected objects in [Detections](#Detections) format. The network is decoded on device side.


{: #TensorInfo}
### depthai.TensorInfo

Descriptor of the input/output layers/tensors of the network.

When network is loaded the tensor info is automatically printed. 

Can be printed using : `print(nnetpacket.getInputLayersInfo())` or `print(nnetpacket.getOutputLayersInfo())` at runtime.

#### Attributes
{: #name}
* [__name__](#name) -> string

    Name of the tensor.

{: #dimensions}
* [__dimensions__](#dimensions) -> list

    Shape of tensor array. E.g. : `[__1, 1, 100, 7__]`

{: #strides}
* [__strides__](#strides) -> list

    Strides of tensor array.

{: #data_type}
* [__data_type__](#data_type) -> string

    Data type of tensor. E.g. : `float16`

{: #offset}
* [__offset__](#offset) -> int

    Offset in the raw output array.

{: #element_size}
* [__element_size__](#element_size) -> int

    Size in bytes of one element in the array.

{: #index}
* [__index__](#index) -> int

    Index of the tensor. E.g. : in case of multiple inputs/outputs in the network it marks the order of input/output.

#### Methods

{: #get_dict}
* [__get_dict__](#get_dict)() -> dict
    
    Returns TensorInfo in a dictionary where the `key` is the name of attribute.

{: #get_dimension}
* [__get_dimension__](#get_dimension)() -> [depthai.TensorInfo.Dimension](#Dimension)
    
    Returns the specific dimension of the tensor, for example: `tensor_info.get_dimension(depthai.TensorInfo.Dimension.WIDTH)` returns the `WIDTH` of tensor.


{: #Detections}
### depthai.Detections

Container of neural network results decoded on device side.


#### Example of accessing detections

Assuming the detected objects are stored in `detections` object.


* __Number of detections__

    `detections.size()` or `len(detections)`

* __Accessing the `x`-th detection__

    `detections[`__x__`]`

* __Iterating through all detections__

    `for detection in detections:`

    handle [detection](#Detection)

{: #Detection}
### depthai.Detection

Detected object descriptor.

#### Attributes
{: #label}
* [__label__](#label) -> int

    Label id of the detected object.

{: #confidence}
* [__confidence__](#confidence) -> float

    Confidence score of the detected object in interval [0, 1].

{: #x_min}
* [__x_min__](#x_min) -> float

    Top left `X` coordinate of the detected bounding box. Normalized, in interval [0, 1].

{: #y_min}
* [__y_min__](#y_min) -> float

    Top left `Y` coordinate of the detected bounding box. Normalized, in interval [0, 1].

{: #x_max}
* [__x_max__](#x_max) -> float

    Bottom right `X` coordinate of the detected bounding box. Normalized, in interval [0, 1].

{: #y_max}
* [__y_max__](#y_max) -> float

    Bottom right `Y` coordinate of the detected bounding box. Normalized, in interval [0, 1].

{: #depth_x}
* [__depth_x__](#depth_x) -> float

    Distance to detected bounding box on `X` axis. Only when depth calculation is enabled (stereo cameras are present on board).

{: #depth_y}
* [__depth_y__](#depth_y) -> float

    Distance to detected bounding box on `Y` axis. Only when depth calculation is enabled (stereo cameras are present on board).

{: #depth_z}
* [__depth_z__](#depth_z) -> float

    Distance to detected bounding box on `Z` axis. Only when depth calculation is enabled (stereo cameras are present on board).

#### Methods

{: #get_dict}
* [__get_dict__](#get_dict)() -> dict
    
    Returns detected object in a dictionary where the `key` is the name of attribute.

{: #Dimension}
### depthai.TensorInfo.Dimension

Dimension descriptor of tensor shape.

#### Values

* __Union[W, WIDTH]__ -> Width
* __Union[H, HEIGHT]__ -> Height
* __Union[C, CHANNEL]__ -> Number of channels
* __Union[N, B, NUMBER, BATCH]__ -> Number/Batch of inferences

Note: `Dimension` is mostly meaningful for input tensors since not all neural network models respect the semantics of `Dimension` for output tensor. E.g. `Width` might not mean `Width`.

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
    
If config file is not provided then there is no decoding done on device <==> `output_format` is set to `raw`. The decoding must be done on host side, by the user.

Currently there is support to decode `Mobilenet-SSD` and `(tiny-)YOLO-v3` based networks on the device.
For that config file is required with network specific parameters.

Example for `tiny-yolo-v3` network:
```json
{
    "NN_config":
    {
        "output_format" : "detection",
        "NN_family" : "YOLO",
        "NN_specific_metadata" :
        { 
            "classes" : 80,
            "coordinates" : 4,
            "anchors" : [10,14, 23,27, 37,58, 81,82, 135,169, 344,319],
            "anchor_masks" : 
            {
                "side26" : [1,2,3],
                "side13" : [3,4,5]
            },
            "iou_threshold" : 0.5,
            "confidence_threshold" : 0.5
        }
    },
    "mappings":
    {
        "labels":
        [
            "person",
            "bicycle",
            "car",
            ...
        ]
    }
}
```


* `NN_config` - configuration for the network
    * `output_format` 
        * `"detection"` - decoding done on device, the received packet is in [Detections](#Detections) format
        * `"raw"` - decoding done on host
    * `NN_family` - `"YOLO"` or `"mobilenet`" 
    * `NN_specific_metadata` - only for `"YOLO"`
        * `classes` - number of classes
        * `coordinates` - number of coordinates
        * `anchors` - anchors for YOLO network
        * `anchor_masks` - anchor mask for each output layer : `26x26`, `13x13` (+ `52x52` for full YOLO-v3)
        * `iou_threshold` - intersection over union threshold for detected object
        * `confidence_threshold` - score confidence threshold for detected object
* `mappings`
    * `labels` - label mapping for detected object ID


Example decoding for `tiny-yolo-v3`, `yolo-v3`, `mobilenet-ssd` when output_format is set to `detection`:
```
nnet_packets, data_packets = p.get_available_nnet_and_data_packets(blocking=True)
...

in_layers = nnet_packet.getInputLayersInfo() #get input layer information
# print(in_layers) #print input layer info for debugging
input_width  = in_layers[0].get_dimension(depthai.TensorInfo.Dimension.W) #width of input image
input_height = in_layers[0].get_dimension(depthai.TensorInfo.Dimension.H) #height of input image

detections = nnet_packet.getDetectedObjects() #get detection container
objects = list() #create empty list of filtered objects

for detection in detections:
    detection_dict = detection.get_dict()
    # scale normalized coordinates to image coordinates
    detection_dict["x_min"] = int(detection_dict["x_min"] * input_width)
    detection_dict["y_min"] = int(detection_dict["y_min"] * input_height)
    detection_dict["x_max"] = int(detection_dict["x_max"] * input_width)
    detection_dict["y_max"] = int(detection_dict["y_max"] * input_height)
    objects.append(detection_dict)

return objects
```

Example of decoding for full `yolo-v3` and `tiny-yolo-v3` on host and device
* [yolo-v3-decoding](https://github.com/luxonis/depthai/blob/develop/depthai_helpers/tiny_yolo_v3_handler.py)


Example of decoding for `mobilenet` based networks on host and device
* [mobilenet-decoding](https://github.com/luxonis/depthai/blob/develop/depthai_helpers/mobilenet_ssd_handler.py)


{: #otherinstall}
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

### Using/Testing a Specific Branch/PR

From time to time, it may be of interest to use a specific branch.  This may occur, for example, because we have listened to your feature request and implemented a quick implementation in a branch.  Or it could be to get early access to a feature that is soaking in our `develop` for stability purposes before being merged into `main`.

So when working in the [depthai](https://github.com/luxonis/depthai) repository, using a branch can be accomplished with the following commands.  For this example, the `branch` that we will try out is `develop` (which is the branch we use to soak new features before merging them into `main`):

Prior to running the following, you can either clone the respository independently (for not over-writing any of your local changes) or simply do a `git pull` first.

```
git checkout develop
python3 -m pip install -U pip
python3 -m pip install -r requirements.txt
```

{: #compile_api}
### Install from source

If desired, you can also install the package from the source code itself - it will allow you to make the changes
to the API and see them live in action.

To do so, first download the repository and then add the package to your python interpreter in development mode

```
git clone https://github.com/luxonis/depthai-python.git
cd depthai-python
git submodule update --init --recursive
python3 setup.py develop  # you may need to add sudo if using system interpreter instead of virtual environment
```

If you want to use other branch (e.g. `develop`) than default (`main`), you can do so by typing

```
git checkout develop  # replace the "develop" with a desired branch name
git submodule update --recursive
python3 setup.py develop
```

Or, if you want to checkout a specific commit, type

```
git checkout <commit_sha>
git submodule update --recursive
python3 setup.py develop
```


