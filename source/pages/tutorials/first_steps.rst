First steps with DepthAI
========================

Hello DepthAI users!

In this guide, I assume you just got your DepthAI device (e.g. `OAK-1 <https://docs.luxonis.com/projects/hardware/en/latest/pages/BK1096.html>`__ or `OAK-D <https://docs.luxonis.com/projects/hardware/en/latest/pages/BW1098OAK.html>`__)
and you want to give it the first try to explore what is possible with it and what you can achieve when working with it.

- First, we will run a DepthAI demo script, that will allow you to preview DepthAI functionalities.
- Following up, I will go through some of the options available in the demo script and show their usage/results
- Last, you will receive useful links to expand your knowledge further and check open-sourced use-case implementations, code examples, and tutorials, that you can use as a starting point for your projects.

Let's start with the device setup below

Connect the DepthAI device
##########################

After unboxing your DepthAI package, you will receive your device together with a USB-C cable (and a power supply if you ordered OAK-D)

Make sure that the device is connected to your host (which can be a PC or Raspberry Pi or another capable device) directly to a USB port,
or via a powered USB hub.

On Ubuntu, you can check if a new USB device was detected by running

.. code-block:: bash

  $ lsusb | grep MyriadX
  Bus 003 Device 002: ID 03e7:2485 Intel Movidius MyriadX

.. note::

  If you are running other OS than Ubuntu, or you think something has gone wrong, we have detailed OS-specific installation guides
  `here <https://docs.luxonis.com/projects/api/en/latest/install/#supported-platforms>`__, together with discord support
  channels where you can chat with us live if you have any issues or questions.

Use Windows Installer
#####################

If you prefer, we've encapsulated all setup procedures inside a single :code:`.exe` file you can download `here <https://github.com/luxonis/depthai/releases/download/v3.0.1/DepthAI_setup.exe>`__ and skip the :ref:`Setup` section.

When downloaded and run, it will install all necessary components and package requirements. Once finished, it will run the demo script automatically

Setup
#####

In this section, I will describe how to install the demo script manually with a command line

Download demo script
********************

To download the demo script, you can either use :code:`git` or directly download a zip file

From zip file
-------------

First, download a repository package from `here <https://github.com/luxonis/depthai/archive/refs/heads/main.zip>`__
and then unpack the archive to a directory of preference. Next, open a terminal session in this directory.

From git
--------

First, open the terminal session and go to a directory of preference, where you'd like to download your demo script.
Then, run the following code to download the demo script

.. code-block:: bash

  $ git clone https://github.com/luxonis/depthai.git

After the repository is downloaded, make sure to enter the downloaded repository by running

.. code-block:: bash

  $ cd depthai

Create python virtualenv (optional)
***********************************

To create and use the virtualenv, you can follow an `official python guide to virtualenvs <https://docs.python.org/3/tutorial/venv.html>`__ or
follow os-specific guides on the web, like `"How to Create Python 3 Virtual Environment on Ubuntu 20.04" <https://linoxide.com/how-to-create-python-virtual-environment-on-ubuntu-20-04/>`__

This will make sure that you are using a fresh environment and that Python 3 is the default interpreter - this can help to prevent potential issues.

I usually create and use virtualenvs by running

.. code-block:: bash

  $ python3 -m venv myvenv
  $ source myvenv/bin/activate
  $ pip install -U pip

And this may require installing these packages prior

.. code-block:: bash

  $ apt-get install python3-pip python3-venv

Install requirements
********************

Once the demo source code is downloaded, and you have your terminal session set up, the next thing that has to be done
is to install all additional packages that this script requires (together with the :code:`depthai` Python API itself).

To install these packages, run the :code:`install_requirements.py` script

.. code-block:: bash

  $ python3 install_requirements.py

.. warning::

  If you are using a Linux system, in most cases you have to add a new udev rule for our script to be able to access
  the device correctly. You can add and apply new rules by running

  .. code-block:: bash

    $ echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
    $ sudo udevadm control --reload-rules && sudo udevadm trigger

