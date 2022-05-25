DepthAI's Documentation
=======================

.. note::

   Just received an OAK camera? Start :ref:`here <First steps with DepthAI>`!

DepthAI is a :ref:`Spatial AI <spatialai>` **platform**, which allows **robots and computers** to **perceive the world like a
human** can - what objects or features are - and **where they are in physical world.**
It focuses on the combination of these **5 key features**:

#. :ref:`Artificial Intelligence <AI / ML / NN>`
#. :ref:`Computer Vision`
#. :ref:`Depth perception` (`Stereo <https://docs.luxonis.com/projects/api/en/latest/components/nodes/stereo_depth/#internal-block-diagram-of-stereodepth-node>`__, `ToF <https://docs.luxonis.com/projects/hardware/en/latest/pages/DM0255.html#oak-ffc-ptof>`__)
#. Performant (high resolution and FPS, `multiple sensors <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/supported_sensors.html>`__)
#. Embedded, low power solution

DepthAI platform is built around `Movidius VPU <https://www.intel.com/content/www/us/en/products/details/processors/movidius-vpu.html>`__
- it's a complete ecosystem of custom `hardware <https://docs.luxonis.com/projects/hardware/en/latest/>`__, firmware, and `software API <https://docs.luxonis.com/projects/api/en/latest/>`__. 
Best of all, it is modular and you can **integrate** this technology **into your products** (`docs here <https://docs.luxonis.com/projects/hardware/en/latest/pages/guides/integrating_depthai_into_products.html>`__).

Demo Script
-----------

Demo script is our multipurpose command line demo tool, built around pipeline builder API, that allows you to check
DepthAI features straight from the command line - no coding required!  It works USB and POE equally, automatically discovering any POE DepthAI on your LAN and/or USB DepthAI connected to your computer.  If multiple are connected, it will prompt you on which to use for the demo.

.. image:: https://user-images.githubusercontent.com/18037362/132068313-e6db90c2-823b-42f2-86fb-148e798f55de.png
  :alt: Default run

To install and run the demo script on your OAK camera, type the following commands in the terminal.

.. code-block:: bash

  git clone https://github.com/luxonis/depthai.git
  cd depthai
  python3 install_requirements.py
  python3 depthai_demo.py

And then following up with the `README.md <https://github.com/luxonis/depthai/blob/main/README.md>`__ for more usage examples.
We have also prepared a **step by step guide** :ref:`here <First steps with DepthAI>` with detailed instructions how to set up your DepthAI and run this script.

If you have issues during the installation, see our `Installation page <https://docs.luxonis.com/projects/api/en/latest/install/>`__ for additional OS-specific
instructions

Example Use Cases
-----------------

In this section, you'll find an inspiration what can you build right away with DepthAI.

