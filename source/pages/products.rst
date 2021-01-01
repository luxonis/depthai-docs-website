Products
========

.. _bw1097:

BW1097 - RaspberryPi Compute Module
###################################

.. image:: /_static/images/products/bw1097.jpg
  :alt: RaspberryPi Compute Module

The Raspberry Pi Compute Module Edition comes with everything needed: pre-calibrated stereo cameras on-board with a 4K,
60 Hz color camera and a µSD card with Raspbian and DepthAI Python code automatically running on bootup.
This allows using the power of DepthAI with literally no typing or even clicking: it just boots up doing its thing.
Then you can modify the Python code with one-line changes, replacing the neural model for the objects you would like to localize.

- Built-in RaspberryPi Compute Module
- Three integrated cameras
- Complete system; everything you need is included

Board Layout
************

.. image:: /_static/images/products/bw1097-top.jpg
  :alt: 1097 top

.. image:: /_static/images/products/bw1097-bottom.jpg
  :alt: 1097 bottom

.. list-table:: Reference table
  :widths: 50 50
  :align: center

  * - **A.** 720p 120 Hz Global Shutter (Right)
    - **J.** 1x Solderable USB2.0
  * - **B.** DepthAI Module
    - **K.** 720p 120 Hz Global Shutter (Left)
  * - **C.** DepthAI Reset Button
    - **L.** 4K 60 Hz Color
  * - **D.** 5 V IN
    - **M.** RPi 40-Pin GPIO Header
  * - **E.** HDMI
    - **O.** RPi USB-Boot
  * - **F.** 16 GB µSD Card, Pre-configured
    - **P.** RPi Display Port
  * - **G.** 3.5 mm Audio
    - **Q.** RPi Camera Port
  * - **H.** Ethernet
    - **R.** Raspberry Pi Compute Module 3B+
  * - **I.** 2x USB2.0
    -

What's in the box?
******************

- BW1097 Carrier Board
- Pre-flashed µSD card loaded with Raspbian 10 and DepthAI

  - Default Password: :code:`luxonis`

- WiFI USB dongle
- Power Supply

Setup
*****

To get started:

#. **Connect a display to the HDMI port.**

    Note that an HDMI cable is not included.

#. **Connect a keyboard and mouse via the USB port**
#. **Connect the power supply (included).**

    On boot, the Pi will run `a Python demo script <https://github.com/luxonis/depthai/blob/main/depthai_demo.py>`__ that displays a video stream annotated with object localization metadata:

    .. image:: /_static/images/products/bw1097-detection.png
      :alt: 1097 top

    In the screenshot above, DepthAI identified a tv monitor (1.286 m from the camera) and a chair (3.711 m from the camera).
    See `the list of object labels <https://github.com/luxonis/depthai/blob/main/resources/nn/mobilenet-ssd/mobilenet-ssd.json#L10>`__ on GitHub.

#. **Connect to the Internet.**

    Connect the Pi to the Internet to begin trying the DepthAI tutorials and examples.

    * **Connecting to a WiFi network**

        To connect to a WiFi network, use the included Linux-compatible USB WiFi dongle.
        The Pi should recognize the dongle and display available WiFi networks in the upper right corner of the Raspbian Desktop UI.

    * **Connecting to a network via Ethernet**

        The board includes an Ethernet port. Connecting an Ethernet cable to the port will enable Internet access.

#. **Run example script**.

  See :ref:`Verify installation`

[Optional] Using your own SD-Card
*********************************

If you'd like to set up DetphAI on your own (say bigger) SD-Card, there are two options:

#.  Download our pre-configured Raspbian image for the BW1097 (the Raspberry Pi Compute Module Edition), here: `BW1097 Raspian Image <https://drive.google.com/open?id=19JRcRkdmiJ96lsoMdCu2_zbbYrSG7wsu>`__. Then, after downloading, update the DepthAI firmware/software (by doing a git pull on the DepthAI code base checked out on the Desktop).
#.  Set up your own Raspbian to your liking from say a fresh Raspbian download, and then use replace dt-blob.bin and config.txt in /boot with the following two files:

    - `dt-blob.bin <https://drive.google.com/open?id=1OarNtX58YUtVcqHog8NnnCWmCgYpN-z_>`__ - For enabling the Pi MIPI display
    - `config.txt <https://drive.google.com/open?id=1cg8OZVFwq6NB1judrsUNV6T7YIcYX1eD>`__ - For enabling the 3.5mm headphone jack


.. _bw1094:

BW1094 - RaspberryPi Hat
########################


