Troubleshooting
===============

DepthAI can't connect to an OAK camera
######################################

For **USB OAK cameras**, DepthAI can throw an error code like :code:`X_LINK_COMMUNICATION_NOT_OPEN` or :code:`X_LINK_ERROR`,
which is usually a sign of a **bad USB3 cable** (or a USB2 cable). If you are using USB2 cable (and want USB2 bandwidth),
you have to specify USB2 protocol, see :ref:`Forcing USB2 Communication` for more information. Another common
issue is that users haven't set :ref:`udev rules <Udev rules on Linux>` on their Linux machine.

If you still can't connect to the OAK camera, you should execute :code:`lsusb | grep 03e7`. You should see a similar line:

.. code-block:: bash

  $ lsusb | grep 03e7
  Bus 001 Device 120: ID 03e7:2485 Intel Movidius MyriadX

Another thing to check is the :code:`dmesg -w`. After executing that and pressing enter a few times (for separator), connect
your OAK camera to the host. You should see a similar output in the terminal:

.. code-block::

  /~$ dmesg -w

  [223940.862544] usb 1-3.2: new high-speed USB device number 120 using xhci_hcd
  [223940.963357] usb 1-3.2: New USB device found, idVendor=03e7, idProduct=2485, bcdDevice= 0.01
  [223940.963364] usb 1-3.2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
  [223940.963368] usb 1-3.2: Product: Movidius MyriadX
  [223940.963371] usb 1-3.2: Manufacturer: Movidius Ltd.
  [223940.963373] usb 1-3.2: SerialNumber: 03e72485

For **PoE OAK cameras**, see `PoE Troubleshooting page <https://docs.luxonis.com/projects/hardware/en/latest/pages/guides/getting-started-with-poe.html#poe-troubleshooting>`__.

If these commands didn't return the expected log, see :ref:`Support` page.

Reporting firmware crash dump
#############################

On our latest ``develop`` branch (to be released on version **2.21**) of depthai API we have added crash dump feature. Steps to create a crash dump:

1. [Prerequisite] Have correct depthai version installed. Checkout to ``develop`` branch and execute `this file <https://github.com/luxonis/depthai-python/blob/develop/examples/install_requirements.py>`__ by running ``python3 examples/install_requirements.py``
2. Run a code that causes the firmware crash
3. On depthai-python repo, execute `this file <https://github.com/luxonis/depthai-python/blob/develop/examples/CrashReport/crash_report.py>`__ by running ``python3 examples/CrashReport/crash_report.py``

Afterwards, please send the generated .txt file to us (email/github/forum), and our development team will try to fix the cause of the crash as soon as possible.

ImportError: No module named 'depthai'
######################################

This indicates that the :code:`depthai` was not found by your python interpreter. There are a handful of reasons this can fail:

#. Is the `Python API <https://docs.luxonis.com/projects/api/en/latest/install/>`__ installed? Verify that it appears when you type:

    .. code-block:: bash

      python3 -m pip list | grep depthai

#. Are you using a `supported platform <https://docs.luxonis.com/projects/api/en/latest/install/#supported-platforms>`__ for your operating system? If not, you can always `install from source <https://docs.luxonis.com/projects/api/en/latest/install/#install-from-source>`__:

    .. code-block:: bash

      cat /etc/os-release


Why is the Camera Calibration running slow?
###########################################

Poor photo conditions `can dramatically impact the image processing time <https://stackoverflow.com/questions/51073309/why-does-the-camera-calibration-in-opencv-python-takes-more-than-30-minutes>`__)
during the camera calibration. Under normal conditions, it should take 1 second or less to find the chessboard corners
per-image on an Raspberry Pi but this exceed 20 seconds per-image in poor conditions. Tips on setting up proper photo conditions:

- Ensure the checkerboard is not warped and is truly a flat surface. A high-quality option: `print the checkerboard on a foam board <https://discuss.luxonis.com/d/38-easy-calibration-targets-for-depthai-opencv-checkerboard>`__.
- Reduce glare on the checkerboard (for example, ensure there are no light sources close to the board like a desk lamp).
- Reduce the amount of motion blur by trying to hold the checkerboard as still as possible.

