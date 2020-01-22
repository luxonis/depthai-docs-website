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

* [RaspberryPi Compute Module]()
* [Raspberry Pi HAT Edition]()
* [USB3 Edition]()

Troubleshooting tips are available in our [FAQ](/faq).

<h2>RaspberryPi Compute Module</h2>

<img src="/images/depthai-edition-rpi.jpg"/>

No additional software or hardware configuration is needed with this carrier board. To get started:

1. Connect to an external display via the HDMI port.
2. Connect a keyboard and mouse via the USB port.
3. Connect the included power supply.

On boot, the Pi will run a Python demo script using the DepthAI and OpenCV that shows object detection and depth perception.

<h3 class="js-toc-ignore">Internet Connectivity</h3>

An Internet connection isn't required to run the demo script. However, you'll want to connect the Pi to a WiFI network to begin trying the DepthAI tutorials and examples.

#### Connecting to a WiFi network

An embedded WiFi module is not included on the board. To connect to a WiFi network, use a Linux-compatible USB WiFi dongle. The Pi should recognize the dongle and display available WiFi networks in the upper right corner of the Raspbian Desktop UI.

#### Connecting to a network via Ethernet

The board includes an Ethernet port. Connecting an Ethernet cable to the port will enable Internet access.

<h2>Raspberry Pi HAT Edition</h2>

<img src="/images/depthai-edition-rpi-hat.jpg"/>

The Raspberry Pi HAT Edition mounts to a Raspberry Pi as a HAT (Hardware Attached on Top). Its modular cameras allow mounting to your platform where you need them, up to six inches away from the HAT.

<h3 class="js-toc-ignore">Requirements</h3>

* Raspberry Pi 3 B+ Motherboard (or another board with 40 GPIO pins)
* Modular color camera
* Stereo camera pair

<h2>USB3 Edition</h2>

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

<h3 class="step"><span>1</span> Connect your host to the DepthAI USB carrier board</h3>

Connect the the USB...

<h3 class="step"><span>2</span> Connect the DepthAI USB power supply (included)</h3>

Connection power...

<h3 class="step"><span>3</span> Install OpenVINO</h3>

OpenVINO instructions, etc...

<h3 class="step"><span>4</span> Install Python DepthAI module</h3>

`pip install depthai`, download a .so, etc.

<h3 class="step"><span>5</span> Calibrate Stereo Cameras</h3>

TODO - current instructions on [GitHub](https://github.com/Luxonis-Brandon/DepthAI/tree/master/python-api#disparity-depth-calibration).

<h3 class="step"><span>6</span> Download and run DepthAI Python examples</h3>

We'll execute a DepthAI example Python script to ensure your setup is configured correctly. Follow these steps to test DepthAI:

1. Start a terminal session.
2. Run `git clone https://github.com/luxonis/depthai-python`. This downloads the Python module source code which includes an `/examples` folder.
3. Run `python3 examples/test.py`. The script launches a window, starts the cameras, and annotates the video output with object detection and depth perception data. Ensure the cameras are pointed at you (it should identify you as a person).
