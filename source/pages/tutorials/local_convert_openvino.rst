Local OpenVINO Model Conversion
===============================

In this tutorial, you'll learn how to convert OpenVINO IR models into the format required to run on DepthAI, even on a
low-powered Raspberry Pi. I'll introduce you to the OpenVINO toolset, the Open Model Zoo (where we'll download the
`face-detection-retail-0004 <https://github.com/openvinotoolkit/open_model_zoo/tree/master/models/intel/face-detection-retail-0004>`__
model), and show you how to generate the **.blob** file needed to run model inference on your DepthAI board.

.. note::
  Besides local model conversion (which is more time-consuming), you can also use :ref:`Google colab <Using Google Colab>`, our :ref:`online converter <Using online converter>` or the :ref:`blobconverter package <Using blobconverter package>`.

Haven't heard of OpenVINO or the Open Model Zoo? I'll start with a quick introduction of why we need these tools.

What is OpenVINO?
#################

Under-the-hood, DepthAI uses the Intel technology to perform high-speed model inference. However, you can't just dump
your neural net into the chip and get high-performance for free. That's where
`OpenVINO <https://docs.openvinotoolkit.org/>`__ comes in. OpenVINO is a free toolkit that converts a deep learning
model into a format that runs on Intel Hardware. Once the model is converted, it's common to see Frames Per Second
(FPS) improve by 25x or more. Are a couple of small steps worth a 25x FPS increase? Often, the answer is yes!

Check the `OpenVINO toolkit website <https://software.intel.com/content/www/us/en/develop/tools/openvino-toolkit.html>`__
for installation instructions.

What is the Open Model Zoo?
###########################

In machine learning/AI the name for a collection of pre-trained models is called a "model zoo". The `Open Model Zoo
<https://github.com/opencv/open_model_zoo>`__ is a library of freely-available pre-trained models. The Open Model Zoo also contains
scripts for downloading those models into a compile-ready format to run on DepthAI.

DepthAI is able to run many of the object detection models from the Zoo. Several of those models are included in the
`DepthAI Github repositoy <https://github.com/luxonis/depthai/tree/master/resources/nn/>`__.

Install OpenVINO
################

.. note::
  DepthAI gets support for the new OpenVINO version within a few days of the release, so **you should always use the latest OpenVINO version**.

You can download the OpenVINO toolkit installer from their `download page <https://software.intel.com/content/www/us/en/develop/tools/openvino-toolkit/download.html>`__,
and we will use the latest version - which is 2021.4 at the time of writing.

.. image:: /_static/images/tutorials/openvino_conversion/downloading.png
    :alt: download

After downloading and extracting the compressed folder, we can run the installation:

.. code-block:: bash

  ~/Downloads/l_openvino_toolkit_p_2021.3.394$ sudo ./install_GUI.sh

All the components that we need will be installed by default. Our installation path will be :code:`~/intel/openvino_2021` (default location), and we will use this path below.

Download the face-detection-retail-0004 model
#############################################

Now that we have OpenVINO installed, we can use the model downloader

.. code-block:: bash

  cd ~/intel/openvino_2021/deployment_tools/tools/model_downloader
  python3 -mpip install -r requirements.in
  python3 downloader.py --name face-detection-retail-0004 --output_dir ~/

This will download model files to :code:`~/intel/`. Specifically, the model files we need are
located at:

.. code-block:: bash

  cd ~/intel/face-detection-retail-0004/FP16

We will move into this folder so we can later compile this model into the required **.blob**.

You'll see two files within the directory:

.. code-block:: bash

  $ ls -lh
  total 1.3M
  -rw-r--r-- 1 root root 1.2M Jul 28 12:40 face-detection-retail-0004.bin
  -rw-r--r-- 1 root root 100K Jul 28 12:40 face-detection-retail-0004.xml

The model is in the OpenVINO Intermediate Representation (IR) format:

- :code:`face-detection-retail-0004.xml` - Describes the network topology
- :code:`face-detection-retail-0004.bin` - Contains the weights and biases binary data.

This means we are ready to compile the model for the MyriadX!

Compile the model
#################

The MyriadX chip used on our DepthAI board does not use the IR format files directly. Instead, we need to generate
:code:`face-detection-retail-0004.blob` using :code:`compile_tool` tool.

Activate OpenVINO environment
*****************************

In order to use :code:`compile_tool` tool, we need to activate our OpenVINO environment.

First, let's find :code:`setupvars.sh` file

