.. Luxonis Docs documentation master file, created by
   sphinx-quickstart on Tue Nov  3 14:34:56 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

DepthAI's documentation
=======================

*Learn how to setup your DepthAI device, view tutorials, code samples, and more.*

DepthAI is the embedded spatial AI platform that helps you build products with true real-time 3D object localization
(think 3D object detection) and tracking. DepthAI offloads AI, depth vision and more - processed direct from built-in
cameras - freeing your host to process application-specific data.
Best of all, it is modular and MIT-licensed open source, affording adding these Spatial AI/CV super powers to real commercial products. 

Setup your device
#################

.. raw:: html

   <div class="items-container">
      <div class="items-row">
         <!-- BW1093 -->
         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="./_images/bw1093.png" alt="MegaAI | Tiny but Mighty"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">OAK-1 | megaAI - Tiny, Mighty</h5>
                  <p class="item-descr">
                     MegaAI is a tiny USB3 4K AI camera featuring 4K/30 h.265 encoding and powerful hardware accelerated ML/CV.
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="pages/products/bw1093.html" class="btn item-cta">Get Started ›</a>
               </footer>
            </div>
         </div>
         <!-- BW1098OBC -->
         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="./_images/bw1098obc.png" alt="Raspberry Pi HAT"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">OAK-D | DepthAI Onboard Cameras</h5>
                  <p class="item-descr">
                     DepthAI for the host of your choice, with an onboard color camera module and global-shutter synchronized stereo pair.
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="pages/products/bw1098obc.html" class="btn item-cta">Get Started ›</a>
               </footer>
            </div>
         </div>
      </div>
      <div class="items-row">
         <!-- BW1098FFC -->
         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="./_images/bw1098ffc.jpg" alt="USB3 | Modular Cameras"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">USB3 | Modular Cameras</h5>
                  <p class="item-descr">
                     DepthAI for the host of your choice, with modular cameras for easy integration onto/into your platform and custom stereo baselines.
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="pages/products/bw1098ffc.html" class="btn item-cta">Get Started ›</a>
               </footer>
            </div>
         </div>
         <!-- BW1099 -->
         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="./_images/bw1099.jpg" alt="System on Module"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">System on Module</h5>
                  <p class="item-descr">
                     Allows you to integrate the power of DepthAI into your own products.
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="pages/products/bw1099.html" class="btn item-cta">Get Started ›</a>
               </footer>
            </div>
         </div>
      </div>
      <div class="items-row">
         <!-- BW1097 -->
         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="./_images/bw1097.jpg" alt="Raspberry Pi Compute" />
               </div>
               <div class="item-body">
                  <h5 class="item-title">Raspberry Pi Compute</h5>
                  <p class="item-descr">
                     Complete DepthAI system including Raspberry Pi Compute Module, microSD card pre-loaded with Raspbian 10 and DepthAI Python interface.
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="pages/products/bw1097.html" class="btn item-cta">Get Started ›</a>
               </footer>
            </div>
         </div>
         <!-- BW1094 -->
         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="./_images/bw1092.jpg" alt="BW1092"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Depth + Color Camera ESP32 Board</h5>
                  <p class="item-descr">
                     DepthAI with a builtin ESP32.
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="pages/products/bw1092.html" class="btn item-cta">Get Started ›</a>
               </footer>
            </div>
         </div>
      </div>
   </div>


Luxonis Github Repositories
###########################

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
   :caption: Contents

   pages/products/index.rst
   pages/api.rst
   pages/faq.rst
   pages/support.rst
   pages/troubleshooting.rst
   pages/calibration.rst
   pages/training.rst

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Tutorials

   pages/tutorials/hello_world.rst
   pages/tutorials/pretrained_openvino.rst
   pages/tutorials/multiple.rst
   pages/tutorials/local_convert_openvino.rst
   pages/tutorials/windows_install.rst

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Code samples

   pages/samples/minimal.rst
   pages/samples/color_camera_selfie.rst
   pages/samples/mono_camera_selfie.rst
   pages/samples/object_tracker.rst
   pages/samples/helper_depthai_class.rst
   pages/samples/helper_depthai_generator.rst
