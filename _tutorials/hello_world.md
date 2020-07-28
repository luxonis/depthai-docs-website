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
* The Python DepthAI API. [Install](/api#install) or [upgrade](/api#upgrade).
* The `cv2` Python module and numpy.  

This tutorial also uses a couple of `pip` packages. We'll [install these](#install-pip-dependencies) in just a bit.

## Code Overview

The `depthai` Python module provides access to your board's 4K 60 Hz color camera. We'll display a video stream from this camera to your desktop. You can find the [complete source code for this tutorial on GitHub](https://github.com/luxonis/depthai-tutorials/tree/master/1-hello-world).

## File Setup

Setup the following file structure on your computer:

```
cd ~
mkdir -p {{site.tutorials_dir}}/1-hello-world
touch {{site.tutorials_dir}}/1-hello-world/hello-world.py
cd {{site.tutorials_dir}}/1-hello-world
```

What's with the `-practice` suffix in parent directory name? Our tutorials are available on GitHub via the [depthai-tutorials](https://github.com/luxonis/depthai-tutorials) repository. We're appending `-practice` so you can distinguish between your work and our finished tutorials (should you choose to download those).


## Install pip dependencies

To display the DepthAI color video stream we need to import a small number of packages. Download and install the requirements for this tutorial:

```
python3 -m pip install numpy opencv-python --user
```

## Install DepthAI package

While direct install from PyPi is likely to come shortly, for now it's best to install depthai from source.

To do so, type in the following commands
```
git clone https://github.com/luxonis/depthai.git
cd depthai
python3 -m pip install -r requirements.txt
python3 -m pip install --user -e .
```

## Test your environment

Let's verify we're able to load all of our dependencies. Open the `hello-world.py` file you [created earlier](#file-setup) in your code editor. Copy and paste the following into `hello-world.py`:


```py
import numpy as np # numpy - manipulate the packet data returned by depthai
import cv2 # opencv - display the video stream
import depthai # access the camera and its data packets
import consts.resource_paths # load paths to depthai resources
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
if not depthai.init_device(consts.resource_paths.device_cmd_fpath):
    raise RuntimeError("Error initializing device. Try to reset it.")
```

If the device doesn't initialize, we'll exit the script here rather than throw a mysterious error later.

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

If instead you see an error that looks like the following:

```
Traceback (most recent call last):
  File "/home/pi/{{site.tutorials_dir}}/1-hello-world/hello-world.py", line 7, in <module>
    raise RuntimeError("Error initializing device. Try to reset it.")
RuntimeError: Error initializing device. Try to reset it.
```

[Reset your DepthAI device](/troubleshooting#device_reset), then try again.

## Create the DepthAI Pipeline

Now we'll create our data pipeline using the `previewout` stream. This stream contains the data from the color camera.
The model used in `ai` section is a MobileNetSSD with 20 different classes, see [here](https://github.com/luxonis/depthai/blob/master/resources/nn/mobilenet-ssd/mobilenet-ssd.json) for details

```py
# Create the pipeline using the 'previewout' stream, establishing the first connection to the device.
pipeline = depthai.create_pipeline(config={
    'streams': ['previewout', 'metaout'],
    'ai': {
        'blob_file': consts.resource_paths.blob_fpath,
        'blob_file_config': consts.resource_paths.blob_config_fpath
    }
})

if pipeline is None:
    raise RuntimeError('Pipeline creation failed!')
```

## Display the video stream

A DepthAI Pipeline generates a stream of data packets. Each `previewout` data packet contains a 3D array representing an image frame. We change the shape of the frame into a `cv2`-compatible format and display it.

```py
entries_prev = []

while True:
    # Retrieve data packets from the device.
    # A data packet contains the video frame data.
    nnet_packets, data_packets = pipeline.get_available_nnet_and_data_packets()

    for _, nnet_packet in enumerate(nnet_packets):
        entries_prev = []
        for _, e in enumerate(nnet_packet.entries()):
            if e[0]['id'] == -1.0 or e[0]['confidence'] == 0.0:
                break
            if e[0]['confidence'] > 0.5:
                entries_prev.append(e[0])

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

            for e in entries_prev:
                pt1 = int(e['left'] * img_w), int(e['top'] * img_h)
                pt2 = int(e['right'] * img_w), int(e['bottom'] * img_h)

            cv2.imshow('previewout', frame)

    if cv2.waitKey(1) == ord('q'):
        break

# The pipeline object should be deleted after exiting the loop. Otherwise device will continue working.
# This is required if you are going to add code after exiting the loop.
del pipeline
```

Run the script. Press the 'Q' key with focus on the video stream (not your terminal) to exit:

```
python3 hello-world.py
```

You're on your way! You can find the [complete code for this tutorial on GitHub](https://github.com/luxonis/depthai-tutorials/blob/master/1-hello-world/hello_world.py).
