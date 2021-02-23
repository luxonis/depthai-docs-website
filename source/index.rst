.. Luxonis Docs documentation master file, created by
   sphinx-quickstart on Tue Nov  3 14:34:56 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

DepthAI's documentation
=======================

*Learn about DepthAI ecosystem, available devices, calibration instructions, and more*

DepthAI is the embedded spatial AI platform that helps you build products with true realtime 3D object localization
(think 3D object detection) and tracking. DepthAI offloads AI, depth vision and more - processed direct from built-in
cameras - freeing your host to process application-specific data.
Best of all, it is modular and MIT-licenced open source, affording adding these Spatial AI/CV super powers to real commercial products. 

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
                  <a href="https://docs.luxonis.com/projects/api/en/gen2_develop/" class="btn item-cta">Get Started ›</a>
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


Neural Networks Performance on DepthAI
######################################

.. note::

   These neural networks can be run using `gen2 demo script <https://github.com/luxonis/depthai/blob/gen2/gen2_demo.py>`__


============================================ =========== ==========================================================================================
Neural Network                               Performance Run command (`gen2_demo.py <https://github.com/luxonis/depthai/blob/gen2/gen2_demo.py>`__)
============================================ =========== ==========================================================================================
mobilenet-ssd                                30 FPS      :code:`python3 gen2_demo.py -cnn mobilenet-ssd`
face-detection-adas-0001                     28 FPS      :code:`python3 gen2_demo.py -cnn face-detection-adas-0001`
face-detection-retail-0004                   30 FPS      :code:`python3 gen2_demo.py -cnn face-detection-retail-0004`
pedestrian-detection-adas-0002               30 FPS      :code:`python3 gen2_demo.py -cnn pedestrian-detection-adas-0002`
person-detection-retail-0013                 30 FPS      :code:`python3 gen2_demo.py -cnn person-detection-retail-0013`
person-vehicle-bike-detection-crossroad-1016 7 FPS       :code:`python3 gen2_demo.py -cnn person-vehicle-bike-detection-crossroad-1016`
vehicle-detection-adas-0002                  30 FPS      :code:`python3 gen2_demo.py -cnn vehicle-detection-adas-0002`
vehicle-license-plate-detection-barrier-0106 30 FPS      :code:`python3 gen2_demo.py -cnn vehicle-license-plate-detection-barrier-0106`
tiny-yolo-v3                                 30 FPS      :code:`python3 gen2_demo.py -cnn tiny-yolo-v3`
yolo-v3                                      2 FPS       :code:`python3 gen2_demo.py -cnn yolo-v3`
============================================ =========== ==========================================================================================

.. include::  /pages/includes/footer-long.rst


.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Subprojects:

   DepthAI API <https://docs.luxonis.com/projects/api/en/gen2_develop/>
   DepthAI GUI <https://docs.luxonis.com/projects/gui/en/latest/>


.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Contents:

   pages/faq.rst
   pages/support.rst
   pages/troubleshooting.rst
   pages/products.rst
   pages/calibration.rst
   pages/training.rst
