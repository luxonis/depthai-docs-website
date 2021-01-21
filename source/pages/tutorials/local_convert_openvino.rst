Local OpenVINO Model Conversion
===============================

In this tutorial, you'll learn how to convert OpenVINO IR models into the format required to run on DepthAI, even on a
low-powered Raspberry Pi. I'll introduce you to OpenVINO, the Open Model Zoo, and show you how to generate
the files needed to run model inference on your DepthAI board.

.. image:: /_static/images/tutorials/local_convert_openvino/face.png
  :alt: face

Haven't heard of OpenVINO or the Open Model Zoo? I'll start with a quick introduction of why we need these tools.

What is OpenVINO?
#################

Under-the-hood, DepthAI uses the Intel Myriad X to perform high-speed model inference. However, you can't just dump
your neural net into the chip and get high-performance for free. That's where `OpenVINO
<https://docs.openvinotoolkit.org/>`__ comes in. OpenVINO is a free toolkit that converts a deep learning model into a
format that runs on Intel Hardware. Once the model is converted, it's common to see Frames Per Second (FPS) improve by
25x or more. Are a couple of small steps worth a 25x FPS increase? Often, the answer is yes!

Check the `OpenVINO Toolkit website <https://software.intel.com/content/www/us/en/develop/tools/openvino-toolkit.html>`__
for installation instructions. OpenVINO should be installed under
:code:`/opt/intel`. Verify that the version is supported by DepthAI (see
:ref:`Is DepthAI OpenVINO Compatible? <Is DepthAI OpenVINO Compatible?>`).

What is the Open Model Zoo?
###########################

In machine learning/AI the name for a collection of pre-trained models is called a "model zoo". The `Open Model Zoo
<https://github.com/opencv/open_model_zoo>`__ is a library of freely-available pre-trained models. The Zoo also contains
scripts for downloading those models into a compile-ready format to run on DepthAI.

DepthAI is able to run many of the object detection models in the Zoo. Several of those models are included in the
`DepthAI Github repositoy <https://github.com/luxonis/depthai/tree/master/resources/nn/>`__.

Clone the Open Model Zoo repository from Github and `install its dependencies
<https://github.com/openvinotoolkit/open_model_zoo/blob/master/tools/downloader/README.md#prerequisites>`__.
Optionally, add the scripts to your path:

.. code-block:: bash

    export PATH="${PATH}:${PWD}/open_model_zoo/tools/downloader/"

Download the :code:`face-detection-retail-0004` model
#####################################################

We've installed everything we need to download models from the Open Model Zoo! We'll now use the
`Model Downloader <https://github.com/opencv/open_model_zoo/blob/2019_R3/tools/downloader/README.md>`__ to download the
:code:`face-detection-retail-0004` model files. Run the following in your terminal:

.. code-block:: bash

  $OPEN_MODEL_DOWNLOADER --name face-detection-retail-0004 --output_dir ~/open_model_zoo_downloads/

This will download the model files to :code:`~/open_model_zoo_downloads/`. Specifically, the model files we need are
located at:

.. code-block:: bash

  ~/open_model_zoo_downloads/intel/face-detection-retail-0004/FP16

You'll see two files within the directory:

.. code-block:: bash

  $ ls -lh
  total 1.3M
  -rw-r--r-- 1 root root 1.2M Jul 28 12:40 face-detection-retail-0004.bin
  -rw-r--r-- 1 root root 100K Jul 28 12:40 face-detection-retail-0004.xml

The model is in the OpenVINO Intermediate Representation (IR) format:

- :code:`face-detection-retail-0004.xml` - Describes the network topology
- :code:`face-detection-retail-0004.bin` - Contains the weights and biases binary data.

This means we are ready to compile the model for the Myriad X!

Compile the model
#################

The Myriad X chip used on our DepthAI board does not use the IR format files directly. Instead, we need to generate two files:

* :code:`face-detection-retail-0004.blob` - We'll create this file with the :code:`myriad_compile` command.
* :code:`face-detection-retail-0004.json` - A :code:`blob_file_config` file in JSON format. This describes the format of the output tensors. You can read more about this file structure and examples :ref:`here <Creating Blob configuration file>`

We'll start by creating the :code:`blob` file.

Locate myriad_compile
*********************

Let's find where :code:`myriad_compile` is located. In your terminal, run:

.. code-block:: bash

  find /opt/intel/ -iname myriad_compile

You should see the output similar to this

.. code-block:: bash

  find /opt/intel/ -iname myriad_compile
  /opt/intel/openvino_2020.1.023/deployment_tools/inference_engine/lib/intel64/myriad_compile

Since it's such a long path, let's store the :code:`myriad_compile` executable in an environment variable (just like
:code:`OPEN_MODEL_DOWNLOADER`):

.. code-block:: bash

  export MYRIAD_COMPILE=$(find /opt/intel/ -iname myriad_compile)

Activate OpenVINO environment
*****************************

In order to use :code:`myriad_compile` tool, we need to activate our OpenVINO environment.