Now, you should be able to start using the demo script, which we will do now

Run demo script
***************

Having everything set up, we are now ready to use the demo script by running

.. code-block:: bash

  $ python3 depthai_demo.py

Default run
###########

Running the demo for the first time, the script will compile and download a default `mobilenet-ssd` model,
configure the DepthAI device and then show a default :code:`color` preview that will contain a scaled preview from the RGB camera from your device.

.. image:: https://user-images.githubusercontent.com/5244214/142722740-47e545b7-c7fe-4132-9704-ae3b47d60957.png
  :alt: Default run

Change preview
##############

To see other previews from the device, you can use the preview switcher that is visible in the top-left section of the GUI

.. image:: https://user-images.githubusercontent.com/5244214/141984256-4f9b9479-0907-4b04-bfcd-aae15ac28a0a.png
  :alt: preview selector location

.. list-table:: Available previews
  :widths: 15 65 20
  :header-rows: 1
  :align: center

  * - Name
    - Description
    - Limitations

  * - :code:`color`
    - Shows preview from color camera
    -

  * - :code:`nnInput`
    - Shows preview from right mono camera
    - Disabled if no AI model is running

  * - :code:`left`
    - Shows preview from left mono camera
    - **OAK-D** needed

  * - :code:`right`
    - Shows preview from right mono camera
    - **OAK-D** needed

  * - :code:`depth`
    - Shows disparity map calculated from :code:`depthRaw` preview and JET colored. Best for visualizing depth
    - **OAK-D** needed

  * - :code:`depthRaw`
    - Shows raw depth map. Best for depth-based calculations
    - **OAK-D** needed

  * - :code:`disparity`
    - Shows disparity map produced on device
    - **OAK-D** needed

  * - :code:`disparityColor`
    - Shows disparity map produced on device and JET colored. Should be the same as :code:`depth` preview but produced on the device.
    - **OAK-D** needed

  * - :code:`rectifiedLeft`
    - `Rectified <https://en.wikipedia.org/wiki/Image_rectification>`__ left camera frames
    - **OAK-D** needed

  * - :code:`rectifiedRight`
    - `Rectified <https://en.wikipedia.org/wiki/Image_rectification>`__ right camera frames
    - **OAK-D** needed


Default model
#############

While the demo was running, you could see the detection results - and if you were standing in front of the camera,
you should see yourself detected as a person with a pretty high probability.

The model that is used by default is a MobileNetv2 SSD object detector trained on the `PASCAL 2007 VOC <http://host.robots.ox.ac.uk/pascal/VOC/voc2007/>`__ classes, which are:

- Person: person
- Animal: bird, cat, cow, dog, horse, sheep
- Vehicle: airplane, bicycle, boat, bus, car, motorbike, train
- Indoor: bottle, chair, dining table, potted plant, sofa, TV/monitor

So give it a try to detect different objects, like bottles or apples

.. image:: https://user-images.githubusercontent.com/5244214/142192279-71e479ae-fef2-4ddb-a4d2-7ae677e1544d.png
  :alt: bottles and apples

Or even cats

.. image:: https://user-images.githubusercontent.com/5244214/142493174-85b894fb-7a2b-40a1-8fad-0937ca5f27e1.png
  :alt: cat

Using other models
##################

We have prepared other models, which you can try and evaluate with ease.
To run the demo script with e.g. :code:`face-detection-retail-0004`, click on the :code:`CNN Model` combo box and select mentioned model

.. image:: https://user-images.githubusercontent.com/5244214/144452804-b776461b-0b93-4397-a702-15cb1ec04fb7.png
  :alt: cnn model location

Which will allow you to detect human faces, like below


.. image:: https://user-images.githubusercontent.com/5244214/142645887-f04b90e4-c69f-4764-93d3-37bfb05fe67c.png
  :alt: face

You can use this combo box to change the model that is being run on the DepthAI. It's also possible to use command line to select

