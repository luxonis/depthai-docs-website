.. Luxonis Docs documentation master file, created by
   sphinx-quickstart on Tue Nov  3 14:34:56 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

DepthAI's documentation
=======================

*Learn about DepthAI ecosystem, available devices, calibration instructions, and more*

DepthAI is the embedded :ref:`spatial <spatialai>` AI platform built around `Myriad X <https://www.intel.com/content/www/us/en/products/details/processors/movidius-vpu/movidius-myriad-x.html>`__
- a complete ecosystem of custom `hardware <https://github.com/luxonis/depthai-hardware>`__, firmware, `software <https://docs.luxonis.com/projects/api/en/latest/>`__,
and AI training. It combines neural inference, depth vision, and feature tracking into an easy-to-use, works-in-30-seconds solution.

DepthAI offloads AI, depth vision and more - processed direct from built-in cameras - freeing your host to process application-specific data.

DepthAI gives you power of AI, depth, and tracking in a single device with a simple, easy-to-use API, written in Python and C++.

Best of all, it is modular (System on Module) and built on `MIT-licensed open source hardware <https://github.com/luxonis/depthai-hardware>`__, affording adding these Spatial AI/CV super powers to real commercial products.

Demos & Examples
================

In this section, we will showcase what you can build with DepthAI. Different examples will showcase a different usage
of DepthAI capabilities, which can both encourage you to develop your own ideas or dive deeper into DepthAI capabilities
to discover them yourself.

Demo script
###########

.. warning::

  Demo script is currently in progress

Our multipurpose command line demo tool for Gen2 is currently in progress, and you can actively check it's progress
both on the `migration Pull Request <https://github.com/luxonis/depthai/pull/349>`__ or give it a try yourself
by giving a try to `gen2 branch <https://github.com/luxonis/depthai/tree/gen2>`__ by running these commands

.. code-block:: bash

  git clone git@github.com:luxonis/depthai.git
  cd depthai
  git checkout gen2
  python3 install_requirements.py
  python3 gen2_demo.py

And then following up with the `README.md <https://github.com/luxonis/depthai/blob/gen2/README.md>`__ for more usage examples

Example Use Cases
#################

In this section, you'll find an inspiration what can you build right away with DepthAI

