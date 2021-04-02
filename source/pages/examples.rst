Demos & Examples
================

In this section, we will showcase what you can build with DepthAI. Different examples will showcase a different usage
of DepthAI capabilities, which can both encourage you to develop your own ideas or dive deeper into DepthAI capabilities
to discover them yourself.

Demo script
###########

.. warning::

  This is currently in progress

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
                  <a href="https://www.youtube.com/watch?v=PwnVrPaF-vs" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/5244214/106005496-954a8200-60b4-11eb-923e-b84df9de9fff.gif" alt="Age Gender Recognition"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Age Gender Recognition</h5>
                  <p class="item-descr">
                      This example demonstrates how to run 2 stage inference on DepthAI using Gen2 Pipeline Builder.
                      First, a face is detected on the image and then the cropped face frame is sent to age gender recognition network, which
                      produces the estimated results
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-age-gender" class="btn item-cta">Try now ›</a>
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
                      This experiment allows you to run the COVID-19 mask/no-mask object detector which was trained via
                      the Google Colab tutorial <a href="https://github.com/luxonis/depthai-ml-training/tree/master/colab-notebooks#covid-19-maskno-mask-training" target="_blank">here</a>.
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
                  <img class="item-img" src="https://user-images.githubusercontent.com/32992551/99454609-e59eaa00-28e3-11eb-8858-e82fd8e6eaac.png" alt="Camera Demo"/>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Camera Demo</h5>
                  <p class="item-descr">
                      This example shows how to use the DepthAI/megaAI/OAK cameras in the Gen2 Pipeline Builder over USB.
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-camera-demo" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://www.youtube.com/watch?v=tB_-mVVNIro" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/5244214/111202991-c62f3980-85c4-11eb-8bce-a3c517abeca1.gif" alt="COVID-19 mask detection"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">License Plates Recognition</h5>
                  <p class="item-descr">
                      This example demonstrates how to run 2 stage inference on DepthAI using Gen2 Pipeline Builder.
                      First, a license plate is detected on the image and then the cropped license frame is sent to text
                      detection network, which tries to decode the license plates texts
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
                  <a href="https://www.youtube.com/watch?v=zjcUChyyNgI" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/32992551/109359126-25a9ed00-7842-11eb-9071-cddc7439e3ca.png" alt="Deeplabv3"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Deeplabv3 (Segmentation)</h5>
                  <p class="item-descr">
                      This example shows how to run Deeplabv3+ on DepthAI in the Gen2 API system.
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-deeplabv3_person" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

         <div class="items-col">
            <div class="item">
               <div class="item-img-wrapper">
                  <a href="https://www.youtube.com/watch?v=Py3-dHQymko" target="_blank">
                    <img class="item-img" src="https://user-images.githubusercontent.com/5244214/107493701-35f97100-6b8e-11eb-8b13-02a7a8dbec21.gif" alt="COVID-19 mask detection"/>
                  </a>
               </div>
               <div class="item-body">
                  <h5 class="item-title">Human Pose Estimation</h5>
                  <p class="item-descr">
                      This example demonstrates how to run Human Pose Estimation Network using Gen2 Pipeline Builder.
                  </p>
               </div>
               <footer class="item-footer">
                  <a href="https://github.com/luxonis/depthai-experiments/tree/master/gen2-human-pose" class="btn item-cta">Try now ›</a>
               </footer>
            </div>
         </div>

      </div>
   </div>