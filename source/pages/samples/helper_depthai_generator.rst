Helper - DepthAI as a generator
===============================

If you want to integrate the DepthAI into your project, this example might be useful for you as it
splits the "**how** to get the results", from "**what** to do with them".

This example uses :code:`yield` keyword to send the results to for loop, which called the method.

It's useful if you want to process the received frames further in your custom code

Code
####

.. code-block:: python

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
                      data0 = data[0, :, :]
                      data1 = data[1, :, :]
                      data2 = data[2, :, :]
                      frame = cv2.merge([data0, data1, data2])

                      img_h = frame.shape[0]
                      img_w = frame.shape[1]

                      results = []
                      for detection in self.detections:
                          pt1 = int(detection.x_min * img_w), int(detection.y_min * img_h)
                          pt2 = int(detection.x_max * img_w), int(detection.y_max * img_h)
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

.. include::  /pages/includes/footer-short.rst
