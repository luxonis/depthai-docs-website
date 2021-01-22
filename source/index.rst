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
                  <img class="item-img" src="./_images/bw1094.jpg" alt="Raspberry Pi HAT"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Raspberry Pi HAT</h5>
                  <p class="item-descr">
                     DepthAI HAT for Raspberry Pi (3, 3B+, and 4). Add your choice of cameras.
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="pages/products/bw1094.html" class="btn item-cta">Get Started ›</a>
               </footer>
            </div>
         </div>
      </div>
   </div>

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