.. image:: /_static/images/products/bw1094.jpg
  :alt: RPi HAT Labeled

The Raspberry Pi HAT Edition allows using the Raspberry Pi you already have and passes through the Pi GPIO so that these are still accessible and usable in your system(s). Its modular cameras allow mounting to your platform where you need them, up to six inches away from the HAT.

- Mounts to Raspberry Pi as a HAT for easy integration
- All Raspberry Pi GPIO still accessible through pass-through header
- Flexible Camera Mounting with 6" flexible flat cables
- Includes three FFC Camera ports

Requirements
************

- A RaspberryPi with an extended 40-pin GPIO Header.

Board Layout
************


.. image:: /_static/images/products/bw1094-layout.jpg
  :alt: RPi HAT Labeled

.. list-table:: Reference table
  :widths: 50 50
  :align: center

  * - **A.** Left Camera Port
    - **E.** Pass-through 40-Pin Raspberry Pi Header
  * - **B.** Right Camera Port
    - **F.** Color Camera Port
  * - **C.** USB 3.0 Type-C
    - **G.** 40-pin Raspberry Pi Header
  * - **D.** DepthAI Module
    -

What's in the box?
******************

- BW1094 Carrier Board
- Pre-flashed µSD card loaded with Raspbian 10 and DepthAI
- USB3C cable (6 in.)

Setup
*****

Follow the steps below to setup your DepthAI device.

#. **Power off your Raspberry Pi.**

    Safely power off your Raspberry Pi and unplug it from power.

#. **Insert the pre-flashed µSD card into your RPi.**

    The µSD card is pre-configured with Raspbian 10 and DepthAI.

#. **Mount the DepthAI RPi HAT.**

    Use the included hardware to mount the DepthAI RPi HAT to your Raspberry Pi.

#. **Reconnect your RPi power supply**

#. **Calibrate the cameras**.

    See :ref:`Calibration`

#. **Run example script**.

    See :ref:`Verify installation`


.. _bw1098ffc:

BW1098FFC - USB3 with Modular Cameras
#####################################

.. image:: /_static/images/products/bw1098ffc.jpg
  :alt: BW1098FFC

Use DepthAI on your existing host. Since the AI/vision processing is done on the Myriad X, a typical desktop could
handle tens of DepthAIs plugged in (the effective limit is how many USB ports the host can handle).

Requirements
************

- Ubuntu 18.04 or Raspbian 10
- Cameras

  - :ref:`Modular color camera <DepthAI Color Camera>`
  - :ref:`Stereo camera pair <DepthAI Mono Camera>` (if depth is required)

- USB3C cable
- USB3C port on the host

Board Layout
************

.. image:: /_static/images/products/bw1098ffc-layout.jpg
  :alt: BW1098FFC layout

.. list-table:: Reference table
  :widths: 50 50
  :align: center

  * - **A.** 5V IN
    - **E.** Left Camera Port
  * - **B.** USB3C
    - **F.** DepthAI Module
  * - **C.** Right Camera Port
    - **G.** Myriad X GPIO Access
  * - **D.** Color Camera Port
    -

What's in the box?
******************

- BW1098FFC Carrier Board
- USB3C cable (3 ft.)
- Power Supply


Setup
*****

Follow the steps below to setup your DepthAI device.

#. **Connect your modular cameras.**

    The FFC (flexible flat cable) Connectors on the BW1098FFC require care when handling.  Once inserted and latched,
    the connectors are robust, but they are easily susceptible to damage during the de-latching process when handling the
    connectors, particularly if to much force is applied during this process.

    The video below shows a technique without any tool use to safely latch and delatch these connectors.

    .. image:: https://i.imgur.com/z3O0LXr.jpg
      :alt: Connecting the Modular Cameras to BW1098FFC
      :target: https://www.youtube.com/watch?v=KQlFvodQ3nM

    Once the flexible flat cables are securely latched, you should see something like this:

    .. image:: /_static/images/products/bw1098ffc-connected.jpg
      :alt: BW1098FFC Connected to Modular Cameras


    .. note::

      Note when looking at the connectors, the blue stripe should be facing up.


    .. image:: /_static/images/products/modular-camera-sides.jpg
      :alt: BW1098FFC modular camera top side


    .. warning::

      Make sure that the FFC cables connect to the camera is on the top side of the final setup to avoid inverted images and wrong :code:`swap_left_and_right_cameras` setup.

#. **Connect your host to the DepthAI USB carrier board.**