.. code-block:: bash

  $ python3 depthai_demo.py -cnn face-detection-retail-0004

Below, there is a list of models that you can use, having just the demo script downloaded


.. list-table:: Available models
  :widths: 30 50 10 10
  :header-rows: 1
  :align: center

  * - Name
    - Purpose
    - FPS
    - Links
  * - :code:`deeplabv3p_person`
    - People segmentation
    - 22.1
    - :ref:`Usage <deeplabv3p_person>`
  * - :code:`face-detection-adas-0001`
    - Face detection
    - 13.4
    - :ref:`Usage <face-detection-adas-0001>`
  * - :code:`face-detection-retail-0004`
    - Face detection
    - 30.0
    - :ref:`Usage <face-detection-retail-0004>`
  * - :code:`mobilenet-ssd`
    - Object detection (20 classes)
    - 30.0
    - :ref:`Usage <mobilenet-ssd>`
  * - :code:`pedestrian-detection-adas-0002`
    - People detection
    - 13.1
    - :ref:`Usage <pedestrian-detection-adas-0002>`
  * - :code:`person-detection-retail-0013`
    - People detection
    - 10.7
    - :ref:`Usage <person-detection-retail-0013>`
  * - :code:`person-vehicle-bike-detection-crossroad-1016`
    - People, vehicle and bike detection
    - 6.2
    - :ref:`Usage <person-vehicle-bike-detection-crossroad-1016>`
  * - :code:`yolo-v3`
    - Object detection (80 classes)
    - 1.9
    - :ref:`Usage <yolo-v3>`
  * - :code:`tiny-yolo-v3`
    - Object detection (80 classes)
    - 29.9
    - :ref:`Usage <tiny-yolo-v3>`
  * - :code:`vehicle-detection-adas-0002`
    - Vehicle detection
    - 14.0
    - :ref:`Usage <vehicle-detection-adas-0002>`
  * - :code:`vehicle-license-plate-detection-barrier-0106`
    - License plate detection
    - 30.0
    - :ref:`Usage <vehicle-license-plate-detection-barrier-0106>`
  * - :code:`openpose2`
    - Pose estimation (openpose)
    - 6.5
    - :ref:`Usage <openpose2>`
  * - :code:`human-pose-estimation-0001`
    - Pose estimation (intel)
    - 7.3
    - :ref:`Usage <human-pose-estimation-0001>`

.. _deeplabv3p_person:

- :code:`deeplabv3p_person` - Allows to highlight parts of the image where a person is detected

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn deeplabv3p_person

  .. image:: https://user-images.githubusercontent.com/5244214/142645574-2da1b6cd-278b-44d8-8f1a-1d9921d976bf.png
    :alt: deeplabv3p_person

.. _face-detection-adas-0001:

- :code:`face-detection-adas-0001` - Allows to detect faces on the image (slower)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn face-detection-adas-0001

  .. image:: https://user-images.githubusercontent.com/5244214/142645887-f04b90e4-c69f-4764-93d3-37bfb05fe67c.png
    :alt: face-detection-adas-0001

.. _face-detection-retail-0004:

- :code:`face-detection-retail-0004` - Allows to detect faces on the image (faster)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn face-detection-retail-0004

  .. image:: https://user-images.githubusercontent.com/5244214/142645887-f04b90e4-c69f-4764-93d3-37bfb05fe67c.png
    :alt: face-detection-retail-0004

.. _mobilenet-ssd:

- :code:`mobilenet-ssd` - Object detector that detects 20 different classes (default)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn mobilenet-ssd

  .. image:: https://user-images.githubusercontent.com/5244214/142192279-71e479ae-fef2-4ddb-a4d2-7ae677e1544d.png
    :alt: mobilenet-ssd

.. _pedestrian-detection-adas-0002:

- :code:`pedestrian-detection-adas-0002` - allows to detect people on the image (slower)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn pedestrian-detection-adas-0002

  .. image:: https://user-images.githubusercontent.com/5244214/142723213-93cfed86-cb53-4b9b-85cb-4435a0be631d.png
    :alt: pedestrian-detection-adas-0002

.. _person-detection-retail-0013:

- :code:`person-detection-retail-0013` - allows to detect people on the image (faster)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn person-detection-retail-0013

  .. image:: https://user-images.githubusercontent.com/5244214/142723320-51d004ea-1163-4aa1-a53c-126ab2c259cb.png
    :alt: person-detection-retail-0013

.. _person-vehicle-bike-detection-crossroad-1016:

- :code:`person-vehicle-bike-detection-crossroad-1016` - allows to detect both people, bikes and vehicles on the image

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn person-vehicle-bike-detection-crossroad-1016

  .. image:: https://user-images.githubusercontent.com/5244214/117144527-4fd3da00-adb2-11eb-89a4-2733cd9a39af.png
    :alt: person-vehicle-bike-detection-crossroad-1016

.. _yolo-v3:

- :code:`yolo-v3` - Object detector that detects 80 different classes (slower)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn yolo-v3

  .. image:: https://user-images.githubusercontent.com/5244214/142192279-71e479ae-fef2-4ddb-a4d2-7ae677e1544d.png
    :alt: yolo-v3

.. _tiny-yolo-v3:

- :code:`tiny-yolo-v3` - Object detector that detects 80 different classes (faster)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn tiny-yolo-v3

  .. image:: https://user-images.githubusercontent.com/5244214/142192279-71e479ae-fef2-4ddb-a4d2-7ae677e1544d.png
    :alt: tiny-yolo-v3

.. _vehicle-detection-adas-0002:

- :code:`vehicle-detection-adas-0002` - allows to detect vehicles on the image

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn vehicle-detection-adas-0002

  .. image:: https://user-images.githubusercontent.com/5244214/142653915-cce665f1-d646-4621-a3a5-0006dc2273cb.png
    :alt: vehicle-detection-adas-0002

.. _vehicle-license-plate-detection-barrier-0106:

- :code:`vehicle-license-plate-detection-barrier-0106` - allows to detect both vehicle and license plate on the image (only Chinese license plates)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn vehicle-license-plate-detection-barrier-0106

  .. image:: https://user-images.githubusercontent.com/5244214/142654408-9e16c2bb-2ca7-451b-a384-d1fc631a365f.png
    :alt: vehicle-license-plate-detection-barrier-0106

.. _openpose2:

- :code:`openpose2` - Human pose estimation model


  .. code-block:: bash

    $ python3 depthai_demo.py -cnn openpose2

  .. image:: https://user-images.githubusercontent.com/5244214/142654924-7286b066-2ccc-4879-8d88-c5580dbbfcb4.png
    :alt: openpose2

.. _human-pose-estimation-0001:

- :code:`human-pose-estimation-0001` - Human pose estimation model from `Open Model Zoo <https://github.com/openvinotoolkit/open_model_zoo/tree/master/models/intel/human-pose-estimation-0001>`__


  .. code-block:: bash

    $ python3 depthai_demo.py -cnn human-pose-estimation-0001

  .. image:: https://user-images.githubusercontent.com/5244214/107493701-35f97100-6b8e-11eb-8b13-02a7a8dbec21.gif
    :alt: human-pose-estimation-0001


All of the data we use to download and compile a model can be found `here <https://github.com/luxonis/depthai/tree/main/resources/nn>`__.

Demo usage
##########

In this section, we'll go through the config options available in the demo script, allowing you to try out different configurations

  .. image:: https://user-images.githubusercontent.com/5244214/142490950-61518cce-e6c0-429a-a381-e8082bc3fe9f.png
    :alt: Config options

AI Properties
*************


  .. image:: https://user-images.githubusercontent.com/5244214/142454791-4da7aaf1-9b89-4201-970e-1f0814e82322.png
    :alt: AI config

Switches:

- **Enabled**: Turns AI on/off. Turning it off will prevent any neural network from being run, which will also save some of the memory. Useful for situations where we're more focused on Depth/Encoding rather than AI processing

Basic properties:

- **CNN Model**: Choose which model to run on DepthAI, see more at :ref:`Using other models`
- **SHAVEs**: Determines the number of SHAVE cores used to compile the neural network. The higher the value, the faster network can run, but this also limits features that can be enabled at once.
- **Model source**: Specify which camera preview will be taken as model input, so which frames will be sent to a neural network to perform inference
- **Full FOV**: If enabled, it will scale down the camera image to meet the nn input size. If disabled, before scaling, it will crop the image to meet the NN aspect ratio

Advanced:

- **OpenVINO version**: Specify the OpenVINIO version that will be used to compile the MyriadX blob and run the pipeline. It's recommended to use the latest version for most cases
- **Label to count**: Allows to display a count of a specific label visible in the demo (e.g. if you want to count the number of cats in the preview with the default model, you can do so by selecting :code:`cat` as a count label and restarting the script)
- **Spatial bounding box**: When enabled, will draw a bounding box on depth previews that show which part of the detection area was taken into depth estimation.
- **SBB Scale Factor**: Determines the size of the spatial bounding box in comparison to the detection bounding box.


Depth Properties
****************

  .. image:: https://user-images.githubusercontent.com/5244214/142464446-5c358c7b-4770-4416-8a4d-ae397e8c2657.png
    :alt: Depth config

Switches:

- **Enabled**: Turns Depth on/off. Turning it off will prevent the stereo node from being created, which will also save some of the memory. Useful for situations where we're more focused on AI processing/Encoding rather than depth.
- **Use Disparity**: If not set (default), the demo script will calculate the disparity map on host, based on the depth map. If enabled, the same processing will be performed on the device, consuming some of the memory but limiting host resource usage.

Basic properties:

- **Median Filtering**: Specifies the type of noise removing median filter applied to the depth map
- **Subpixel**: Enables subpixel mode, which improves the depth precision and is especially useful for long-range measurements
- **Left Right Check**: Enables left-right check, that is used to remove incorrectly calculated disparity pixels due to occlusions at object borders
- **Extended Disparity**: Enables extended disparity mode, that allows a closer minimum distance for the given baseline
- **Depth Range**: Specifies the minimum and maximum distance calculated by the device
- **LRC Threshold**: Specifies the max difference between disparity pixels that will make the pixel invalidated (the higher threshold, the more points will get through)

Camera Properties
*****************

  .. image:: https://user-images.githubusercontent.com/5244214/142468945-2c0374ee-ffa7-4ff6-8332-6dc134cc10aa.png
    :alt: Camera config

Basic properties:

- **FPS**: Specifies how fast should the camera capture the frames
- **Resolution**:  Specifies camera sensor resolution and thus captured frame size

Advanced:

- **ISO**: Controls the light gathering ability of the camera
- **Exposure**: Controls the exposure time of the camera
- **Saturation**: Controls the intensity of colors in a frame
- **Contrast**: Controls the visual ratio of different tones in a frame
- **Brightness**: Controls how dark or light the colors are in a frame
- **Sharpness**: Controls the clarity of details in a frame

Misc
****

  .. image:: https://user-images.githubusercontent.com/5244214/142469155-e02593ae-80f4-452d-9bed-a3e50dc31e4f.png
    :alt: Misc

Recording:

- **Switches**: enable recording of specified camera
- **FPS inputs**: specifies recording FPS (default 30)
- **Destination**: specifies a **directory path** where the recordings will be stored

Reporting:

- **Switches**: enable logging of the specified feature
- **Destination**: specifies a **file path** where the report file will be stored

Using custom models
###################

.. warning::

  Using custom models requires a locally downloaded version of the depthai repository.
  **If you've been using installer** to download and run the script, **adding custom models won't work**.
  Please follow :ref:`Setup` section on how to download and set up the repository.