First, let's find :code:`setupvars.sh` file

.. code-block:: bash

  find /opt/intel/ -name "setupvars.sh"
  /opt/intel/openvino_2020.1.023/opencv/setupvars.sh
  /opt/intel/openvino_2020.1.023/bin/setupvars.sh

We're interested in :code:`bin/setupvars.sh` file, so let's go ahead and source it to activate the environment:

.. code-block:: bash

  source /opt/intel/openvino_2020.1.023/bin/setupvars.sh
  [setupvars.sh] OpenVINO environment initialized

If you see :code:`[setupvars.sh] OpenVINO environment initialized` then your environment should be initialized correctly

Run myriad_compile
******************

.. code-block:: bash

  $MYRIAD_COMPILE -m ~/open_model_zoo_downloads/intel/face-detection-retail-0004/FP16/face-detection-retail-0004.xml -ip U8 -VPU_MYRIAD_PLATFORM VPU_MYRIAD_2480 -VPU_NUMBER_OF_SHAVES 4 -VPU_NUMBER_OF_CMX_SLICES 4

You should see:

.. code-block:: bash

  Inference Engine:
    API version ............ 2.1
    Build .................. 37988
    Description ....... API
  Done

Where's the blob file? It's located in the same folder as :code:`face-detection-retail-0004.xml`:

.. code-block:: bash

  ls -lh ~/open_model_zoo_downloads/intel/face-detection-retail-0004/FP16/
  total 2.6M
  -rw-r--r-- 1 root root 1.2M Jul 28 12:40 face-detection-retail-0004.bin
  -rw-r--r-- 1 root root 1.3M Jul 28 12:50 face-detection-retail-0004.blob
  -rw-r--r-- 1 root root 100K Jul 28 12:40 face-detection-retail-0004.xml

Create the blob configuration file
##################################

The Myriad X needs both a :code:`blob` file (which we just created) and a `blob_file_config` in JSON format.
We'll create this configuration file manually. In your terminal:

.. code-block:: bash

  cd ~/open_model_zoo_downloads/intel/face-detection-retail-0004/FP16/
  touch face-detection-retail-0004.json

Copy and paste the following into :code:`face-detection-retail-0004.json`:

.. code-block:: json

  {
      "NN_config": {
          "output_format" : "detection",
          "NN_family" : "mobilenet",
          "confidence_threshold" : 0.5
      }
  }

What do these values mean?

- :code:`output_format` - is either :code:`detection` or :code:`raw`. Detection tells the DepthAI to parse the NN results and make a detection objects out of them, which you can access by running :code:`getDetectedObjects` method. Raw means "do not parse, I will handle the parsing on host", requiring you to parse raw tensors
- :code:`NN_family` - only needed when :code:`output_format` is :code:`detection`. Two supported NN families are right now :code:`mobilenet` and :code:`YOLO`
- :code:`confidence_threshold` - DepthAI will only return the results which confidence is above the threshold.

Run and display the model output
################################

With both :code:`blob` and a :code:`json` blob configuration file, we're ready to roll!
To verify that the model is running correctly, let's modify a bit the program we've created in :ref:`Hello World` tutorial

In particular, let's change the :code:`create_pipeline` invocation to load our model. **Remember to replace the paths to correct ones that you have!**

.. code-block:: diff

  pipeline = device.create_pipeline(config={
      'streams': ['previewout', 'metaout'],
      'ai': {
  -        'blob_file': "/path/to/mobilenet-ssd.blob",
  +        'blob_file': "/path/to/open_model_zoo_downloads/intel/face-detection-retail-0004/FP16/face-detection-retail-0004.blob",
  -        'blob_file_config': "/path/to/mobilenet-ssd.json"
  +        'blob_file_config': "/path/to/open_model_zoo_downloads/intel/face-detection-retail-0004/FP16/face-detection-retail-0004.json"
      }
  })

And that's all!

You should see output annotated output similar to:

.. image:: /_static/images/tutorials/local_convert_openvino/face.png
  :alt: face

Reviewing the flow
##################

The flow we walked through works for other pre-trained object detection models in the Open Model Zoo:

#. Download the model:

    .. code-block:: bash

      $OPEN_MODEL_DOWNLOADER --name [INSERT MODEL NAME] --output_dir ~/open_model_zoo_downloads/

#. Create the Myriad X blob file:

    .. code-block:: bash

      $MYRIAD_COMPILE -m [INSERT PATH TO MODEL XML FILE] -ip U8 -VPU_MYRIAD_PLATFORM VPU_MYRIAD_2480 -VPU_NUMBER_OF_SHAVES 4 -VPU_NUMBER_OF_CMX_SLICES 4

#. :ref:`Create the blob configuration file` based on the model output.
#. Use this model in your script

You’re on your way! You can find the `complete code for this tutorial on GitHub. <https://github.com/luxonis/depthai-tutorials/blob/master/2-face-detection-retail/face-detection-retail-0004.py>`__

.. include::  /pages/includes/footer-short.rst
