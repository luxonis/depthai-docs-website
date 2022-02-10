AI / ML / NN
============

.. toctree::
   :hidden:

   model_conversion.rst
   tutorials/pretrained_openvino.rst
   tutorials/local_convert_openvino.rst

`OAK cameras <https://docs.luxonis.com/projects/hardware/en/latest/>`__ can **run any AI model**, even custom
architectured/built ones. You can even run multiple AI models at the same time, either in parallel or series (a `demo here <https://github.com/luxonis/depthai-experiments/tree/master/gen2-gaze-estimation#gen2-gaze-estimation>`__).

To run a custom AI model on the device, you need to **convert it** to the .blob format - :ref:`documentation here <Converting model to MyriadX blob>`.

You can also choose to use one of **250+ pretrained AI models** from either `OpenVINO Model Zoo <https://github.com/openvinotoolkit/open_model_zoo>`__
or `DepthAI Model Zoo <https://github.com/luxonis/depthai-model-zoo>`__, read more at :ref:`Use a Pre-trained OpenVINO model`.

Model performance
-----------------

You can estimate the performance of your model with the help of the chart below. It contains FPS estimations
of models on OAK devices in dependence of FLOPs and parameters.

.. image:: /_static/images/fps_models.png

You can find more detailed evaluation of FPS for commond models `in this sheet <https://docs.google.com/spreadsheets/u/8/d/e/2PACX-1vQ_tVk2PhOhnFeJrL5t2rtncxHeDVYX8j1o52vdZozRzXJ5C3gq8EngVvx32suCPasIelIwU5Ny6tLE/pubhtml?gid=41416082&single=true>`__.

.. include::  /pages/includes/footer-short.rst
