First steps with DepthAI
========================

This guide will go through the first steps with **OAK camera** and **DepthAI library**:

1. Installing DepthAI
2. Device setup - connecting the OAK camera to your (host) computer
3. Running :ref:`DepthAI Viewer`, the visualization GUI app for DepthAI
4. Next steps; examples, demos, API docs

Installing DepthAI
##################

Follow instructions below to install DepthAI and its dependencies/requirements with an installer.

.. tabs::

  .. tab:: :fa:`apple;fa-xl` macOS

    Execute the script below to install DepthAI on macOS:

    .. code-block:: bash

      bash -c "$(curl -fL https://docs.luxonis.com/install_depthai.sh)"

    Please refer to `this documentation <https://docs.luxonis.com/projects/api/en/latest/install/#macos>`__ if any issues occur.

  .. tab:: :fa:`windows;fa-xl` Windows

    Windows 10/11 users can **install DepthAI** with the |windows_installer_url|.

    Installer will install either the **newer** `DepthAI Viewer <https://github.com/luxonis/depthai-viewer/>`__ (visualization GUI application),
    or DepthAI Demo (python script, older GUI application) or and all the dependencies. **We suggest using** the DepthAI Viewer.

    After the installer finishes, you can directly run the DepthAI app from the list of applications, which will run the installed demo.
    You can skip Setup section (as Installer performs the whole setup) of this tutorial and go directly to :ref:`DepthAI Viewer`.

  .. tab:: :fa:`linux;fa-xl` Linux

    Execute the script below to install DepthAI on Linux systems:

    .. code-block:: bash

      sudo wget -qO- https://docs.luxonis.com/install_depthai.sh | bash

    Please refer to `Installation documentation <https://docs.luxonis.com/projects/api/en/latest/install/#supported-platforms>`__ if any issues occur.

If you would like to avoid using installer and would prefer manually installing dependencies, requirements and DepthAI, see :ref:`Manual DepthAI installation`.

Device setup
############

Now that we have installed requirements, we can setup the device. OAK cameras can be separated into two categories depending on how you connect to them;
either via ethernet (`OAK PoE cameras <https://docs.luxonis.com/projects/hardware/en/latest/#poe-designs>`__) or via USB (all others).

.. tabs::

  .. tab:: **OAK USB camera**

    If your OAK came with an included USB cable, we suggest using that to connect the OAK camera to the host computer.

    .. warning::
      Make sure to use **USB3 cable**, as this is has been a very common culprit of OAK connectivity issues. If you aren't using USB3 cable, :ref:`force USB2 communication <Forcing USB2 Communication>`.

    .. image:: /_static/images/tutorials/usb3.png

    **USB3 cable is colored blue** in the inside of the USB-A connector of the USB-C cable. If it's not blue, it might be USB2 charging cable.

    Make sure that the device is connected to your host (which can be a PC or Raspberry Pi or another capable computer) directly to a USB3 port,
    or via a powered USB hub.

  .. tab:: **OAK PoE camera**

      If you are using OAK PoE device, you will first need to connect the device to a PoE switch or a PoE injector.
      We recommend following the `Getting started with OAK PoE devices <https://docs.luxonis.com/projects/hardware/en/latest/pages/guides/getting-started-with-poe.html>`__
      for a step-by-step tutorial.


DepthAI Viewer
##############

After the installer finishes, you can run the DepthAI Viewer by running:

.. code-block:: bash

  depthai-viewer
  # OR
  python3 -m depthai_viewer


Running the Viewer for the first time, the app will download a default `mobilenet-ssd` model,
configure the OAK camera and then show default streams from the camera.

.. image:: /_static/images/tutorials/viewer_demo.png
  :alt: DepthAI Viewer demo

Default model
#############

While the Viewer is running, you can see detection results, and if you are standing in front of the camera,
you should see yourself detected as a person with a high probability.

The model that is used by default is a MobileNetv2 SSD object detector trained on the `PASCAL 2007 VOC <http://host.robots.ox.ac.uk/pascal/VOC/voc2007/>`__ classes, which are:

- Person: person
- Animal: bird, cat, cow, dog, horse, sheep
- Vehicle: airplane, bicycle, boat, bus, car, motorbike, train
- Indoor: bottle, chair, dining table, potted plant, sofa, TV/monitor

So give it a try to detect different objects, like bottles or apples

.. image:: https://user-images.githubusercontent.com/5244214/142192279-71e479ae-fef2-4ddb-a4d2-7ae677e1544d.png
  :alt: bottles and apples

Next steps
##########

In the previous sections, we learned how to preview basic DepthAI features. From this point, you can explore the DepthAI world further

- **Usecases**

  Check our :ref:`Example Use Cases` for ready to use applications that solve a specific problem on DepthAI

- **Getting started** with coding

  Be sure to check `hello world tutorial on API section <https://docs.luxonis.com/projects/api/en/latest/tutorials/hello_world/>`__ for a step-by-step introduction to the API

- **Train and deploy a custom model** to OAK

  Visit :ref:`Custom training` page for ready to use Colab notebooks

- Already **built apps** for OAK devices

  See `luxonis/depthai-experiments <https://github.com/luxonis/depthai-experiments>`__ repository for apps built with depthai library

- Depthai **API library** repository

  See `luxonis/depthai-python <https://github.com/luxonis/depthai-python>`__ repository which contains Python bindings for the depthai API library, `Code samples <https://docs.luxonis.com/projects/api/en/latest/tutorials/code_samples/>`__ and various utility programs.

.. include::  /pages/includes/footer-short.rst
