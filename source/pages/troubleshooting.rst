Troubleshooting
===============

How can the start-up demo on the Raspberry Pi Compute Edition be disabled?
##########################################################################

Delete the :code:`autostart` file:

.. code-block:: bash

  rm /home/pi/.config/autostart/runai.desktop


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
##########################################################################

If :code:`python3 -m pip install` fails with a :code:`Permission denied` error, your user likely doesn't have permission
to install packages in the system-wide path.

.. code-block:: bash

   [Errno 13] Permission denied: '/usr/local/lib/python3.7/dist-packages/...'

Try installing in your user's home directory instead by adding the :code:`--user` option. For example:

.. code-block:: bash

  python3 -m pip install depthai --user

`More information on Stackoverflow <https://stackoverflow.com/questions/31512422/pip-install-failing-with-oserror-errno-13-permission-denied-on-directory>`__.


DepthAI does not show up under :code:`/dev/video*` like web cameras do.  Why?
#############################################################################

The USB device enumeration could be checked with lsusb | grep 03e7  . It should print:

- :code:`03e7:2485` after reset (boot loader running)
- :code:`03e7:f63b` after the application was loaded

No :code:`/dev/video*` nodes are created.

DepthAI implements the VSC (Vendor Specific Class) protocol and :code:`libusb`
is used for communication.

Intermittent Connectivity with Long (2 meter) USB3 Cables
#########################################################

- We've found that some hosts have trouble with USB3 + long cables (2 meter).  It seems to have something to do with the USB controller on the host side.
- Other hosts have no problem at all and run for days (tested well over 3 days on some), even with long cables (tested w/ a total length of a bit over 8 feet).  For example, all Apple computers we've tested with have never exhibited the problem.
- Ubuntu 16.04 has an independent USB3 issue, seemingly only on new machines though.  We think this has to do w/ Ubuntu 16.04 being EOLed prior or around when these new machines having hit the market.  For example, on this computer (`here <https://pcpartpicker.com/list/KTDFQZ>`__) has rampant USB3 disconnect issues under Ubuntu 16.04 (with a 1 meter cable), but has none under Ubuntu 18.04 (with a 1 meter cable).

So unfortunately we discovered this after we shipped with long USB3 cables (2 meter cables) with DepthAI units.

So if you have see this problem with your host, potentially 3 options:

#. Switch to a shorter USB3 cable (say 1 meter) will very likely make the problem disappear.  `These <https://www.amazon.com/gp/product/B07S4G4L4Z/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1>`__ 1 meter (3.3 ft.) cables are a nice length and are now what we ship with DepthAI USB3 variants.
#. Force USB2 mode with :code:`--force_usb2` option (examples below).  This will allow use of the long cable still, and many DepthAI use cases do not necessitate USB3 communication bandwidth - USB2 is plenty.
#. Upgrade from Ubuntu 16.04 to Ubuntu 18.04.

Forcing USB2 Communication
**************************

If you are having trouble with communication with DepthAI/OAK, forcing USB2 can sometimes resolve the issue.  

.. code-block:: bash

  python3 depthai_demo.py --force_usb2

Or, the shorter form:

.. code-block:: bash

  python3 depthai_demo.py -fusb2

For gen2, set the **usb2mode** to **True** when creating the device:

.. code-block:: python

  dai.Device(pipeline, usb2mode=True)

We've also seen an unconfirmed issue of running Ubuntu-compiled libraries on Linux Mint.  If running on not
Ubuntu 18.04/16.04 or Raspbian, please `compile DepthAI from source <https://docs.luxonis.com/projects/api/en/latest/install/#install-from-source>`__.

Output from DepthAI keeps freezing
#################################################

If the output from the device keeps freezing every few seconds, there may be a problem with the USB3 connection and forcing the device into USB2 mode could resolve this issue - instructions are in the chapter above.

When connection speed is USB2 (due to some hosts - Windows in particular - or USB controller/port/cable being USB2) - initialization of USB3-enabled firmware or streaming after a few frames may fail. The workaround here is to force the device to use the USB2-only firmware (mentioned in the chapter above).

Failed to boot the device: 1.3-ma2480, err code 3
#################################################

This error often can occur if the udev rules are not set on Linux.  This will coincide with :code:`depthai: Error initializing xlink`.

To fix this, set the udev rules using the commands below, unplugging DepthAI and then plugging it back into USB afterwards.

.. code-block:: bash

  echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
  sudo udevadm control --reload-rules && sudo udevadm trigger
  
And in some cases, these were already set, but DepthAI was plugged in the entire time, so Linux could not reset the rules.

So make sure to unplug and then plug the DepthAI back in after having run these.

CTRL-C Is Not Stopping It!
##########################

If you are trying to kill a program with :code:`CTLR-C`, and it's not working, try :code:`CTRL-\ ` instead.  Usually this will work.

Is Your Raspberry Pi Locking Up or is DepthAI Crashing on Raspberry Pi?
#######################################################################

The Raspberry Pi has a max limit of 1.2A across all its USB ports, and DepthAI/megaAI/OAK can take up to 1A (at max power, usually closer to 500mA).

So if you are seeing lockups, it could be that you are over this 1.2A limit as a result of the total power of the USB devices drawing from the Pi.  Using a powered hub can prevent this, or powering fewer other things off of the Pi over USB.

This may also manifest in DepthAI randomly crashing on the Pi.  This can become particularly often if DepthAI is configured to do many things at once.  This is becoming increasingly likely as we enable DepthAI to do more and more things at once - and thereby increase the maximum power that DepthAI can pull.  It is seeming like the peak power power (current) spikes from DepthAI can go over what the Pi can handle, causing DepthAI to brown-out and return an error.

So if you are experiencing issues with DepthAI stability on Raspberry, try powering DepthAI via a power-supply and/or a powered USB hub to see if the error goes away.  

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

If a window is not displayed, or if you get the `:bash: Illegal instruction` result, this means there is a problem with the OpenCV install.  The installation scripts `here <https://docs.luxonis.com/en/latest/pages/api/#supported-platforms>`__ often will fix the OpenCV issues.  But if they do not, running `:bash: python3 -m pip install opencv-python --force-reinstall` will often fix the OpenCV problem.


Neural network blob compiled with uncompatible openvino version
###############################################################

.. code-block:: bash

  [NeuralNetwork(2)] [error] Neural network blob compiled with uncompatible openvino version. Selected openvino version 2020.3. If you want to select an explicit openvino version use: setOpenVINOVersion while creating pipeline

The reason for this error is that depthai can't resolve the OpenVINO version from the blob. The solution is simple, the user has to specify the OpenVINO version with which the blob was compiled (as mentioned in the error message):

.. code-block:: python

  pipeline = depthai.Pipeline()
  # Set the correct version:
  pipeline.setOpenVINOVersion(depthai.OpenVINO.Version.VERSION_2020_1)


.. include::  /pages/includes/footer-short.rst