.. raw:: html

   <div class="items-container">
      <div class="items-row">

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="https://user-images.githubusercontent.com/5244214/127147829-0b12b913-85ee-484f-92a0-3ab2bac00ec4.gif" alt="Blazepose Demo"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Pose Estimation</h5>
                  <span class="item-descr">
                      <p>This example shows how to run Google Mediapipe single body pose tracking models</p>
                      <p>Created by our contributor - <a href="https://github.com/geaxgx" target="_blank">Geaxgx</a></p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/geaxgx/depthai_blazepose" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="https://user-images.githubusercontent.com/5244214/127148741-7f1e0279-5cbc-41a2-95f6-b2d3990131a8.gif" alt="Hand tracker Demo"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Hand Tracking</h5>
                  <span class="item-descr">
                      <p>This example shows how to run Google Mediapipe hand tracking models</p>
                      <p>Created by our contributor - <a href="https://github.com/geaxgx" target="_blank">Geaxgx</a></p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/geaxgx/depthai_hand_tracker" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

      </div>
      <div class="items-row">

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://youtu.be/BcjZLaCYGi4" target="_blank">
                     <img class="item-img" src="https://user-images.githubusercontent.com/5244214/127150740-b9e8dcd7-3188-4a83-93a8-d1211219ebdb.gif" alt="Human Machine Safety Demo"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Human-Machine Safety</h5>
                  <span class="item-descr">
                      <p>This example shows how to use the DepthAI to detect dangerous interactions between humans and other objects.</p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-human-machine-safety" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://youtu.be/tB_-mVVNIro" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/5244214/111202991-c62f3980-85c4-11eb-8bce-a3c517abeca1.gif" alt="License plates detection demo"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">License Plates & Car Attributes Recognition</h5>
                  <p class="item-descr">
                      <p>This experiment allows you to run multiple neural networks at once to collect car attributes and license plates (only Chinese)</p>
                  </p>
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

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <img class="item-img" src="https://user-images.githubusercontent.com/5244214/115357410-e900cf00-a1bc-11eb-97d7-baac5d052572.gif" alt="Sign Language Recognition"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Sign Language Recognition</h5>
                  <span class="item-descr">
                      <p>This example demonstrates how to recognize American Sign Language (ASL) on DepthAI using hand landmarks </p>
                      <p>This example was created by <a href="https://www.cortic.ca/post/classifying-american-sign-language-alphabets-on-the-oak-d" target="_blank">Cortic Technology</a></p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/cortictechnology/hand_asl_recognition" class="btn item-cta">Try now ›</a>
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
                  <img class="item-img" src="https://user-images.githubusercontent.com/18037362/134054837-eed40899-7c1d-4160-aaf0-1d7c405bb7f4.gif" alt="Face Recognition"/>
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

      </div>
      <div class="items-row">

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

      </div>
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
                  <a href="https://www.youtube.com/watch?v=M1LTqGy-De4" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/18037362/134072030-102f4567-2071-491e-b97f-049d558dd812.gif" alt="Deeplabv3"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Deeplabv3 (Segmentation)</h5>
                  <span class="item-descr">
                      <p>This example shows how to run Deeplabv3+ and crop the depth image based on the models output.</p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-deeplabv3_depth" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

      </div>
      <div class="items-row">

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

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://www.youtube.com/watch?v=Bv-p76A3YMk" target="_blank">
                     <img class="item-img" src="https://user-images.githubusercontent.com/5244214/115358042-8d831100-a1bd-11eb-8782-415392c71a87.png" alt="Gen2 OCR"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Text Detection + OCR</h5>
                  <span class="item-descr">
                    <p>This example demonstrates the Gen2 Pipeline Builder running text detection (EAST) followed by optical character recognition of the detected text</p>
                  </span>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-ocr" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

      </div>
   </div>

Tools & API Examples
--------------------

In this section, you'll see examples of various API usage permutations, to show what the API is capable of or to solve
some meta problem, like how to stream the data, how to collect it and alike.

.. list-table:: Tools / Examples
  :widths: 10 90

  * - `OCR <https://github.com/luxonis/depthai-experiments/tree/master/gen2-ocr>`__
    - This pipeline implements text detection (EAST) followed by optical character recognition of the detected text
  * - `Multiple Devices <https://github.com/luxonis/depthai-experiments/tree/master/gen2-multiple-devices>`__
    - This example shows how you can use multiple DepthAI's on a single host. The demo will find all devices connected to the host and display an RGB preview from each of them
  * - `Class Saver <https://github.com/luxonis/depthai-experiments/tree/master/gen2-class-saver-jpeg>`__
    - This example demonstrates how to run MobilenetSSD and collect images of detected objects, grouped by detection label
  * - `Message Syncing <https://github.com/luxonis/depthai-experiments/tree/master/gen2-syncing>`__
    - This example shows how to sync messages (eg. NN results with frames) with software, based on either timestamps or sequence numbers
  * - `SPI <https://github.com/luxonis/depthai-experiments/tree/master/gen2-spi>`__
    - This directory contains a few examples of how to use the SPI interface with the Pipeline builder API
  * - `TensorFlow Image Classification <https://github.com/luxonis/depthai-experiments/tree/master/gen2-tf-image-classification>`__
    - This example demonstrates how to run a neural network created using TensorFlow Image Classification tutorial
  * - `WLS Filtering <https://github.com/luxonis/depthai-experiments/tree/master/gen2-wls-filter>`__
    - This example demonstrates how to do host-side WLS filtering using the rectified_right and depth stream from DepthAI API

Ecosystem
---------

