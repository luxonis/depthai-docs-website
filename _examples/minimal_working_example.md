---
layout: default
title: Sample - Bare minimum code to access DepthAI camera
toc_title: Minimum working DepthAI code
description: Stream Video from your DepthAI onto your monitor display with less than 60 LoC
order: 1
---

# {{ page.title }}

## Source code

```python
import consts.resource_paths
import cv2
import depthai

if not depthai.init_device(consts.resource_paths.device_cmd_fpath):
    raise RuntimeError("Error initializing device. Try to reset it.")

p = depthai.create_pipeline(config={
    "streams": ["metaout", "previewout"],
    "ai": {
        "blob_file": consts.resource_paths.blob_fpath,
        "blob_file_config": consts.resource_paths.blob_config_fpath
    }
})

if p is None:
    raise RuntimeError("Error initializing pipelne")

entries_prev = []

while True:
    nnet_packets, data_packets = p.get_available_nnet_and_data_packets()

    for nnet_packet in nnet_packets:
        entries_prev = []
        for e in nnet_packet.entries():
            if e[0]['id'] == -1.0 or e[0]['confidence'] == 0.0:
                break
            if e[0]['confidence'] > 0.5:
                entries_prev.append(e[0])

    for packet in data_packets:
        if packet.stream_name == 'previewout':
            data = packet.getData()
            data0 = data[0, :, :]
            data1 = data[1, :, :]
            data2 = data[2, :, :]
            frame = cv2.merge([data0, data1, data2])

            img_h = frame.shape[0]
            img_w = frame.shape[1]

            for e in entries_prev:
                pt1 = int(e['left'] * img_w), int(e['top'] * img_h)
                pt2 = int(e['right'] * img_w), int(e['bottom'] * img_h)

                cv2.rectangle(frame, pt1, pt2, (0, 0, 255), 2)

            cv2.imshow('previewout', frame)

    if cv2.waitKey(1) == ord('q'):
        break

del p
depthai.deinit_device()
```

## Explanation

The code is divided into three phases: __initialization__, __processing results__ and __deinitialization__.

__Initialization__ is done here, as it's initializing the device and making sure that the pipeline is created

```python
if not depthai.init_device(consts.resource_paths.device_cmd_fpath):
    raise RuntimeError("Error initializing device. Try to reset it.")

p = depthai.create_pipeline(config={
    "streams": ["metaout", "previewout"],
    "ai": {
        "blob_file": "/path/to/model.blob",
        "blob_file_config": "/path/to/config.json"
    }
})

if p is None:
    raise RuntimeError("Error initializing pipelne")
```

__Deinitialization__ is basically only two lines of code, and whereas it's not necessary to include it, it's definetely recommended

```python
del p
depthai.deinit_device()
```

Now, the results processing consists of two phases - parsing nnet results and displaying the frames.

### Parsing neural network results
Below, you'll se the part that's parsing the results from neural network

```python
entries_prev = []

while True:
    nnet_packets, data_packets = p.get_available_nnet_and_data_packets()

    for nnet_packet in nnet_packets:
        entries_prev = []
        for e in nnet_packet.entries():
            if e[0]['id'] == -1.0 or e[0]['confidence'] == 0.0:
                break
            if e[0]['confidence'] > 0.5:
                entries_prev.append(e[0])
```

Here, we're using a little trick. Notice, that `entries_prev` is populated with only the correct entries,
and is reset (set to `[]`) only when we receive a new nnet packet, because it's a first instruction in the for loop of `nnet_packets`.

This way, if there are no new results from neural network, we keep the old ones and therefore the bounding boxes don't flick.

Also, having this approach, we're sure that only one output of the neural network is displayed (if `nnet_packets` would contain two of them).

Conditions `e[0]['id'] == -1.0 or e[0]['confidence'] == 0.0` eleminate the background noise that can be produced

Condition `e[0]['confidence'] > 0.5` is our confidence threshold. You can modify `0.5` according to your needs and use case.

The result of this processing step is populated (or empty) array `entries_prev`

### Displaying the frames

```python
for packet in data_packets:
    if packet.stream_name == 'previewout':
        data = packet.getData()
        data0 = data[0, :, :]
        data1 = data[1, :, :]
        data2 = data[2, :, :]
        frame = cv2.merge([data0, data1, data2])

        img_h = frame.shape[0]
        img_w = frame.shape[1]

        for e in entries_prev:
            pt1 = int(e['left'] * img_w), int(e['top'] * img_h)
            pt2 = int(e['right'] * img_w), int(e['bottom'] * img_h)

            cv2.rectangle(frame, pt1, pt2, (0, 0, 255), 2)

        cv2.imshow('previewout', frame)

if cv2.waitKey(1) == ord('q'):
    break
```

This stage is also divided into three phases - preparing the frame, augumenting the frame and adding control signals

__Preparing the frame__ basically means that we're transforming the frame to OpenCV-usable form.

First, we need to assure we're operating on packet from `previewout` stream, so it's a frame from 4K color camera.

Next, we get the data from the packet and transform it from `CHW` (Channel, Height, Width) form used by DepthAI to `HWC` (Height, Width, Channel) that is used by OpenCV.

```python
for packet in data_packets:
    if packet.stream_name == 'previewout':
        data = packet.getData()  # e.x. shape (3, 300, 300)
        data0 = data[0, :, :]
        data1 = data[1, :, :]
        data2 = data[2, :, :]
        frame = cv2.merge([data0, data1, data2])  # e.x. shape (300, 300, 3)
```

__Augumenting the frame__ means any process that changes what is being displayed. In this example,
I'm adding red rectangles around detected items. You can also add here text displays, latency info - basically whatever your 
business logic requires.

Since the position of the bounding boxes are returned from neural network as floats in range `(0, 1)`,
which specify position of the point relative to it's width/height, we need to transform it into the actual point 
on the image (which you can see as we're doing e.x. `int(e['left'] * img_w)`).

Next, using `cv2.rectangle`, we're printing the actual rectangle on the `frame`.
Finally, when the frame is ready, we display it using `cv2.imshow` function.

```python
img_h = frame.shape[0]
img_w = frame.shape[1]

for e in entries_prev:
    pt1 = int(e['left'] * img_w), int(e['top'] * img_h)
    pt2 = int(e['right'] * img_w), int(e['bottom'] * img_h)

    cv2.rectangle(frame, pt1, pt2, (0, 0, 255), 2)

cv2.imshow('previewout', frame)
```

__Adding control signals__ is the last part, where you can add interactivity to the displayed image.
We're adding just one command - to terminate the program - when you press the `q` button. 

```python
if cv2.waitKey(1) == ord('q'):
    break
```

---

Do you have any questions/suggestions? Feel free to [get in touch and let us know!](/support)