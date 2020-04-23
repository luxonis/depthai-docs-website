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
sudo apt install git python3-pip
pip3 install numpy opencv-python
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && udevadm trigger
```

### 2. Plug in DepthAI power and USB (for uAI USB is also its power)
### 3. Clone [depthai-python-extras](https://github.com/luxonis/depthai-python-extras)
`git clone https://github.com/luxonis/depthai-python-extras`

### 4. Run the example script:
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

## Can I train my own Models for DepthAI?

Yes.  

We have a Google Collab notebook you can even use for this.  See [here](https://discuss.luxonis.com/d/30-luxonis-depthai-for-raspberry-pi-overview-and-status/24)

And we'll be writing up a tutorial in the Tutorials section in the near future.

## Do I need Depth data to train my own custom Model for DepthAI?

No.  

That's the beauty of DepthAI.  It takes standard object detectors (2D, pixel space) and fuses
these neural networks with stereo disparity depth to give you 3D results in physical space.

Now, could you train a model to take advantage of depth information?  Yes, and it would likely be even
more accurate than the 2D version.  To do so, record all the streams (left, right, and color) and
retrain on all of those (which would require modifying the front-end of say MobileNet-SSD to allow 5 
layers instead of 3 (1 for each grayscale, 3 for the color R, G, B).

## If I train my own network, which Neural Operations are supported by DepthAI?

See the `VPU` section [here](https://docs.openvinotoolkit.org/latest/_docs_IE_DG_supported_plugins_Supported_Devices.html).

Anything that's supported there uner `VPU` will work on DepthAI.  It's worth noting that we haven't tested all of these
permutations though.

## What network backbones are supported on DepthAI?

All the networks listed [here](https://docs.openvinotoolkit.org/latest/_docs_IE_DG_supported_plugins_MYRIAD.html) are supported by DepthAI.  

We haven't tested all of them though.  So if you have a problem, contact us and we'll figure it out.

## Are CAD Files Available?

Yes.  

The full designs (including source Altium files) for all the carrier boards are in our `depthai-hardware` Github:

 - [depthai-hardware](https://github.com/luxonis/depthai-hardware)
 
## How do I Get H.264 Videos to Play on My Mac?
The h.264 videos which DepthAI and uAI encode do not work by default on Mac OS X.  You can always upload them to Youtube/Google Photos/etc. and they'll play their.  BUT, if you want them to work directly on your Mac, you can do the following conversion using ffmpeg through HomeBrew:

### Install ffmpeg
```
brew install ffmpeg
```
### Make an ffmpeg Conversion Script
Make a new file called `transcode_h264.sh` and make it executable: 
```
touch transcode_h264.sh
chmod +x transcode_h264.sh
```
Add the following commands to `transcode_h264.sh`:
```
ffmpeg -an -i "$1" -vf scale=-1:406 -vcodec libx264 -preset veryslow -crf 23 -maxrate 1200k -bufsize 2500k -pix_fmt yuv420p -profile:v baseline -level 3.1 -f mp4 /tmp/pass1 && \
ffmpeg -an -i "$1" -vf scale=-1:406 -vcodec libx264 -preset veryslow -crf 23 -maxrate 1200k -bufsize 2500k -pix_fmt yuv420p -profile:v baseline -level 3.1 -f mp4 -movflags +faststart -tune zerolatency "$1.mp4"
```
You can do this by copying the text above, and issuing the following commands with vim:
```
vim transcode_h264.sh
i
```
Hit CMD + v

Hit esc
```
:wq
```
Hit enter

### Use the Conversion Script

```
./transcode_h264.sh myvid.mov
```

You'll get a nice, fairly small, Mac-friendly and share-able video.

### [Optional] Add the Conversion Script to Your Path

```
cp transcode_h264.sh /usr/local/bin/transcode_h264
```
Now you can juse use `transcode_h264.sh` in any directory!

## What are the Minimum and Maximum Depth Visible by DepthAI?

In terms of numerically-limited max distance (i.e. not limited by the practicalities of physics), the actual furthest distance is
`focal_length * base_line_dist` in meters, *1000 in mm, where `focal_length = orig_frame_w / (2.f * std::tan(fov / 2 / 180.f * pi));`

And the minimum distance for depth perception is `focal_length * base_line_dist/96`, as 96 is the standard maximum disparity search used by DepthAI.






