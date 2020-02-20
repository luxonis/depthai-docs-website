---
layout: default
title: DepthAI Python API
toc_title: Python API
description: The official API for interacting with your DepthAI board.
order: 5
---

# {{page.title}}

Instructions for installing, upgrading, and using the DepthAI Python API.

{: #python_version data-toc-title="Python Versions"}
## Supported Python Versions

The DepthAI API requires the following Python versions:

* Ubuntu - Python 3.6
* Raspbian - Python 3.7

<h2 id="install" data-toc-title="Installation">Installing the DepthAI API</h2>

<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Using the RPi Compute edition or a pre-flashed DepthAI µSD card? <strong>Skip this step.</strong><br/>
  <span class="small">The repository has already been checked out to `~/Desktop/depthai-python-extras`.</span>
</div>

The DepthAI Python Module and extras (utilities, examples, and tutorials) are installed by checking out our [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) GitHub repository. This will change to a standard `pip install` in the future.

To get started:

1. Checkout the [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) GitHub rep:
    ```
    git clone https://github.com/luxonis/depthai-python-extras.git
    ```
2. Make the checked out repo globally available:
    ```
    pip install -e depthai-python-extras
    ```

<h2 id="upgrade" data-toc-title="Upgrading">Upgrading the DepthAI API</h2>

<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Using the RPi Compute edition or a pre-flashed DepthAI µSD card?<br/>
  <span class="small">The repository has been checked out to `~/Desktop/depthai-python-extras`.</span>
</div>


To upgrade your DepthAI Python API to the latest version:

1. `cd` to your local copy of our [depthai-python-extras](https://github.com/luxonis/depthai-python-extras) repository.
2. Pull the latest changes:
    ```
    git pull
    ```
3. Ensure `depthai-python-extras` is available to all of your Python scripts:
    ```
    pip install -e .
    ```

{: #reference }
## API Reference

{: #depthai_init_device}
### depthai.init_device(cmd_file_path) → bool

Initializes the DepthAI device, returning `True` if the device was successfully initialized and `False` otherwise.

#### Parameters

* cmd_file_path(str) - The full path to the DepthAI `cmd` file.

#### Example

```py
import depthai
import consts.resource_paths
res = depthai.init_device(consts.resource_paths.device_cmd_fpath)
```

{: #depthai_create_pipeline}
### depthai.create_pipeline(config=dict) → Pipeline

Initializes a DepthAI Pipeline, returning the created `Pipeline` if successful and `False` otherwise.

#### Parameters

* __config(dict)__ -  A `dict` of pipeline configuration settings.
    <br/>Example key/values for the config:
    ```py
    {
      # ['previewout', 'metaout', 'left', 'right', 'depth_sipp']
      # If "left" is used, it must be in the first position.
      'streams': ['previewout','metaout'],
      'depth':
      {
          'calibration_file': consts.resource_paths.calib_fpath,
          'padding_factor': 0.3 # The ratio of the bounding box used for object detection
      },
      'ai':
      {
          'blob_file': consts.resource_paths.blob_fpath,
          'blob_file_config': consts.resource_paths.blob_config_fpath
      },
      'board_config':
      {
          'swap_left_and_right_cameras': True, # True for 1097 and 1098OBC
          'left_fov_deg': 69.0, # same on 1097 and 1098OBC
          'left_to_right_distance_cm': 9.0, # distance between left & right grayscale cameras
      }
    }
    ```

#### Example

```py
pipeline = depthai.create_pipelinedepthai.create_pipeline(config={
    'streams': ['previewout'],
    'ai': {'blob_file': consts.resource_paths.blob_fpath}
})
```
