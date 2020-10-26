---
layout: default
title: Sample - Bare minimum code to access DepthAI camera
toc_title: Minimum working DepthAI code
description: Stream Video from your DepthAI onto your monitor display with less than 60 LoC
order: 1
---

# {{ page.title }}

## Demo

<video muted autoplay controls>
    <source src="/images/samples/minimal.mp4" type="video/mp4">
</video>

## Source code

```python
import cv2
import depthai

device = depthai.Device('', False)

p = device.create_pipeline(config={
    "streams": ["metaout", "previewout"],
    "ai": {
        "blob_file": "/path/to/depthai/resources/nn/mobilenet-ssd/mobilenet-ssd.blob",
        "blob_file_config": "/path/to/depthai/resources/nn/mobilenet-ssd/mobilenet-ssd.json"
    }
})

if p is None:
    raise RuntimeError("Error initializing pipelne")

detections = []

while True:
    nnet_packets, data_packets = p.get_available_nnet_and_data_packets()

    for nnet_packet in nnet_packets:
        detections = list(nnet_packet.getDetectedObjects())

    for packet in data_packets:
        if packet.stream_name == 'previewout':
            data = packet.getData()
            data0 = data[0, :, :]
            data1 = data[1, :, :]
            data2 = data[2, :, :]
            frame = cv2.merge([data0, data1, data2])

            img_h = frame.shape[0]
            img_w = frame.shape[1]

            for detection in detections:
                pt1 = int(detection.x_min * img_w), int(detection.y_min * img_h)
                pt2 = int(detection.x_max * img_w), int(detection.y_max * img_h)

                cv2.rectangle(frame, pt1, pt2, (0, 0, 255), 2)

            cv2.imshow('previewout', frame)

    if cv2.waitKey(1) == ord('q'):
        break

del p
del device
```

## Explanation

The code is divided into three phases: __initialization__, __processing results__ and __deinitialization__.

__Initialization__ is done here, as it's initializing the device and making sure that the pipeline is created

```python
device = depthai.Device('', False)

p = device.create_pipeline(config={
    "streams": ["metaout", "previewout"],
    "ai": {
        "blob_file": "/path/to/depthai/resources/nn/mobilenet-ssd/mobilenet-ssd.blob",
        "blob_file_config": "/path/to/depthai/resources/nn/mobilenet-ssd/mobilenet-ssd.json"
    }
})

if p is None:
    raise RuntimeError("Error initializing pipelne")
```

__Deinitialization__ is basically only two lines of code, and whereas it's not necessary to include it, it's definitely recommended

```python
del p
del device
```

Now, the results processing consists of two phases - parsing nnet results and displaying the frames.

### Parsing neural network results
Below, you'll se the part that's parsing the results from neural network

```python
detections = []

while True:
    nnet_packets, data_packets = p.get_available_nnet_and_data_packets()

    for nnet_packet in nnet_packets:
        detections = list(nnet_packet.getDetectedObjects())
```

Neural network configuration we specified earlier, in `blob_file_config` field, allows DepthAI to prepare
results in a correct format and remove incorrect entries (e.g. those with confidence below threshold).

Each object in this array is a [Detection](/api/#Detection) instance, which we can easily use later in the code

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

        for detection in detections:
            pt1 = int(detection.x_min * img_w), int(detection.y_min * img_h)
            pt2 = int(detection.x_max * img_w), int(detection.y_max * img_h)

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
on the image (which you can see as we're doing e.x. `int(detection.x_min * img_w)`).

Next, using `cv2.rectangle`, we're printing the actual rectangle on the `frame`.
Finally, when the frame is ready, we display it using `cv2.imshow` function.

```python
img_h = frame.shape[0]
img_w = frame.shape[1]

for detection in detections:
    pt1 = int(detection.x_min * img_w), int(detection.y_min * img_h)
    pt2 = int(detection.x_max * img_w), int(detection.y_max * img_h)

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