---
layout: default
title: DepthAI USB3 with integrated cameras
toc_title: USB3 w/cameras
screenshot: /images/products/depthai-edition-usb3-cameras.png
description: DepthAI for the host of your choice with an included color camera module and dual-global-shutter 720p mono camera modules.
order: 2
show_on_home: true
---

# {{page.title}}

![{{page.toc_title}}]({{page.screenshot}})

## Requirements

* An OpenVINO-supported operating system
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

<h3 class="step js-toc-ignore"><span>1</span> Connect your host to the DepthAI USB carrier board</h3>

<h3 class="step js-toc-ignore"><span>2</span> Connect the DepthAI USB power supply (included)</h3>

<h3 class="step js-toc-ignore"><span>3</span> Install OpenVINO</h3>

[Follow the guide for your operating system](https://docs.openvinotoolkit.org/latest/index.html) on openvinotoolkit.org.

<h3 class="step js-toc-ignore"><span>4</span> Install the Python DepthAI API</h3>

[See our instructions](/api#install).

<h3 class="step js-toc-ignore"><span>5</span> Calibrate Stereo Cameras</h3>

Use the DepthAI [calibration script](/products/stereo_camera_pair/#calibration).

<h3 class="step js-toc-ignore"><span>6</span> Download and run DepthAI Python examples</h3>

{% include test_step.md %}