.. raw:: html

   <div class="items-container">
      <div class="items-row">

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="https://user-images.githubusercontent.com/32992551/99454609-e59eaa00-28e3-11eb-8858-e82fd8e6eaac.png" alt="Camera Demo"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Camera Demo</h5>
                  <span class="item-descr">
                      <p>This example shows how to use the DepthAI/megaAI/OAK cameras in the Gen2 Pipeline Builder over USB.</p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-camera-demo" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://youtu.be/c4KEFG2eR3M" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/5244214/112673778-6a3a9f80-8e65-11eb-9b7b-e352beffe67a.gif" alt="COVID-19 mask detection"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">COVID-19 mask detection</h5>
                  <p class="item-descr">
                      <p>This experiment allows you to run the COVID-19 mask/no-mask object detector which was trained via</p>
                      <p>the Google Colab tutorial <a href="https://github.com/luxonis/depthai-ml-training/tree/master/colab-notebooks#covid-19-maskno-mask-training" target="_blank">here</a>.</p>
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/edit/master/gen2-coronamask" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

      </div>
      <div class="items-row">

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://user-images.githubusercontent.com/5244214/106155520-0f483d00-6181-11eb-8b95-a2cb73cc4bac.mp4" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/5244214/106155937-4fa7bb00-6181-11eb-8c23-21abe12f7fe4.gif" alt="Gaze estimation"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Gaze Estimation</h5>
                  <span class="item-descr">
                      <p>This example demonstrates how to run 3 stage inference (3-series, 2-parallel) on DepthAI using Gen2 Pipeline Builder.</p>
                      <p>Original OpenVINO demo, on which this example was made, is <a target="_blank" href="https://docs.openvinotoolkit.org/2021.1/omz_demos_gaze_estimation_demo_README.html">here</a>.</p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-gaze-estimation" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://www.youtube.com/watch?v=tB_-mVVNIro" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/5244214/111202991-c62f3980-85c4-11eb-8bce-a3c517abeca1.gif" alt="License Plates Recognition"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">License Plates Recognition</h5>
                  <span class="item-descr">
                      <p>This example demonstrates how to run 2 stage inference on DepthAI using Gen2 Pipeline Builder.</p>
                      <p>First, a license plate is detected on the image and then the cropped license frame is sent to text detection network, which tries to decode the license plates texts</p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-license-plate-recognition" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

      </div>
      <div class="items-row">

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://www.youtube.com/watch?v=zjcUChyyNgI" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/32992551/109359126-25a9ed00-7842-11eb-9071-cddc7439e3ca.png" alt="Deeplabv3"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Deeplabv3 (Segmentation)</h5>
                  <span class="item-descr">
                      <p>This example shows how to run Deeplabv3+ on DepthAI in the Gen2 API system.</p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-deeplabv3_person" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="https://github.com/geaxgx/depthai_blazepose/raw/main/img/taichi.gif" alt="Pose Estimation"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Pose Estimation</h5>
                  <span class="item-descr">
                      <p>Running Google Mediapipe body pose tracking models on DepthAI</p>
                      <p>This example was created by our contributor - <a href="https://github.com/geaxgx" target="_blank">Geaxgx</a></p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-human-pose" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

      </div>
      <div class="items-row">

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://www.youtube.com/watch?v=QlXGtMWVV18" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/32992551/108567421-71e6b180-72c5-11eb-8af0-c6e5c3382874.png" alt="Deeplabv3"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Pedestrian reidentification</h5>
                  <p class="item-descr">
                      <p>This example demonstrates how to run 2 stage inference on DepthAI using Gen2 Pipeline Builder.</p>
                      <p>Original OpenVINO demo, on which this example was made, is <a target="_blank" href="https://docs.openvinotoolkit.org/2020.1/_demos_pedestrian_tracker_demo_README.html">here</a>.</p>
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-pedestrian-reidentification" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://www.youtube.com/watch?v=Py3-dHQymko" target="_blank">
                    <img class="item-img" src="https://github.com/luxonis/depthai-experiments/raw/master/gen2-head-posture-detection/media/pose.gif" alt="Head posture detection"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Head posture detection</h5>
                  <span class="item-descr">
                      <p>This example demonstrates the Gen2 Pipeline Builder running face detection network and head detection network</p>
                      <p>This example was created by our partner - <a href="https://www.arducam.com/oak-opencv-ai-kit-camera/" target="_blank">ArduCam</a></p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-head-posture-detection" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

      </div>
      <div class="items-row">

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://www.youtube.com/watch?v=PwnVrPaF-vs" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/5244214/106005496-954a8200-60b4-11eb-923e-b84df9de9fff.gif" alt="Age Gender Recognition"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Age Gender Recognition</h5>
                  <span class="item-descr">
                      <p>This example demonstrates how to run 2 stage inference on DepthAI using Gen2 Pipeline Builder.</p>
                      <p>First, a face is detected on the image and then the cropped face frame is sent to age gender recognition network, which produces the estimated results</p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-age-gender" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="https://github.com/luxonis/depthai-experiments/raw/master/gen2-fire-detection/images/fire_demo.gif" alt="Fire detection"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Fire detection</h5>
                  <span class="item-descr">
                      <p>This example demonstrates the Gen2 Pipeline Builder running fire detection network</p>
                      <p>This example was created by our partner - <a href="https://www.arducam.com/oak-opencv-ai-kit-camera/" target="_blank">ArduCam</a></p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-fire-detection" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

      </div>
      <div class="items-row">

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="https://github.com/luxonis/depthai-experiments/raw/master/gen2-face-recognition/images/face_reg.png" alt="Face Recognition"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Face Recognition</h5>
                  <span class="item-descr">
                    <p>This example demonstrates the Gen2 Pipeline Builder running face detection network, head posture estimation network and face recognition network</p>
                    <p>This example was created by our partner - <a href="https://www.arducam.com/oak-opencv-ai-kit-camera/" target="_blank">ArduCam</a></p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-face-recognition" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="https://github.com/luxonis/depthai-experiments/raw/master/gen2-fatigue-detection/media/fatigue.gif" alt="Fatigue Detection"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Fatigue Detection</h5>
                  <span class="item-descr">
                      <p>This example demonstrates the Gen2 Pipeline Builder running face detection network and head detection network</p>
                      <p>This example was created by our partner - <a href="https://www.arducam.com/oak-opencv-ai-kit-camera/" target="_blank">ArduCam</a></p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-fatigue-detection" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

      </div>
   </div>

Tutorials
#########

In this section, you'll find a way to expand your knowledge in DepthAI-related topics. Tutorials listed below are a complete
walkthrough in a specific topic.


