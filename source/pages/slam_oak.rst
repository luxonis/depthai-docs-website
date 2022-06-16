SLAM with OAK
#############

On-board localization (`VIO <https://en.wikipedia.org/wiki/Visual_odometry>`__) and `SLAM <https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping>`__ (Simultaneous Localization And Mapping)
on current OAK cameras (Movidius Myriad X VPU) aren't yet supported.

Our upcoming `Series 3 <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/oak-s3.html>`__
OAK cameras with Movidius Keem Bay will have `Quad-core ARM A53 <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/oak-s3.html#quad-core-arm>`__
1.5GHz integrated into the VPU. We will likely **port an open-source SLAM implementation to the Keem Bay**. Having full access
to the ARM will allow **other companies** (which specialize in VIO/SLAM) to **port their software stacks** to our cameras and license it.

Several SLAM projects that support OAK-D cameras:

- `ORB SLAM3 <https://qiita.com/nindanaoto/items/20858eca08aad90b5bab>`__ with an OAK-D and ROS1  by ``@nimda``
- `RTAB-Map <https://github.com/introlab/rtabmap>`__ recently (`PR here <https://github.com/introlab/rtabmap/pull/696>`__) added support for depthai and OAK cameras (via ROS)
- `SpectacularAI's SLAM <https://twitter.com/oseiskar/status/1536344550305763328?s=20&t=YY432W59nsZd6_IhhfBW4A>`__ with OAK-D - Free for non-commercial use
- `ArduCam Visual SLAM tutorial <https://www.arducam.com/docs/opencv-ai-kit-oak/performing-location-with-visual-slam/>`__
- `DepthAI-SLAM <https://github.com/bharath5673/depthai-slam>`__

You can also check out our :code:`#slam` channel on our `Discord server <https://discord.gg/luxonis>`__, where there are tons of
useful information on how to perform SLAM with OAK cameras.

.. include::  /pages/includes/footer-short.rst
