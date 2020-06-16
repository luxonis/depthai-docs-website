---
layout: default
title: DepthAI USB3 | Modular Cameras
toc_title: USB3 | Modular Cameras
screenshot: /images/products/depthai-edition-usb.jpg
description: DepthAI for the host of your choice, with modular cameras for easy integration onto/into your platform and custom stereo baselines.
order: 2
show_on_home: true
---

# {{page.title}}

{% include model_number.md %}

![screenshot]({{page.screenshot}})

Use DepthAI on your existing host. Since the AI/vision processing is done on the Myriad X, a typical desktop could handle tens of DepthAIs plugged in (the effective limit is how many USB ports the host can handle).

## Requirements

* Ubuntu 18.04 or Raspbian 10
* Cameras
  * [Modular color camera](/products/color_camera)
  * [Stereo camera pair](/products/stereo_camera_pair/) (if depth is required)
* USB3C cable
* USB3C port on the host
* [A supported Python version](/api/#python_version) on the host

## Board Layout

![USB Layout](/images/products/labeled/1098ffc.jpg)

<table class="table table-sm">
<tbody>
<tr>
<td>A. 5 V IN</td><td>E. Left Camera Port</td></tr>
<tr>
<td>B. USB3C</td><td>F. DepthAI Module</td></tr>
<tr>
<td>C. Right Camera Port</td><td>G. Myriad X GPIO Access</td></tr>
<tr>
<td>D. Color Camera Port</td><td></td></tr>
</tbody>
</table>

{: #in_box}
## What's in the box?

* {{page.title}} Carrier Board
* USB3C cable (6 ft.)
* Power Supply



## Setup

Follow the steps below to setup your DepthAI device.


<h3 class="step js-toc-ignore"><span></span> Connect your modular cameras.</h3>

The FFC (flexible flat cable) Connectors on the BW1098FFC require care when handling.  Once inserted and latched, the connectors are robust, but they are easily susceptible to damage during the de-latching process when handling the connectors, particularly if to much force is applied during this process.

The video below shows a technique without any tool use to safely latch and delatch these connectors.

[![Connecting the Modular Cameras to BW1098FFC](https://i.imgur.com/z3O0LXr.jpg)](https://www.youtube.com/watch?v=KQlFvodQ3nM "FFC Connection Example")

Once the flexible flat cables are securely latched, you should see something like this:

![BW1098FFC Connected to Modular Cameras](/images/1098ffc_connected.jpg)

Note when looking at the connectors, the blue stripe should be facing up.

<h3 class="step js-toc-ignore"><span></span> Connect your host to the DepthAI USB carrier board.</h3>

<h3 class="step js-toc-ignore"><span></span> Connect the DepthAI USB power supply (included).</h3>

<h3 class="step js-toc-ignore"><span></span> Install the Python DepthAI API.</h3>

[See our instructions](/api#install).

<h3 class="step js-toc-ignore"><span></span> Calibrate Stereo Cameras.</h3>

Have the stereo camera pair? Use the DepthAI [calibration script](/products/stereo_camera_pair/#calibration).

<h3 class="step js-toc-ignore"><span></span> Download and run DepthAI Python examples.</h3>

{% include test_step.md %}
