---
layout: default
title: Tutorial - DepthAI Hello World
toc_title: Hello World
description: Stream Video from your DepthAI onto your monitor display.
order: 1
---

# {{ page.title }}

Learn how to use the DepthAI Python API to display a color video stream.

## Dependencies

Let's get your development environment setup first. This tutorial uses:

* Python 3.6 (Ubuntu) or Python 3.7 (Raspbian).
* The Python DepthAI API, see [how to install](/api#install).
* The `cv2` and `numpy` Python modules.  


## Code Overview

The `depthai` Python module provides access to your board's 4K 60 Hz color camera. 
We'll display a video stream from this camera to your desktop. 
You can find the [complete source code for this tutorial on GitHub](https://github.com/luxonis/depthai-tutorials/tree/master/1-hello-world).

## File Setup

Setup the following file structure on your computer:

```
cd ~
mkdir -p {{site.tutorials_dir}}/1-hello-world
touch {{site.tutorials_dir}}/1-hello-world/hello-world.py
cd {{site.tutorials_dir}}/1-hello-world
```

What's with the `-practice` suffix in parent directory name? Our tutorials are available on GitHub 
via the [depthai-tutorials](https://github.com/luxonis/depthai-tutorials) repository. 
We're appending `-practice` so you can distinguish between your work and our finished 
tutorials (should you choose to download those).


## Install pip dependencies

To display the DepthAI color video stream we need to import a small number of packages. 
Download and install the requirements for this tutorial:

```
python3 -m pip install numpy opencv-python depthai --user
```


## Test your environment

Let's verify we're able to load all of our dependencies. Open the `hello-world.py` file you 
[created earlier](#file-setup) in your code editor. Copy and paste the following into `hello-world.py`:


```py
import numpy as np # numpy - manipulate the packet data returned by depthai
import cv2 # opencv - display the video stream
import depthai # access the camera and its data packets
```

Try running the script and ensure it executes without error:

```
python3 hello-world.py
```

If you see the following error:

```py
ModuleNotFoundError: No module named `depthai`
```

...follow [these steps in our troubleshooting section](/troubleshooting/#depthai_import_error).

## Initialize the DepthAI Device

Start the DepthAI device:

```py
device = depthai.Device('', False)
```

Try running the script. You should see output similar to:

```
No calibration file. Using Calibration Defaults.
XLink initialized.
Sending device firmware "cmd_file": /home/pi/Desktop/depthai/depthai.cmd
Successfully connected to device.
Loading config file
Attempting to open stream config_d2h
watchdog started 6000
Successfully opened stream config_d2h with ID #0!
```

If instead you see an error, please [reset your DepthAI device](/troubleshooting#device_reset), then try again.

## Create the DepthAI Pipeline

Now we'll create our data pipeline using the `previewout` stream. This stream contains the data from the color camera.
The model used in `ai` section is a MobileNetSSD with 20 different classes, see [here](https://github.com/luxonis/depthai/blob/master/resources/nn/mobilenet-ssd/mobilenet-ssd.json) for details

```py
# Create the pipeline using the 'previewout' stream, establishing the first connection to the device.
pipeline = device.create_pipeline(config={
    'streams': ['previewout', 'metaout'],
    'ai': {
        'blob_file': "/path/to/mobilenet-ssd.blob",
        'blob_file_config': "/path/to/mobilenet-ssd.json"
    }
})

if pipeline is None:
    raise RuntimeError('Pipeline creation failed!')
```

## Display the video stream

A DepthAI Pipeline generates a stream of data packets. Each `previewout` data packet contains a 
3D array representing an image frame. 
We change the shape of the frame into a `cv2`-compatible format and display it.

```py
detections = []

while True:
    # Retrieve data packets from the device.
    # A data packet contains the video frame data.
    nnet_packets, data_packets = pipeline.get_available_nnet_and_data_packets()

    for nnet_packet in nnet_packets:
        detections = list(nnet_packet.getDetectedObjects())

    for packet in data_packets:
        # By default, DepthAI adds other streams (notably 'meta_2dh'). Only process `previewout`.
        if packet.stream_name == 'previewout':
            data = packet.getData()
            # the format of previewout image is CHW (Channel, Height, Width), but OpenCV needs HWC, so we
            # change shape (3, 300, 300) -> (300, 300, 3)
            data0 = data[0,:,:]
            data1 = data[1,:,:]
            data2 = data[2,:,:]
            frame = cv2.merge([data0, data1, data2])

            img_h = frame.shape[0]
            img_w = frame.shape[1]

            for detection in detections:
                pt1 = int(detection.x_min * img_w), int(detection.y_min * img_h)
                pt2 = int(detection.x_max * img_w), int(detection.y_max * img_h)

            cv2.imshow('previewout', frame)

    if cv2.waitKey(1) == ord('q'):
        break

# The pipeline object should be deleted after exiting the loop. Otherwise device will continue working.
# This is required if you are going to add code after exiting the loop.
del pipeline
del device
```

Run the script. Press the 'Q' key with focus on the video stream (not your terminal) to exit:

```
python3 hello-world.py
```

You're on your way! You can find the [complete code for this tutorial on GitHub](https://github.com/luxonis/depthai-tutorials/blob/master/1-hello-world/hello_world.py).
