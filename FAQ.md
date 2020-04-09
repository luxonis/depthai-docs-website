---
layout: default
title: Frequently Asked Questions
toc_title: FAQ
description: Common questions when first learning about or using DepthAI/uAI.
order: 6
---

# DepthAI FAQs

## How hard is it to get DepthAI running from scratch?

It's pretty simple, and the bare requirements are fairly slim.  For a stock Ubuntu 18.04 machine the total steps 
required to get going are:
### 1. Run these commands

```
sudo apt install git
sudo apt install python3-pip
pip3 install numpy
pip3 install opencv-python
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && udevadm trigger
```

### 2. Plug in DepthAI power and USB (for uAI USB is also its power)
### 3. Clone [depthai-python-extras](https://github.com/luxonis/depthai-python-extras)
`git clone https://github.com/luxonis/depthai-python-extras`

### 4. Run the example script, `test.py`:
`python3 test.py`

### 5. Enjoy real-time spatialAI.  
What objects are, and where, in physical space:

![spatial_AI](/images/spatialai.jpg)

## Can all the models be used with the Raspberry Pi?

Yes, every model can be used, including:

 - Raspberry Pi Compute Module Edition ([BW1097](https://shop.luxonis.com/collections/all/products/depthai-rpi-compute-module-edition) - this one has a built-in Raspberry Pi Compute Module 3B+
 - Raspberry Pi HAT (BW1094) - this can also be used with other hosts as its interface is USB3
 - USB3C with Onboard Cameras [BW1098OBC](https://shop.luxonis.com/collections/all/products/bw10980bc)
 - USB3C with Modular Cameras [BW1098FFC](https://shop.luxonis.com/products/depthai-usb3-edition)
 - uAI (microAI) Single Camera [BW1093](https://shop.luxonis.com/collections/all/products/bw1093)
 
 We even have some basic ROS support going as well which can be used on the Pi also.
 
## Is DepthAI and uAI easy to use with Raspberry Pi? 
 
Very. It's designed for ease of setup and use, and to keep the Pi CPU not-busy.
 
## Can I use multiple DepthAI with one host? 
 
Yes.  DepthAI is architected to put as-little-as-possible burden on the host.
So even with a Raspberry Pi you can run a handful of DepthAI with the Pi and not burden the Pi CPU.
 
See [here](https://docs.luxonis.com/tutorials/multiple_depthai/) for instructions on how to do so.