.. raw:: html

  <ul class="tutorials-list">
    <li class="tutorials-list-item">
      <div class="tutorials-list-item-desc">
        <h3>Hello World</h3>
        <p>Learn how to use the DepthAI Python API to display a color video stream</p>
      </div>
      <div class="tutorials-list-item-cta">
          <a href="https://docs.luxonis.com/projects/api/en/latest/tutorials/hello_world/" class="btn item-cta">Start now ›</a>
      </div>
    </li>
    <li class="tutorials-list-item">
      <div class="tutorials-list-item-desc">
        <h3>Multiple DepthAI per Host</h3>
        <p>Learn how to use the DepthAI Python API to display a color video stream</p>
      </div>
      <div class="tutorials-list-item-cta">
          <a href="https://docs.luxonis.com/projects/api/en/latest/tutorials/multiple/" class="btn item-cta">Start now ›</a>
      </div>
    </li>
    <li class="tutorials-list-item">
      <div class="tutorials-list-item-desc">
        <h3>Local OpenVINO Model Conversion</h3>
        <p>Learn how to convert OpenVINO IR models into the format required to run on DepthAI</p>
      </div>
      <div class="tutorials-list-item-cta">
          <a href="https://docs.luxonis.com/projects/api/en/latest/tutorials/local_convert_openvino/" class="btn item-cta">Start now ›</a>
      </div>
    </li>
  </ul>

Tools & API Examples
####################

In this section, you'll see examples of various API usage permutations, to show what the API is capable of or to solve
some meta problem, like how to stream the data, how to collect it and alike.

.. list-table:: Tools / Examples
  :widths: 10 90

  * - `OCR <https://github.com/luxonis/depthai-experiments/tree/master/gen2-ocr>`__
    - This pipeline implements text detection (EAST) followed by optical character recognition of the detected text
  * - `Multiple Devices <https://github.com/luxonis/depthai-experiments/tree/master/gen2-multiple-devices>`__
    - This example shows how you can use multiple DepthAI's on a single host. The demo will find all devices connected to the host and display an RGB preview from each of them.
  * - `Class Saver <https://github.com/luxonis/depthai-experiments/tree/master/gen2-class-saver-jpeg>`__
    - This example demonstrates how to run MobilenetSSD and collect images of detected objects, grouped by detection label
  * - `NN Frame Sync <https://github.com/luxonis/depthai-experiments/tree/master/gen2-class-saver-jpeg>`__
    - This example shows how to present the neural network inference results on the inferenced frames
  * - `Frames Sync <https://github.com/luxonis/depthai-experiments/tree/master/gen2-seq-num-sync>`__
    - This example demonstrates how to synchronize incoming frames using their sequence numbers. This allows displaying frames taken in exact same moment
  * - `Frames Sync <https://github.com/luxonis/depthai-experiments/tree/master/gen2-spi>`__
    - This directory contains a few examples of how to use the SPI interface with the Gen2 Pipeline builder
  * - `TensorFlow Image Classification <https://github.com/luxonis/depthai-experiments/tree/master/gen2-tf-image-classification>`__
    - This example demonstrates how to run a neural network created using TensorFlow Image Classification tutorial
  * - `WLS Filtering <https://github.com/luxonis/depthai-experiments/tree/master/gen2-wls-filter>`__
    - This example demonstrates how to do host-side WLS filtering using the rectified_right and depth stream from DepthAI Gen2 API.

Available interfaces
####################

.. raw:: html

   <div class="items-container">
      <div class="items-row">
         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="./_images/depthai-api.jpg" alt="DepthAI API"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">DepthAI API (Python / C++)</h5>
                  <p class="item-descr">
                     Start here if you want to interact with DepthAI using programming interfaces, available both in Python and C++
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="https://docs.luxonis.com/projects/api/" class="btn item-cta">Get Started ›</a>
               </footer>
            </div>
         </div>
         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="./_images/depthai-gui.png" alt="DepthAI GUI"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">DepthAI GUI</h5>
                  <p class="item-descr">
                     Start here if you want to use a drag'n'drop interface to communicate with DepthAI
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="#" class="btn btn-disabled item-cta">Under construction</a>
               </footer>
            </div>
         </div>
      </div>
   </div>

Ecosystem
#########

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
   :caption: Modules:

   C++/Python API <https://docs.luxonis.com/projects/api/en/latest/>


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


.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Tutorials

   pages/tutorials/pretrained_openvino.rst
