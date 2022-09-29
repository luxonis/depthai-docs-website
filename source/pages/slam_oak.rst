SLAM with OAK
#############

On-board localization (`VIO <https://en.wikipedia.org/wiki/Visual_odometry>`__) and `SLAM <https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping>`__ (Simultaneous Localization And Mapping)
on current OAK cameras (`RVC2 <https://docs.luxonis.com/projects/hardware/en/latest/pages/rvc/rvc2.html>`__) aren't yet supported.

Our upcoming `Series 3 <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/oak-s3.html>`__
OAK cameras with `RVC3 <https://docs.luxonis.com/projects/hardware/en/latest/pages/rvc/rvc3.html>`__ have
`Quad-core ARM A53 <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/oak-s3.html#quad-core-arm>`__
1.5GHz integrated into the VPU. There will be an **open-source SLAM implementation on the RVC3**. Users are be able to run `custom containarized apps <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/oak-s3.html#custom-applications>`__
on the ARM, which will allow **other companies** (which specialize in VIO/SLAM) to **port their software stacks** to our cameras and license it.

Several SLAM projects that support OAK-D cameras:

- `ORB SLAM3 <https://qiita.com/nindanaoto/items/20858eca08aad90b5bab>`__ with an OAK-D and ROS1  by ``@nimda``
- `RTAB-Map <https://github.com/introlab/rtabmap>`__ recently (`PR here <https://github.com/introlab/rtabmap/pull/696>`__) added support for depthai and OAK cameras (via ROS)
- `SpectacularAI's SLAM <https://twitter.com/oseiskar/status/1536344550305763328?s=20&t=YY432W59nsZd6_IhhfBW4A>`__ with OAK-D - Free for non-commercial use
- `ArduCam Visual SLAM tutorial <https://www.arducam.com/docs/opencv-ai-kit-oak/performing-location-with-visual-slam/>`__
- `DepthAI-SLAM <https://github.com/bharath5673/depthai-slam>`__

You can also check out our ``#slam`` channel on our `Discord server <https://luxonis.com/discord>`__, where there are tons of
useful information on how to perform SLAM with OAK cameras.

.. include::  /pages/includes/footer-short.rst
