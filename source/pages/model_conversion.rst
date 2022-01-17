Converting model to MyriadX blob
================================

To allow DepthAI to use your custom trained models, you need to convert them into a MyriadX blob file format - so that
they are optimized for the best inference on MyriadX VPU processor.

There are two conversion steps that have to be taken in order to obtain a blob file:

- Use **Model Optimizer** to produce **OpenVINO IR representation** (where IR stands for Intermediate Representation)
- Use **Model Compiler** to convert IR representation into **MyriadX blob**

Image below (from `OpenCV Courses site <https://courses.opencv.org/>`__) shows these steps

.. image:: /_static/images/model_compile.png
  :alt: Model Compile Steps

Below, please find instructions on how to perform these steps using different methods

Local compilation
#################

If you want to perform model conversion and compilation, you can follow:

- `OpenVINO official instructions <https://software.intel.com/content/www/us/en/develop/tools/openvino-toolkit.html>`__
- `OpenVINO Python notebooks <https://github.com/openvinotoolkit/openvino_notebooks>`__
- `Our local model compilation tutorial <https://docs.luxonis.com/projects/api/en/latest/tutorials/local_convert_openvino/>`__
- `Custom model conversion & compilation notes <https://github.com/luxonis/depthai/blob/main/README.md#conversion-of-existing-trained-models-into-intel-movidius-binary-format>`__

Using Google Colab
##################

You can also train and convert models using Google Colab notebook. You can take a look at our :ref:`Custom training` page, where
every tutorial contains also conversion & compilation steps performed directly inside the notebooks.

An example notebook with the compilation steps is `here <https://colab.research.google.com/github/luxonis/depthai-ml-training/blob/master/colab-notebooks/Easy_Object_Detection_With_Custom_Data_Demo_Training.ipynb#scrollTo=_PlfZAR1OCK2>`__

Using online converter
######################

You can also visit our online `MyriadX Blob converter <http://blobconverter.luxonis.com/>`__
that allows specifying different OpenVINO target versions and supports conversions from **TensorFlow, Caffe, OpenVINO IR and OpenVINO Model Zoo**

.. image:: /_static/images/blobconverter_web.png
  :alt: BlobConverter Web

Using blobconverter package
###########################

For automated usage of our blobconverter tool, we have released a `blobconverter PyPi package <https://pypi.org/project/blobconverter/>`__,
that allows compiling MyriadX blobs both from the command line and from the Python script directly.

Install and usage instructions can be found `here <https://github.com/luxonis/blobconverter/tree/master/cli>`__

Model performance
#################

You can estimate the performance of your model with the help of the chart below. It contains FPS estimations
of models on OAK devices in dependence of FLOPs and parameters.

.. image:: /_static/images/fps_models.png

You can find more detailed evaluation of FPS for commond models `in this sheet <https://docs.google.com/spreadsheets/u/8/d/e/2PACX-1vQ_tVk2PhOhnFeJrL5t2rtncxHeDVYX8j1o52vdZozRzXJ5C3gq8EngVvx32suCPasIelIwU5Ny6tLE/pubhtml?gid=41416082&single=true>`__.

Troubleshooting
###############

When converting your model to the OpenVINO format or compiling it to a :code:`.blob`, you might come across an issue. This usually
means that a **connection between two layers is not supported** or that the **layer is not supported**.

For **visualization of NN models** we suggest using `Netron app <https://netron.app/>`__.

.. image:: /_static/images/tutorials/netron.jpeg
  :alt: Netron


Supported layers
****************

When converting your model to OpenVINO's IR format (:code:`.bin` and :code:`.xml`), you have to check if the OpenVINO supports layers
that were used. Here are supported layers and their limitations for `Caffee <https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#caffe_supported_layers>`__, `MXNet <https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#mxnet_supported_symbols>`__, `TensorFlow <https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#tensorflow_supported_operations>`__, `TensorFlow 2 Keras <https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#tensorflow_2_keras_supported_operations>`__, `Kaldi <https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#kaldi_supported_layers>`__, and `ONNX <https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#onnx_supported_operators>`__.

Unsupported layer type "layer_type"
***********************************

When using `compile_tool <https://docs.openvinotoolkit.org/latest/openvino_inference_engine_tools_compile_tool_README.html>`__ to compile from IR (.xml/.bin) into .blob, you might get an error like this:

.. code-block:: bash

  Failed to compile layer "Resize_230": unsupported layer type "Interpolate"

This means that the layer type is not supported by the VPU (Intels Myriad X). You can find supported OpenVINO layers by the VPU `here <https://docs.openvinotoolkit.org/latest/openvino_docs_IE_DG_supported_plugins_Supported_Devices.html#supported_layers>`__,
under the **Supported Layers** header, in the third column (**VPU**). Refer to `official Intel's troubleshooting docs <https://docs.openvinotoolkit.org/latest/openvino_docs_IE_DG_supported_plugins_VPU.html#troubleshooting>`__ for more information.


Incorrect data types
********************

If the compiler returns something along the lines of **"check error: input #0 has type S32, but one of [FP16] is expected"**,
it means that you are using incorrect data types. In the case above, an INT32 layer is connected to FP16 directly.
There should be a conversion in between these layers, and we can achieve that by using the OpenVINOs `Convert <https://docs.openvinotoolkit.org/latest/openvino_docs_ops_type_Convert_1.html>`__
layer between these two layers. You can do that by editing your models :code:`.xml` and adding the `Convert <https://docs.openvinotoolkit.org/latest/openvino_docs_ops_type_Convert_1.html>`__
layer. You can find additional information on this `discord thread <https://discord.com/channels/790680891252932659/799407361986658354/854501905799184414>`__.



.. include::  /pages/includes/footer-short.rst
