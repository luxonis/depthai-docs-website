OAK on drones
#############

Out of the box OAK devices aren't either PX4 or Ardupilot compatible. Think of our platform as the enabling platform - one could write support for it and use our devices/hardware in combination with a certain ecosystem, like PX4/Ardupilot.

For instance PX4 supports sensors, which presumably use a common interface/API, that can give PX4 data it requires for its operation. Using an IoT OAK device and SPI, this data could be presented to PX4 in a compatible way for it to use.
Here are a couple of examples of PX4 sensors that could be interfaced by ESP32/other MCU and communicated to OAK to get needed data or trigger a certain action:

- `Optical flow <https://docs.px4.io/master/en/sensor/optical_flow.html>`__ (requires a downward facing camera and a distance sensor)
- `Camera <https://docs.px4.io/master/en/peripherals/camera.html>`__
- `Distance Sensors <https://docs.px4.io/master/en/sensor/rangefinders.html>`__

Once this kind of integration is done, it would be "plug and play" and available for anyone if opensourced.

We suggest firmly mounting the device on the drone to avoid any stabilization issues. We are planning to improve stabilization by adding EIS (Electronic Image Stabilization)
which you can read more about on our `Roadmap <https://github.com/orgs/luxonis/projects/4#card-52761137>`__.

Our amazing community has created several OAK on drones projects:

- OpenCV AI comp - team QuetzalC++ - Investigating the use of OAK for drone racing - `pdf <https://www.jotform.com/widget-uploads/dragDropUpload/212065341365045/27a8e5fOpenCv_AI_Competition61121a27bc57b.pdf>`__, `video <https://youtu.be/juOrtGBb7KQ>`__
- OpenCV AI comp - team CVAR-U.P.Madrid - Researching the autonomous Micro Aerial Vehicle (MAV) solution for catastrophic situations, `pdf <https://www.jotform.com/widget-uploads/dragDropUpload/212065341365045/9c108ceOpenCV_Report_by_CVAR-UPMadrid61118d9c303d3.pdf>`__, `video <https://vimeo.com/583816850/3f084d9a9f>`__
- OpenCV AI comp - team QUTEagles - Drone-based biosignatures detection system for planetary exploration - `pdf <https://www.jotform.com/widget-uploads/dragDropUpload/212065341365045/8929e40OpenCV-2021-FinalReport-QUT-Australia_-_2021-08-09-Short6111408932120.pdf>`__, `video <http://bit.ly/QUTEaglesVideo>`__
- Augmented Startups - Built a gesture controlled drone - `video <https://www.youtube.com/watch?v=TYiiLTioecg>`__
- @FPSychotic on discord - Simple ArduPilot avoidance demo, OAK-D, `video <https://www.youtube.com/watch?v=KtecldGqP5U>`__

You can also check out our :code:`#drone` channel on our `Discord server <https://discord.gg/EPsZHkg9Nx>`__, where there are tons of
useful information about OAK on drones projects.

.. include::  /pages/includes/footer-short.rst