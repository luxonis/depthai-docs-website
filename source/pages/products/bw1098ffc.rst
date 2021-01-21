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

.. include::  /pages/includes/footer-short.rst
