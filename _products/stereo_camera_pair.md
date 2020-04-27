---
layout: default
title: 720p, 120 Hz Global Shutter Modular Stereo Camera Pair
toc_title: Stereo Camera Pair
screenshot: /images/products/stereo-cameras.jpg
description: For applications where Depth + AI are needed, we have modular, high-frame-rate, excellent-depth-quality cameras which can be separated to a baseline of up to 12 inches (30.5 cm).
order: 2
---

# {{page.title}}

![{{page.toc_title}}]({{page.screenshot}})

{{page.description}}

## Specifications

* 720p, 120 Hz Video
* Synchronized Global Shutter
* Excellent Low-light
* Same dimensions, mounting holes, and camera center as Raspberry Pi Camera v2.1
* 1280 x 720 pixels
* 83 DFOV°
* Lens Size: 1/2.3 inch
* AutoFocus: 19.6 cm - ∞
* F-number: 2.2

## Calibration

For better depth image quality, perform a stereo camera calibration. Follow these steps:

<h3 class="step" data-toc-title="Install Python API" id="calibrate_install_api"><span></span> Checkout the [depthai](https://github.com/luxonis/depthai) GitHub repo.</h3>

<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Already installed `depthai`? <strong>Skip this step.</strong><br/>
</div>

```
git checkout https://github.com/luxonis/depthai.git
cd depthai
```

<h3 class="step" data-toc-title="Print Chessboard" id="print_chessboard"><span></span> Print chessboard calibration image.</h3>

[![Print this chessboard calibration image](https://raw.githubusercontent.com/luxonis/depthai/master/resources/patternnew.png)](https://raw.githubusercontent.com/luxonis/depthai/master/resources/patternnew.png)

The entire board should fit on a single piece of paper (scale to fit).

<h3 class="step" data-toc-title="Start Calibration Script" id="start_calibration_script"><span></span> Start the calibration script.</h3>

Replace the placeholder argument values with valid entries:

```
python3 calibrate.py -s [SQUARE_SIZE_IN_CM] -brd [BOARD]'
```

Argument reference:

* `-s SQUARE_SIZE_IN_CM`, `--square_size_cm SQUARE_SIZE_IN_CM`: Measure the square size of the printed chessboard in centimeters.
* `-brd BOARD`, `--board BOARD`: BW1097, BW1098OBC - Board type from resources/boards/ (not case-sensitive). Or path to a custom .json board config. Mutually exclusive with [-fv -b -w], which allow manual specification of field of view, baseline, and camera orientation (swapped or not-swapped).

Retrieve the size of the squares from the calibration target by measuring them with a ruler or calipers and enter that number (in cm) in place of [SQUARE_SIZE_IN_CM].  

For example, the arguments for the 1098OBC look like the following if the square size is 2.35 cm:
```
python3 calibrate.py -s 2.35 -brd bw1098obc'
```
And note that mirroring the display when calibrating is often useful (so that the directions of motion don't seem backwards).  When seeing ourselves, we're used to seeing ourselves backwards (because that's what we see in a mirror), so do so, use the `-ih` option as below:
```
python3 calibrate.py -s 2.35 -brd bw1098obc -ih'
```

So when we're running calibration internally we almost always use the `-ih` option, so we'll include it on all the following example commands:

### BW1098OBC (USB3 Onboard Camera Edition)):
```
python3 calibrate.py -s [SQUARE_SIZE_IN_CM] -brd bw1098obc -ih'
```
### BW1097 (RPi Compute Module Edition):
```
python3 calibrate.py -s [SQUARE_SIZE_IN_CM] -brd bw1097 -ih'
```
### BW1098FFC (USB3 Modular Camera Edition):
Use one of the board `*.json` files from [here](https://github.com/luxonis/depthai/tree/master/resources/boards) to define the baseline between the stereo cameras, and between the left camera and the color camera, replacing the items in brackets below.

* Swap left/right (i.e. which way are the cameras facing, set to `true` or `false`
* The `BASELINE` in centimeters between grayscale left/right cameras
* The distance `RGBLEFT` separation between the `Left` grayscale camera and the color camera, in centimeters.

```
{
    "board_config":
    {
        "name": "ACME01",
        "revision": "V1.2",
        "swap_left_and_right_cameras": [true | false],
        "left_fov_deg": 71.86,
        "rgb_fov_deg": 68.7938,
        "left_to_right_distance_cm": [BASELINE],
        "left_to_rgb_distance_cm": [RGBLEFT]
    }
}
```
So for example if you setup your BW1098OBC with a stereo baseline of 20cm, with the color camera exactly between the two grayscale cameras, and the same orientation of the cameras as the BW1097, uses the following JSON:

```
{
    "board_config":
    {
        "name": "ACME01",
        "revision": "V1.2",
        "swap_left_and_right_cameras": true,
        "left_fov_deg": 71.86,
        "rgb_fov_deg": 68.7938,
        "left_to_right_distance_cm": 20,
        "left_to_rgb_distance_cm": 10
    }
}
```
Then, run calibration with this board name:
```
python3 calibrate.py -s [SQUARE_SIZE_IN_CM] -brd ACME01 -ih'
```

Run `python3 calibrate.py -h` (or `-h`) for a full list of arguments and usage examples.`

<h3 class="step" data-toc-title="Capture images" id="capture_images"><span></span> Position the chessboard and capture images.</h3>

Left and right video streams are displayed, each containing a polygon overlay. Hold up the printed chessboard so that the whole of the checkerboard is displayed within both video streams. Match the orientation of the overlayed polygon and press [SPACEBAR] to capture an image. The checkerboard pattern does not need to match the polygon exactly, but it is important to use the polygon as a guideline for angling and location relative to the camera. There are 13 required polygon positions.

After capturing images for all of the polygon positions, the calibration image processing step will begin. If successful, a calibration file will be created at `depthai/resources/depthai.calib`. This file is loaded by default via the `calib_fpath` variable within `consts/resource_paths.py`.

<h3 class="step" id="test_depth"><span></span> Test depth</h3>

We'll view the depth stream to ensure the cameras are calibrated correctly:

1. Start a terminal session.
2. Access your local copy of `depthai`.
    ```
    cd [depthai repo]
    ```
3. Run `python3 test.py -s depth_sipp`.<br/>
    The script launches a window, starts the cameras, and displays a depth video stream:

    ![object localization demo](/images/depth.png)

    In the screenshot above, the hand is closer to the camera.
