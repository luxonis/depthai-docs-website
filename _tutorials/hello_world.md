---
layout: default
title: DepthAI Tutorial - Hello World
toc_title: Hello World
description: Stream Video from your DepthAI onto your monitor display.
order: 3
---

# {{ page.title }}

Learn how to use the DepthAI Python API to display a color video stream.

## Getting Started

Before we begin, [download](/api#install) and [upgrade](/api#upgrade) the `depthai-python-extras` GitHub repository. The DepthAI API requires Python 3.

## Code Overview

The `depthai` Python module provides access to your board's 4K 60 Hz color camera. We'll display a video stream from this camera to your desktop. You can find the [complete source code for this tutorial on GitHub]().

## File Setup

Setup the following file structure on your computer:

```
mkdir depthai-tutorials
touch depthai-tutorials/1-hello-world.py
cd depthai-tutorials
```

Open `1-hello-world.py` in your code editor.

## Install and import dependencies

To display the DepthAI color video stream we need to import a small number of packages. Run `pip3 install numpy` to install the `numpy` package.

```py
import numpy as np # numpy - manipulate the packet data returned by depthai
import cv2 # opencv - display the video stream
import depthai # access the camera and its data packets
import consts.resource_paths # load paths to depthai resources
```

Try running the script and ensure it executes without error:

```
python3 1-hello-world.py
```

If you see the following error:

```py
ModuleNotFoundError: No module named `depthai`
```

...it's likely that the `depthai-extras` module wasn't installed in editable mode. To install:

```
cd [INSERT depthai-python-extras-repo]
pip3 install -e .
```

## Initialize the DepthAI Device

Start the DepthAI device:

```py
if not depthai.init_device(consts.resource_paths.device_cmd_fpath):
    print("Error initializing device. Try to reset it.")
    exit(1)
```

If the device doesn't initialize, we'll exit the script here rather than throw a mysterious error later.

Try running the script. You should see output similar to:

```
Using Custom Calibration File: depthai.calib
depthai: before xlink init;
Device Found name 1.2-ma2480
about to boot device with "cmd_file": /home/pi/Desktop/depthai-python-extras/depthai.cmd
Device was booted with "cmd_file"
XLink initialized.
Successfully initialized Xlink!
I: [         0] [Scheduler00Thr] eventReader:203	eventReader thread started
I: [         0] [Scheduler00Thr] eventSchedulerRun:573	Scheduler thread started
Successfully connected to Device!
...
Reseting device: 0.
```

If instead you see an error that looks like the following:

```
depthai: Error initializing link;
Error initializing device. Try to reset it.
```

[Reset your DepthAI device](/troubleshooting#device_reset), then try again.

## Create the DepthAI Pipeline

Now we'll create our data pipeline using the `previewout` stream. This stream contains the data from the color camera.

```py
# Create the pipeline using the 'previewout' stream, establishing the first connection to the device.
p = depthai.create_pipeline(config={
    'streams': ['previewout'],
    'ai': {'blob_file': consts.resource_paths.blob_fpath}
})

if p is None:
    print('Error creating pipeline.')
    exit(2)
```

## Display the video stream

A DepthAI Pipeline generates a stream of data packets. Each `previewout` data packet contains a 3D array representing an image frame. We change the shape of the frame into a `cv2`-compatible format and display it.

```py
while True:
    # Retrieve data packets from the device.
    # A data packet contains the video frame data.
    data_packets = p.get_available_data_packets()

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

            cv2.imshow('previewout', frame)

    if cv2.waitKey(1) == ord('q'):
        break

# The pipeline object should be deleted after exiting the loop. Otherwise device will continue working.
# This is required if you are going to add code after exiting the loop.
del p
```

Run the script. Press the 'Q' key with focus on the video stream (not your terminal) to exit:

```
python3 1-hello-world.py
```

You're on your way! You can find the [complete code for this tutorial on GitHub]().
