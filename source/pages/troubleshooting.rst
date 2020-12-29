Troubleshooting
===============

How can the startup demo on the RPi Compute Edition be disabled?
################################################################

Delete the autostart file:

.. code-block:: bash

  rm /home/pi/.config/autostart/runai.desktop

'depthai: Error initalizing xlink' errors and DepthAI fails to run.
###################################################################

The Myriad X needs to be reset. Click the "MODULE RST" or "RST" button on your carrier board.

On the RPi Compute edition, you can reset the Myriad X via the following shell commands:

.. code-block:: bash

  raspi-gpio set 33 op  # set 33 as output
  raspi-gpio set 33 dh  # drive high to reset Myriad X
  sleep 1
  raspi-gpio set 33 dl  # drive low to allow Myriad X to run

ImportError: No module named 'depthai'
######################################

This indicates that the :code:`depthai` was not found by your python interpreter. There are a handful of reasons this can fail:

#. Is the :ref:`Python API` installed? Verify that it appears when you type:

    .. code-block:: bash

      python3 -m pip list | grep depthai

#. Are you using a :ref:`supported platform <Supported Platforms>` for your operating system? If not, you can always :ref:`install from source <Install from source>`:

    .. code-block:: bash

      cat /etc/lsb-release


Why is the Camera Calibration running slow?
###########################################

Poor photo conditions `can dramatically impact the image processing time <https://stackoverflow.com/questions/51073309/why-does-the-camera-calibration-in-opencv-python-takes-more-than-30-minutes>`__)
during the camera calibration. Under normal conditions, it should take 1 second or less to find the chessboard corners
per-image on an RPi but this exceed 20 seconds per-image in poor conditions. Tips on setting up proper photo conditions:

- Ensure the checkerboard is not warped and is truly a flat surface. A high-quality option: `print the checkerboard on a foam board <https://discuss.luxonis.com/d/38-easy-calibration-targets-for-depthai-opencv-checkerboard>`__.
- Reduce glare on the checkerboard (for example, ensure there are no light sources close to the board like a desk lamp).
- Reduce the amount of motion blur by trying to hold the checkerboard as still as possible.

[Errno 13] Permission denied: '/usr/local/lib/python3.7/dist-packages/...'
##########################################################################

If :code:`python3 -m pip install` fails with a :code:`Permission denied` error, your user likely doesn't have permission
to install packages in the system-wide path.
Try installing in your user's home directory instead by adding the :code:`--user` option. For example:

.. code-block:: bash

  python3 -m pip install depthai --user

`More information on Stackoverflow <https://stackoverflow.com/questions/31512422/pip-install-failing-with-oserror-errno-13-permission-denied-on-directory>`__.


DepthAI does not show up under /dev/video* like web cameras do.  Why?
#######################################################################

The USB device enumeration could be checked with lsusb | grep 03e7  . It should print:

- :code:`03e7:2485` after reset (bootloader running)
- :code:`03e7:f63b` after the application was loaded

No :code:`/dev/video*` nodes are created.

DepthAI implements VSC (Vendor Specific Class) protocol, and libusb is used for communication.

Intermittent Connectivity with Long (2 meter) USB3 Cables
#########################################################

- We've found that some hosts have trouble with USB3 + long cables (2 meter).  It seems to have something do do with the USB controller on the host side.
- Other hosts have no problem at all and run for days (tested well over 3 days on some), even with long cables (tested w/ a total length of a bit over 8 feet).  For example, all Apple computers we've tested with have never exhibited the problem.
- Ubuntu 16.04 has an independent USB3 issue, seemingly only on new machines though.  We think this has to do w/ Ubuntu 16.04 being EOLed prior or around when these new machines having hit the market.  For example, on this computer (`here <https://pcpartpicker.com/list/KTDFQZ>`__) has rampant USB3 disconnect issues under Ubuntu 16.04 (with a 1 meter cable), but has none under Ubuntu 18.04 (with a 1 meter cable).

So unfortunately we discovered this after we shipped with long USB3 cables (2 meter cables) with DepthAI units.

So if you have see this problem with your host, potentially 3 options:

#. Switch to a shorter USB3 cable (say 1 meter) will very likely make the problem disappear.  `These <https://www.amazon.com/gp/product/B07S4G4L4Z/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1>`__ 1 meter (3.3 ft.) cables are a nice length and are now what we ship with DepthAI USB3 variants.
#. Force USB2 mode with :code:`--force_usb2` option (examples below).  This will allow use of the long cable still, and many DepthAI usecases do not necessitate USB3 communication bandwidth - USB2 is plenty.
#. Upgrade from Ubuntu 16.04 to Ubuntu 18.04.

Forcing USB2 Communication
**************************

.. code-block:: bash

  python3 depthai_demo.py --force_usb2

Or, the shorter form:

.. code-block:: bash

  python3 depthai_demo.py -usb2

We've also seen an unconfirmed issue of running Ubuntu-compiled libraries on Linux Mint.  If running on not
Ubuntu 18.04/16.04 or Raspbian, please :ref:`compile DepthAI from source <Install from source>`.

include::  /pages/includes/footer-short.rst
