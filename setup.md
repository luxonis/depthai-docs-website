---
layout: default
title: Carrier Board Setup ~ DepthAI
toc_title: Setup Instructions
description: Learn how to setup your DepthAI carrier board.
order: 2
---

# DepthAI Carrier Board Setup Instructions

<p class="lead">Start here when unboxing your DepthAI board.</p>

DepthAI is available in three editions. Jump to instructions for your board:

* [RaspberryPi Compute Module](#pi_compute)
* [Raspberry Pi HAT Edition](#pi_hat)
* [USB3 Edition](#usb)

Troubleshooting tips are available in our [Troubleshooting](/troubleshooting) area.

<h2 id="pi_compute">RaspberryPi Compute Module</h2>

<img src="/images/depthai-edition-rpi.jpg"/>

No additional software must be installed awith this carrier board. To get started:

1. Connect to an external display via the HDMI port.
2. Connect a keyboard and mouse via the USB port.
3. Connect the included power supply.
4. After the Pi boots, [upgrade your DepthAI API to the latest](http://localhost:4000/setup/#api_upgrade).

On boot, the Pi will run [a Python test script](https://github.com/luxonis/depthai-python-extras/blob/master/test.py) that displays a video stream annotated with object localization metadata:

{: style="max-width:50%"}
![object localization demo](/images/object_localization.png)

In the screenshot above, DepthAI identified a tv monitor (1.286 m from the camera) and a chair (3.711 m from the camera). See [the list of object labels](https://github.com/luxonis/depthai-python-extras/blob/master/resources/nn/object_detection_4shave/labels_for_mobilenet_ssd.txt) on GitHub.


<h3 class="js-toc-ignore">Internet Connectivity</h3>

An Internet connection isn't required to run the demo script. However, you'll want to connect the Pi to a WiFI network to begin trying the DepthAI tutorials and examples.

#### Connecting to a WiFi network

An embedded WiFi module is not included on the board. To connect to a WiFi network, use a Linux-compatible USB WiFi dongle. The Pi should recognize the dongle and display available WiFi networks in the upper right corner of the Raspbian Desktop UI.

#### Connecting to a network via Ethernet

The board includes an Ethernet port. Connecting an Ethernet cable to the port will enable Internet access.

<h2 id="pi_hat">Raspberry Pi HAT Edition</h2>

<img src="/images/depthai-edition-rpi-hat.jpg"/>

The Raspberry Pi HAT Edition mounts to a Raspberry Pi as a HAT (Hardware Attached on Top). Its modular cameras allow mounting to your platform where you need them, up to six inches away from the HAT.

<h3 class="js-toc-ignore">Requirements</h3>

* Raspberry Pi 3 B+ Motherboard (or another board with 40 GPIO pins)
* Modular color camera
* Stereo camera pair

<h2 id="usb">USB3 Edition</h2>

<img src="/images/depthai-edition-usb.jpg"/>

Use DepthAI with any platform that runs OpenVINO (Mac OS X, many Linux variants including Ubuntu, Yocto, etc., and Windows 10). Since the AI/vision processing is done on the Myriad X, a typical desktop could handle tens of DepthAIs plugged in (the effective limit is how many USB ports the host can handle).

<h3 class="js-toc-ignore">Requirements</h3>

* Host OS that runs OpenVINO
* Modular color camera
* Stereo camera pair
* USB3C cable
* USB3C port on the host
* Python 3 installed on host

Follow the steps below to install the software required to run DepthAI and calibrate your stereo cameras.

<h3 class="step js-toc-ignore"><span>1</span> Connect your host to the DepthAI USB carrier board</h3>

Connect the the USB...

<h3 class="step js-toc-ignore"><span>2</span> Connect the DepthAI USB power supply (included)</h3>

Connection power...

<h3 class="step js-toc-ignore"><span>3</span> Install OpenVINO</h3>

OpenVINO instructions, etc...

<h3 class="step js-toc-ignore"><span>4</span> Install Python DepthAI module</h3>

`pip install depthai`, download a .so, etc.

<h3 class="step js-toc-ignore"><span>5</span> Calibrate Stereo Cameras</h3>



<h3 class="step js-toc-ignore"><span>6</span> Download and run DepthAI Python examples</h3>

We'll execute a DepthAI example Python script to ensure your setup is configured correctly. Follow these steps to test DepthAI:

1. Start a terminal session.
2. Run `git clone https://github.com/luxonis/depthai-python`. This downloads the Python module source code which includes an `/examples` folder.
3. Run `python3 examples/test.py`. The script launches a window, starts the cameras, and annotates the video output with object detection and depth perception data. Ensure the cameras are pointed at you (it should identify you as a person).

{:i #api_setup}
## DepthAI Python API

<h3 id="api_install" data-toc-title="Installation">Installing the DepthAI API</h3>

The DepthAI Python Module and extras (utilities, examples, and tutorials) are installed by checking out our [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) GitHub repository. This will change to a standard `pip install` in the future.

To get started:

1. If you aren't using the RPi model, checkout the [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) GitHub rep:
    ```
    git clone https://github.com/luxonis/depthai-python-extras.git
    ```
    Using the RPi Compute edition? The repository has been checked to `~/Desktop/depthai-python-extras`.
2. Make the checked out repo globally available:
    ```
    pip install -e depthai-python-extras
    ```

<h3 id="api_upgrade" data-toc-title="Upgrading">Upgrading the DepthAI API</h3>


To upgrade your DepthAI Python API to the latest version:

1. `cd` to your local copy of our [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) repository. If you are using the RPi Compute edition, the repository has already been checked out to `~/Desktop/depthai-python-extras`.
2. Pull the latest changes:
    ```
    git pull
    ```
3. Ensure `depthai-python-extras` is available to all of your Python scripts:
    ```
    pip install -e depthai-python-extras
    ```


<h2 id="calibration">Camera Calibration</h2>

For better depth image quality, perform a stereo camera calibration. Follow these steps:

1. Start a terminal session and checkout the [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) GitHub repo:
    ```
    git checkout https://github.com/luxonis/depthai-python-extras.git
    cd depthai-python-extras
    ```
2. [Print this chessboard calibration image](https://raw.githubusercontent.com/luxonis/depthai-python-extras/master/resources/calibration-chess-board.png). The entire board should fit on a single piece of paper (scale to fit).

3. Start the calibration script, replacing the placeholder argument values with valid entries::

    ```
    python3 calibrate.py -s [SQUARE_SIZE_IN_CM] \
    -co '{"board_config": {"swap_left_and_right_cameras": [true|false], "left_to_right_distance_cm": [distance]}}'
    ```

    Argument reference:

    * `--SQUARE_SIZE_CM`: Measure the square size of the printed chessboard in centimeters.
    * `--CONFIG_OVERWRITE`: A JSON-formatted pipeline config object that overrides the default config. This JSON object contains two keys that may need to be provided depending on your DepthAI board:
        * `swap_left_and_right_cameras` (default = `true`): Ignore this option for the 1097 and 1098OBC models. Otherwise, specify `true` if the cameras faces backward and `false` if the cameras face forward.
        * `left_to_right_distance_cm` (default = `9.0`): The distance between the stereo cameras. Ignore this option for the 1097 model and use `7.5` for the 1098OBC.

    For example, the arguments for the 1098OBC would look like the following if the square size is 2.35 cm:
    ```
    python3 calibrate.py -s 2.35 \
    co '{"board_config": {"left_to_right_distance_cm": 7.5}}'
    ```

    Run `python3 calibrate.py --help` for a full list of arguments and usage examples.`



4. Left and right video streams are displayed, each containing a polygon overlay. Hold up the printed chessboard so that the whole of the checkerboard is displayed within both video streams. Match the orientation of the overlayed polygon and press [SPACEBAR] to capture an image. The checkerboard pattern does not need to match the polygon exactly, but it is important to use the polygon as a guideline for angling and location relative to the camera. There are 13 required polygon positions.
5. After capturing images for all of the polygon positions, the calibration image processing step will begin. If successful, a calibration file will be created at `depthai-python-extras/resources/depthai.calib`. This file is loaded by default via the `calib_fpath` variable within `consts/resource_paths.py`.
6. Test the results! Run `python3 test.py` from the top-level of your local copy of the `depthai-python-extras` GitHub repo. This displays the depth color video stream as well as an annotated object location stream.
