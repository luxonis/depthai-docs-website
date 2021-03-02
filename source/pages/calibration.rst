Calibration
###########

.. note::

   The :ref:`BW1097 - RaspberryPi Compute Module` and :ref:`BW1098OBC
   <bw1098obc>` are calibrated before shipment.

For the modular camera editions of DepthAI (:ref:`BW1098FFC - USB3 with Modular Cameras` and :ref:`BW1094 - RaspberryPi Hat`)
it is necesssary to do a stereo camera calibration after mounting the cameras in the baseline/configuration for your application.

For the :ref:`BW1097 - RaspberryPi Compute Module` and :ref:`BW1098OBC <bw1098obc>`, the units come
pre-calibrated - but you may want to re-calibrate for better quality in your installation (e.g. after mounting the board to something),
or if the calibration quality has started to fade over use/handling.

Below is a quick video showing the (re-) calibration of the :ref:`BW1097 - RaspberryPi Compute Module`.  In short, the calibration uses the intersections to determine the orientation and distance of the checkerboard.  So the greatest accuracy will be obtained by a clear print or display of the provided checkerboard image on a flat plane. 

The flatness of the calibration checkerboard is very important.  Do not use curved monitors, or calibration targets that have any 'waviness'.  So if you print the checkerboard, please make sure to affix the sheet to a known flat surface, without any waves.  That said, using a laptop with a flat monitor is usually the easiest technique.

Watching the video below will give you the steps needed to calibrate your own DepthAI.  For more information/details on calibration options,
please see the steps below and also :code:`./calibrate.py --help` which will print out all of the calibration options.


.. image:: https://i.imgur.com/oJm0s8o.jpg
  :alt: DepthAI Calibration Example
  :target: https://www.youtube.com/watch?v=lF01f0p1oZM

#. Checkout the `depthai <https://github.com/luxonis/depthai>`__ GitHub repo.
    .. warning::

      Already checked out `depthai <https://github.com/luxonis/depthai>`__? **Skip this step.**

    .. code-block:: bash

      git clone https://github.com/luxonis/depthai.git
      cd depthai
      python3 install_requirements.py

#. Print checkerboard calibration image.

    Either print the calibration checkerboard onto a flat surface, or display the checkerboard on a flat (not curved!) monitor.
    Note that if you do print the calibration target, take care to make sure it is attached to a flat surface and is flat and free of wrinkles and/or 'waves'.

    Often, using a monitor to display the calibration target is easier/faster.

    .. image:: https://github.com/luxonis/depthai/raw/main/resources/calibration-chess-board.png
      :alt: Print this checkerboard calibration image
      :target: https://github.com/luxonis/depthai/raw/main/resources/calibration-chess-board.png

    The entire board should fit on a single piece of paper (scale to fit).  And if displaying on a monitor, full-screen the image with a white background.

#. Start the calibration script.

    Replace the placeholder argument values with valid entries:

    .. code-block:: bash

      python3 calibrate.py -s [SQUARE_SIZE_IN_CM] -brd [BOARD]

    Argument reference:

    - :code:`-s SQUARE_SIZE_IN_CM`, :code:`--square_size_cm SQUARE_SIZE_IN_CM`: Measure the square size of the printed checkerboard in centimeters.
    - :code:`-brd BOARD`, :code:`--board BOARD`: BW1097, BW1098OBC - Board type from resources/boards/ (not case-sensitive). Or path to a custom .json board config. Mutually exclusive with [-fv -b -w], which allow manual specification of field of view, baseline, and camera orientation (swapped or not-swapped).

    Retrieve the size of the squares from the calibration target by measuring them with a ruler or calipers and enter that number (in cm) in place of [SQUARE_SIZE_IN_CM].

    For example, the arguments for the :ref:`BW1098OBC <bw1098obc>` look like the following if the square size is 2.35 cm:

    .. code-block:: bash

      python3 calibrate.py -s 2.35 -brd bw1098obc

    And note that mirroring the display when calibrating is often useful (so that the directions of motion don't seem backwards).
    When seeing ourselves, we're used to seeing ourselves backwards (because that's what we see in a mirror), so do so, use the :code:`-ih` option as below:

    .. code-block:: bash

      python3 calibrate.py -s 2.35 -brd bw1098obc -ih

    So when we're running calibration internally we almost always use the :code:`-ih` option, so we'll include it on all the following example commands:

    - **BW1098OBC (USB3 Onboard Camera Edition)):**

      .. code-block:: bash

        python3 calibrate.py -s [SQUARE_SIZE_IN_CM] -brd bw1098obc -ih

    - **BW1097 (Raspberry Pi Compute Module Edition):**

      .. code-block:: bash

        python3 calibrate.py -s [SQUARE_SIZE_IN_CM] -brd bw1097 -ih


Modular cameras calibration
***************************

