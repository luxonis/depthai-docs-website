Ecosystem
=========

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


.. include::  /pages/includes/footer-short.rst