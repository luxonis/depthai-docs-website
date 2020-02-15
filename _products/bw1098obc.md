---
layout: default
title: DepthAI USB3 with onboard cameras
toc_title: USB3 | Onboard Cameras
screenshot: /images/products/depthai-edition-usb3-cameras.png
description: DepthAI for the host of your choice, with an onboard color camera module and global-shutter synchronized stereo pair.
order: 2
show_on_home: true
---

# {{page.title}}

![screenshot]({{page.screenshot}})

Use DepthAI on your existing host. Since the AI/vision processing is done on the Myriad X, a typical desktop could handle tens of DepthAIs plugged in (the effective limit is how many USB ports the host can handle).

## Requirements

* Ubuntu 18.04 or Raspbian 10
* USB3C cable
* USB3C port on the host
* Python 3 installed on host

{: #in_box}
## What's in the box?

* {{page.title}} Carrier Board
* USB3C cable (6 ft.)
* Power Supply

## Setup

Follow the steps below to setup your DepthAI device.

<h3 class="step js-toc-ignore"><span></span> Connect your host to the DepthAI USB carrier board</h3>

<h3 class="step js-toc-ignore"><span></span> Connect the DepthAI USB power supply (included)</h3>

<h3 class="step js-toc-ignore"><span></span> Install OpenVINO</h3>

[Follow the guide for your operating system](https://docs.openvinotoolkit.org/latest/index.html) on openvinotoolkit.org.

<h3 class="step js-toc-ignore"><span></span> Install the Python DepthAI API</h3>

[See our instructions](/api#install).

<h3 class="step js-toc-ignore"><span></span> Calibrate Stereo Cameras</h3>

Use the DepthAI [calibration script](/products/stereo_camera_pair/#calibration) with the following argument:

```
-co '{"board_config": {"left_to_right_distance_cm": 7.5}}'
```

This sets the distance between the stereo cameras to their distance on the board.

<h3 class="step js-toc-ignore"><span></span> Download and run DepthAI Python examples</h3>

{% include test_step.md %}
