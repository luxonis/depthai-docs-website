---
layout: default
title: Sample - Object tracking example usage on DepthAI
toc_title: Object tracking
description: Demo on how to utilize object_tracker stream 
order: 4
---
# {{ page.title }}

## Demo

<video muted autoplay controls>
    <source src="/images/samples/tracking.mp4" type="video/mp4">
</video>

## Source code

```python
import cv2
import depthai

device = depthai.Device('', False)

p = device.create_pipeline(config={
    "streams": ["previewout", "object_tracker"],
    "ai": {
        "blob_file": "/path/to/depthai/resources/nn/mobilenet-ssd/mobilenet-ssd.blob",
        "blob_file_config": "/path/to/depthai/resources/nn/mobilenet-ssd/mobilenet-ssd.json"
    },
    'ot': {
        'max_tracklets': 20,
        'confidence_threshold': 0.5,
    },
})

if p is None:
    raise RuntimeError("Error initializing pipelne")

entries_prev = []
labels = ["background", "aeroplane", "bicycle", "bird", "boat", "bottle", "bus", "car", "cat", "chair", "cow", "diningtable", "dog", "horse", "motorbike", "person", "pottedplant", "sheep", "sofa", "train", "tvmonitor"]
tracklets = None

while True:
    for packet in p.get_available_data_packets():
        if packet.stream_name == 'object_tracker':
            tracklets = packet.getObjectTracker()
        elif packet.stream_name == 'previewout':
            data = packet.getData()
            data0 = data[0, :, :]
            data1 = data[1, :, :]
            data2 = data[2, :, :]
            frame = cv2.merge([data0, data1, data2])

            traklets_nr = tracklets.getNrTracklets() if tracklets is not None else 0

            for i in range(traklets_nr):
                tracklet = tracklets.getTracklet(i)
                left = tracklet.getLeftCoord()
                top = tracklet.getTopCoord()
                right = tracklet.getRightCoord()
                bottom = tracklet.getBottomCoord()
                tracklet_label = labels[tracklet.getLabel()]

                cv2.rectangle(frame, (left, top), (right, bottom), (255, 0, 0))

                middle_pt = (int(left + (right - left) / 2), int(top + (bottom - top) / 2))
                cv2.circle(frame, middle_pt, 0, (255, 0, 0), -1)
                cv2.putText(frame, f"ID {tracklet.getId()}", middle_pt, cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

                cv2.putText(frame, tracklet_label, (left, bottom - 40), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)
                cv2.putText(frame, tracklet.getStatus(), (left, bottom - 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

            cv2.imshow('previewout', frame)

    if cv2.waitKey(1) == ord('q'):
        break

del p
del device
```

## Explanation
<div class="alert alert-primary" role="alert">
<i class="material-icons info">
contact_support
</i>
  <strong>New to the DepthAI?</strong><br/>
  <span class="small">DepthAI basics are explained in [minimal working code sample](/examples/minimal_working_example/#explanation) and [hello world tutorial](/tutorials/hello_world/).</span>
</div>

DepthAI is capable of doing object tracking from the device itself, so you don't have to write your own
custom code for it.

First, we change the method for retrieving the data packets from the pipeline, as we're not using `metaout` stream

```python
    for packet in p.get_available_data_packets():
```

Next up, if the packet is from stream `object_tracker` we use a special method available only in packets
from this stream to obtain tracklets object - this method will throw an error if used on another stream

```python
        if packet.stream_name == 'object_tracker':
            tracklets = packet.getObjectTracker()
``` 

Next up, we're obtaining all tracklet info for further processing

```python
                tracklet = tracklets.getTracklet(i)
                left = tracklet.getLeftCoord()
                top = tracklet.getTopCoord()
                right = tracklet.getRightCoord()
                bottom = tracklet.getBottomCoord()
                tracklet_label = labels[tracklet.getLabel()]
```

And rest of the processing is only for visual representation of the tracking objects, which you can skip if you 
want to use object tracker in different way

---

Do you have any questions/suggestions? Feel free to [get in touch and let us know!](/support)
