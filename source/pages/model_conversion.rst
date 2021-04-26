Converting model to MyriadX blob
################################

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
*****************

If you want to perform model conversion and compilation, you can follow:

- `OpenVINO official instructions <https://software.intel.com/content/www/us/en/develop/tools/openvino-toolkit.html>`__
- `Our local model compilation tutorial <https://docs.luxonis.com/projects/api/en/latest/tutorials/local_convert_openvino/>`__
- `Custom model conversion & compilation notes <https://github.com/luxonis/depthai/blob/main/README.md#conversion-of-existing-trained-models-into-intel-movidius-binary-format>`__

Using Google Colab
******************

You can also train and convert model using Google Colab notebook. You can take a look at our :ref:`Custom training` page, where
every tutorial contains also conversion & compilation steps performed directly inside the notebooks.

An example notebook with the compilation steps is `here <https://colab.research.google.com/github/luxonis/depthai-ml-training/blob/master/colab-notebooks/Easy_Object_Detection_With_Custom_Data_Demo_Training.ipynb#scrollTo=_PlfZAR1OCK2>`__

Using online converter
**********************

You can also visit our online MyriadX Blob connverter at `http://luxonis.com:8080/ <http://luxonis.com:8080/>`__,
that allows to specify different OpenVINO target versions and supports conversions from **TensorFlow, Caffe, OpenVINO IR and OpenVINO Model Zoo**

.. image:: /_static/images/blobconverter_web.png
  :alt: BlobConverter Web

Using blobconverter package
***************************

For automated usage of our blobconverter tool, we have released a `blobconverter PyPi package <https://pypi.org/project/blobconverter/>`__,
that allows to compile MyriadX blobs both from the command line and from the Python script directly.

Install and usage instructions can be found `here <https://github.com/luxonis/blobconverter/tree/master/cli>`__

.. include::  /pages/includes/footer-short.rst
