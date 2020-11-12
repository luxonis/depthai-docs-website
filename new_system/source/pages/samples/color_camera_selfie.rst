Color camera selfie maker
=========================

This sample requires `TK library <https://docs.oracle.com/cd/E88353_01/html/E37842/libtk-3.html>`_ to run (for opening file dialog)

It also requires face detection model, see :ref:`this tutorial <Local OpenVINO Model Conversion>` to see how to compile one

Demo
####

**Capturing process**

.. raw:: html

  <video muted autoplay controls>
      <source src="/_static/images/samples/face_rgb.mp4" type="video/mp4">
  </video>

**Captured image**

.. image:: _static/images/samples/face_rgb_selfie.png
  :alt: captured

Source code
###########

.. code-block:: python

  import cv2
  import depthai

  device = depthai.Device('', False)

  pipeline = device.create_pipeline(config={
      'streams': ['previewout', 'metaout'],
      'ai': {
          "blob_file": "/path/to/face-detection-retail-0004.blob",
          "blob_file_config": "/path/to/face-detection-retail-0004.json",
      }
  })

  if pipeline is None:
      raise RuntimeError('Pipeline creation failed!')

  detections = []
  face_frame = None

  while True:
      nnet_packets, data_packets = pipeline.get_available_nnet_and_data_packets()

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
                  left = int(detection.x_min * img_w)
                  top = int(detection.y_min * img_h)
                  right = int(detection.x_max * img_w)
                  bottom = int(detection.y_max * img_h)

                  face_frame = frame[top:bottom, left:right]
                  if face_frame.size == 0:
                      continue
                  cv2.imshow('face', face_frame)

      key = cv2.waitKey(1)
      if key == ord('q'):
          break
      if key == ord(' ') and face_frame is not None:
          from tkinter import Tk, messagebox
          from tkinter.filedialog import asksaveasfilename
          Tk().withdraw()
          filepath = asksaveasfilename(defaultextension=".png", filetypes=(("Image files", "*.png"),("All Files", "*.*")))
          cv2.imwrite(filepath, face_frame)
          messagebox.showinfo("Success", "Image saved successfully!")
          Tk().destroy()

  del pipeline
  del device

Explanation
###########

.. warning::

  **New to the DepthAI?**

  DepthAI basics are explained in :ref:`Minimal working code sample` and :ref:`Hello World` tutorial.

Our network returns bounding boxes of the faces it detects (we have them stored in :code:`detections` array).
So in this sample, we have to do two main things: **crop the frame** to contain only the face and **save it** to
the location specified by user.

Performing the crop
*******************

**Cropping the frame** requires us to modify the :ref:`Minimal working code sample`, so that
we don't produce two points for rectangle, but instead we need all four points:
two of them that determine start of the crop (:code:`top` starts Y-axis crop and :code:`left` starts X-axis crop),
and another two as the end of the crop (:code:`bottom` ends Y-axis crop and :code:`right` ends X-axis crop)

.. code-block:: python

  left = int(detection.x_min * img_w)
  top = int(detection.y_min * img_h)
  right = int(detection.x_max * img_w)
  bottom = int(detection.y_max * img_h)

Now, since our frame is in :code:`HWC` format (Height, Width, Channels), we first crop the Y-axis (being height) and then the X-axis (being width).
So the cropping code looks like this:

.. code-block:: python

  face_frame = frame[top:bottom, left:right]

Now, there's one additional thing to do. Since sometimes the network may produce such bounding box, what when cropped
will produce an empty frame, we have to secure ourselves from this scenario, as :code:`cv2.imshow` will throw
an error if invoked with empty frame.

.. code-block:: python

  if face_frame.size == 0:
      continue
  cv2.imshow('face', face_frame)

Storing the frame
*****************

**To save the image** we'll use just a single line of code, invoking :code:`cv2.imwrite`.
Rest of the code, utilizing :code:`tkinter` package, is optional and can be removed if you don't require
user interaction to save the frame.

In this sample, we use :code:`tkinter` for two dialog boxes:

- To obtain destination filepath (stored as :code:`filepath`) that allows us to invoke :code:`cv2.imwrite` as it requires path as it's first argument
- To confirm that the file was saved successfully

.. code-block:: python

  key = cv2.waitKey(1)
  if key == ord('q'):
      break
  if key == ord(' ') and face_frame is not None:
      from tkinter import Tk, messagebox
      from tkinter.filedialog import asksaveasfilename
      Tk().withdraw()  # do not open root TK window
      filepath = asksaveasfilename(defaultextension=".png", filetypes=(("Image files", "*.png"),("All Files", "*.*")))
      cv2.imwrite(filepath, face_frame)  # save the image to user-specified path
      messagebox.showinfo("Success", "Image saved successfully!")  # show confirmation dialog
      Tk().destroy()  # destroy confirmation dialog

Do you have any questions/suggestions? Feel free to :ref:`get in touch and let us know! <Support>`
