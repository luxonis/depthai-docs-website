OAK as a webcam
===============

OAK devices can be used as webcams as well. This feature hasn't been mainlined yet, so you have to checkout to a custom branch to use this
feature.

.. code-block:: bash

    # Skip cloning if you already have depthai-python repo
    git clone https://github.com/luxonis/depthai-python.git
    cd depthai-python
    # Navigate to the custom branch
    git checkout gen2_uvc
    python3 examples/install_requirements.py
    python3 examples/rgb_uvc.py

Now you can open up your favourite meeting app, like Zoom or Slack, and select **Luxonis Device: UVC Video Contr** in the webcam selection menu.

On some apps, Luxonis Device: UVC doesn't work
##############################################

We have noticed that on some apps, like Discord or Google Meet, **Luxonis Device: UVC** won't work. The current workaround is to use `OBS <https://obsproject.com/>`__
to proxy the stream and use the virtual camera inside the OBS. I am running Linux so I had to install :code:`sudo apt install v4l2loopback-dkms`
for the virtual camera to work (this is also mentioned in `install instructions <https://obsproject.com/wiki/install-instructions#linux>`__).

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/6aX0L-wPfng" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

This video will show you how to do just that.

POE models as webcams
#####################

Since UVC stands for :code:`USB Video Class`, using UVC pipeline on OAK POE models won't work. One solution is to stream video to the host,
and capture the :code:`cv2.imshow` window inside the OBS:

- Inside depthai-python repo, run :code:`python3 examples/ColorCamera/rgb_video.py`. This will open a new window where 1080P video stream will be shown.
- Inside OBS, under Sources menu, click :code:`+`, Add new source
- Click on **Window Capture (Xcomposite)** option. Then select :code:`video`
- You can then click on **Start Video Camera** inside OBS (just like in the video above), to use the video from OAK POE model as a webcam source.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/4_w9sFEiOdc" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

.. include::  /pages/includes/footer-short.rst