Let’s assume you want to run a custom model which you downloaded from the model zoo or trained yourself (or both).
To prepare your model to be runnable on DepthAI, it has to be compiled into MyriadX blob format - which
is an optimized version of your model, capable of utilizing MyriadX chip as a processing unit.

In our demo script, we support a few ways you can run your custom blob, which will be covered below. As an example,
I’ll add a custom face detection network called :code:`custom_model` (substitute with your preferred name)
and run it with the demo script

Compile MyriadX blob
********************

To receive a MyriadX blob, the network has to be already in OpenVINO IR format (consisting of :code:`.xml` and :code:`.bin`
files) that will be used for compilation. We won't focus here on how to obtain this representation for your model, but be sure
to check `official OpenVINO conversion guide <https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_prepare_model_convert_model_Converting_Model.html>`__.

To convert :code:`custom_model.xml` and :code:`custom_model.bin`, we'll use the `blobconverter cli <https://pypi.org/project/blobconverter/>`__ - our
tool that utilizes `Online MyriadX blob converter <http://blobconverter.luxonis.com/>`__ to perform the conversion.
No local OpenVINO installation is needed in this case, as all of the dependencies are already installed on the server.
If your model is in TensorFlow or Caffe format, you can still use our tool for conversion, just note that
you'll have to use different input flags and sometimes provide a custom model optimizer args (:ref:`Read more <Converting model to MyriadX blob>`)


First, let's install :code:`blobconverter` from `PyPi <https://pypi.org/project/blobconverter/>`__

.. code-block:: bash

  $ python3 -m pip install -U blobconverter

Now, having the :code:`blobconverter` installed, we can compile our IR files with the following command

.. code-block:: bash

  $ python3 -m blobconverter --openvino-xml /path/to/custom_model.xml --openvino-bin /path/to/custom_model.bin

By running this command, :code:`blobconverter` sends a request to the BlobConverter API to perform
a model compilation on provided files. After compilation, the API responds with a :code:`.blob` file and
deletes all source files that were sent with the request.

After a successful compilation, :code:`blobconverter` returns the path to the downloaded blob file.
Since this blob is required by the :code:`depthai` repository, let's move it there

.. code-block:: bash

  $ mkdir <depthai_repo>/resources/nn/custom_model
  $ mv <path_to_blob> <depthai_repo>/resources/nn/custom_model

Configuration
*************

We need to provide some additional configuration for the demo script to run this blob.
The demo script will look for a :code:`custom_model.json` for details on how to configure the pipeline and parse the results.

If your model is based on MobileNetSSD or Yolo, you can use our :code:`detection` output format.
If it's a different type of network, you can use :code:`raw` (default) output format and  provide a custom handler file
to decode and display the NN results.

You can use these configuration examples to customize your :code:`custom_model.json` inside :code:`resources/nn/custom_model` directory

- **MobileNetSSD** (we will use this config)

.. code-block:: json

  {
      "nn_config":
      {
          "output_format" : "detection",
          "NN_family" : "mobilenet",
          "confidence_threshold" : 0.5,
          "input_size": "300x300"
      },
      "mappings":
      {
          "labels":
          [
              "unknown",
              "face"
          ]
      }
  }

- **Yolo**

.. code-block:: json

  {
      "nn_config":
      {
          "output_format" : "detection",
          "NN_family" : "YOLO",
          "input_size": "416x416",
          "NN_specific_metadata" :
          {
              "classes" : 80,
              "coordinates" : 4,
              "anchors" : [10,14, 23,27, 37,58, 81,82, 135,169, 344,319],
              "anchor_masks" :
              {
                  "side26" : [1,2,3],
                  "side13" : [3,4,5]
              },
              "iou_threshold" : 0.5,
              "confidence_threshold" : 0.5
          }
      },
      "mappings":
      {
          "labels":
          [
                "unknown",
                "face"
          ]
      }
  }


- **Raw** (see :ref:`Custom handler <Custom handler>` on details how to create :code:`handler.py` file)

