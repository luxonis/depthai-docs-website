Depth perception
================

DepthAI platform supports different ways of perceiving depth:

#. :ref:`Passive stereo depth perception` - Used by non-Pro version of OAK-D cameras
#. :ref:`Active stereo depth perception` - Used by `Pro version <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/oak-s2.html#pro-version>`__ of OAK-D cameras
#. :ref:`Time-of-Flight depth perception` - Used by `OAK-pToF <https://docs.luxonis.com/projects/hardware/en/latest/pages/DM0255.html>`__

We currently don't have any plans to support other ways to support depth (ultrasound, radar, etc.).

Passive stereo depth perception
###############################

Passive stereo works a lot like our eyes. Our brains (subconsciously) estimate depth of objects and scenes based on the
difference of what our left eye sees versus what our right eye sees. On OAK-D cameras, it's exactly the same; we have a
stereo camera pair - left and right monocular cameras - and the VPU (brains of the OAK cameras) does the
**disparity matching** to estimate the depth of objects and scenes.

**Disparity** is the distance (in pixels) between the same point in the left and right image of the stereo pair camera.
A great demo of disparity is below - the disparity is visualized with red line between points/features - which in this
case are facial landmarks (eyes, nose, mouth).

.. image:: https://user-images.githubusercontent.com/59799831/132098832-70a2d0b9-1a30-4994-8dad-dc880a803fb3.gif
  :target: https://github.com/luxonis/depthai-experiments/tree/master/gen2-triangulation
  :alt: Triangulation Demo

OAK-D camera does that for every pixel in the mono frame - it goes through pixels on the first mono frame,
finds the same point/feature on the second mono frame and assigns a disparity value (in pixels) with some confidence for every pixel.
This all hapens inside the `StereoDepth node <https://docs.luxonis.com/projects/api/en/latest/components/nodes/stereo_depth/>`__.

**Disparity matching won't work well with blank, featureless surfaces (like walls or ceilings) when using passive stereo
depth perception.** That's because disparity matching will have a hard time to match points/features from left/right images - as
there are no distinctive points/features in either frames. That's where active stereo depth perception is needed.

Active stereo depth perception
##############################

On our `OAK Pro cameras <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/oak-s2.html#pro-version>`__ we use
conventional active stereo vision (`ASV <https://en.wikipedia.org/wiki/Computer_stereo_vision#Conventional_active_stereo_vision_(ASV)>`__).
**Dot projector** is used to project many small dots in front of the device, which helps with disparity matching,
especially for low-visual-interest surfaces (blank surfaces with little to no texture), such as a wall or ceiling.

The stereo matching process is performed exactly the same same way as with passive stereo perception, the dots only help
with the accuracy.


.. image:: /_static/images/tutorials/active-stereo.png

Here you can see passive and active stereo perception when the OAK camera is faced against a wall. If you look closely at
the mono image (bottom left), you can see many small dots being projected onto the wall.

Time-of-Flight depth perception
###############################

Stereo perception has it pros and cons. It's cheap, can perceive depth at greater distances, and has a high resolution.
On the other hand, it's not as accurate. So for high-accuracy applications, ToF approach is suggested, as it can provide
sub-centimetre depth accuracy.

We have built a `ToF FFC module <https://docs.luxonis.com/projects/hardware/en/latest/pages/DM0255.html>`__ that can be used
with `OAK-FFC <https://docs.luxonis.com/projects/hardware/en/latest/#modular-cameras-designs>`__ and in the future, we
will create a standalone camera with ToF sensor onboard.

.. image:: /_static/images/tutorials/tof-demo.gif
  :target: https://youtu.be/4keVBYIuz6Q

On the gif above you can see high accuracy (especially at low FPS) pointcloud that was produced using `ToF FFC module <https://docs.luxonis.com/projects/hardware/en/latest/pages/DM0255.html>`__
and a `color camera <https://docs.luxonis.com/projects/hardware/en/latest/pages/BG0249.html>`__. ToF resolution here is 244x172.


.. include::  /pages/includes/footer-short.rst