SLAM with OAK
#############

`SLAM <https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping>`__ (Simultaneous Localization And Mapping) can be performed using
our OAK devices.

We plan on creating our own visual-inertial SLAM project that would use on-device feature tracking (using `FeatureTracker <https://docs.luxonis.com/projects/api/en/latest/components/nodes/feature_tracker/>`__ node)
and intertial data (using `IMU <https://docs.luxonis.com/projects/api/en/latest/components/nodes/imu/>`__ node), if the device has an IMU sensor onboard.

Our awesome community has also created several projects that use OAK for SLAM:

- `ORB SLAM3 <https://qiita.com/nindanaoto/items/20858eca08aad90b5bab>`__ with an OAK-D and ROS1  by ``@nimda``
- `ArduCam Visual SLAM tutorial <https://www.arducam.com/docs/opencv-ai-kit-oak/performing-location-with-visual-slam/>`__
- `DepthAI-SLAM <https://github.com/bharath5673/depthai-slam>`__

You can also check out our :code:`#slam` channel on our `Discord server <https://discord.gg/luxonis>`__, where there are tons of
useful information about how to perform SLAM on OAK devices.

.. include::  /pages/includes/footer-short.rst
