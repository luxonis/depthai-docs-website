.. Luxonis Docs documentation master file, created by
   sphinx-quickstart on Tue Nov  3 14:34:56 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

DepthAI's documentation
=======================

*Learn about DepthAI ecosystem, available devices, calibration instructions, and more*



What is DepthAI
###############
DepthAI is the embedded :ref:`spatial <spatialai>` AI platform built around `Myriad X <https://www.intel.com/content/www/us/en/products/details/processors/movidius-vpu/movidius-myriad-x.html>`__ that helps you build products with true real-time 3D object localization
(think 3D object detection) and tracking. DepthAI offloads AI, depth vision and more - processed direct from built-in cameras - freeing your host to process application-specific data.

DepthAI gives you this power in a simple, easy-to-use API, written in Python and C++.

Best of all, it is modular (:ref:`System on Module <som>`) and built on `MIT-licensed open source hardware <https://github.com/luxonis/depthai-hardware>`__, affording adding these Spatial AI/CV super powers to real commercial products.


DepthAI Ecosystem
#################

DepthAI is a platform - a complete ecosystem of custom `hardware <https://github.com/luxonis/depthai-hardware>`__, firmware, `software <https://docs.luxonis.com/projects/api/en/latest/>`__, and AI training - which combines neural inference, depth vision, and feature tracking into an easy-to-use, works-in-30-seconds solution. 

This is an all-in-one solution for folks who need the power of AI, depth, and tracking in a single device.


Glossary
********

- **Gen2** is a step forward in DepthAI integration, allowing users to define their own flow of data using pipelines, nodes and connections. Gen2 was created based on user's feedback from Gen1 and from raising capabilities of both DepthAI and
  supporting software like `OpenVINO <https://docs.openvinotoolkit.org/latest/index.html>`__.

- **Host side** is the device, like PC or RaspberryPi, to which the DepthAI is connected to. If something is happening on the host side, it means that this device is involved in it, not DepthAI itself

- **Device side** is the DepthAI itself. If something is happening on the device side, it means that the DepthAI is responsible for it

- **Pipeline** is a complete workflow on the device side, consisting of nodes and connections between them - these cannot exist outside of pipeline.

- **Node** is a single functionality of the DepthAI. It have either inputs or outputs or both, together with properties to be defined (like resolution on 
  the camera node or blob path in neural network node)

- **Connection** is a link between one node's output and another one's input. In order to define the pipeline dataflow, the connections define where to 
  send data in order to achieve an expected result

- **XLink** is a middleware that is capable to exchange data between device and host. XLinkIn node allows to send the data from host to device, XLinkOut does 
  the opposite.


Products
********



Interfaces
**********

.. list-table:: API 
  :widths: 20 80

  * - DepthAI Python API
    - `Get started with Python <https://docs.luxonis.com/projects/api/en/latest/> `__
  * - DepthAI Python API
    - `Get started with C++ <https://docs.luxonis.com/projects/api/en/latest/> `__
 
    
.. list-table:: GUI 
    :widths: 20 80

    * - DepthAI GUI 
    - `Get started with GUI <https://docs.luxonis.com/projects/gui/en/latest/#> `__
 
      

Luxonis Github Repositories
***************************

.. list-table:: Core Repositories
  :widths: 10 90

  * - `depthai-python <https://github.com/luxonis/depthai-python/>`__
    - Here you’ll find Python bindings creating the Python API of DepthAI
  * - `depthai-core <https://github.com/luxonis/depthai-core/>`__
    - Our core API written in C++
  * - `depthai-shared <https://github.com/luxonis/depthai-shared/>`__
    - This repository contains shared data between our main firmware
      and depthai-core host library.
  * - `depthai_ros2 <https://github.com/luxonis/depthai_ros2/>`__
    - DepthAI ROS2 Wrapper. This is an attempt at basic DepthAI to ROS2|
      interface. It's largely leveraging the existing depthai python demo on https://github.com/luxonis/depthai.
  * - `depthai-spi-api <https://github.com/luxonis/depthai-spi-api/>`__
    - API of the SPI protocol
  * - `depthai-spi-library <https://github.com/luxonis/depthai-spi-library/>`__
    - DepthAI SPI Library
  * - `depthai-bootloader-shared <https://github.com/luxonis/depthai-bootloader-shared/>`__
    - The depthai-bootloader-shared repository contains shared data
      between our bootloader firmware and depthai-core host library.
  * - `depthai-hardware <https://github.com/luxonis/depthai-hardware/>`__
    - This repository contains Luxonis open sourced baseboards, and contains
      Altium design files, documentation, and pictures to help you
      understand more about the embedded hardware that powers DepthAI.


