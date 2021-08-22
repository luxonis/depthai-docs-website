SLAM with OAK
#############

`SLAM <https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping>`__ (Simultaneous Localization And Mapping) can be performed using
our OAK devices.

We plan on creating our own visual-inertial SLAM project that would use on-device feature tracking (using `FeatureTracker <https://github.com/luxonis/depthai-python/blob/develop/examples/feature_tracker.py>`__ node)
and intertial data (using `IMU <https://docs.luxonis.com/projects/api/en/latest/components/nodes/imu/>`__ node), if the device has an IMU sensor onboard.

Our awesome community has also created several projects that use OAK for SLAM:

- `ArduCam Visual SLAM tutorial <https://www.arducam.com/docs/opencv-ai-kit-oak/performing-location-with-visual-slam/>`__
- `OAKD_ORBSLAM3 <https://github.com/duncanrhamill/oakd_orbslam3>`__
- `DepthAI-SLAM <https://github.com/bharath5673/depthai-slam>`__

You can also check out our :code:`#slam` channel on our `Discord server <https://discord.gg/EPsZHkg9Nx>`__, where there are tons of
useful information about how to perform SLAM on OAK devices.

.. include::  /pages/includes/footer-short.rst