.. code-block:: bash

  find ~/intel/ -name "setupvars.sh"
  /home/root/intel/openvino_2021.4.582/data_processing/dl_streamer/bin/setupvars.sh
  /home/root/intel/openvino_2021.4.582/opencv/setupvars.sh
  /home/root/intel/openvino_2021.4.582/bin/setupvars.sh


We're interested in :code:`bin/setupvars.sh` file, so let's go ahead and source it to activate the environment:

.. code-block:: bash

  source /home/root/intel/openvino_2021.4.582/bin/setupvars.sh
  [setupvars.sh] OpenVINO environment initialized

If you see :code:`[setupvars.sh] OpenVINO environment initialized` then your environment should be initialized correctly

Locate compile_tool
*******************

Let's find where :code:`compile_tool` is located. In your terminal, run:

.. code-block:: bash

  find ~/intel/ -iname compile_tool

You should see the output similar to this

.. code-block:: bash

  find ~/intel/ -iname compile_tool
  /home/root/intel/openvino_2021.4.582/deployment_tools/tools/compile_tool/compile_tool

Save this path as you will need it in the next step, when running :code:`compile_tool`.

Run compile_tool
****************

From the :code:`~/intel/face-detection-retail-0004/FP16` we will now call the :code:`compile_tool` to compile the model into the **face-detection-retail-0004.blob**

.. code-block:: bash

  ~/intel/openvino_2021.4.582/deployment_tools/tools/compile_tool/compile_tool -m face-detection-retail-0004.xml -ip U8 -d MYRIAD -VPU_NUMBER_OF_SHAVES 4 -VPU_NUMBER_OF_CMX_SLICES 4

You should see:

.. code-block:: bash

  Inference Engine:
    IE version ......... 2021.4.0
    Build ........... 2021.4.0-3839-cd81789d294-releases/2021/4

  Network inputs:
      data : U8 / NCHW
  Network outputs:
      detection_out : FP16 / NCHW
  [Warning][VPU][Config] Deprecated option was used : VPU_MYRIAD_PLATFORM
  Done. LoadNetwork time elapsed: 1760 ms

Where's the blob file? It's located in the current folder

.. code-block:: bash

  /intel/face-detection-retail-0004/FP16$ ls -l
  total 2.6M
  -rw-rw-r-- 1 root root 1176544 jul 28 19:32 face-detection-retail-0004.bin
  -rw-rw-r-- 1 root root 1344256 jul 28 19:51 face-detection-retail-0004.blob
  -rw-rw-r-- 1 root root  106171 jul 28 19:32 face-detection-retail-0004.xml


Run and display the model output
################################

With neural network :code:`.blob` in place, we're ready to roll!
To verify that the model is running correctly, let's modify a bit the program we've created in `Hello World <https://docs.luxonis.com/projects/api/en/latest/tutorials/hello_world/>`__ tutorial

In particular, let's change the :code:`setBlobPath` invocation to load our model. **Remember to replace the paths to correct ones that you have!**

.. code-block:: diff

  - detection_nn.setBlobPath(str(blobconverter.from_zoo(name='mobilenet-ssd', shaves=6)))
  + detection_nn.setBlobPath("/path/to/face-detection-retail-0004.blob")

And that's all!

You should see output annotated output similar to:

.. image:: /_static/images/tutorials/openvino_conversion/face.png
    :alt: face

Reviewing the flow
##################

The flow we walked through works for other pre-trained object detection models in the Open Model Zoo:

#. Download the model:

    .. code-block:: bash

      python3 downloader.py --name face-detection-retail-0004 --output_dir ~/

#. Create the MyriadX blob file:

    .. code-block:: bash

      ./compile_tool -m [INSERT PATH TO MODEL XML FILE] -ip U8 -d MYRIAD -VPU_NUMBER_OF_SHAVES 4 -VPU_NUMBER_OF_CMX_SLICES 4
      
    `Here are <https://docs.openvinotoolkit.org/latest/openvino_inference_engine_tools_compile_tool_README.html#run_the_compile_tool>`__ **all supported compile_tool arguments**.

#. Use this model in your script

You’re on your way! You can find the `complete code for this tutorial on GitHub. <https://github.com/luxonis/depthai-tutorials/blob/master/2-face-detection-retail/face-detection-retail-0004.py>`__

.. note::
    You should also check out the :ref:`Use a Pre-trained OpenVINO model` tutorial, where this process is significaly simplified.

.. include::  /pages/includes/footer-short.rst