Use one of the board :code:`*.json` files from `here <https://github.com/luxonis/depthai/tree/main/resources/boards>`__ to
define the baseline between the stereo cameras, and between the left camera and the color camera, replacing the items in brackets below.

- Swap left/right (i.e. which way are the cameras facing, set to :code:`true` or :code:`false`)
- The :code:`BASELINE` in centimeters between grayscale left/right cameras
- The distance :code:`RGBLEFT` separation between the :code:`Left` grayscale camera and the color camera, in centimeters.

.. code-block::

  {
      "board_config":
      {
          "name": "ACME01",
          "revision": "V1.2",
          "swap_left_and_right_cameras": [true | false],
          "left_fov_deg": 73.5,
          "rgb_fov_deg": 68.7938,
          "left_to_right_distance_cm": [BASELINE],
          "left_to_rgb_distance_cm": [RGBLEFT]
      }
  }

So for example if you setup your BW1098FFC with a stereo baseline of 2.5cm, with the color camera exactly between
the two grayscale cameras, as shown below, use the JSON further below:

.. image:: /_static/images/products/mono-cameras-min-dist.png
  :alt: Color Camera

.. code-block:: json

  {
      "board_config":
      {
          "name": "ACME01",
          "revision": "V1.2",
          "swap_left_and_right_cameras": true,
          "left_fov_deg": 73.5,
          "rgb_fov_deg": 68.7938,
          "left_to_right_distance_cm": 2.5,
          "left_to_rgb_distance_cm": 5.0
      }
  }

Note that in this orientation of of the cameras, :code:`"swap_left_and_right_cameras"` is set to true.

Then, run calibration with this board name:

.. code-block:: bash

  python3 calibrate.py -s [SQUARE_SIZE_IN_CM] -brd ACME01 -ih

Run :code:`python3 calibrate.py --help` (or :code:`-h`) for a full list of arguments and usage examples.

Position the checkerboard and capture images
********************************************

Left and right video streams are displayed, each containing a polygon overlay.

Hold up the printed checkerboard (or laptop with the image displayed on the screen) so that the whole of the checkerboard is displayed within both video streams.

Match the orientation of the overlayed polygon and press [SPACEBAR] to capture an image. The checkerboard pattern does
not need to match the polygon exactly, but it is important to use the polygon as a guideline for angling and location relative to the camera.
There are 13 required polygon positions.

After capturing images for all of the polygon positions, the calibration image processing step will begin.
If successful, a calibration file will be created at :code:`depthai/resources/depthai.calib`.
This file is loaded by default via the :code:`calib_fpath` variable within :code:`consts/resource_paths.py`.

Test depth
**********

We'll view the depth stream to ensure the cameras are calibrated correctly:

#. Start a terminal session.
#. Access your local copy of `depthai <https://github.com/luxonis/depthai>`__.

  .. code-block:: bash

    cd [depthai repo]

3. Run test script.

  .. code-block:: bash

    python3 depthai_demo.py -s depth_raw -o

  The script launches a window, starts the cameras, and displays a depth video stream:

  .. image:: /_static/images/products/calibration-depth.png
    :alt: Depth projection

  In the screenshot above, the hand is closer to the camera.

Write calibration and board parameters to on-board eeprom
*********************************************************

If your are happy with the depth quality above, you can write it to the on-board eeprom on DephtAI so that the
calibration stick with DepthAI (all designs which have stereo-depth support have on-board eeprom for this purpose).

To write the calibration and associated board information to to EEPROM on DepthAI, use the following command:

.. code-block:: bash

  python3 depthai_demo.py -brd [BOARD] -e

Where :code:`[BOARD]` is either :code:`BW1097` (Raspberry Pi Compute Module Edition), :code:`BW1098OBC` (USB3 Onboard Camera Edition)
or a custom board file (as in :ref:`here <Modular cameras calibration>`), all case-insensitive.

So for example to write the (updated) calibration and board information to your BW1098OBC, use the following command:

.. code-block:: bash

  python3 depthai_demo.py -brd bw1098obc -e

And to verify what is written to EEPROM on your DepthAI, you can see check the output whenever running DetphAI, simply with"

.. code-block:: bash

  python3 depthai_demo.py

And look for :code:`EEPROM data:` in the prints in the terminal after running the above command:

.. code-block::

  EEPROM data: valid (v2)
    Board name     : BW1098OBC
    Board rev      : R0M0E0
    HFOV L/R       : 73.5 deg
    HFOV RGB       : 68.7938 deg
    L-R   distance : 7.5 cm
    L-RGB distance : 3.75 cm
    L/R swapped    : yes
    L/R crop region: top
    Calibration homography:
      1.002324,   -0.004016,   -0.552212,
      0.001249,    0.993829,   -1.710247,
      0.000008,   -0.000010,    1.000000,


If anything looks incorrect, you can calibrate again and/or change board information and overwrite the stored eeprom information and calibration data using the :code:`-brd` and :code:`-e` flags as above.

.. include::  /pages/includes/footer-short.rst