Permission denied error
#######################

If :code:`python3 -m pip install` fails with a :code:`Permission denied` error, your user likely doesn't have permission
to install packages in the system-wide path.

.. code-block:: bash

   [Errno 13] Permission denied: '/usr/local/lib/python3.7/dist-packages/...'

Try installing in your user's home directory instead by adding the :code:`--user` option. For example:

.. code-block:: bash

  python3 -m pip install depthai --user

`More information on Stackoverflow <https://stackoverflow.com/questions/31512422/pip-install-failing-with-oserror-errno-13-permission-denied-on-directory>`__.


DepthAI does not show up under :code:`/dev/video*` like web cameras do. Why?
############################################################################

The USB device enumeration could be checked with lsusb | grep 03e7  . It should print:

- :code:`03e7:2485` after reset (boot loader running)
- :code:`03e7:f63b` after the application was loaded

No :code:`/dev/video*` nodes are created. See :ref:`OAK as a webcam` if you would like to use OAK camera as a webcam.

Intermittent Connectivity with Long (2 meter) USB3 Cables
#########################################################

We've found that some hosts have trouble with long USB3 cables (above 6ft/2m). It seems to have something to do with the
**USB controller on the host side**. For example, all Apple computers we've tested with have never exhibited the problem,
as Apple computers have powerful USB controllers.

So, if you experience this problem with your host, there are potentially **3 options**:

#. Switching to a shorter USB3 cable (say 1 meter) will very likely make the problem disappear.  `These <https://www.amazon.com/gp/product/B07S4G4L4Z/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1>`__ 1 meter (3.3 ft.) cables are a nice length and are shipped with OAK USB3 variants.
#. :ref:`Force USB2 mode <Forcing USB2 Communication>`.  This will allow use of the long cable still, and many DepthAI use cases do not necessitate USB3 communication bandwidth - USB2 is plenty.
#. Use `Active USB3 cable <https://www.cablematters.com/blog/USB-C/active-usb-extension-cable>`__. We have tested `this 10m active cable <https://www.amazon.de/-/en/dp/B08T5J3JZ3/ref=twister_B08T61LMP8?_encoding=UTF8&psc=1>`__ and USB3 works as expected (even without powering the repeater).

Note that Ubuntu 16.04 has an independent USB3 issue, seemingly only on new machines though.
We think this has to do w/ Ubuntu 16.04 being EOLed prior to or around when these new machines hit the market.
For example, this computer (`here <https://pcpartpicker.com/list/KTDFQZ>`__) has rampant USB3 disconnect issues
under Ubuntu 16.04 (with a 1 meter cable), but has none under Ubuntu 18.04 (with a 1 meter cable).

Forcing USB2 Communication
##########################

If you aren't using a (working) USB3 cable or your host computer doesn't support USB3, you should force the
USB2 communication. It's also recommended to use USB2 communication if you are using a longer USB cable (2m+).

For API usage, set the **maxUsbSpeed=dai.UsbSpeed.HIGH** when creating the dai.Device object

.. code-block:: python

  # Force USB2 communication
  with dai.Device(pipeline, maxUsbSpeed=dai.UsbSpeed.HIGH) as device:
    # ...

If you are using `depthai_demo <https://github.com/luxonis/depthai>`__ you can specify USB speed
with :code:`-usbs` argument:

.. code-block:: bash

  python3 depthai_demo.py -usbs usb2

Output from DepthAI keeps freezing
##################################

If the output from the device keeps freezing every few seconds, there may be a problem with the USB3 connection and
forcing the device into USB2 mode could resolve this issue - instructions are in the chapter above.

When connection speed is USB2 (due to some hosts - Windows in particular - or USB controller/port/cable being USB2) -
initialization of USB3-enabled firmware or streaming after a few frames may fail. The workaround here is to force the
device to use the USB2-only firmware (mentioned in the chapter above).

DepthAI freezes after a few frames
##################################

