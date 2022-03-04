.. _spatialai:

Spatial AI
==========

Spatial AI is what allows robots or computers to perceive the world as a human can - what objects or features are - and where
they are in the physical world. DepthAI platform laverages Spatial AI by fusing :ref:`AI capabilities <AI / ML / NN>` with
:ref:`depth perception` on the OAK camera itself.

There are a few different approaches to achieve AI + depth fusion:

#. :ref:`Neural inference fused with depth map <object-localization>`
#. :ref:`Semantic depth <semantic-depth>`
#. :ref:`Stereo neural inference <stereo-inference>`

.. _object-localization:

1. Neural inference fused with depth map
########################################

DepthAI can fuse neural inference (object/landmark detection) results with depth map to estimate spatial coordinates (XYZ) of
all objects/landmarks in the scene.

This technique is great for object/feature detectors as it provides the physical location of the centroid of the object -
and takes advantage of the fact that most objects are usually many pixels so the disparity depth results can be
averaged to produce a more accurate location.

3D Object Localization
----------------------

First, let's define what '`Object Detection <https://pjreddie.com/darknet/yolo/>`__' is. It is the technical term
for finding the bounding box of an object of interest, in pixel space (i.e. pixel coordinates), in an image.

.. image:: /_static/images/tutorials/object-detection.jpg
  :alt: Object Detection

**3D Object Localization** (or 3D Object Detection) is all about finding such objects in physical space, instead of pixel space.
This is useful when trying to real-time measure or interact with the physical world.

Below is a visualization to showcase the difference between Object Detection and 3D Object Localization:

.. image:: /_static/images/tutorials/detection-vs-localization.png
  :target: https://www.youtube.com/watch?v=2J5YFehJ3N4
  :alt: Spatial AI Visualization


Spatial AI is then the super-set of such 2D-equivalent neural networks being extended with spatial information to give them
3D context. So in other words, it's not limited to object detectors being extended to 3D object localizers.
Other network types can be extended as well, including any network which returns results in pixel space.

.. image:: https://user-images.githubusercontent.com/18037362/132068313-e6db90c2-823b-42f2-86fb-148e798f55de.png
  :alt: Default run

On the image above :ref:`depthai demo <Default run>` is running MobileNet object detector and fuses object detections with
depth map to provide spatial coordiantes (XYZ) of objects it sees; person, potted plant, bottle, and chair.

3D Landmark Localization
------------------------

An example would be a hand landmark detector on DepthAI.  With a normal camera this network returns
the 2D (XY) coordinates of all 21 hand landmarks (contours of all joints in fingers). Using this same network
with DepthAI, each of these 21 hand landmarks is now a 3D point in physical space instead of 2D points in pixel space.

.. image:: https://user-images.githubusercontent.com/18037362/156813885-146602d9-e5f9-4afa-9542-7904c7e236b3.gif

Demos: `hand landmark <https://github.com/geaxgx/depthai_hand_tracker>`__ (above),
`human pose landmark <https://github.com/geaxgx/depthai_blazepose>`__, and `facial landmark <https://github.com/luxonis/depthai-experiments/tree/master/gen2-facemesh#gen2-facial-landmarks-on-depthai>`__
detection demos.

.. _semantic-depth:

2. Semantic depth
#################

One of the classic problems in autonomous robotic navigation/actuation are the **unknown objects**.
Known objects are things that are known a-priori to the installation to be encountered - such as tools, other machines,
workers, equipment, and facilities.

Unknown objects are things that may not be anticipated - or even things that are
completely unknowable or never-before-seen. For known objects, training an object detector is sufficient as this is a
“positive” form of object detection: “Pile in the path, stop.”  “Shovel in the path, stop.” etc.

This is where a “negative” object detection system is required in such generic obstacle avoidance scenarios.  And a very
effective technique is to use **semantic segmentation** of RGB, Depth, or RGB+Depth.

.. image:: /_static/images/tutorials/segmentation.jpeg
    :target: https://youtu.be/LGGtF_4v5sQ?t=3405

The image above was taken from `Greenzie <https://www.greenzie.com/>`__'s robotic landmowers (from OpenCV `weekly livestream <https://youtu.be/LGGtF_4v5sQ?t=3405>`__).

In such a “negative” system, the semantic segmentation system is trained on all the surfaces that are not objects. So
anything that is not that surface is considered an object - allowing the navigation to know it’s location and to take
commensurate action (stop, go around, turn around, etc.). So the semantic depth is extremely valuable for **object avoidance**
and **navigation planing** application.

.. image:: https://user-images.githubusercontent.com/18037362/156813894-eced8fd7-90b5-4331-a7fd-4ad10307f14f.gif
    :target: https://github.com/luxonis/depthai-experiments/tree/master/gen2-deeplabv3_depth

On the image there's a person semantic segmentation model running on RGB frames, and based on the results it crops depth maps
to only include the person's depth.

.. _stereo-inference:

3. Stereo neural inference
##########################

In this mode, the neural inference (landmark detection) is run on the left **and** right cameras to
produce stereo inference results. Unlike monocular neural inference fused with stereo depth - there is no max disparity
search limit - so the minimum distance is purely limited by the greater of (a) horizontal field of view (HFOV) of the
stereo cameras themselves and (b) the hyperfocal distance of the cameras (minimal distance for objects to be in focus).

After we have 2D positions of landmarks from both left/right cameras, we can calculate the disparity of the results
which are then triangulated with the calibrated camera intrinsics to give 3D position of all the detected features.

.. image:: https://user-images.githubusercontent.com/59799831/132098832-70a2d0b9-1a30-4994-8dad-dc880a803fb3.gif
  :target: https://github.com/luxonis/depthai-experiments/tree/master/gen2-triangulation
  :alt: Triangulation Demo

For more infromation check out the `Stereo neural inference demo <https://github.com/luxonis/depthai-experiments/tree/master/gen2-triangulation>`__.

Examples include finding the 3D locations of:

 - Facial landmarks (eyes, ears, nose, edges of mouth, etc.)
 - Features on a product (screw holes, blemishes, etc.)
 - Joints on a person (e.g. elbow, knees, hips, etc.)
 - Features on a vehicle (e.g. mirrors, headlights, etc.)
 - Pests or disease on a plant (i.e. features that are too small for object detection + stereo depth)

This mode does not require the neural networks to be trained with depth data. DepthAI takes standard, off-the-shelf 2D
networks (which are significantly more common) and uses this stereo inference to produce accurate 3D results.

.. include::  /pages/includes/footer-short.rst
