---
layout: default
title: DepthAI USB3
toc_title: USB3
screenshot: /images/products/depthai-edition-usb.jpg
description: DepthAI for the host of your choice. Runs on anything that runs OpenVINO.
order: 2
---

# {{page.title}}

![{{page.toc_title}}]({{page.screenshot}})

Use DepthAI with any platform that runs OpenVINO (Mac OS X, many Linux variants including Ubuntu, Yocto, etc., and Windows 10). Since the AI/vision processing is done on the Myriad X, a typical desktop could handle tens of DepthAIs plugged in (the effective limit is how many USB ports the host can handle).

## Requirements

* An OpenVINO-supported operating system
* Cameras
  * Modular color camera
  * [Stereo camera pair](/products/stereo_camera_pair/) (if depth is required)
* USB3C cable
* USB3C port on the host
* Python 3 installed on host

## Setup

Follow the steps below to setup your DepthAI device.

<h3 class="step js-toc-ignore"><span>1</span> Connect your host to the DepthAI USB carrier board</h3>

<h3 class="step js-toc-ignore"><span>2</span> Connect the DepthAI USB power supply (included)</h3>

<h3 class="step js-toc-ignore"><span>3</span> Install OpenVINO</h3>

[Follow the guide for your operating system](https://docs.openvinotoolkit.org/latest/index.html) on openvinotoolkit.org.

<h3 class="step js-toc-ignore"><span>4</span> Install the Python DepthAI API</h3>

[See our instructions](/api#install).

<h3 class="step js-toc-ignore"><span>5</span> Calibrate Stereo Cameras</h3>

Have the stereo camera pair? Use the DepthAI [calibration script](/products/stereo_camera_pair/#calibration).


<h3 class="step js-toc-ignore"><span>6</span> Download and run DepthAI Python examples</h3>

We'll execute a DepthAI example Python script to ensure your setup is configured correctly. Follow these steps to test DepthAI:

1. Start a terminal session.
2. Access your local copy of of the `depthai-python-extras` from step 4.
    ```
    cd [depthai-python-extras repo from step 4]
    ```
3. Run `python3 examples/test.py`.<br/>
    The script launches a window, starts the cameras, and annotates the video output with object detection and depth perception data. Ensure the cameras are pointed at you (it should identify you as a person).
