On-device programming
=====================

While regular (firmware) on-device development is not possible due to the closed nature of native tooling, we still expose a couple of
alternative ways of running custom code:

#. Scripting - Using Python3.9 with `Script node <https://docs.luxonis.com/projects/api/en/latest/components/nodes/script/>`__
#. Creating your own NN model to run more computationally heavy features
#. Creating custom `OpenCL <https://en.wikipedia.org/wiki/OpenCL>`__ kernels

Using Script node
#################

Using `Script node <https://docs.luxonis.com/projects/api/en/latest/components/nodes/script/>`__ allows you to run custom python scripts
on the device itself, which allows users greater flexibility when constructing pipelines.

Script node is also **very useful when using multiple neural networks in series** and you need to process the output of the first one
before feeding an image to the second one. **Example** here is the `face age/gender recognition <https://github.com/luxonis/depthai-experiments/tree/master/gen2-age-gender>`__
demo - first NN would detect faces, pass detections to the Script node which would create `ImageManip configurations <https://docs.luxonis.com/projects/api/en/latest/components/messages/image_manip_config/>`__
to crop the original frame, and feed the `face age/gender recognition <https://docs.openvinotoolkit.org/latest/omz_models_model_age_gender_recognition_retail_0013.html>`__ NN only the cropped face frame.

For running computationally heavy features (eg. image filters), due to performance reasons you might want to avoid using Script node
and rather go with one of the two options described below.

Creating custom NN models
#########################

You can create custom models with your favourite NN library, convert the model into OpenVINO, and then compile it into the :code:`.blob`.
More information on this topic can be found on :ref:`Converting model to MyriadX blob` documentation.

Refer to :ref:`Run your own CV functions on-device` page to find out more, or check :ref:`On-device Pointcloud NN model` tutorial.

Creating custom OpenCL kernel
#############################

Creating custom NN models has some limitations, for example :ref:`unsupported layers <Supported layers>` by OpenVINO/VPU. To avoid
these limitations, you could consider creating custom OpenCL kernel and compile it for the VPU. This kernel will run on SHAVE core(s) on
the VPU. One should also take into the account that this option is not super user friendly. We plan on creating a tutorial on how to
develop these and run them on OAK cameras.

- `Tutorial on how to implement custom layers with OpenCL <https://docs.openvinotoolkit.org/2021.1/openvino_docs_IE_DG_Extensibility_DG_VPU_Kernel.html>`__ by OpenVINO
- `Custom kernel implementations in OpenCL <https://github.com/openvinotoolkit/openvino/tree/2021.4.2/inference-engine/src/vpu/custom_kernels>`__

.. include::  /pages/includes/footer-short.rst