#. **Connect the DepthAI USB power supply (included).**

#. **Calibrate the cameras**.

    See :ref:`Calibration`

#. **Run example script**.

    See :ref:`Verify installation`


.. _bw1098obc:

OAK-D | DepthAI Onboard Cameras
###############################

.. image:: /_static/images/products/bw1098obc.png
  :alt: BW1098OBC

The Spatial AI + CV Power House.

Requirements
************

- USB3C cable (included)
- USB-capable host

What's in the box?
******************

- OAK-D / DepthAI USB3C
- USB3C cable (3 ft.)
- Power Supply
- Getting Started Card

Setup
*****

- Install the DepthAI API, see `here <https://docs.luxonis.com/en/latest/pages/api/>`__ for how to do so.


.. _bw1099:

BW1099 - System on Module
#########################

.. image:: /_static/images/products/bw1099.jpg
  :alt: BW1099

All DepthAI editions utilize the System on Module (SoM), which can also be used by itself to integrate into your own designs.
The SoM allows the board that carries it to be a simple, easy four-layer standard-density board, as opposed to the
high-density-integration (HDI) stackup (with laser-vias and stacked vias) required to directly integrate the VPU itself.

Specifications
**************

- 2x 2-lane MIPI Camera Interface
- 1x 4-lane MIPI Camera Interface
- Quad SPI with 2 dedicated chip-selects
- I²C
- UART
- USB2
- USB3
- Several GPIO (1.8 V and 3.3 V)
- Supports off-board eMMC or SD Card
- On-board NOR boot Flash (optional)
- On-board EEPROM (optional)
- All power regulation, clock generation, etc. on module
- All connectivity through single 100-pin connector (DF40C-100DP-0.4V(51))

**Datasheets** are available `here <https://github.com/luxonis/depthai-hardware/blob/master/SoMs/BW1099/BW1099_Datasheet.pdf>`__
and for EMB edition `here <https://github.com/luxonis/depthai-hardware/blob/master/SoMs/BW1099EMB/R1M0E1/BW1099EMB_Datasheet.pdf>`__


Getting Started Integrating Into Your Products
**********************************************

All the boards based on the DepthAI System on Module are available on Github under MIT License `here <https://github.com/luxonis/depthai-hardware>`__.

These are in Altium Designer format.
So if you use Altium Designer, you're in luck!  You can quickly/easily integrate the DepthAI SoM into your products with
proven and up-to-date designs (the same designs you can buy `here <https://shop.luxonis.com/>`__).


.. _bw1093:

BW1093 - OAK-1 | MegaAI - 4K USB3 AI Camera
###########################################

.. image:: /_static/images/products/bw1093.png
  :alt: OAK-1 MegaAI 4K USB3 AI Camera

Use OAK-1/megaAI on your existing host. Since the AI/vision processing is done on the Myriad X, a typical desktop could handle
tens of OAK-1/megaAI plugged in (the effective limit is how many USB ports the host can handle).

And since it can encode 1080p and 4K video (see :ref:`here <How do I Record (or Encode) Video with DepthAI?>`) you can now even save 4K video on a Pi Zero!

Requirements
************

- USB3C cable
- USB2 or USB3 port on the host

What's in the box?
******************

- megaAI / OAK-1
- USB3C cable (3 ft.)
- Getting Started Card

Setup
*****

- Install the DepthAI API, see `here <https://docs.luxonis.com/en/latest/pages/api/>`__ for how to do so.

.. _color_camera:

DepthAI Color Camera
####################

.. image:: /_static/images/products/color-camera.jpg
  :alt: Color Camera

4K, 60Hz video camera with 12 MP stills and 4056 x 3040 pixel resolution.

Specifications
**************

- 4K, 60 Hz Video
- 12 MP Stills
- Same dimensions, mounting holes, and camera center as Raspberry Pi Camera v2.1
- 4056 x 3040 pixels
- 81 DFOV°
- Lens Size: 1/2.3 inch
- AutoFocus: 8 cm - ∞
- F-number: 2.0


.. _mono_camera:

DepthAI Mono Camera
###################

.. image:: /_static/images/products/mono-cameras.jpg
  :alt: Mono Cameras

For applications where Depth + AI are needed, we have modular, high-frame-rate, excellent-depth-quality cameras which can be separated to a baseline of up to 30 cm).

Specifications
**************

- 720p, 120 Hz Video
- Synchronized Global Shutter
- Excellent Low-light
- Same dimensions, mounting holes, and camera center as Raspberry Pi Camera v2.1
- 1280 x 720 pixels
- 83 DFOV°
- Lens Size: 1/2.3 inch
- Fixed Focus: 19.6 cm - ∞
- F-number: 2.2

