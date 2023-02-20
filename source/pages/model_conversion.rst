Converting model to MyriadX blob
################################

.. toctree::
  :hidden:

  tutorials/local_convert_openvino.rst

To allow DepthAI to use your custom trained models, you need to convert them into a MyriadX blob file format - so that
they are optimized for the best inference on MyriadX **VPU** processor.

There are two conversion steps that have to be taken in order to obtain a blob file:

- Use :ref:`Model Optimizer` to produce **OpenVINO IR representation** (where IR stands for Intermediate Representation)
- Use :ref:`Compile Tool` to compile IR representation model into **VPU blob**

.. figure:: /_static/images/model_compile.png

  from `OpenCV Courses site <https://courses.opencv.org/>`__


Model Optimizer
***************

`OpenVINO's Model optimizer <https://docs.openvino.ai/2021.4/openvino_docs_MO_DG_Deep_Learning_Model_Optimizer_DevGuide.html>`__ converts the model from the
original framework format into the OpenVINO's Intermediate Representation (IR) standard format (``.bin`` and ``.xml``).
This format of the model can be deployed across multiple Intel devices: CPU, GPU, iGPU, **VPU** (which we are interested in), and FPGA.

Example usage of Model Optimizer with :ref:`online Blobconverter <1. Using online blobconverter>`:

.. code-block:: bash

  --data_type=FP16 --mean_values=[0,0,0] --scale_values=[255,255,255]

Example for :ref:`local conversion <3. Local compilation>`:

.. code-block:: bash

  mo --input_model path/to/model.onnx --data_type=FP16 --mean_values=[0,0,0] --scale_values=[255,255,255]

All arguments below are also documented on `OpenVINO's docs here <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_Additional_Optimization_Use_Cases.html>`__.

FP16 Data Type
--------------

Since we are converting for VPU (which supports FP16), we need to use parameter ``--data_type=FP16``.
More `information here <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_FP16_Compression.html#doxid-openvino-docs-m-o-d-g-f-p16-compression>`__.

Mean and Scale parameters
-------------------------

OpenVINO's `documentation here <https://docs.openvino.ai/2021.4/openvino_docs_MO_DG_Additional_Optimization_Use_Cases.html#when-to-specify-mean-and-scale-values>`__.
**--mean_values** and **--scale_values** parameters will normalize the input image to the model: ``new_value = (byte - mean) / scale``.
By default, frames from `ColorCamera <https://docs.luxonis.com/projects/api/en/latest/components/nodes/color_camera/>`__/`MonoCamera <https://docs.luxonis.com/projects/api/en/latest/components/nodes/mono_camera/>`__
are in U8 data type (``[0,255]``).

Models are usually trained with normalized frames ``[-1,1]`` or ``[0,1]``, so we need to normalize frames before running the inference.
One (not ideal) option is to create :ref:`Custom model <Run your own CV functions on-device>` that normalizes frames before inferencing (`example here <https://github.com/luxonis/depthai-experiments/blob/master/gen2-custom-models/generate_model/pytorch_normalize.py#L8-L11>`__),
but it's better (more optimized) to do it in the model itself.

Common options:

- **[0,1]** values, mean=0 and scale=255 (``([0,255] - 0) / 255 = [0,1]``)
- **[-1,1]** values, mean=127.5 and scale=127.5 (``([0,255] - 127.5) / 127.5 = [-1,1]``)
- **[-0.5,0.5]** values, mean=127.5 and scale=255 (``([0,255] - 127.5) / 255 = [-0.5,0.5]``)

Model layout parameter
----------------------

OpenVINO's `documentation here <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_Additional_Optimization_Use_Cases.html#when-to-specify-layout>`__.
Model layout can be specified with ``--layout`` parameter. We use **Planar / CHW** layout convention.

