OAK as a webcam
===============

OAK devices can be used as webcams as well. Make sure to use **USB3 cable**, as we have noticed that in some
cases, **USB2 won't work**.

Using UVC
#########

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/UtdfQVPzBCc" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

.. code-block:: bash

    # Skip cloning if you already have depthai-python repo
    git clone https://github.com/luxonis/depthai-python.git
    cd depthai-python
    python3 examples/install_requirements.py
    python3 examples/UVC/uvc_rgb.py

Now you can open up your favorite meeting app, like Zoom or Slack, and select **Luxonis Device: UVC Video Contr** in the webcam selection menu.

Webcam workarounds
##################

There are currently a few issues with the approach above. Even on Linux, **UVC node currently doesn't work for all apps**.
Since UVC stands for :code:`USB Video Class`, using UVC pipeline on **OAK POE models won't work**. Another known issue is
using UVC pipeline on **Windows**, as it **doesn't work** due to UVC descriptors. Here are workarounds:

**1. Python virtual camera**

One option is to use virtual camera, such as the `pyvirtualcam <https://pypi.org/project/pyvirtualcam/>`__ module.
You would need to pip install the package and install it's dependencies (as mentioned in the link). Here's
a demo code:

.. code-block:: python

    import pyvirtualcam
    import depthai as dai
    # Create pipeline
    pipeline = dai.Pipeline()
    cam = pipeline.create(dai.node.ColorCamera)
    cam.setColorOrder(dai.ColorCameraProperties.ColorOrder.RGB)
    cam.setPreviewSize(1280,720)
    xout = pipeline.create(dai.node.XLinkOut)
    xout.setStreamName("rgb")
    cam.preview.link(xout.input)
    # Connect to device and start pipeline
    with dai.Device(pipeline) as device, pyvirtualcam.Camera(width=1280, height=720, fps=20) as uvc:
        qRgb = device.getOutputQueue(name="rgb", maxSize=4, blocking=False)
        print("UVC running")
        while True:
            frame = qRgb.get().getFrame()
            uvc.send(frame)

**2. OBS forwarding UVC stream**

We have noticed that on some apps, like Discord or Google Meet, **Luxonis Device: UVC** won't work. One workaround is to use `OBS <https://obsproject.com/>`__
to proxy the stream and use the virtual camera inside the OBS. I am running Linux so I had to install :code:`sudo apt install v4l2loopback-dkms`
for the virtual camera to work (this is also mentioned in `install instructions <https://obsproject.com/wiki/install-instructions#linux>`__).

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/6aX0L-wPfng" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

This video will show you how to do just that.

**3. OBS capturing cv2 window**

Another solution is to stream the video to the host, and capture the :code:`cv2.imshow` window inside the OBS:

- Inside depthai-python repo, run :code:`python3 examples/ColorCamera/rgb_video.py`. This will open a new window where 1080P video stream will be shown.
- Inside OBS, under Sources menu, click :code:`+`, Add new source
- Click on **Window Capture (Xcomposite)** option. Then select :code:`video`
- You can then click on **Start Video Camera** inside OBS (just like in the video above), to use the video from OAK POE model as a webcam source.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/4_w9sFEiOdc" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

.. include::  /pages/includes/footer-short.rst
