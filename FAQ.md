---
layout: default
title: Frequently Asked Questions
toc_title: FAQ
description: Common questions and How-Tos when first learning about or using DepthAI/uAI.
order: 6
---

# DepthAI FAQs

## How hard is it to get DepthAI running from scratch?

It's pretty simple, and the bare requirements are fairly slim.  For a stock Ubuntu 18.04 machine the total steps 
required to get going are:
<h3 class="step" data-toc-title="Install Dependencies" id="install_dependencies"><span></span> Run these commands. </h3>

```
sudo apt install git python3-pip
pip3 install numpy opencv-python
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && udevadm trigger
```

<h3 class="step" data-toc-title="Plug In DepthAI" id="plugin"><span></span> Plug in DepthAI power and USB (for uAI USB is also its power). </h3>

<h3 class="step" data-toc-title="Cone DepthAI Github" id="clone_repo"><span></span> Clone depthai repo from Github. </h3>
`git clone https://github.com/luxonis/depthai-python-extras`

<h3 class="step" data-toc-title="Run test.py" id="run_example"><span></span> Run the test/demonstration script. </h3>
`python3 test.py`

<h3 class="step" data-toc-title="Enjoy Spatial AI" id="enjoy_spatialai"><span></span> Enjoy real-time spatialAI. </h3>
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

We have a tutorial around Google Collab notebooks you can even use for this.  See [here](https://docs.luxonis.com/tutorials/object_det_mnssv2_training/)


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

Depth data from DepthAI is returned in uint16 format.  To interpret this depth into meters, use the following conversions.  

In terms of numerically-limited max distance (i.e. not limited by the practicalities of physics), the actual furthest distance is
`focal_length * base_line_dist` in meters, *1000 in mm, where `focal_length = frame_width / (2.f * std::tan(fov / 2 / 180.f * pi));`
Where `frame_width` is the horizontal resolution of the sensors, by default 1280 pixels.

The minimum distance for depth perception is `focal_length * base_line_dist / 96`, as 96 is the standard maximum disparity search used by DepthAI.

For the depth data, 65535 is a special value, meaning that that distance is unknown.

## How Do I Display Multiple Streams?
To specify which streams you would like displayed, use the `-s` option.  For example for metadata (e.g. bounding box results from an object detector), the color stream (`previewout`), and for deph results (`depth_sipp`), use the following command:

```
python3 test.py -s metaout previewout depth_sipp
```
The available streams are:
 - `metaout` # Meta data results from the neural network
 - `previewout` # Small preview stream from the color camera
 - `left` # Left grayscale camera ()
 - `right` # Right grayscale camera (marked `R` or `RIGHT` on the board)
 - `depth_sipp` # Depth in `uint16` (see [here](https://docs.luxonis.com/faq/#what-are-the-minimum-and-maximum-depth-visible-by-depthai) for the format.
 - `disparity` # Raw disparity
 - `depth_color_h` # Depth colorized on the host.

## How Do I Limit The FrameRate Per Stream?

So the simple way to select streams is to just use the `-s` option.  But in some cases (say when you have a slow host or only USB2 connection -and- you want to display a lot of streams) it may be necessary to limit the framerate of streams to not overwhelm the host/USB2 with too much data.

So to set streams to a specific framerate to reduce the USB2 load and host load, use the following over-ride command structure, which allows you to set the framerate per stream.

The following example sets the `depth_sipp` stream to 8 FPS and the `previewout` to 12 FPS:

`python3 test.py -co '{"streams": [{"name": "depth_sipp", "max_fps": 8.0},{"name": "previewout", "max_fps": 12.0}]}'`

You can pick/choose whatever streams you want, and their frame rate, but pasting in additional `{"name": "streamname", "max_fps": FPS}` into the expression above.

## How Do I Force USB2 Mode?

USB2 Communication may be desirable if you'd like to use extra-long USB cables and don't need USB3 speeds.

To force USB2 mode, simply use the `-fusb2` (or `--force_usb2`) command line option as below:
```
python3 test.py -fusb2
```
Note that if you would like to use DepthAI at distances that are even greater than what USB2 can handle, we do have DepthAI PoE variants coming, see [here](https://discuss.luxonis.com/d/30-luxonis-depthai-for-raspberry-pi-overview-and-status/29), which allow DepthAI to use up to a 328.1 foot (100 meter) cable for both data and power - at 1 gigabit per second (1gbps).

## What Are The Stream Latencies?
When implementing robotic or mechatronic systems it is often quite useful to know how long it takes from a photo hitting an image sensor to when the results are available to a user, the `photon-to-results` latency.  

So the following results are an approximation of this `photon-to-results` latency, and are likely an over-estimate as we tested by actually seeing when results were updated on a monitor, and the monitor itself has some latency, so the results below are likely an over-estimate, and are overestimated by whatever the latency of the monitor is that we used during the test.  They give, however, a decent worst-case latency:

measured | requested | avg latency, ms
-- | -- | --
left | left | 100
left | left, right | 270
left | left, right, depth_sipp | 380
left | left, right, depth_sipp, metaout, previewout | 420
previewout | previewout | 65
previewout | metaout, previewout | 100
previewout | left, right, depth_sipp, metaout, previewout | 950
metaout | metaout | 300
metaout | metaout, previewout | 300
metaout | left, right, depth_sipp, metaout, previewout | 1900

## What Information is Stored on the DepthAI Boards
Initial Crowd Supply backers received boards which hat literally nothing stored on them.  All information was loaded from the host to the board.  This includes the BW1097 ([here](https://docs.luxonis.com/products/bw1097/#setup)), which had the calibration stored on the included microSD card.

So each hardware model which has stereo cameras (e.g. [BW1097](https://docs.luxonis.com/products/bw1097/), [BW1098FFC](https://docs.luxonis.com/products/bw1098ffc/), [BW1098OBC](https://docs.luxonis.com/products/bw1098obc/), and [BW1094](https://docs.luxonis.com/products/bw1094/)) has the capability to store the calibration data and field-of-view, stereo basline (`L-R distance`) and relative location of the color camera to the stereo cameras (`L-RGB distance`) as well as camera orientation (`L/R swapped`).  To retrieve this information, simply run `python3 test.py` and look for `EEPROM data:`.  Example of information pulled from a [BW1098OBC](https://docs.luxonis.com/products/bw1098obc/) is below:
```
EEPROM data: valid (v2)
  Board name     : BW1098OBC
  Board rev      : R0M0E0
  HFOV L/R       : 71.86 deg
  HFOV RGB       : 68.7938 deg
  L-R   distance : 7.5 cm
  L-RGB distance : 3.75 cm
  L/R swapped    : yes
  L/R crop region: top
  Calibration homography:
    1.002324,   -0.004016,   -0.552212,
    0.001249,    0.993829,   -1.710247,
    0.000008,   -0.000010,    1.000000,
```

Current (as of April 2020) DepthAI boards with on-board stereo cameras ([BW1097](https://docs.luxonis.com/products/bw1097/) and [BW1098OBC](https://docs.luxonis.com/products/bw1098obc/) ship calibration and board parameters pre-programmed into DepthAI's onboard eeprom.
