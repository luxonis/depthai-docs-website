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