.. code-block:: json

  {
      "nn_config": {
          "output_format" : "raw",
          "input_size": "300x300"
      },
      "handler": "handler.py"
  }

Run the demo script
*******************

Having the files in place, we can now run the demo with our custom model

.. image:: https://user-images.githubusercontent.com/5244214/142723365-a3f1e369-1b2f-4e22-b0e6-600463134352.png
  :alt: custom model location

And you should see the output and your NN results displayed (or printed in the console if :code:`raw` was selected and
there is no handler file)

.. image:: https://user-images.githubusercontent.com/5244214/142645887-f04b90e4-c69f-4764-93d3-37bfb05fe67c.png
  :alt: custom model

Be sure to check the advanced sections below or see :ref:`Next steps <Next steps>`

Custom handler
**************

Custom handler is a file that the demo script will load and execute to parse the NN results. We specify this file with
:code:`handler` config value, specifying a path to the file of preference. It also requires :code:`raw` output format,
since it prevents the script from handling the results itself.

The :code:`handler.py` file should contain two methods - :code:`decode(nn_manager, packet)` and :code:`draw(nn_manager, data, frames)`

.. code-block:: python

  def decode(nn_manager, packet):
    pass

  def draw(nn_manager, data, frames):
    pass

The first method, :code:`decode`, is called whenever a NN packet arrives from the pipeline (stored as a :code:`packet` param)
also providing a :code:`nn_manager` object that contains all nn-related info that was used by the script (like input size etc.).
The goal of this function is to decode the received packets from the NN blob into meaningful results that can later be displayed.


Second one, :code:`draw`, is called with the NN results (returned from :code:`decode`), :code:`nn_manager` object and
:code:`frames` array, having :code:`[(<frame_name>, <frame>), (<frame_name>, <frame>), ...]` items. This array will
contain frames that were specified with the :code:`-s/--show` param.
The goal of this function is to draw the decoded results onto received frames.

Below, you can find an example :code:`handle.py` file that decodes and displays MobilenetSSD-based results.

.. code-block:: python

  import cv2
  import numpy as np
  from depthai_helpers.utils import frame_norm


  def decode(nn_manager, packet):
      bboxes = np.array(packet.getFirstLayerFp16())
      bboxes = bboxes.reshape((bboxes.size // 7, 7))
      bboxes = bboxes[bboxes[:, 2] > 0.5]
      labels = bboxes[:, 1].astype(int)
      confidences = bboxes[:, 2]
      bboxes = bboxes[:, 3:7]
      return {
          "labels": labels,
          "confidences": confidences,
          "bboxes": bboxes
      }


  decoded = ["unknown", "face"]


  def draw(nn_manager, data, frames):
      for name, frame in frames:
          if name == nn_manager.source:
              for label, conf, raw_bbox in zip(*data.values()):
                  bbox = frame_norm(frame, raw_bbox)
                  cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), (255, 0, 0), 2)
                  cv2.putText(frame, decoded[label], (bbox[0] + 10, bbox[1] + 20), cv2.FONT_HERSHEY_TRIPLEX, 0.5, 255)
                  cv2.putText(frame, f"{int(conf * 100)}%", (bbox[0] + 10, bbox[1] + 40), cv2.FONT_HERSHEY_TRIPLEX, 0.5, 255)

With the custom face detection model, using this code we receive the following output

.. image:: https://user-images.githubusercontent.com/5244214/142723407-0dde0f8c-1ce6-4fa7-94bb-9fce5dff9804.png
  :alt: custom model custom handler

We already use this handler mechanism to decode `deeplabv3p_person <https://github.com/luxonis/depthai/blob/main/resources/nn/deeplabv3p_person/handler.py>`__,
that comes as one of the available networks in the demo script to use

On-demand compilation
*********************

