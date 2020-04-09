---
layout: default
title: Tutorial - Multiple DepthAI per Host
toc_title: Multiple DepthAI per Host
description: Use Multiple DepthAI on a Single Host
order: 3
---

# {{ page.title }}

Learn how to use the DepthAI `-dev` option to discover the DepthAI connected to your system, and use them individually.

![multiple_depthai](/images/tutorials/multiple_depthai/IMG_7721.jpg)

Shown on the left is Luxonis [uAI (BW1093)](https://shop.luxonis.com/products/bw1093) which is actually plugged into a DepthAI: [Raspberry Pi Compute Module Edition (BW1097)](https://shop.luxonis.com/products/depthai-rpi-compute-module-edition).

So in this case, everything is running on the (single) Raspberry Pi 3B+ which is in the back of the BW1097.

## Dependencies

You have already set up the Python API on your system (if you have a Raspberry Pi Compute Module it came pre-setup).  
See [here](/api) if you have not yet installed the DepthAI Python API on your system.

## Update to the latest from Github
`git pull https://github.com/luxonis/depthai-python-extras.git`

## Discover DepthAI-USB Port Mapping
The DepthAI multi-device support is currently done by selecting the USB port into which the DepthAI is plugged in.

If you'd like to associate a given DepthAI device with specific code (e.g. neural model) to be run on it, it is recommended
to plug in one device at a time, and then use the following command to determine which device is on which port:
`python3 test.py -dev list`

Example results for 2x DepthAI on a system:
```...
XLink initialized.
Detected 2 device(s):
  2-ma2480     on USB port: 1
  1.1-ma2480   on USB port: 2.1
```
## Selecting a Specific DepthAI device to be used.

From the Detected devices(s) above, use the following command to select the device you would like to use with your code.
For example, if the first device is desirable from above (the device on USB port 1), use the following command:
`python3 test.py -dev 1`

And then similarly, to run the same script again on the other second device, run it with:
`python3 test.py -dev 2.1`

It's worth noting that test.py actually is a wrapper for depthai.py.  It has a watchdog functionality which catches any 
library issues or other exceptions that may occur.  It calls depthai.py

You can alternatively run without this watchdog functionality use depthai.py directly, as below:
`python3 depthai.py -dev 1`
`python3 depthai.py -dev 2.1`

And you can use these scripts as a basis for your own modified versions, such that you can run differing neural models 
on different DepthAI/uAI models.  

## Summary and Overview of Host-Side Burden
Now use as many DepthAI devices as you need!  

And since DepthAI does all the heavy lifting, you can usually use quite a 
few of them with very little burden to the host.  

And it's worth noting that you can always disable the video stream by only only requesting `metaout` [here](https://github.com/luxonis/depthai-python-extras/blob/232d1e7529e0278b75192d0870a969b6c0e2d1ae/depthai.py#L104).

So if you're using the metadata to say, drive a robot or make decisions with code, and the video isn't needed,
you can do this to substantially reduce the burden on the host - as since all the neural inference work is done on 
DepthAI before getting to the host - almost all the host burden is just from displaying the video.

So with the video disabled, the host only has to handle a couple kilobytes a second in terms of metadata.
