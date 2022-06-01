AI / ML / NN
============

.. toctree::
   :hidden:

   model_conversion.rst
   tutorials/deploying-custom-model.rst
   tutorials/local_convert_openvino.rst
   tutorials/pretrained_openvino.rst
   training.rst

`OAK cameras <https://docs.luxonis.com/projects/hardware/en/latest/>`__ can **run any AI model**, even custom
architectured/built ones. You can even run multiple AI models at the same time, either in parallel or series (a `demo here <https://github.com/luxonis/depthai-experiments/tree/master/gen2-gaze-estimation#gen2-gaze-estimation>`__).

To run a custom AI model on the device, you need to **convert it** to the .blob format - :ref:`documentation here <Converting model to MyriadX blob>`.

You can also choose to use one of **250+ pretrained AI models** from either `OpenVINO Model Zoo <https://github.com/openvinotoolkit/open_model_zoo>`__
or `DepthAI Model Zoo <https://github.com/luxonis/depthai-model-zoo>`__, read more at :ref:`Use a Pre-trained OpenVINO model`.

Model Performance
#################

You can estimate the performance of your model with the help of the chart below. It contains FPS estimations
of models on OAK devices in dependence of FLOPs and parameters.

.. image:: /_static/images/fps_models.png

You can find more detailed evaluation of FPS for commond models `in this sheet <https://docs.google.com/spreadsheets/u/8/d/e/2PACX-1vQ_tVk2PhOhnFeJrL5t2rtncxHeDVYX8j1o52vdZozRzXJ5C3gq8EngVvx32suCPasIelIwU5Ny6tLE/pubhtml?gid=41416082&single=true>`__.

AI vision tasks
###############

We have open-source examples and demos for many different AI vision tasks, such as:

- **Object detection** models provide bounding box, confidence, and label of all detected objects. Demos: `MobileNet <https://docs.luxonis.com/projects/api/en/latest/samples/MobileNet/rgb_mobilenet/#rgb-mobilenetssd>`__, `Yolo <https://docs.luxonis.com/projects/api/en/latest/samples/Yolo/tiny_yolo/#rgb-tiny-yolo>`__, `EfficientDet <https://github.com/luxonis/depthai-experiments/tree/master/gen2-efficientDet>`__, `Palm detection <https://github.com/luxonis/depthai-experiments/tree/master/gen2-palm-detection>`__.
- **Landmark detection** models provide landmarks/keypoints of an object. Demos: `Human pose <https://github.com/geaxgx/depthai_blazepose#blazepose-tracking-with-depthai>`__, `hand landmarks <https://github.com/geaxgx/depthai_hand_tracker#hand-tracking-with-depthai>`__, and `facial landmarks <https://github.com/luxonis/depthai-experiments/tree/master/gen2-facemesh#gen2-facial-landmarks-on-depthai>`__.
- **Semantic segmentation** models provide label/class for each pixel. Demos: `Person segmentation <https://github.com/luxonis/depthai-experiments/tree/master/gen2-deeplabv3_depth>`__, `multiclass segmentation <https://github.com/luxonis/depthai-experiments/tree/master/gen2-deeplabv3_multiclass#gen2-deeplabv3-multiclass-on-depthai>`__, `road segmentation <https://github.com/luxonis/depthai-experiments/tree/master/gen2-road-segmentation#gen2-road-segmentation-on-depthai>`__.
- **Classification** models provide classification label and confidence in that label. Demos: `EfficientNet <https://github.com/luxonis/depthai-experiments/tree/master/gen2-efficientnet-classification#efficientnet-b0>`__, `Tensorflow classification <https://github.com/luxonis/depthai-experiments/tree/master/gen2-tf-image-classification#demo>`__, `fire classification <https://github.com/luxonis/depthai-experiments/tree/master/gen2-fire-detection>`__, `emotions classification <https://github.com/luxonis/depthai-experiments/tree/master/gen2-emotion-recognition>`__.
- **Recognition** models provide byte array that can be used for recognition or recognized feature itself. Demos: `Face recognition <https://github.com/luxonis/depthai-experiments/tree/master/gen2-face-recognition#demo>`__, `person identification <https://github.com/luxonis/depthai-experiments/tree/master/gen2-pedestrian-reidentification>`__, `OCR <https://github.com/luxonis/depthai-experiments/tree/master/gen2-ocr#how-to-run>`__, `license plate recognition <https://github.com/luxonis/depthai-experiments/tree/master/gen2-license-plate-recognition>`__.

There are also many other AI vision tasks that don't fall in any of the categories above, like `crowd counting <https://github.com/luxonis/depthai-experiments/tree/master/gen2-crowdcounting#gen2-crowd-counting-with-density-maps-on-depthai>`__,
`monocular depth estimation <https://github.com/luxonis/depthai-experiments/tree/master/gen2-depth-mbnv2>`__, `gaze estimation <https://github.com/luxonis/depthai-experiments/tree/master/gen2-gaze-estimation>`__, or
`age/gender estimation <https://github.com/luxonis/depthai-experiments/tree/master/gen2-age-gender>`__.

**All of the demos above run on color/grayscale frames**. Many of these vision tasks can be **fused with the depth perception**
(on the OAK camera itself), which unlocks the power of :ref:`Spatial AI <spatialai>`.

.. include::  /pages/includes/footer-short.rst
