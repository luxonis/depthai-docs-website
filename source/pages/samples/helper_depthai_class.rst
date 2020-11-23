Helper - DepthAI as a class
===========================

If you want to integrate the DepthAI into your project, this example might be useful for you as it
splits the "**how** to get the results", from "**what** to do with them".

This example splits the pipeline initialization from the actual usage.

It's useful if you want to make more subclasses of it (e.x. *MonoDepthAI* that will contain config for mono cameras)
or run the DepthAI code in a subprocess (e.x. :code:`Process(target=DepthAI().run).start()`)

Code
####

.. code-block:: python

  from pathlib import Path

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

          self.detections = []

      def run(self):
          while True:
              nnet_packets, data_packets = self.p.get_available_nnet_and_data_packets()

              for nnet_packet in nnet_packets:
                  self.detections = list(nnet_packet.getDetectedObjects())

              for packet in data_packets:
                  if packet.stream_name == 'previewout':
                      data = packet.getData()
                      if data is None:
                          continue
                      data0 = data[0, :, :]
                      data1 = data[1, :, :]
                      data2 = data[2, :, :]
                      frame = cv2.merge([data0, data1, data2])

                      img_h = frame.shape[0]
                      img_w = frame.shape[1]

                      for detection in self.detections:
                          pt1 = int(detection.x_min * img_w), int(detection.y_min * img_h)
                          pt2 = int(detection.x_max * img_w), int(detection.y_max * img_h)

                          cv2.rectangle(frame, pt1, pt2, (0, 0, 255), 2)

                      cv2.imshow('previewout', frame)

              if cv2.waitKey(1) == ord('q'):
                  break

          del self.p
          del self.device


  DepthAI().run()


.. include::  /pages/includes/footer-short.rst
