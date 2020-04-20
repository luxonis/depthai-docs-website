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

<h3 class="step" data-toc-title="Install Python API" id="calibrate_install_api"><span></span> Checkout the [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) GitHub repo.</h3>

<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Already installed `depthai-python-extras`? <strong>Skip this step.</strong><br/>
</div>

```
git checkout https://github.com/luxonis/depthai-python-extras.git
cd depthai-python-extras
```

<h3 class="step" data-toc-title="Print Chessboard" id="print_chessboard"><span></span> Print chessboard calibration image.</h3>

[![Print this chessboard calibration image](https://raw.githubusercontent.com/luxonis/depthai/master/resources/patternnew.png)](https://raw.githubusercontent.com/luxonis/depthai/master/resources/patternnew.png)

The entire board should fit on a single piece of paper (scale to fit).

<h3 class="step" data-toc-title="Start Calibration Script" id="start_calibration_script"><span></span> Start the calibration script.</h3>

Replace the placeholder argument values with valid entries:

```
python3 calibrate.py -s [SQUARE_SIZE_IN_CM] \
-co '{"board_config": {"swap_left_and_right_cameras": [true|false], "left_to_right_distance_cm": [distance]}}'
```

Argument reference:

* `--SQUARE_SIZE_CM`: Measure the square size of the printed chessboard in centimeters.
* `--CONFIG_OVERWRITE`: A JSON-formatted pipeline config object that overrides the default config. This JSON object contains two keys that may need to be provided depending on your DepthAI board:
    * `swap_left_and_right_cameras` (default = `true`): Ignore this option for the 1097 and 1098OBC models. Otherwise, specify `true` if the cameras faces backward and `false` if the cameras face forward.
    * `left_to_right_distance_cm` (default = `9.0`): The distance between the stereo cameras. Ignore this option for the 1097 model and use `7.5` for the 1098OBC.

For example, the arguments for the 1098OBC look like the following if the square size is 2.35 cm:
```
python3 calibrate.py -s 2.35 \
-co '{"board_config": {"left_to_right_distance_cm": 7.5}}'
```

Run `python3 calibrate.py --help` for a full list of arguments and usage examples.`

<h3 class="step" data-toc-title="Capture images" id="capture_images"><span></span> Position the chessboard and capture images.</h3>

Left and right video streams are displayed, each containing a polygon overlay. Hold up the printed chessboard so that the whole of the checkerboard is displayed within both video streams. Match the orientation of the overlayed polygon and press [SPACEBAR] to capture an image. The checkerboard pattern does not need to match the polygon exactly, but it is important to use the polygon as a guideline for angling and location relative to the camera. There are 13 required polygon positions.

After capturing images for all of the polygon positions, the calibration image processing step will begin. If successful, a calibration file will be created at `depthai-python-extras/resources/depthai.calib`. This file is loaded by default via the `calib_fpath` variable within `consts/resource_paths.py`.

<h3 class="step" id="test_depth"><span></span> Test depth</h3>

We'll view the depth stream to ensure the cameras are calibrated correctly:

1. Start a terminal session.
2. Access your local copy of `depthai-python-extras`.
    ```
    cd [depthai-python-extras repo]
    ```
3. Run `python3 test.py -co '{"streams": ["left","depth_sipp"]}'`.<br/>
    The script launches a window, starts the cameras, and displays a depth video stream:

    ![object localization demo](/images/depth.png)

    In the screenshot above, the hand is closer to the camera.
