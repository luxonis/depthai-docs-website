First steps with DepthAI
========================

Hello DepthAI users!

In this guide, I assume you just got your DepthAI device (e.g. `OAK <https://docs.luxonis.com/projects/hardware/en/latest/pages/BK1096.html>`__ or `OAK-D <https://docs.luxonis.com/projects/hardware/en/latest/pages/BW1098OAK.html>`__)
and you want to give it the first try to explore what is possible with it and what you can achieve when working with it.

- First, we will run a DepthAI demo script, that will allow you to preview DepthAI functionalities.
- Next, I will explain what the script does and describe basic terms used in the DepthAI world.
- Last, you will receive useful links to expand your knowledge further, and check open-sourced use-case implementations, code examples and tutorials, that you can use as a starting point for your projects.

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

Download demo script
####################

Our goal is to make engineering efficiency higher with DepthAI. As a part of this effort, we created an all-in-one script that
allows you to check DepthAI features using command line arguments - no coding required!

To download the demo script, you can either use :code:`git` or directly download a zip file

From zip file
*************

First, download a repository package from `here <https://github.com/luxonis/depthai/archive/refs/heads/main.zip>`__
and then unpack the archive to a directory of preference. Next open a terminal session in this directory.

From git
********

First, open the terminal session and go to a directory of preference, where you'd like to download your demo script.
Then, run the following code to download the demo script

.. code-block:: bash

  $ git clone https://github.com/luxonis/depthai.git

After the repository is downloaded, make sure to enter the downloaded repository by running

.. code-block:: bash

  $ cd depthai

Create python virtualenv (optional)
###################################

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
####################

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
###############

Having everything set up, we are now ready to use the demo script by running

.. code-block:: bash

  $ python3 depthai_demo.py

This will compile and download a default `mobilenet-ssd` model, configure the DepthAI and then display
:code:`rgb` window that will contain a scaled preview from the RGB camera from your device.

If you're using OAK-D, it will also display :code:`depth` window, that will show the depth projection calculated from
left & right camera images by DepthAI.


.. image:: https://user-images.githubusercontent.com/5244214/116865569-28daa400-ac0a-11eb-8772-2a46d24640df.png
  :alt: Default run

Change input camera to left/right (OAK-D only)
##############################################

To run the demo script and get a preview from the left camera, run

.. code-block:: bash

  $ python3 depthai_demo.py -cam left

.. image:: https://user-images.githubusercontent.com/5244214/116867083-bcad6f80-ac0c-11eb-9a4c-70fd6c990777.png
  :alt: Run from left

Respectively, to get a preview from the right camera, run

.. code-block:: bash

  $ python3 depthai_demo.py -cam right

.. image:: https://user-images.githubusercontent.com/5244214/116867211-fda58400-ac0c-11eb-9deb-0469a755e1cc.png
  :alt: Run from right

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

.. image:: https://user-images.githubusercontent.com/5244214/116867984-4447ae00-ac0e-11eb-9ed1-fac37f78634d.png
  :alt: bottles and apples

Or even cats

.. image:: https://user-images.githubusercontent.com/5244214/117653608-e6c6da80-b194-11eb-80c9-2fbb459639cf.png
  :alt: cat

Using other models
##################

We have prepared other models, which you can try and evaluate by simply changing one command line parameter.
To run the demo script with a different model, e.g. :code:`face-detection-retail-0004`, run the following command


.. code-block:: bash

  $ python3 depthai_demo.py -cnn face-detection-retail-0004

Which will allow you to detect human faces, like below


.. image:: https://user-images.githubusercontent.com/5244214/116868791-ba004980-ac0f-11eb-9dcf-36ab2852d08e.png
  :alt: face

You can use :code:`-cnn <name>` flag to change the model that is being run on the DepthAI. Below, there is a list of
models that you can use, having just the demo script downloaded

