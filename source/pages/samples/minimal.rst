Minimal working code sample
===========================

Demo
####

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="//www.youtube.com/embed/puI57TaFCUM" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

Source code
###########

.. code-block:: python

  import cv2
  import depthai

  device = depthai.Device('', False)

  p = device.create_pipeline(config={
      "streams": ["metaout", "previewout"],
      "ai": {
          "blob_file": "/path/to/depthai/resources/nn/mobilenet-ssd/mobilenet-ssd.blob.sh14cmx14NCE1",
          "blob_file_config": "/path/to/depthai/resources/nn/mobilenet-ssd/mobilenet-ssd.json",
          'shaves' : 14,
          'cmx_slices' : 14,
          'NN_engines' : 1,
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

Explanation
###########

The code is divided into three phases: **initialization**, **processing results** and **deinitialization**.

**Initialization** is done here, as it's initializing the device and making sure that the pipeline is created. Please
note that :code:`sh14cmx14NCE1` in a blob file definition means that this blob was compiled to use 14 Myriad X SHAVEs, 14 Myriad X CMXes and 1 Myriad X Neural Compute Engine.
These parameters need to be provided in :code:`ai` configuration, using fields :code:`shaves`, :code:`cmx_slices` and :code:`NN_engines` respectively

.. code-block:: python

  device = depthai.Device('', False)

  p = device.create_pipeline(config={
      "streams": ["metaout", "previewout"],
      "ai": {
          "blob_file": "/path/to/depthai/resources/nn/mobilenet-ssd/mobilenet-ssd.blob.sh14cmx14NCE1",
          "blob_file_config": "/path/to/depthai/resources/nn/mobilenet-ssd/mobilenet-ssd.json",
          'shaves' : 14,
          'cmx_slices' : 14,
          'NN_engines' : 1,
      }
  })

  if p is None:
      raise RuntimeError("Error initializing pipelne")

**Deinitialization** is basically only two lines of code, and whereas it's not necessary to include it, it's definitely recommended

.. code-block:: python

  del p
  del device

Now, the results processing consists of two phases - parsing :code:`nnet` results and displaying the frames.

Parsing neural network results
******************************

Below, you'll see the part that's parsing the results from neural network

.. code-block:: python

  detections = []

  while True:
      nnet_packets, data_packets = p.get_available_nnet_and_data_packets()

      for nnet_packet in nnet_packets:
          detections = list(nnet_packet.getDetectedObjects())

Neural network configuration we specified earlier, in :code:`blob_file_config` field, allows DepthAI to prepare
results in a correct format and remove incorrect entries (e.g. those with confidence below threshold).

Each object in this array is a :class:`Detection` instance, which we can easily use later in the code

Displaying the frames
*********************

.. code-block:: python

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

This stage is also divided into three phases - preparing the frame, augmenting the frame and adding control signals

**Preparing the frame** basically means that we're transforming the frame to OpenCV-usable form.

First, we need to assure we're operating on packet from :code:`previewout` stream, so it's a frame from 4K color camera.

Next, we get the data from the packet and transform it from :code:`CHW` (Channel, Height, Width) form used by DepthAI to
:code:`HWC` (Height, Width, Channel) that is used by OpenCV.

.. code-block:: python

  for packet in data_packets:
      if packet.stream_name == 'previewout':
          data = packet.getData()  # e.x. shape (3, 300, 300)
          data0 = data[0, :, :]
          data1 = data[1, :, :]
          data2 = data[2, :, :]
          frame = cv2.merge([data0, data1, data2])  # e.x. shape (300, 300, 3)

**Augumenting the frame** means any process that changes what is being displayed. In this example,
I'm adding red rectangles around detected items. You can also add here text displays, latency info - basically whatever your
business logic requires.

Since the position of the bounding boxes are returned from neural network as floats in range :code:`(0, 1)`,
which specify position of the point relative to it's width/height, we need to transform it into the actual point
on the image (which you can see as we're doing e.x. :code:`int(detection.x_min * img_w)`).

Next, using :code:`cv2.rectangle`, we're printing the actual rectangle on the :code:`frame`.
Finally, when the frame is ready, we display it using :code:`cv2.imshow` function.

.. code-block:: python

  img_h = frame.shape[0]
  img_w = frame.shape[1]

  for detection in detections:
      pt1 = int(detection.x_min * img_w), int(detection.y_min * img_h)
      pt2 = int(detection.x_max * img_w), int(detection.y_max * img_h)

      cv2.rectangle(frame, pt1, pt2, (0, 0, 255), 2)

  cv2.imshow('previewout', frame)

**Adding control signals** is the last part, where you can add interactivity to the displayed image.
We're adding just one command - to terminate the program - when you press the :code:`q` button.

.. code-block:: python

  if cv2.waitKey(1) == ord('q'):
      break


.. include::  /pages/includes/footer-short.rst