.. list-table:: Tools / Docs Repositories
  :widths: 10 90

  * - `depthai-docs-website <https://github.com/luxonis/depthai-docs-website/>`__
    - If you wan't to contribute and update our docs, you can simply create a pull request.
  * - `depthai-gui <https://github.com/luxonis/depthai-gui/>`__
    - DepthAI GUI is a WYSIWYG tool that allows to create a custom DepthAI pipelines, run them and see the results - all in one tool.
  * - `depthai-ml-training <https://github.com/luxonis/depthai-ml-training/>`__
    - Here you can find repositories to help you connect your NN and create BLOBs.
  * - `depthai-tutorials <https://github.com/luxonis/depthai-tutorials/>`__
    - This repo contains source code for tutorials published on docs.luxonis.com.
  * - `blobconverter <https://github.com/luxonis/blobconverter/>`__
    - Web-based tool to convert model into MyriadX blob
  * - `Factory-calibration-DepthAI <https://github.com/luxonis/Factory-calibration-DepthAI/>`__
    - Factory Calibration (WIP); This package contains two ROS workspace one is for depthai capture and calibration node and another is for Interbotix ViperX 300 Robot Arm 6DOF (KIT-VIPX300-6DOF) arm bot control using moveit.
  * - `depthai-docker <https://github.com/luxonis/depthai-docker/>`__
    - This repository contains a Dockerfile, that allows you to run OpenVINO on DepthAI inside a Docker container.
  * - `depthai-mock <https://github.com/luxonis/depthai-mock/>`__
    - This tool allows you to record the packets produced by DepthAI device into your disk and then play them back again as they would be produced normally - but without actually running the DepthAI
  * - `sbr-util <https://github.com/luxonis/sbr-util/>`__
    - Utility to view and manipulate SBR binary images


.. list-table:: Demo Repositories
  :widths: 10 90

  * - `depthai <https://github.com/luxonis/depthai/>`__
    - This repo contains a demo application, which can load different networks, create pipelines, record video, etc. This program includes an example of depth & CNN inference and ready to use models.
  * - `esp32-spi-message-demo <https://github.com/luxonis/esp32-spi-message-demo/>`__
    - ESP32 reference app for interfacing with DepthAI over SPI
  * - `depthai-core-example <https://github.com/luxonis/depthai-core-example/>`__
    - CMake example project which serves as a template on how to quickly get started with C++ and depthai library


.. list-table:: Experiments Repositories:
  :widths: 10 90

  * - `depthai-experiments <https://github.com/luxonis/depthai-experiments/>`__
    - In this repository, you'll find various experiments using DepthAI. You can use those examples as a basis or a reference in your application.
  * - `remote-monitoring <https://github.com/luxonis/remote-monitoring/>`__
    - Application that allows user to report an incident when a person or a car will be detected in specified zone.


.. include::  /pages/includes/footer-long.rst



.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Subprojects:

   DepthAI API <https://docs.luxonis.com/projects/api/en/latest/>
   DepthAI GUI <https://docs.luxonis.com/projects/gui/en/latest/>
   

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Contents

   pages/faq.rst
   pages/support.rst
   pages/troubleshooting.rst
   pages/products/index.rst
   pages/calibration.rst
   pages/training.rst
