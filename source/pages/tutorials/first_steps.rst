First steps with DepthAI
========================

.. toctree::
   :maxdepth: 1
   :hidden:

   depthai_demo.rst

This guide will go through the first steps with **OAK camera** and **DepthAI library**:

1. Installing DepthAI
2. Device setup - connecting the OAK camera to your host computer
3. Running :ref:`DepthAI Demo` a Python-based GUI application
4. Next steps; examples, demos, API docs

Installing DepthAI
##################

Follow instructions below to install DepthAI (and its dependencies/requirements) with an installer.

.. tabs::

  .. tab:: :fab:`apple;fa-xl` macOS

    Execute the script below to install DepthAI on macOS:

    .. code-block:: qtconsole

      bash -c "$(curl -fL https://docs.luxonis.com/install_depthai.sh)"

    Please refer to `this documentation <https://docs.luxonis.com/projects/api/en/latest/install/#macos>`__ if any issues occur.

  .. tab:: :fab:`windows;fa-xl` Windows

    Windows 10/11 users can **install DepthAI** with the |windows_installer_url|.
    After installer finishes, you can directly run the DepthAI application from the list of applications, which will run the DepthAI demo.
    You can skip Setup section (as Installer performs the whole setup) of this tutorial and go directly to :ref:`Default run`.

  .. tab:: :fab:`linux;fa-xl` Linux

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


Default run
###########

After installer finishes, it should automatically run the DepthAI Demo script. You can also manually run with command below:

.. code-block:: bash

  $ python3 depthai_demo.py


Running the demo for the first time, the script will compile and download a default `mobilenet-ssd` model,
configure the OAK camera and then show a default :code:`color` preview that will contain a scaled preview from the RGB camera from your device.

.. image:: https://user-images.githubusercontent.com/5244214/142722740-47e545b7-c7fe-4132-9704-ae3b47d60957.png
  :alt: Default run

Change preview
##############

To see other previews from the device, you can use the preview switcher that is visible in the top-left section of the GUI

.. image:: https://user-images.githubusercontent.com/5244214/141984256-4f9b9479-0907-4b04-bfcd-aae15ac28a0a.png
  :alt: preview selector location

.. list-table:: Available previews
  :widths: 15 65 20
  :header-rows: 1
  :align: center

  * - Name
    - Description
    - Limitations

  * - :code:`color`
    - Shows preview from color camera
    -

  * - :code:`nnInput`
    - Shows preview from right mono camera
    - Disabled if no AI model is running

  * - :code:`left`
    - Shows preview from left mono camera
    - Stereo required

  * - :code:`right`
    - Shows preview from right mono camera
    - Stereo required

  * - :code:`depth`
    - Shows disparity map calculated from :code:`depthRaw` preview and JET colored. Best for visualizing depth
    - Stereo required

  * - :code:`depthRaw`
    - Shows raw depth map. Best for depth-based calculations
    - Stereo required

  * - :code:`disparity`
    - Shows disparity map produced on device
    - Stereo required

  * - :code:`disparityColor`
    - Shows disparity map produced on device and JET colored. Should be the same as :code:`depth` preview but produced on the device.
    - Stereo required

  * - :code:`rectifiedLeft`
    - `Rectified <https://en.wikipedia.org/wiki/Image_rectification>`__ left camera frames
    - Stereo required

  * - :code:`rectifiedRight`
    - `Rectified <https://en.wikipedia.org/wiki/Image_rectification>`__ right camera frames
    - Stereo required


Default model
#############

While the demo was running, you could see the detection results - and if you were standing in front of the camera,
you should see yourself detected as a person with a pretty high probability.

The model that is used by default is a MobileNetv2 SSD object detector trained on the `PASCAL 2007 VOC <http://host.robots.ox.ac.uk/pascal/VOC/voc2007/>`__ classes, which are:

- Person: person
- Animal: bird, cat, cow, dog, horse, sheep
- Vehicle: airplane, bicycle, boat, bus, car, motorbike, train
- Indoor: bottle, chair, dining table, potted plant, sofa, TV/monitor

So give it a try to detect different objects, like bottles or apples

.. image:: https://user-images.githubusercontent.com/5244214/142192279-71e479ae-fef2-4ddb-a4d2-7ae677e1544d.png
  :alt: bottles and apples

.. note::

  See for :ref:`DepthAI Demo` additional documentation about DepthAI demo.

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