If your app freezes and you don't get any new messages from the device after a few messages (eg. 4 frames) after booting, it's likely that queues filled
up and were set to blocking mode. Additional details on node queues (on the OAK device) can be found `here <https://docs.luxonis.com/projects/api/en/latest/components/device/#blocking-behaviour>`__.
We also recommend using `Pipeline Graph tool <https://github.com/geaxgx/depthai_pipeline_graph>`__ to quikcly check if there is something wrong with the pipeline
(eg. a node that isn't connected to anything).

Udev rules on Linux
###################

- ``Failed to boot the device: 1.3-ma2480, err code 3``
- ``Failed to find device (ma2480), error message: X_LINK_DEVICE_NOT_FOUND``
- ``[warning] skipping X_LINK_UNBOOTED device having name "<error>"``
- ``Insufficient permissions to communicate with X_LINK_UNBOOTED device with name "1.1". Make sure udev rules are set``

If you are getting any of the errors above, it's most likely that udev rules are not set on your Linux machine.

To fix this, set the udev rules using the commands below, unplugging DepthAI and then plugging it back into USB afterwards.

.. code-block:: bash

  echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
  sudo udevadm control --reload-rules && sudo udevadm trigger

CTRL-C Is Not Stopping It!
##########################

If you are trying to kill a program with :code:`CTLR-C`, and it's not working, try :code:`CTRL-\ ` instead.  Usually this will work.

Nothing happening when running a DepthAI script
###############################################

If upon running a DepthAI script, nothing happens (the script just hangs) and you cannot :code:`CTRL-C` out of it.
Try running :code:`cam_test.py` script from the :code:`depthai-python/utilities` folder. The script should error out with something like:

.. code-block:: bash

  QObject::moveToThread: Current thread (0x55b9d0a00320) is not the object's thread (0x55b9d0cad7e0).
  Cannot move to target thread (0x55b9d0a00320)

          .
          .
          .

  Aborted (Signal sent by tkill() 32104 1001)
  Aborted (core dumped)

This means there is a problem with PyQt5 installation. Follow this `issue <https://github.com/wkentaro/labelme/issues/842>`__ for a resolution.


"DLL load failed while importing cv2" on Windows
################################################

If you are seeing the following error after installing DepthAI for Windows:

.. code-block:: bash

  (venv) C:\Users\Context\depthai>python depthai_demo.py
   Traceback (most recent call last):
     File "C:\Users\Context\depthai\depthai_demo.py", line 7, in <module>
       import cv2
     File "C:\Users\Context\depthai\venv\lib\site-packages\cv2\__init__.py", line 5, in <module>
       from .cv2 import *
   ImportError: DLL load failed while importing cv2: The specified module could not be found.

Then installing the Windows Media Feature Pack (`here <https://support.microsoft.com/en-us/help/3145500/media-feature-pack-list-for-windows-n-editions>`__) is often the resolution, as Media Feature Pack must be installed for Windows 10 N editions.

(And more background from OpenCV directly is `here <https://github.com/skvark/opencv-python/blob/master/README.md#:~:text=Q%3A%20Import%20fails%20on%20Windows%3A%20ImportError%3A%20DLL%20load%20failed%3A%20The%20specified%20module%20could%20not%20be%20found.%3F>`__)

:code:`python3 depthai_demo.py` returns Illegal instruction
###########################################################

This so far has always meant there is a problem with the OpenCV install on the host (and not actually with the depthai library).  To check this, run:

.. code-block:: bash

  python3 -c "import cv2; import numpy as np; blank_image = np.zeros((500,500,3), np.uint8); cv2.imshow('s', blank_image); cv2.waitKey(0)"

If a window is not displayed, or if you get the `:bash: Illegal instruction` result, this means there is a problem with
the OpenCV install.  The installation scripts `here <https://docs.luxonis.com/en/latest/pages/api/#supported-platforms>`__
often will fix the OpenCV issues.  But if they do not, running
`:bash: python3 -m pip install opencv-python --force-reinstall` will often fix the OpenCV problem.

Neural network blob compiled with incompatible openvino version
###############################################################

.. code-block:: bash

  [NeuralNetwork(2)] [error] Neural network blob compiled with incompatible openvino version. Selected openvino version 2020.3. If you want to select an explicit openvino version use: setOpenVINOVersion while creating pipeline

The reason for this error is that depthai can't resolve the OpenVINO version from the blob. The solution is simple, the user has to specify the OpenVINO version with which the blob was compiled (as mentioned in the error message):

.. code-block:: python

  pipeline = depthai.Pipeline()
  # Set the correct version:
  pipeline.setOpenVINOVersion(depthai.OpenVINO.Version.VERSION_2021_1)

"realloc(): invalid pointer\n Aborted" on RPi
#############################################

On RPi, after running :code:`sudo apt upgrade`, you might get the error :code:`realloc(): invalid pointer\n Aborted` when importing cv2 after depthai library. We have observed the same issue, and have found a **solution**:

- Downgrade libc6 by running :code:`sudo apt install -y --allow-downgrades libc6=2.28-10+rpi1`, OR
- Re-install DepthAI dependencies by running :code:`sudo curl -fL http://docs.luxonis.com/_static/install_dependencies.sh | bash`

[error] Attempted to start camera - NOT detected!
#################################################

If you are facing any of the errors above for either Mono Left/Right or Color camera, first try using the latest depthai version (:code:`python3 -mpip install depthai -U`).
If that doesn't help, there are 2 probable causes:

- You are using OAK FFC and a camera sensor that isn't supported by default, so you should use a different branch, see `docs here <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/supported_sensors.html#supported-sensors>`__.
- A camera got disconnected during the shipping. This has been reported only a handful of times, but it's possible.

The solution here is to open up the enclosure and re-attach the connector to the camera, see the `image here <https://github.com/luxonis/depthai-hardware/issues/224#issue-1166269781>`__ for the OAK-D (left mono camera not detected).

[error] input tensor exceeds available data range
#################################################

.. code-block::

  [NeuralNetwork(3)] [error] Input tensor '0' (0) exceeds available data range. Data size (6336B), tensor offset (0), size (6912B) - skipping inference

This error is usually thrown when we use :code:`NNData` message and we don't provide the amount of bytes that the NN model
expects for the inference. For example, in the error above, the NN model expects 6912 bytes (48x48x3), but only 6336 bytes
were sent to it.

Converting YUV420 to CV2 frame
##############################

If you try to convert YUV420 frame to CV using `ImgFrame <https://docs.luxonis.com/projects/api/en/latest/components/messages/img_frame/>`__'s ``.getCvFrame()``
method, you might come accross the error below:

.. code-block::
  :emphasize-lines: 2

  cv2.error: OpenCV(4.6.0) d:\a\opencv-python\opencv-python\opencv\modules\imgproc\src\color.simd_helpers.hpp:108: error:
  (-215:Assertion failed) sz.width % 2 == 0 && sz.height % 3 == 0 in function
  'cv::impl::`anonymous-namespace'::CvtHelper<struct cv::impl::`anonymous namespace'::Set<1,-1,-1>,
  struct cv::impl::A0xe823dd8f::Set<3,4,-1>,struct cv::impl::A0xe823dd8f::Set<0,-1,-1>,1>::CvtHelper'

The culprit of the error is that OpenCV requires YUV420 width to be divisible by 2, and height to be divisible by 3. A simple example that will crash:

.. code-block:: python
  :linenos:

  import depthai as dai
  import cv2

  pipeline = dai.Pipeline()
  cam = pipeline.createColorCamera()

  manip = pipeline.createImageManip()
  # manip.initialConfig.setFrameType(dai.RawImgFrame.Type.BGR888p)
  manip.initialConfig.setResize(600, 451)
  cam.isp.link(manip.inputImage)

  xout = pipeline.createXLinkOut()
  xout.setStreamName("out")
  manip.out.link(xout.input)

  with dai.Device(pipeline) as device:
      f = device.getOutputQueue('out').get().getCvFrame()
      cv2.imshow("frame", f)
      cv2.waitKey(0)

Since ``isp`` output is **YUV420**, it will crash when calling ``.getCvFrame()``. You could either resize the frame to 600x450 (so height is divisible by 3) on line 9,
or uncomment the line 8, so frame gets converted to **BGR** on the device itself.

.. include::  /pages/includes/footer-short.rst
