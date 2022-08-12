.. _spatialai:

Spatial AI
==========

**Spatial AI** allows robots or computers to perceive the world like a human can, such as what objects or features are and where
they are in the physical world. The DepthAI platform **leverages Spatial AI by fusing** :ref:`AI capabilities <AI / ML / NN>` with
:ref:`depth perception <Depth perception>` on the OAK camera itself.

There are a few different approaches to achieve AI + depth fusion:

#. :ref:`Neural inference fused with depth map <object-localization>`
#. :ref:`Semantic depth <semantic-depth>`
#. :ref:`Stereo neural inference <stereo-inference>`

.. _object-localization:

1. Neural inference fused with depth map
########################################

DepthAI can fuse neural inference (object/landmark detection) results with a depth map to estimate spatial coordinates (XYZ) of
all objects/landmarks in the scene.

This technique is excellent for existing (pre-trained) 2D object/feature detectors as it runs inference on color/mono frames,
and uses resulting bounding boxes to determine ROIs (regions-of-interest). DepthAI then averages depth from depth map inside
these ROIs and calculates spatial coordinates from that (`calculation here <https://github.com/luxonis/depthai-experiments/blob/master/gen2-calc-spatials-on-host/calc.py#L39-L64>`__).

3D Object Localization
----------------------

First, let us define what '`Object Detection <https://pjreddie.com/darknet/yolo/>`__' is. It is the technical term
for finding the bounding box of an object of interest, in an image's pixel space (i.e., pixel coordinates),.

.. image:: /_static/images/tutorials/object-detection.jpg
  :alt: Object Detection

**3D Object Localization** (or 3D Object Detection) is all about finding objects in physical space instead of pixel space.
It is useful when measuring or interacting with the physical world in real-time.

Below is a visualization to showcase the difference between Object Detection and 3D Object Localization:

.. image:: /_static/images/tutorials/detection-vs-localization.png
  :target: https://www.youtube.com/watch?v=2J5YFehJ3N4
  :alt: Spatial AI Visualization


DepthAI extends these 2D neural networks (eg. MobileNet, Yolo) with spatial information to give them 3D context.

.. image:: /_static/images/tutorials/depthaidemo.png
  :alt: Object localization

On the image above, the :ref:`depthai demo <Default run>` runs MobileNet object detector and fuses object detections with
a depth map to provide spatial coordinates (XYZ) of objects it sees: person, potted plant, bottle, and chair.

3D Landmark Localization
------------------------

An example would be a hand landmark detector on DepthAI. With a regular camera, this network returns
the 2D (XY) coordinates of all 21 hand landmarks (contours of all joints of the fingers). Using this same network
with DepthAI, these 21 hand landmarks are now 3D points in physical space instead of 2D points in pixel space.

.. image:: https://user-images.githubusercontent.com/18037362/156813885-146602d9-e5f9-4afa-9542-7904c7e236b3.gif
  :target: https://www.youtube.com/watch?v=xXXsT6afW6E

Demos: `hand landmark <https://github.com/geaxgx/depthai_hand_tracker>`__ (above),
`human pose landmark <https://github.com/geaxgx/depthai_blazepose>`__, and `facial landmark <https://github.com/luxonis/depthai-experiments/tree/master/gen2-facemesh#gen2-facial-landmarks-on-depthai>`__
detection demos.

.. _semantic-depth:

2. Semantic depth
#################

One of the classic problems in autonomous robotic navigation/actuation are **unknown objects**.
Known objects are specified before the installation to be encountered, such as tools, other machines,
workers, equipment, and facilities.

We cannot anticipate unknown objects - including those
unknowable or never-before-seen. Training an object detector is sufficient for known objects as this is a
“positive” form of object detection: “Pile in the path, stop.” “Shovel in the path, stop.” etc.

Such generic obstacle avoidance scenarios require a “negative” object detection system, and a very
effective technique is to use **semantic segmentation** of RGB, Depth, or RGB+Depth.

.. image:: /_static/images/tutorials/segmentation.jpeg
    :target: https://youtu.be/LGGtF_4v5sQ?t=3405

The image above was taken from `Greenzie <https://www.greenzie.com/>`__'s robotic landmowers (from OpenCV `weekly livestream <https://youtu.be/LGGtF_4v5sQ?t=3405>`__).

In such a “negative” system, the semantic segmentation system is trained on all the surfaces that are not objects. So
anything that is not that surface is considered an object - allowing the navigation to know its location and take
commensurate action (stop, go around, turn around, etc.). So the semantic depth is extremely valuable for **object avoidance**
and **navigation planning** application.

.. image:: https://user-images.githubusercontent.com/18037362/156813894-eced8fd7-90b5-4331-a7fd-4ad10307f14f.gif
    :target: https://github.com/luxonis/depthai-experiments/tree/master/gen2-deeplabv3_depth

On the image above, a person semantic segmentation model is running on RGB frames, and, based on the results, it crops depth maps
only to include the person’s depth.

.. _stereo-inference:

3. Stereo neural inference
##########################

In this mode, the neural inference (landmark detection) is run on the left **and** right cameras to
produce stereo inference results. Unlike monocular neural inference fused with stereo depth there is no max disparity
search limit, so the minimum distance is purely limited by the greater of (a) horizontal field of view (HFOV) of the
stereo cameras themselves and (b) the hyperfocal distance of the cameras (minimal distance for objects to be in focus).

After we have 2D positions of landmarks from both left/right cameras, we can calculate the disparity of the results,
which are then triangulated with the calibrated camera intrinsics to give the 3D position of all the detected features.

.. image:: https://user-images.githubusercontent.com/59799831/132098832-70a2d0b9-1a30-4994-8dad-dc880a803fb3.gif
  :target: https://github.com/luxonis/depthai-experiments/tree/master/gen2-triangulation
  :alt: Triangulation Demo

For more information, check out the `Stereo neural inference demo <https://github.com/luxonis/depthai-experiments/tree/master/gen2-triangulation>`__.

Examples include finding the 3D locations of:

 - Facial landmarks (eyes, ears, nose, edges of the mouth, etc.)
 - Features on a product (screw holes, blemishes, etc.)
 - Joints on a person (e.g., elbow, knees, hips, etc.)
 - Features on a vehicle (e.g. mirrors, headlights, etc.)
 - Pests or disease on a plant (i.e. features that are too small for object detection + stereo depth)

This mode does not require the neural networks to be trained with depth data. DepthAI takes standard, off-the-shelf 2D
networks (which are significantly more common) and uses this stereo inference to produce accurate 3D results.

.. include::  /pages/includes/footer-short.rst
