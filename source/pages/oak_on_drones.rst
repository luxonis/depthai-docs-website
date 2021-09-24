OAK on drones
=============

Our amazing community has created several OAK on drones projects:

- Team **QuetzalC++** (OpenCV AI comp) - Warehouse inspection with autonomous drones - `video <https://youtu.be/juOrtGBb7KQ>`__
- Team **CVAR-U.P.Madrid** (OpenCV AI comp) - Researching the autonomous Micro Aerial Vehicle (MAV) solution for catastrophic situations - `video <https://vimeo.com/583816850/3f084d9a9f>`__
- Team **QUTEagles** (OpenCV AI comp) - Drone-based biosignatures detection system for planetary exploration - `video <http://bit.ly/QUTEaglesVideo>`__
- **Augmented Startups** built a gesture controlled drone and has 3-part tutorial on YouTube - `video <https://www.youtube.com/watch?v=TYiiLTioecg>`__
- **@FPSychotic** on discord - Simple ArduPilot avoidance demo with OAK-D - `video <https://www.youtube.com/watch?v=KtecldGqP5U>`__

To use OAK devices with systems like `PX4 <https://px4.io/>`__ or `ArduPilot <https://ardupilot.org/>`__, one would need to develop integration
of our devices/hardware with such systems.

Here are a couple of examples of **PX4** sensors that could be interfaced by ESP32/other MCU and communicated to OAK to get needed data or
trigger a certain action:

- `Optical flow <https://docs.px4.io/master/en/sensor/optical_flow.html>`__ (requires a downward facing camera and a distance sensor)
- `Camera <https://docs.px4.io/master/en/peripherals/camera.html>`__
- `Distance Sensors <https://docs.px4.io/master/en/sensor/rangefinders.html>`__

For additonal useful information about OAK on drones projects you can check out our :code:`#drone` channel on our
`Discord server <https://discord.gg/EPsZHkg9Nx>`__.

Camera vibration
################

Camera vibrations can be a big challenge in applications such as drones, especially for color cameras that doesn't have fixed lens.
To decrease the camera vibrations, we suggest firmly mounting the device on the drone. One could also consider adding shock absorption
rubbers (eg. `these <http://bit.ly/ShockMountRubber>`__) to decreate the vibrations. AugmentedStartup has also designed an `OAK-1 anti-vibration mount <https://www.thingiverse.com/thing:4888638>`__
for his drone project:

.. image:: /_static/images/tutorials/drone/vibration-damping.jpeg
  :alt: Vibration damping mount

We are also planning on adding **EIS** (Electronic Image Stabilization) feature to the OAK - you can read more about it on our
`Roadmap <https://github.com/orgs/luxonis/projects/4#card-52761137>`__.

.. include::  /pages/includes/footer-short.rst