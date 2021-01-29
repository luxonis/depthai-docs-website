.. _mono_camera:

DepthAI Mono Camera
###################

.. image:: /_static/images/products/mono-cameras.jpg
  :alt: Mono Cameras

For applications where Depth + AI are needed, we have modular, high-frame-rate, excellent-depth-quality cameras which can be separated to a baseline of up to 30 cm).

Specifications
**************

- 720p, 120 Hz Video
- Synchronized Global Shutter
- Excellent Low-light
- Same dimensions, mounting holes, and camera center as Raspberry Pi Camera v2.1
- 1280 x 720 pixels
- 83 DFOV°
- Lens Size: 1/2.3 inch
- Fixed Focus: 19.6 cm - ∞
- F-number: 2.2

Verify installation
*******************

We'll execute a DepthAI example Python script to ensure your setup is configured correctly. Follow these steps to test DepthAI:

#. Start a terminal session.
#. Access your local copy of `depthai <https://github.com/luxonis/depthai>`__.

  .. code-block:: bash

    cd [depthai repo]

#. Run demo script.

  .. code-block:: bash

    python3 depthai_demo.py

  The script launches a window, starts the cameras, and displays a video stream
  annotated with object localization metadata:

  .. image:: /_static/images/products/bw1097-detection.png
    :alt: Depth projection

  In the screenshot above, DepthAI identified a TV monitor (1.286 m from the camera) and a chair (3.711 m from the camera).

  See `the list of object labels <https://docs.luxonis.com/tutorials/openvino_model_zoo_pretrained_model/#run-depthai-default-model>`__ in our pre-trained OpenVINO model tutorial.

.. include::  /pages/includes/footer-short.rst
