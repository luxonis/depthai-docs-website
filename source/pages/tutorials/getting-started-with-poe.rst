Getting started with PoE
########################

We currently have two Power-over-Ethernet (PoE) devices:
 - `OAK-D-POE <https://docs.luxonis.com/projects/hardware/en/latest/pages/SJ2088POE.html>`__ and
 - `OAK-1-POE <https://docs.luxonis.com/projects/hardware/en/latest/pages/SJ2096POE.html>`__

If you are new to Power over Ethernet (POE), welcome; POE is extremely convenient. POE allows a single
Cat5e (or higher) Ethernet cable to be used to both power a device and give it connectivity at 1,000mbps (1gbps)
full-duplex (so 2 Gpbs aggregate) at up to 100 meters (328 feet).

.. image:: /_static/images/tutorials/poe/poe-devices.jpeg

Step by step tutorial
*********************

#. You will need a PoE switch or Injector **to power the PoE device**. `Click here for the full tutorial <https://docs.luxonis.com/projects/hardware/en/latest/pages/powering_poe_devices.html>`__.
#. Connect your computer to the same `LAN <https://en.wikipedia.org/wiki/Local_area_network>`__ as the PoE device
#. Make sure you have **depthai version 2.7.0.0** or newer. You can update your depthai python package with :code:`python3 -mpip install depthai>=2.7.0.0`
#. Now you can run any `code sample <https://docs.luxonis.com/projects/api/en/latest/tutorials/code_samples/>`__ / `depthai experiment <https://github.com/luxonis/depthai-experiments>`__ / `depthai_demo <https://github.com/luxonis/depthai>`__ as you would when connecting a DepthAI device with a USB-C cable!

.. image:: /_static/images/tutorials/poe/poe-working.jpeg

*After these steps, the depthai_demo is working on the OAK-D-POE!*

How it works
************

When your program tried to create the device (:code:`with dai.Device(pipeline) as device:`),
the library will search for available devices that are connected either by USB port or on the LAN.
It will search the LAN by **broadcasting a search packet** to all the devices, and DepthAI PoE devices will respond to it.
That way, the library will upload and start the pipeline on the first DepthAI device that it finds. As with the
USB-C connection, you can specify the Mx ID to specify to which DepthAI PoE device you would want to connect to
(`more info here <https://docs.luxonis.com/projects/api/en/latest/tutorials/multiple/>`__).

.. include::  /includes/footer-short.rst
