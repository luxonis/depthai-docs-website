OAK on drones
=============

OAK cameras are light-weight, low-power and performant :ref:`Spatial AI` devices for edge applications, which make them
the perfect solution for drone applications, such as:

- **Localization** of the drone and detected objects around it, as presented by the CVAR-U.P.Madrid team (`video here <https://vimeo.com/583816850/3f084d9a9f>`__). See :ref:`SLAM with OAK` for additional information.
- **Precision landing** on the target, as `demonstrated here <https://www.youtube.com/watch?v=qonVE3Tg8Uw>`__ by Rishabh Singh. This is possible as object detection runs on the OAK camera at about 30 FPS and has below 150ms delay from camera to the controller.
- **Emergency landing** when your battery is running low. :ref:`Semantic depth <semantic-depth>` provides 3D location (depth points) of suitable areas to land (eg. grass fields). Stephan Sturges has developed `OpenLander <https://github.com/stephansturges/OpenLander>`__ repo for this application.
- **Follow-me drone** with the help of 3D object detection and tracking, drone is able to follow you around, as `demonstrated here <https://www.youtube.com/watch?v=I0UVoWEmIpA>`__ by Rishabh Singh. One could make this solution more robust when combining this with either `face recognition <https://github.com/luxonis/depthai-experiments/tree/master/gen2-face-recognition>`__ or `person reidentification <https://github.com/luxonis/depthai-experiments/tree/master/gen2-pedestrian-reidentification>`__ AI model.

A few other demos:

- Team **QuetzalC++** (OpenCV AI comp) - Warehouse inspection with autonomous drones - `video <https://youtu.be/juOrtGBb7KQ>`__
- Team **QUTEagles** (OpenCV AI comp) - Drone-based biosignatures detection system for planetary exploration - `video <http://bit.ly/QUTEaglesVideo>`__
- **Augmented Startups** built a gesture controlled drone and has 3-part tutorial on YouTube - `video <https://www.youtube.com/watch?v=TYiiLTioecg>`__

For additonal information about OAK on drones projects you can check out the :code:`#drone` channel on our
`Discord server <https://luxonis.com/discord>`__.

.. _drone_vio:

Drone on-device NN-based localization
-------------------------------------

A novel AI approach for spatial localization using an OAK camera. The drone runs on-device neural inferencing to provide positioning of the drone.
`Paper here <https://link.springer.com/article/10.1007/s11554-023-01259-x>`__, `Github repo here <https://github.com/QuetzalCpp/DeepPilot4Pose>`__.

.. raw:: html

    <div style="position: relative; height: 0; overflow: hidden; max-width: 100%; height: auto;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/Jtf8e06CZoo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

OAK ArduPilot integration
#########################

`Rishabh Singh <https://discuss.ardupilot.org/u/rishabsingh3003>`__ wrote a few **OAK-ArduPilot integration applications**
like a follow-me app, obstacle avoidance app, and precision landing app. He also wrote 2 blog posts about the integration;
`Part 1 <https://discuss.ardupilot.org/t/easy-way-to-integrate-ai-with-ardupilot-oak-d-part-1>`__ and `Part 2 <https://discuss.ardupilot.org/t/easy-way-to-integrate-ai-with-ardupilot-oak-d-part-2>`__.

Camera vibration
################

Camera vibrations can be a big challenge in applications such as drones, especially if you are using Auto-Focus color camera.
To decrease the camera vibrations, we suggest firmly mounting the device on the drone. One could also consider adding shock absorption
rubbers (eg. `these <http://bit.ly/ShockMountRubber>`__) to decreate the vibrations. AugmentedStartup has also designed an `OAK-1 anti-vibration mount <https://www.thingiverse.com/thing:4888638>`__
for his drone project:

.. image:: /_static/images/tutorials/drone/vibration-damping.jpeg
  :alt: Vibration damping mount

For drone applications we would also suggest Fixed-Focus color camera, more `info here <https://docs.luxonis.com/projects/hardware/en/latest/pages/guides/af_ff.html#a-handling-high-vibrations>`__.

.. raw:: html

    <div style="position: relative; height: 0; overflow: hidden; max-width: 100%; height: auto;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/jpnsTsCGbQk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

.. include::  /pages/includes/footer-short.rst