Calibration
###########

.. note::

  Using the :ref:`BW1097 - RaspberryPi Compute Module` or :ref:`BW1098OBC - USB3 with Onboard Cameras`? **Your unit comes pre-calibrated**


For the modular camera editions of DepthAI (:ref:`BW1098FFC - USB3 with Modular Cameras` and :ref:`BW1094 - RaspberryPi Hat`)
it is necesssary to do a stereo camera calibration after mounting the cameras in the baseline/configuration for your application.

For the :ref:`BW1097 - RaspberryPi Compute Module` and :ref:`BW1098OBC - USB3 with Onboard Cameras`, the units come
pre-calibrated - but you may want to re-calibrate for better quality in your installation (e.g. after mounting the board to something),
or if the calibration quality has started to fade over use/handling.

Below is a quick video showing the (re-) calibration of the :ref:`BW1097 - RaspberryPi Compute Module`.

Watching the video below will give you the steps needed to calibrate your own DepthAI.  And for more information/details on calibration options,
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

#. Print chessboard calibration image.

    Either print the calibration checkerboard onto a flat surface, or display the checkerboard on a flat (not curved!) monitor.
    Note that if you do print the calibration target, take care to make sure it is attached to a flat surface and is flat and free of wrinkles and/or 'waves'.

    Often, using a monitor to display the calibration target is easier/faster.

    .. image:: https://github.com/luxonis/depthai/raw/main/resources/calibration-chess-board.png
      :alt: Print this chessboard calibration image
      :target: https://github.com/luxonis/depthai/raw/main/resources/calibration-chess-board.png

    The entire board should fit on a single piece of paper (scale to fit).  And if displaying on a monitor, full-screen the image with a white background.

#. Start the calibration script.

    Replace the placeholder argument values with valid entries:

    .. code-block:: bash

      python3 calibrate.py -s [SQUARE_SIZE_IN_CM] -brd [BOARD]

    Argument reference:

    - :code:`-s SQUARE_SIZE_IN_CM`, :code:`--square_size_cm SQUARE_SIZE_IN_CM`: Measure the square size of the printed chessboard in centimeters.
    - :code:`-brd BOARD`, :code:`--board BOARD`: BW1097, BW1098OBC - Board type from resources/boards/ (not case-sensitive). Or path to a custom .json board config. Mutually exclusive with [-fv -b -w], which allow manual specification of field of view, baseline, and camera orientation (swapped or not-swapped).

    Retrieve the size of the squares from the calibration target by measuring them with a ruler or calipers and enter that number (in cm) in place of [SQUARE_SIZE_IN_CM].

    For example, the arguments for the :ref:`BW1098OBC - USB3 with Onboard Cameras` look like the following if the square size is 2.35 cm:

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

    - **BW1097 (RPi Compute Module Edition):**

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

Position the chessboard and capture images.
*******************************************

Left and right video streams are displayed, each containing a polygon overlay.

Hold up the printed chessboard (or laptop with the image displayed on the screen) so that the whole of the checkerboard is displayed within both video streams.

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

Verify installation
###################

We'll execute a DepthAI example Python script to ensure your setup is configured correctly. Follow these steps to test DepthAI:

#. Start a terminal session.
#. Access your local copy of `depthai <https://github.com/luxonis/depthai>`__.

  .. code-block:: bash

    cd [depthai repo]

#. Run demo script.<br/>

  .. code-block:: bash

    python3 depthai_demo.py

  The script launches a window, starts the cameras, and displays a video stream annotated with object localization metadata:

  .. image:: /_static/images/products/bw1097-detection.png
    :alt: Depth projection

  In the screenshot above, DepthAI identified a tv monitor (1.286 m from the camera) and a chair (3.711 m from the camera).

  See `the list of object labels <https://docs.luxonis.com/tutorials/openvino_model_zoo_pretrained_model/#run-depthai-default-model>`__ in our pre-trained OpenVINO model tutorial.


Compliance and safety
#####################

All DepthAI products have undergone extensive compliance testing, and copies of the relevant certificates and conformity documents are available to download from the table below.

.. list-table:: Compliance download & reference table
  :widths: 25 75
  :align: center

  * - megaAI / DepthAI BW1093 / OAK
    - :download:`Declaration of conformity </_static/compliance/megaai_eu.pdf>`


.. include::  /pages/includes/footer-short.rst
