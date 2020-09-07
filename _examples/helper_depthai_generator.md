---
layout: default
title: Using DepthAI with generators
toc_title: Helper - DepthAI as a generator
description: Example usage of the DepthAI code as a generator
order: 6
---

# {{ page.title }}

If you want to integrate the DepthAI into your project, this example might be useful for you as it
splits the "__how__ to get the results", from "__what__ to do with them".

This example uses `yield` keyword to send the results to for loop, which called the method.

It's useful if you want to process the received frames further in your custom code

## Code

```python
import cv2
import depthai


class DepthAI:
    def __init__(self):
        self.device = depthai.Device('', False)
        
        self.p = self.device.create_pipeline(config={
            "streams": ["metaout", "previewout"],
            "ai": {
                "blob_file": "/path/to/model.blob",
                "blob_file_config": "/path/to/config.json"
            }
        })

        self.entries_prev = []

    def run(self):
        while True:
            nnet_packets, data_packets = self.p.get_available_nnet_and_data_packets()

            for _, nnet_packet in enumerate(nnet_packets):
                self.entries_prev = []
                for _, e in enumerate(nnet_packet.entries()):
                    if e[0]['image_id'] == -1.0 or e[0]['conf'] == 0.0:
                        break
                    if e[0]['conf'] > 0.5:
                        self.entries_prev.append(e[0])

            for packet in data_packets:
                if packet.stream_name == 'previewout':
                    data = packet.getData()
                    data0 = data[0, :, :]
                    data1 = data[1, :, :]
                    data2 = data[2, :, :]
                    frame = cv2.merge([data0, data1, data2])

                    img_h = frame.shape[0]
                    img_w = frame.shape[1]

                    results = []
                    for e in self.entries_prev:
                        pt1 = int(e['x_min'] * img_w), int(e['y_min'] * img_h)
                        pt2 = int(e['x_max'] * img_w), int(e['y_max'] * img_h)
                        results.append((pt1, pt2))
                    yield frame, results

    def __del__(self):
        del self.p
        del self.device


d = DepthAI()

for frame, results in d.run():
    for pt1, pt2 in results:
        cv2.rectangle(frame, pt1, pt2, (0, 0, 255), 2)
    cv2.imshow('previewout', frame)

    if cv2.waitKey(1) == ord('q'):
        break


del d
```