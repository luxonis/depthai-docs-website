---
layout: default
title: DepthAI USB3 with onboard cameras (OAK-D)
toc_title: USB3 | Onboard Cameras
screenshot: /images/products/depthai-edition-usb3-cameras.png
description: DepthAI for the host of your choice, with an onboard color camera module and global-shutter synchronized stereo pair.
order: 2
show_on_home: true
test_args: "-co '{\"board_config\": {\"left_to_right_distance_cm\": 7.5}}'"
---

# {{page.title}}

{% include model_number.md %}

![screenshot]({{page.screenshot}})

Use DepthAI on your existing host. Since the AI/vision processing is done on the Myriad X, a typical desktop could handle tens of DepthAIs plugged in (the effective limit is how many USB ports the host can handle).

## Color Camera Specifications

* 4K, 60 Hz Video (max 4K/30fps encoded h.265)
* 12 MP Stills
* 4056 x 3040 pixels
* 81 DFOV°
* 68.8 HFOV°
* Lens Size: 1/2.3 inch
* AutoFocus: 8 cm - ∞
* F-number: 2.0

## Stereo Camera Specifications

* 720p, 120 Hz Video
* Synchronized Global Shutter
* Excellent Low-light
* 1280 x 720 pixels
* 83 DFOV°
* 71 HFOV°
* 56 VFOV°
* Lens Size: 1/2.3 inch
* Fixed Focus: 19.6 cm - ∞
* F-number: 2.2
* Sensor Dynamic Range: 68dB

## Requirements

* Ubuntu 18.04 or Raspbian 10
* USB3C cable
* USB3C port on the host
* [A supported Python version](/api/#python_version) on the host

{: #in_box}
## What's in the box?

* {{page.title}} Carrier Board
* USB3C cable (6 ft.)
* Power Supply

## Setup

Follow the steps below to setup your DepthAI device.

<h3 class="step js-toc-ignore"><span></span> Connect your host to the DepthAI USB carrier board</h3>

<h3 class="step js-toc-ignore"><span></span> Connect the DepthAI USB power supply (included)</h3>

<h3 class="step js-toc-ignore"><span></span> Install the Python DepthAI API</h3>

[See our instructions](/api#python_version).

<h3 class="step js-toc-ignore"><span></span> Calibrate Stereo Cameras</h3>

Use the DepthAI [calibration script](/products/stereo_camera_pair/#calibration) with the following argument:

```
-brd bw1098obc
```

This sets the distance between the stereo cameras to their distance on the board.

<h3 class="step js-toc-ignore"><span></span> Download and run DepthAI Python examples</h3>

{% include test_step.md param="arg" %}
