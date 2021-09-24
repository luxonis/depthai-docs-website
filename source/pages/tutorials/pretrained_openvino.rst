Use a Pre-trained OpenVINO model
================================

In this tutorial, you'll learn how to use a pre-trained face detection model to detect faces in real-time, even on a low-powered Raspberry Pi.

.. image:: /_static/images/tutorials/pretrained_openvino/face-1.png
  :alt: preview

If you would like to learn more about OpenVINO, Open Model Zoo and how to locally convert OpenVINO model into **.blob**, check out our
:ref:`Local OpenVINO Model Conversion`

Run DepthAI Default Model
#########################

The :code:`depthai_demo.py` file can be modified directly to you do your bidding, or you can simply pass arguments to it for
which models you want to run.

For simplicity we will do the latter, simply passing arguments so that DepthAI runs the :code:`face-detection-retail-0004`
instead of the model run by default.

Before switching to using the :code:`face-detection-retail-0004` let's take a baby step and give these command line
options a spin.  In this case we'll just pass in the same neural network that default runs when running
:code:`python3 depthai_demo.py`, just to make sure we're doing it right:

.. code-block:: bash

  python3 depthai_demo.py -dd

This will then run the a typical demo MobileNetv2 SSD object detector trained on the `PASCAL 2007 VOC <http://host.robots.ox.ac.uk/pascal/VOC/voc2007/>`__ classes, which are:

- Person: person
- Animal: bird, cat, cow, dog, horse, sheep
- Vehicle: airplane, bicycle, boat, bus, car, motorbike, train
- Indoor: bottle, chair, dining table, potted plant, sofa, TV/monitor

I ran this on my laptop with an OAK-D sitting on my desk pointing upwards randomly - and it makes out the corner of my
laptop screen and correctly identifies it as :code:`tvmonitor`:

.. image:: /_static/images/tutorials/pretrained_openvino/tvmonitor.jpeg
  :alt: laptop

Run model
#########

Now that we've got this verified, let's move on to trying out other models, starting with :code:`face-detection-retail-0004`.

To use this model, simply specify the name of the model to be run with the :code:`-cnn` flag, as below:

.. code-block:: bash

  python3 depthai_demo.py -dd -cnn face-detection-retail-0004

This will download the compiled :code:`face-detection-retail-0004` NN model and use it to run inference (detect faces) on color frames:

.. image:: /_static/images/tutorials/pretrained_openvino/face-detection.jpeg
  :alt: face-detection

It's that easy.  Substitute your face for mine, of course.

And if you'd like to try other models, just peruse `here <https://github.com/luxonis/depthai/tree/main/resources/nn>`__
and run them by their name, just like above.

Now take some time to play around with the model.  You can for example check how far away the model can detect your face:

.. image:: /_static/images/tutorials/pretrained_openvino/face3.png
  :alt: face

.. image:: /_static/images/tutorials/pretrained_openvino/face4.png
  :alt: face

In the latter image you can see that I'm quite back-lit, which is one of the main challenges in face detection
(and other feature detection). In this case, it's likely limiting the maximum range for which a face can be detected.
From the testing above, for a confidence threshold of 50%, this range appears to be about 20 feet.  You could get longer
range out of the same model by reducing the model confidence threshold (by changing from :code:`0.5`
`here <https://github.com/luxonis/depthai/blob/main/resources/nn/face-detection-retail-0004/face-detection-retail-0004.json#L6>`__) at the cost
of increased probability of false positives.

Another limiting factor is that this is a relatively low-resolution model (300x300 pixels), so faces get fairly small
fairly fast at a distance.  So let's try another face detection model that uses a higher resolution.

Trying Other Models
###################

The flow we walked through works for other pre-trained models in our repository
(`here <https://github.com/luxonis/depthai/tree/main/resources/nn>`__), which includes:

- People semantic segmentation (:code:`deeplabv3p_person`)
- Face detection (ADAS) (:code:`face-detection-adas-0001`)
- Face detection (retail, the one we used) (:code:`face-detection-retail-0004`)
- Mobilenet general object detection (default model) (:code:`mobilenet-ssd`)
- Pose estimation (:code:`openpose2`)
- Pedestrian detection (ADAS) (:code:`pedestrian-detection-adas-0002`)
- Person detection (retail) (:code:`person-detection-retail-0013`)
- Person, Vehicle and Bike Detection (:code:`person-vehicle-bike-detection-crossroad-1016`)
- tiny Yolo - general object detection (:code:`tiny-yolo-v3`)
- Vehicle detection for driver-assistance (:code:`vehicle-detection-adas-0002`)
- Vehicle and license plate detection (:code:`vehicle-license-plate-detection-barrier-0106`)
- Yolo - general object detection (:code:`yolo-v3`)

..
  Add to the list once we have it working (it's stage 2 NN)
  - Emotion recognition (:code:`emotions-recognition-retail-0003`)

You can simply specify any of these models after the :code:`-cnn` argument.

Let's try out :code:`face-detection-adas-0001`, which is intended for detecting faces inside the cabin of a vehicle.
(ADAS stands for Advanced Driver-Assistance Systems)

.. code-block:: bash

  python3 depthai_demo.py -dd -cnn face-detection-adas-0001

.. image:: /_static/images/tutorials/pretrained_openvino/face-5.png
  :alt: face

So this model actually has a shorter detection distance than the smaller model despite having a higher resolution.
Why?  Likely because it was intentionally trained to detect only close-in faces since it's intended to be used in the
cabin of a vehicle.  (You wouldn't want to be detecting the faces in cars passing by, for example.)

..
  TODO add this once emotions recognition model will work
  And also you may notice networks like emotion recognition... those networks are actually intended to be run as a second
  stage network (as they are meant to be applied only to images that contain only faces).  So to use the emotion
  recognition network, use the command below to tell DepthAI/megaAI to run it as the second stage:

  .. code-block:: bash

    ./depthai_demo.py -cnn emotions-recognition-retail-0003

  .. image:: https://i.imgur.com/uqhdqJG.png
    :alt: face

Spatial AI - Augmenting the Model with 3D Position
##################################################

So by default DepthAI is set to return the full 3D position.  So in the command above, we actually specify for it to not
be calculated with :code:`-dd` (or :code:`--disableDepth`).

So let's run that same command, but with that line omitted, such that 3D results are returned (and displayed):

.. code-block:: bash

  python3 depthai_demo.py -cnn face-detection-retail-0004

.. image:: /_static/images/tutorials/pretrained_openvino/face-6.png
  :alt: face

And there you find the 3D position of my face!

You can then choose other models and get real-time 3D position for the class of interest.

Play with the feature and please share demos that you come up with (especially if you make a robot that stalks your cat)
on `discuss.luxonis.com <https://discuss.luxonis.com/>`__ and if you run into any issues, please ping us on our
`Discord server <https://discord.gg/EPsZHkg9Nx>`__.

And if you find any errors in these documents, please report an issue on the `Github <https://github.com/luxonis/depthai-docs-website>`__.

.. 
  There's no support for this yet
  Stereo Neural Inference
  ***********************

  Below we'll use another technique, which we dub 'stereo neural inference' (or 'Stereo AI') which works well for smaller
  objects and also pixel-point features like facial landmarks and pose-estimator results, etc.

  .. image:: https://i.imgur.com/mKuzWI6.png
    :alt: Stereo Neural inference mode

  This can be run with the following command:

  .. code-block:: bash

    ./depthai_demo.py -cnn face-detection-retail-0004 -cnn2 landmarks-regression-retail-0009 -cam left_right -dd -sh 12 -cmx 12 -nce 2 -monor 400 -monof 30

  And note this is running both parallel neural inference (i.e. on both cameras) and also series neural inference
  (the landmarks-regression network is running on the results of the face detector).

.. include::  /pages/includes/footer-short.rst