Since files in the IR format can be large, and we're both downloading the blob and uploading IR format to the server,
we have incorporated an OpenVINO-like :code:`model.yml` file structure that the BlobConverter server uses internally as well.
You can check how this file looks like `in OpenVINO model zoo <https://github.com/openvinotoolkit/open_model_zoo/blob/master/models/intel/face-detection-retail-0004/model.yml>`__
or in `available models in demo script <https://github.com/luxonis/depthai/blob/main/resources/nn/tiny-yolo-v3/model.yml>`__.

This file is used by the `OpenVINO model downloader <https://github.com/openvinotoolkit/open_model_zoo/tree/master/tools/downloader>`__
that is used to download the required files for compilation. In our demo script, we use these files to
provide a URL to the NN source files instead of uploading them along with the source code. It is also useful because on-demand compilation
allows us to use the same configuration while requesting a different amount of MyriadX SHAVE cores.

To download the blob using :code:`model.yml` file, run

.. code-block:: bash

  $ python3 -m blobconverter --raw-config /path/to/model.yml --raw-name custom_model

You can also leave the `model.yml` file inside the `resources/nn/<name>` directory. This will make the demo script perform
the conversion for you and run the received blob

.. code-block:: bash

  $ python3 depthai_demo.py -cnn <name>

Customize the demo code
#######################

Callbacks file
**************

If you'd like to add some custom functionalities to the demo yourself or just check how do certain variables look like,
you can use a callbacks file, that should contain methods that the demo will call during execution on specific events.

An example of a callbacks file that `is available in the repo <https://github.com/luxonis/depthai/blob/main/callbacks.py>`__ is below

.. code-block:: python

    def shouldRun():
      pass  # Called to determine if the demo should be running


    def onNewFrame(frame, source):
      pass  # Called when a new frame is available


    def onShowFrame(frame, source):
        pass  # Called when a frame is about to be displayed


    def onNn(nn_packet):
        pass  # Called when a new NN packet is available


    def onReport(report):
        pass  # Called when a new report is available


    def onSetup(*args, **kwargs):
        pass  # Called when the demo script is setting up


    def onTeardown(*args, **kwargs):
        pass  # Called when the demo script is finishing


    def onIter(*args, **kwargs):
        pass  # Called on each demo script iteration (internal loop)

These methods allow building custom functionalities on top of the demo script itself, whether it's just printing or counting
the data from NN or modifying how to display the frames or even make custom database/API connections to send the data to
external destination.

By default, the demo script will use :code:`callbacks.py` file in the repository, but this path cam be changed using
:code:`-cb <path> / --callback <path>` flags

Importing demo as a class
*************************

If preferred, the Demo script can also be imported like a regular class - this allows to control when the demo is starting up
and when does it run. A simple example of how to run the demo from Python code is shown below

.. code-block:: python

    from depthai_demo import Demo
    from depthai_helpers.arg_manager import parseArgs
    from depthai_helpers.config_manager import ConfigManager

    args = parseArgs()
    conf = ConfigManager(args)
    demo = Demo(onNewFrame=<fn>, onShowFrame=<fn>, onNn=<fn>, onReport=<fn>, onSetup=<fn>, onTeardown=<fn>, onIter=<fn>) # all params are optional
    demo.run_all(conf)

Remember that :code:`PYTHONPATH` env variable must contain a path do depthai repository for the imports to work.
Alternatively, you can place the script along :code:`depthai_demo.py` in the repository

Next steps
##########

In the previous sections, we learned how to preview basic DepthAI features. From this point, you can explore the DepthAI world further

- **Looking for inspiration?**

  Check our :ref:`Example Use Cases` for ready to use applications that solve a specific problem on DepthAI

- **Want to start coding?**

  Be sure to check `hello world tutorial on API section <https://docs.luxonis.com/projects/api/en/latest/tutorials/hello_world/>`__ for a step-by-step introduction to the API

- **Want to train and deploy a custom model to DepthAI?**

  Visit :ref:`Custom training` page for ready to use Colab notebooks

.. include::  /pages/includes/footer-short.rst
