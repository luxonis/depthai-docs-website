SLAM with OAK
#############

On-board localization (`VIO <https://en.wikipedia.org/wiki/Visual_odometry>`__) and `SLAM <https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping>`__ (Simultaneous Localization And Mapping)
on current OAK cameras (`RVC2 <https://docs.luxonis.com/projects/hardware/en/latest/pages/rvc/rvc2.html>`__) aren't yet supported.

Our upcoming `Series 3 <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/oak-s3.html>`__
OAK cameras with `RVC3 <https://docs.luxonis.com/projects/hardware/en/latest/pages/rvc/rvc3.html>`__ have
`Quad-core ARM A53 <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/oak-s3.html#quad-core-arm>`__
1.5GHz integrated into the VPU. There will be an **open-source SLAM implementation on the RVC3**. Users are be able to run `custom containarized apps <https://docs.luxonis.com/projects/hardware/en/latest/pages/articles/oak-s3.html#custom-applications>`__
on the ARM, which will allow **other companies** (which specialize in VIO/SLAM) to **port their software stacks** to our cameras and license it.

Several SLAM and localization projects that support OAK-D cameras:

- `ORB SLAM3 <https://qiita.com/nindanaoto/items/20858eca08aad90b5bab>`__ with an OAK-D and ROS1  by ``@nimda``
- `RTAB-Map <https://github.com/introlab/rtabmap>`__ recently (`PR here <https://github.com/introlab/rtabmap/pull/696>`__) added support for depthai and OAK cameras (via ROS)
- `SpectacularAI's SLAM <https://twitter.com/oseiskar/status/1536344550305763328?s=20&t=YY432W59nsZd6_IhhfBW4A>`__ with OAK-D - Free for non-commercial use
- `ArduCam Visual SLAM tutorial <https://www.arducam.com/docs/opencv-ai-kit-oak/performing-location-with-visual-slam/>`__
- `DepthAI-SLAM <https://github.com/bharath5673/depthai-slam>`__
- :ref:`On-device NN inferencing for localization <drone_vio>`

On-device SuperPoint for localization and SLAM
**********************************************

A customer shared with us a solution that was running the SuperPoint (`Github repo <https://github.com/rpautrat/SuperPoint>`__, `Arxiv paper <https://arxiv.org/abs/1712.07629>`__)
feature extraction NN on-device (on `RVC2-based <https://docs.luxonis.com/projects/hardware/en/latest/pages/rvc/rvc2/>`__ OAK-D) and then used the features for localization and SLAM (on the host computer).

.. raw:: html

    <div style="position: relative; height: 0; overflow: hidden; max-width: 100%; height: auto;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/WiyaTdKvOmg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

RAE on-device VIO & SLAM
************************

The demo below shows how you can run on-device VIO & SLAM on the `RAE robot <https://docs.luxonis.com/projects/hardware/en/latest/pages/rae/>`__ using `Spectacular AI <https://www.spectacularai.com/>`__
SDK. Disparity matching and feature extraction + tracking
are done on accelerated blocks on the `RVC3 chip <https://docs.luxonis.com/projects/hardware/en/latest/pages/rvc/rvc3>`__. Features are then combined with disparity
to provide tracked 3D points used by VO, and Spectacular AI SDK fuses that with IMU data to provide accurate localization of the robot.

.. raw:: html

    <div style="position: relative; height: 0; overflow: hidden; max-width: 100%; height: auto;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/HMQnjOf3n4A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

Syncing frames and IMU messages
*******************************

For VIO/SLAM solutions, you would want to sync IMU messages with the middle of the exposure. For exposure timings and timestamps,
see `Frame capture graphs <https://docs.luxonis.com/projects/hardware/en/latest/pages/guides/sync_frames.html#frame-capture-graphs>`__ for details.
`See here <https://github.com/luxonis/depthai-experiments/tree/master/gen2-syncing#imu--rgb--depth-timestamp-syncing>`__ for **IMU/frame syncing demo**.

Some more advance algorithms weight multiple IMU messages (before/after exposure) and interpolate the final value.

.. include::  /pages/includes/footer-short.rst