.. list-table:: Core Repositories
  :widths: 10 90

  * - `depthai-python <https://github.com/luxonis/depthai-python/>`__
    - Here you’ll find Python bindings creating the Python API of DepthAI
  * - `depthai-core <https://github.com/luxonis/depthai-core/>`__
    - Our core API written in C++
  * - `depthai-shared <https://github.com/luxonis/depthai-shared/>`__
    - This repository contains shared data between our main firmware
      and depthai-core host library.
  * - `depthai-ros <https://github.com/luxonis/depthai-ros/>`__
    - DepthAI ROS Wrapper. This is an attempt at basic DepthAI to ROS2
      interface. It's largely leveraging the existing depthai-python examples.
  * - `depthai-unity <https://github.com/luxonis/depthai-unity>`__
    - DepthAI Unity Wrapper projects and examples. Useful for synthetic dataset generation.
  * - `depthai-hardware <https://github.com/luxonis/depthai-hardware/>`__
    - This repository contains Luxonis open sourced baseboards, and contains
      Altium design files, documentation, and pictures to help you
      understand more about the embedded hardware that powers DepthAI.
  * - `depthai-spi-api <https://github.com/luxonis/depthai-spi-api/>`__
    - API of the SPI protocol
  * - `depthai-spi-library <https://github.com/luxonis/depthai-spi-library/>`__
    - DepthAI SPI Library
  * - `depthai-bootloader-shared <https://github.com/luxonis/depthai-bootloader-shared/>`__
    - The depthai-bootloader-shared repository contains shared data
      between our bootloader firmware and depthai-core host library.


.. list-table:: Tools & Docs Repositories
  :widths: 10 90

  * - `depthai-ml-training <https://github.com/luxonis/depthai-ml-training/>`__
    - Here you can find repositories to help you connect your NN and create BLOBs.
  * - `blobconverter <https://github.com/luxonis/blobconverter/>`__
    - Web-based tool to convert model into MyriadX blob
  * - `depthai-gui <https://github.com/luxonis/depthai-gui/>`__
    - DepthAI GUI is a WYSIWYG tool that allows to create a custom DepthAI pipelines, run them and see the results - all in one tool.
  * - `depthai-tutorials <https://github.com/luxonis/depthai-tutorials/>`__
    - This repo contains source code for tutorials published on docs.luxonis.com.
  * - `Factory-calibration-DepthAI <https://github.com/luxonis/Factory-calibration-DepthAI/>`__
    - Factory Calibration (WIP); This package contains two ROS workspace one is for depthai capture and calibration node and another is for Interbotix ViperX 300 Robot Arm 6DOF (KIT-VIPX300-6DOF) arm bot control using moveit.
  * - `depthai-docker <https://github.com/luxonis/depthai-docker/>`__
    - This repository contains a Dockerfile, that allows you to run OpenVINO on DepthAI inside a Docker container.
  * - `sbr-util <https://github.com/luxonis/sbr-util/>`__
    - Utility to view and manipulate SBR binary images
  * - `depthai-docs-website <https://github.com/luxonis/depthai-docs-website/>`__
    - If you want to contribute and update our docs, you can simply create a pull request.


.. list-table:: Demo Repositories
  :widths: 10 90

  * - `depthai-experiments <https://github.com/luxonis/depthai-experiments/>`__
    - In this repository, you'll find various experiments using DepthAI. You can use those examples as a basis or a reference in your application.
  * - `depthai <https://github.com/luxonis/depthai/>`__
    - This repo contains a demo application, which can load different networks, create pipelines, record video, etc. This program includes an example of depth & CNN inference and ready to use models.
  * - `esp32-spi-message-demo <https://github.com/luxonis/esp32-spi-message-demo/>`__
    - ESP32 reference app for interfacing with DepthAI over SPI
  * - `depthai-core-example <https://github.com/luxonis/depthai-core-example/>`__
    - CMake example project which serves as a template on how to quickly get started with C++ and depthai library

.. include::  /pages/includes/footer-long.rst

.. toctree::
   :hidden:
   :maxdepth: 0

   index


.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Tutorials

   pages/tutorials/first_steps.rst
   pages/spatial-ai.rst
   pages/ai_ml_nn.rst
   pages/depth.rst
   pages/cv.rst
   pages/tutorials/depth.rst
   pages/tutorials/on-device-programming.rst

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Modules:

   C++/Python API <https://docs.luxonis.com/projects/api/en/latest/>
   DepthAI SDK <https://docs.luxonis.com/projects/sdk/en/latest/>
   Hardware Products <https://docs.luxonis.com/projects/hardware/en/latest/>


.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Contents

   pages/faq.rst
   pages/calibration.rst
   pages/oak_webcam.rst
   pages/troubleshooting.rst
   pages/slam_oak.rst
   pages/oak_on_drones.rst
   pages/education.rst
   pages/support.rst
