Hello World
===========

In this tutorial we will use the DepthAI Python API to display a color video
stream.

Setup
#####

Make sure the :ref:`DepthAI Python API is installed <Python API>` as
well as any :ref:`platform dependencies <Supported Platforms>`. With :code:`depthai`
and :code:`numpy` installed you will also need to install
`opencv-python <https://pypi.org/project/opencv-python/>`__.

.. note::

  See `depthai-tutorials/1-hello-world <https://github.com/luxonis/depthai-tutorials/tree/master/1-hello-world>`__ for the complete source code for this tutorial

.. note::

   `Gen 2 of the Python API <https://docs.luxonis.com/projects/api/en/gen2_develop/>`__
   is currently under development

Test your environment
*********************

We'll use :code:`numpy` to manipulate the packet data returned by DepthAI,
:code:`opencv` to display the video stream and :code:`depthai` to access the
camera and its data packets. To verify all of these dependencies are installed
correctly add the following to a Python source file and execute it.

.. code-block:: python

  import numpy
  import cv2
  import depthai

If the :code:`depthai` module is not found see :ref:`these steps in our
troubleshooting section <ImportError: No module named 'depthai'>`.

Initialize the DepthAI Device
#############################

Append the following to your Python source file:

.. code-block:: python

  device = depthai.Device('', False)

And when you run it again you should see output like the following:

.. code-block:: bash

  XLink initialized.
  Sending internal device firmware
  Successfully connected to device.
  Usb speed : Super/5000Mbps
  Mx serial id : 14442C10B1129ACD00
  Loading config file
  Attempting to open stream config_d2h
  watchdog started 
  Successfully opened stream config_d2h with ID #0!
  Closing stream config_d2h: ...
  Closing stream config_d2h: DONE.
  EEPROM data: valid (v5)
    ...
  Stopping threads: ...
  Stopping threads: DONE 0.000s.
  Closing all observer streams: ...
  Closing all observer streams: DONE.
  Reseting device: 0.
  Reseting: DONE.

If an error occurs please reset your device and try again.

Create the DepthAI Pipeline
###########################

Next we'll create a data pipeline using the :code:`previewout` stream. This
stream contains the data from the color camera.

Download `mobilenet-ssd.blob <https://raw.githubusercontent.com/luxonis/depthai-tutorials/master/1-hello-world/mobilenet-ssd/mobilenet-ssd.json>`__
and `mobilenet-ssd.json <https://github.com/luxonis/depthai-tutorials/raw/master/1-hello-world/mobilenet-ssd/mobilenet-ssd.blob>`__
from the `Hello World directory on Github <https://github.com/luxonis/depthai-tutorials/tree/master/1-hello-world/mobilenet-ssd>`__.
After downloading :code:`mobilenet-ssd.blob` rename it to
:code:`mobilenet-ssd.blob.sh14cmx14NCE1`. Note that the model identifies `20
different classes <https://github.com/luxonis/depthai/blob/master/resources/nn/mobilenet-ssd/mobilenet-ssd.json>`__.

Then append the following to your Python source file to create the pipeline
using the :code:`previewout` stream and establish the first connection to the
device.

.. code-block:: python

  pipeline = device.create_pipeline(config={
      'streams': ['previewout', 'metaout'],
      'ai': {
          'blob_file': "/absolute/path/to/mobilenet-ssd.blob.sh14cmx14NCE1",
          'blob_file_config': "/absolute/path/to/mobilenet-ssd.json"
      }
  })

  if pipeline is None:
      raise RuntimeError('Pipeline creation failed!')

Display the video stream
########################

A DepthAI Pipeline generates a stream of data packets. Each :code:`previewout`
data packet contains a 3D array representing an image frame.  The following
converts the frame into a :code:`cv2`-compatible format and displays it.

.. code-block:: python

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

                  cv2.rectangle(frame, pt1, pt2, (0, 0, 255), 2)

              cv2.imshow('previewout', frame)

      if cv2.waitKey(1) == ord('q'):
          break

  # The pipeline object should be deleted after exiting the loop. Otherwise device will continue working.
  # This is required if you are going to add code after exiting the loop.
  del pipeline
  del device

Run the script to view the stream! When you are done streaming press the :code:`q` key with focus on the video stream (not your terminal) to exit.

You're on your way!

.. include::  /pages/includes/footer-short.rst
