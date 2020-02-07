---
layout: default
title: Troubleshooting ~ DepthAI
toc_title: Troubleshooting
description: Tips for common DepthAI issues.
order: 6
---

### How do I disable the pre-installed startup demo on the RPi Compute Edition?

The demo autostart file needs to be deleted:

```
rm /home/pi/.config/autostart/runai.desktop
```
<hr/>


### I'm seeing `depthai: Error initalizing xlink` errors and DepthAI fails to run.

The Myriad X needs to be reset. Click the "MODULE RST" or "RST" button on your carrier board.

On the RPi Compute edition, you can reset the Myriad X via the following shell commands:

```
raspi-gpio set 33 op  # set 33 as output
raspi-gpio set 33 dh  # drive high to reset Myriad X
sleep 1
raspi-gpio set 33 dl  # drive low to allow Myriad X to run
```

<hr/>

### Why is the Camera Calibration running slow?

Poor photo conditions [can dramatically impact the image processing time](https://stackoverflow.com/questions/51073309/why-does-the-camera-calibration-in-opencv-python-takes-more-than-30-minutes) during the camera calibration. Under normal conditions, it should take 1 second or less to find the chessboard corners per-image on an RPi but this exceed 20 seconds per-image in poor conditions. Tips on setting up proper photo conditions:

* Ensure the checkerboard is not warped and is truly a flat surface. A high-quality option: [print the checkerboard on a foam board](https://discuss.luxonis.com/d/38-easy-calibration-targets-for-depthai-opencv-checkerboard).
* Reduce glare on the checkerboard (for example, ensure there are no light sources close to the board like a desk lamp).
* Reduce the amount of motion blur by trying to hold the checkerboard as still as possible.

<hr/>
