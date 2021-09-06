Stereo Neural Inference
#######################

In this mode, the neural inference (object detection, landmark detection, etc.) is run on the left **and** right cameras to produce stereo inference results.  Unlike monocular neural inference fused with stereo depth - there is no max disparity search limit - so the minimum distance is purely limited by the greater of (a) horizontal field of view (HFOV) of the stereo cameras themselves and (b) the hyperfocal distance of the cameras.

The hyperfocal distance of the global shutter synchronized stereo pair is 19.6cm.  So objects closer than 19.6cm will appear out of focus.  This is
effectively the minimum distance for this mode of operation, as in most cases (except for very wide stereo baselines with the `OAK-FFC-3P-OG <https://docs.luxonis.com/projects/hardware/en/latest/pages/BW1098FFC.html>`__),
this **effective** minimum distance is higher than the **actual** minimum distance as a result of the stereo camera field of views. For example, the objects 
will be fully out of the field of view of both grayscale cameras when less than `5.25cm
<https://www.google.com/search?ei=GapBX-y3BsuxtQa3-YaQBw&q=%3Dtan%28%2890-71%2F2%29*pi%2F180%29*7.5%2F2&oq=%3Dtan%28%2890-71%2F2%29*pi%2F180%29*7.5%2F2&gs_lcp=CgZwc3ktYWIQAzoECAAQR1DZkwxYmaAMYPilDGgAcAF4AIABS4gB1AKSAQE1mAEAoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwisqPat-6_rAhXLWM0KHbe8AXIQ4dUDCAw&uact=5>`__
(marked **M** on the picture below) from the `OAK-D <https://docs.luxonis.com/projects/hardware/en/latest/pages/BW1098OAK.html>`__, but that is closer than the hyperfocal distance of the grayscale cameras (which is 19.6cm, marked as **Y**),
so the actual minimum depth is this hyperfocal distance.

.. image:: https://user-images.githubusercontent.com/59799831/132250213-661fb1de-e5ae-4640-b28a-8e2742919079.jpeg
  :alt: Minimum perceiving distance

Accordingly, to calculate the minimum distance for this mode of operation, use the following formula:

.. code-block:: python

  min_distance = max(tan((90 - HFOV/2) * pi/2) * base_line_dist/2, 19.6)

This formula implements the maximum of the HFOV-imposed minimum distance, and 19.6cm, which is the hyperfocal-distance-imposed minimum distance.

Demo
****

.. image:: https://user-images.githubusercontent.com/59799831/132098832-70a2d0b9-1a30-4994-8dad-dc880a803fb3.gif
  :target: https://github.com/luxonis/depthai-experiments/tree/master/gen2-triangulation
  :alt: Triangulation Demo

For more infromation check out the `gen2-triangulation demo <https://github.com/luxonis/depthai-experiments/tree/master/gen2-triangulation>`__  that performs the stereo neural interface.

.. include::  /pages/includes/footer-short.rst