Note that by default, `ColorCamera node <https://docs.luxonis.com/projects/api/en/latest/components/nodes/color_camera/>`__
will output ``preview`` frames in **Interleaved / HWC** layout (as it's native to OpenCV), and can be changed to
Planar layout via API:

.. code-block:: python

  import depthai as dai
  pipeline = dai.Pipeline()
  colorCam = pipeline.createColorCamera()
  colorCam.setInterleaved(False) # False = Planar layout

Color order
-----------

OpenVINO's `documentation here <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_Additional_Optimization_Use_Cases.html#when-to-reverse-input-channels>`__.
NN models can be trained on images that have either RGB or BGR color order. You can change from one
to another using ``--reverse_input_channels`` parameter. We use **BGR** color order. For example, see :ref:`Changing color order>`.

Note that by default, `ColorCamera node <https://docs.luxonis.com/projects/api/en/latest/components/nodes/color_camera/>`__
will output ``preview`` frames in **BGR** color order (as it's native to OpenCV), and can be changed to
RGB color order via API:

.. code-block:: python

  import depthai as dai
  pipeline = dai.Pipeline()
  colorCam = pipeline.createColorCamera()
  colorCam.setColorOrder(dai.ColorCameraProperties.ColorOrder.RGB) # RGB color order, BGR by default

Compile Tool
************

After converting the model to OpenVINO's IR format (.bin/.xml), we need to use `OpenVINO's Compile Tool <https://docs.openvino.ai/2021.4/openvino_inference_engine_tools_compile_tool_README.html>`__
to compile the model in IR format into ``.blob`` file, which can be deployed to the device (:ref:`tutorial here <Deploying Custom Models>`)

**Input layer precision**: RVC2 only supports FP16 precision, so ``-ip U8`` will add conversion layer U8->FP16
on all input layers of the model - which is what we usually want. In some cases (eg. when we aren't dealing with frames),
we want to use FP16 precision directly, so we can use ``-ip FP16`` (Cosine distance `model example <https://github.com/luxonis/depthai-experiments/blob/master/gen2-custom-models/generate_model/pytorch_cos_dist.py#L56-L65>`__).

**Shaves**: RVC2 has a total has 16 SHAVE cores (see `Hardware accelerators documentation <https://docs.luxonis.com/projects/hardware/en/latest/pages/rvc/rvc2.html#hardware-blocks-and-accelerators>`__).
Compiling for more SHAVEs can make the model perform faster, but the proportion of shave cores isn't linear with performance.
Firmware will warn you about a possibly optimal number of shave cores, which is ``available_cores/2``. As by default,
each model will run on 2 threads.

Converting and compiling models
*******************************

There are a few options to perform these steps:

#. Using our :ref:`online blobconverter app <1. Using online blobconverter>`
#. Using our :ref:`blobconverter library <2. Using blobconverter package>`
#. :ref:`Converting & Compiling locally <3. Local compilation>`

1. Using online blobconverter
-----------------------------

You can visit our **online** `Blobconverter app <http://blobconverter.luxonis.com/>`__
which allows you to convert and compile the NN model from **TensorFlow, Caffe, ONNX, OpenVINO IR, and OpenVINO Model Zoo**.

.. image:: /_static/images/blobconverter_web.png
  :alt: BlobConverter Web

2. Using blobconverter package
------------------------------

For automated usage of our blobconverter tool, we have released a `blobconverter PyPi package <https://pypi.org/project/blobconverter/>`__,
that allows converting & compiling models both from the command line and from the Python script directly. Example usage below.

Install and usage instructions can be found `here <https://github.com/luxonis/blobconverter/tree/master/cli>`__

.. code-block:: python

  import blobconverter

  blob_path = blobconverter.from_onnx(
      model="/path/to/model.onnx",
      data_type="FP16",
      shaves=5,
  )

3. Local compilation
--------------------

If you want to perform model conversion and compilation locally, you can follow:

- `OpenVINO official instructions <https://software.intel.com/content/www/us/en/develop/tools/openvino-toolkit.html>`__
- `OpenVINO Python notebooks <https://github.com/openvinotoolkit/openvino_notebooks>`__
- `Our local model compilation tutorial <https://docs.luxonis.com/projects/api/en/latest/tutorials/local_convert_openvino/>`__
- `Custom model conversion & compilation notes <https://github.com/luxonis/depthai/blob/main/README.md#conversion-of-existing-trained-models-into-intel-movidius-binary-format>`__

Troubleshooting
***************

When converting your model to the OpenVINO format or compiling it to a :code:`.blob`, you might come across an issue. This usually
means that a **connection between two layers is not supported** or that the **layer is not supported**.

For **visualization of NN models** we suggest using `Netron app <https://netron.app/>`__.

.. image:: /_static/images/tutorials/netron.jpeg
  :alt: Netron


Supported layers
----------------

When converting your model to OpenVINO's IR format (:code:`.bin` and :code:`.xml`), you have to check if the OpenVINO supports layers
that were used. Here are supported layers and their limitations for
`Caffee <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#caffe-supported-layers>`__,
`MXNet <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#mxnet-supported-symbols>`__,
`TensorFlow <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#tensorflow-supported-operations>`__,
`TensorFlow 2 Keras <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#tensorflow-2-keras-supported-operations>`__,
`Kaldi <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#kaldi-supported-layers>`__,
and `ONNX <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_prepare_model_Supported_Frameworks_Layers.html#onnx-supported-operators>`__.

Unsupported layer type "layer_type"
-----------------------------------

When using `compile_tool <https://docs.openvino.ai/2022.1/openvino_inference_engine_tools_compile_tool_README.html>`__
to compile from IR (.xml/.bin) into .blob, you might get an error like this:

.. code-block::

  Failed to compile layer "Resize_230": unsupported layer type "Interpolate"

This means that the layer type is not supported by the VPU (Intels Myriad X). You can find supported OpenVINO layers by the VPU `here <https://docs.openvino.ai/2022.1/openvino_docs_OV_UG_supported_plugins_Supported_Devices.html#supported-layers>`__,
under the **Supported Layers** header, in the third column (**VPU**). Refer to `official Intel's troubleshooting docs <https://docs.openvinotoolkit.org/latest/openvino_docs_IE_DG_supported_plugins_VPU.html#troubleshooting>`__ for more information.


Incorrect data types
--------------------

If the compiler returns something along the lines of **"check error: input #0 has type S32, but one of [FP16] is expected"**,
it means that you are using incorrect data types. In the case above, an INT32 layer is connected to FP16 directly.
There should be a conversion in between these layers, and we can achieve that by using the OpenVINOs `Convert <https://docs.openvinotoolkit.org/latest/openvino_docs_ops_type_Convert_1.html>`__
layer between these two layers. You can do that by editing your models :code:`.xml` and adding the `Convert <https://docs.openvinotoolkit.org/latest/openvino_docs_ops_type_Convert_1.html>`__
layer. You can find additional information on this `discord thread <https://discord.com/channels/790680891252932659/799407361986658354/854501905799184414>`__.



.. include::  /pages/includes/footer-short.rst