- :code:`face-detection-adas-0001` - Allows to detect faces on the image (slower)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn face-detection-adas-0001

  .. image:: https://user-images.githubusercontent.com/5244214/117137299-c8826880-ada9-11eb-89b6-fafc3be0937f.png
    :alt: face-detection-adas-0001

- :code:`face-detection-retail-0004` - Allows to detect faces on the image (faster)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn face-detection-retail-0004

  .. image:: https://user-images.githubusercontent.com/5244214/117137578-30d14a00-adaa-11eb-9352-b3cfbc9c69d7.png
    :alt: face-detection-retail-0004

- :code:`mobilenet-ssd` - Object detector that detects 20 different classes (default)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn mobilenet-ssd

  .. image:: https://user-images.githubusercontent.com/5244214/116867984-4447ae00-ac0e-11eb-9ed1-fac37f78634d.png
    :alt: mobilenet-ssd

- :code:`pedestrian-detection-adas-0002` - allows to detect people on the image (slower)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn pedestrian-detection-adas-0002

  .. image:: https://user-images.githubusercontent.com/5244214/117141406-c969c900-adae-11eb-93b0-f69a2ca31512.png
    :alt: pedestrian-detection-adas-0002

- :code:`person-detection-retail-0013` - allows to detect people on the image (faster)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn person-detection-retail-0013

  .. image:: https://user-images.githubusercontent.com/5244214/117142161-adb2f280-adaf-11eb-9c83-b7b4aa027093.png
    :alt: person-detection-retail-0013

- :code:`person-vehicle-bike-detection-crossroad-1016` - allows to detect both people, bikes and vehicles on the image

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn person-vehicle-bike-detection-crossroad-1016

  .. image:: https://user-images.githubusercontent.com/5244214/117144527-4fd3da00-adb2-11eb-89a4-2733cd9a39af.png
    :alt: person-vehicle-bike-detection-crossroad-1016

- :code:`yolo-v3` - Object detector that detects 80 different classes (slower)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn yolo-v3

  .. image:: https://user-images.githubusercontent.com/5244214/117146045-1603d300-adb4-11eb-86d5-4a4d86b58b4e.png
    :alt: yolo-v3

- :code:`tiny-yolo-v3` - Object detector that detects 80 different classes (faster)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn tiny-yolo-v3

  .. image:: https://user-images.githubusercontent.com/5244214/117146045-1603d300-adb4-11eb-86d5-4a4d86b58b4e.png
    :alt: tiny-yolo-v3

- :code:`vehicle-detection-adas-0002` - allows to detect vehicles on the image

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn vehicle-detection-adas-0002

  .. image:: https://user-images.githubusercontent.com/5244214/117147219-54e65880-adb5-11eb-8089-c38d09a21076.png
    :alt: vehicle-detection-adas-0002

- :code:`vehicle-license-plate-detection-barrier-0106` - allows to detect both vehicle and license plate on the image (only Chineese license plates)

  .. code-block:: bash

    $ python3 depthai_demo.py -cnn vehicle-license-plate-detection-barrier-0106

  .. image:: https://user-images.githubusercontent.com/5244214/117147703-cd4d1980-adb5-11eb-8109-769cc3a2091a.png
    :alt: vehicle-license-plate-detection-barrier-0106

All of the data we use to download and compile a model can be found `here <https://github.com/luxonis/depthai/tree/main/resources/nn>`__.

Next steps
##########

In the previous sections, we learned how to preview basic DepthAI features. From this point, you can explore the DepthAI world further

- **Looking for inspiration?**

  Check our :ref:`Example Use Cases` for ready to use applications that solve a specific problem on DepthAI

- **Want to start coding?**

  Be sure to check `hello world tutorial on API section <https://docs.luxonis.com/projects/api/en/latest/tutorials/hello_world/>`__ for a step-by-step introduction to the API

- **Want to train and deploy a custom model to DepthAI?**

  Visit :ref:`Custom training` page for ready to use Colab notebooks

.. include::  /pages/includes/footer-long.rst