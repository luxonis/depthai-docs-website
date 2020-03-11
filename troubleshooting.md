---
layout: default
title: Troubleshooting ~ DepthAI
toc_title: Troubleshooting
description: Tips for common DepthAI issues.
order: 6
---

# DepthAI Troubleshooting

{: #disable_demo data-toc-title="Disable the startup demo"}
### How can the startup demo on the RPi Compute Edition be disabled?

Delete the autostart file:

```
rm /home/pi/.config/autostart/runai.desktop
```
<hr/>

{: #device_reset data-toc-title="Reset the Myriad X"}
### `depthai: Error initalizing xlink` errors and DepthAI fails to run.

The Myriad X needs to be reset. Click the "MODULE RST" or "RST" button on your carrier board.

On the RPi Compute edition, you can reset the Myriad X via the following shell commands:

```
raspi-gpio set 33 op  # set 33 as output
raspi-gpio set 33 dh  # drive high to reset Myriad X
sleep 1
raspi-gpio set 33 dl  # drive low to allow Myriad X to run
```

<hr/>

{: #depthai_import_error}
### ImportError: No module named 'depthai'

This indicates that the `depthai.*.so` file could not be loaded. There are a handful of reasons this can fail:

1. Is the DepthAI API [installed](api/#install)? Verify that it appears when you type:
    ```
    pip3 list | grep depthai
    ```
2. Are you using a [supported Python version](/api/#python_version) for your operating system? Check that your Python version is [supported](/api/#python_version):
    ```
    python3 --version
    ```

<hr/>

{: #slow_calibration data-toc-title="Slow camera calibration"}
### Why is the Camera Calibration running slow?

Poor photo conditions [can dramatically impact the image processing time](https://stackoverflow.com/questions/51073309/why-does-the-camera-calibration-in-opencv-python-takes-more-than-30-minutes) during the camera calibration. Under normal conditions, it should take 1 second or less to find the chessboard corners per-image on an RPi but this exceed 20 seconds per-image in poor conditions. Tips on setting up proper photo conditions:

* Ensure the checkerboard is not warped and is truly a flat surface. A high-quality option: [print the checkerboard on a foam board](https://discuss.luxonis.com/d/38-easy-calibration-targets-for-depthai-opencv-checkerboard).
* Reduce glare on the checkerboard (for example, ensure there are no light sources close to the board like a desk lamp).
* Reduce the amount of motion blur by trying to hold the checkerboard as still as possible.

<hr/>

{: #python_api_permission_denied data-toc-title-"pip install - permission denied"}
### [Errno 13] Permission denied: '/usr/local/lib/python3.7/dist-packages/...'

If `pip3 install` fails with a `Permission denied` error, your user likely doesn't have permission to install packages in the system-wide path. Try installing in your user's home directory instead by adding the `--user` option. For example:

```
pip3 install -e depthai-python-extras --user
```

[More information on Stackoverflow](https://stackoverflow.com/questions/31512422/pip-install-failing-with-oserror-errno-13-permission-denied-on-directory).


### The DepthAI device show up under /dev/video* like web cameras do.

The USB device enumeration could be checked with lsusb | grep 03e7  . It should print:
`03e7:2485 after reset (bootloader running);`  
`03e7:f63b after the application was loaded.`

No `/dev/video*` nodes are created. 

The device DepthAI implements VSC (Vendor Specific Class) protocol, and libusb is used for communication.
