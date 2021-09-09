Custom device functionality
===========================

In this tutorial we will take a look at few options on how to run custom functioanlity on the device itself. Due to the fact that device
firmware is not open-source, some would think that users are completely limited to the firmware functionalitites - but that's not the case.

There are a few ways on how to add custom functionality that would run on the device:

#. Using `Script node <https://docs.luxonis.com/projects/api/en/latest/components/nodes/script/>`__
#. Creating your own NN model to run more computationally heavy features
#. Creating custom `OpenCL <https://en.wikipedia.org/wiki/OpenCL>`__ kernels

Using Script node
#################

Using `Script node <https://docs.luxonis.com/projects/api/en/latest/components/nodes/script/>`__ allows you to run custom python scripts
on the device itself, which allows users greater flexibility when constructing pipelines.

Script node is also **very useful when using multiple neural networks in series** and you need to process the output of the 1st one
before feeding an image to the second one. **Example** here would be `face age/gender recognition <https://github.com/luxonis/depthai-experiments/tree/master/gen2-age-gender>`__
demo - first NN would detect faces, pass detections to the Script node which would create `ImageManip configurations <https://docs.luxonis.com/projects/api/en/latest/components/messages/image_manip_config/>`__
to crop the original frame and feed the `face age/gender recognition <https://docs.openvinotoolkit.org/latest/omz_models_model_age_gender_recognition_retail_0013.html>`__ NN only the cropped face frame.

For running computationally heavy features (eg. image filters), due to performance reasons you might want to avoud using Script node
and rather go with one of the 2 options described below.

Creating custom NN models
#########################

You can create custom models with your favourite NN library, convert the model into OpenVINO and then compile it into the :code:`.blob`.
More information on this topic can be found on :ref:`Converting model to MyriadX blob` documentation.

Here are two implementations of this workflow:

- `Tutorial on running custom models on OAK <https://rahulrav.com/blog/depthai_camera.html>`__ by Rahul Ravikumar
- `Harris corner detection in Pytorch <https://github.com/kunaltyagi/pytorch_harris/>`__ by Kunal Tyagi

Creating custom OpenCL kernel
#############################

Creating custom NN models has some limitations, for example :ref:`unsupported layers <Supported layers>` by OpenVINO/VPU. To avoid
these limitations, you could consider creating custom OpenCL kernel and compile it for the VPU. This kernel will run on SHAVE core(s) on
the VPU. One should also take into the account that this option is not super user friendly. We plan on creating a tutorial on how to
develop these and run them on OAK cameras.

- `Tutorial on how to implement custom layers with OpenCL <https://docs.openvinotoolkit.org/latest/openvino_docs_IE_DG_Extensibility_DG_VPU_Kernel.html>`__ by Intel
