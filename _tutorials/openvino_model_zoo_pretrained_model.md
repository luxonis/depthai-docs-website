---
layout: default
title: Tutorial - How to use a Pre-trained OpenVINO model on DepthAI
toc_title: Pre-trained OpenVINO model
description: Learn how to detect faces in realtime - even on a low-powered Raspberry Pi - with a pre-trained model.
og_image_path: "/images/tutorials/pretrained_model/previewout.png"
order: 3
---

# {{ page.title }}

In this tutorial, you'll learn how to detect faces in realtime, even on a low-powered Raspberry Pi. I'll introduce you to the OpenVINO model zoo and running models from this 'zoo'.  

![model image](/images/tutorials/pretrained_model/previewout2.png)

Haven't heard of OpenVINO or the Open Model Zoo? I'll start with a quick introduction of why we need these tools.

## What is OpenVINO?

Under-the-hood, DepthAI uses the Intel MyriadX chip to perform high-speed model inference. However, you can't just dump your neural net into the chip and get high-performance for free. That's where [OpenVINO](https://docs.openvinotoolkit.org/) comes in. OpenVINO is a free toolkit that converts a deep learning model into a format that runs on Intel Hardware. Once the model is converted, it's common to see Frames Per Second (FPS) improve by 25x or more. Are a couple of small steps worth a 25x FPS increase? Often, the answer is yes!

## What is the Open Model Zoo?

The [Open Model Zoo](https://github.com/opencv/open_model_zoo) is a library of freely-available pre-trained models.  Side note: in machine learning/AI the name for a collection of pre-trained models is called a 'model zoo'. The Zoo also contains scripts for downloading those models into a compile-ready format to run on DepthAI.

DepthAI is able to run many of the object detection models in the Zoo, and several are pre-included in the DepthAI Github.   repository.  We will be using one such model in this tutorial, is face-detection-retail-0004 (pre-compiled [here](https://github.com/luxonis/depthai-python-extras/blob/master/resources/nn/object_detection_4shave/face-detection-retail-0004.blob) on our Github, and [here](https://docs.openvinotoolkit.org/2020.1/_models_intel_face_detection_retail_0004_description_face_detection_retail_0004.html).

We'll cover converting OpenVINO models to run on DepthAI in a later article.  For now, you can find the models we've pre-converted [here](https://github.com/luxonis/depthai-python-extras/tree/master/resources/nn) and brief instructions on how to do so [here](https://github.com/luxonis/depthai-python-extras#conversion-of-existing-trained-models-into-intel-movidius-binary-format)

## Dependencies

This tutorial has the same dependencies as the [Hello World Tutorial](/tutorials/hello_world#dependencies) - that the DepthAI API has been installed and is accessible on the system.  See [here](https://docs.luxonis.com/api/) if you have not yet installed the API.
<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Using the RPi Compute Edition or a pre-flashed DepthAI Raspberry Pi µSD card? <strong>Skip this step.</strong><br/>
  <span class="small">All dependencies are installed and the repository is checked out to `~/Desktop/depthai-python-extras`.</span>
</div>

### Run face-detection-retail-04 model

The depthai.py file can be modified directly to you do your bidding, or you can simply pass arguments to it for which models you want to run.  

For simplicity we will do the latter, simply passing arguments so that DepthAI runs the `face-detection-retail-04` instead of the model run by default which is specified in `depthai-python-extras/consts/resource_paths.py` [here](https://github.com/luxonis/depthai-python-extras/blob/master/consts/resource_paths.py).

```
python3 test.py -co asdgagdfaef

```

Execute the script to see an annotated video stream of face detections:


You should see output annotated output similar to:

![model image](/images/tutorials/pretrained_model/previewout.png)

Substitute your face for mine, of course.

## Trying other models

The flow we walked through works for other pre-trained object detection models in our repository ([here](https://github.com/luxonis/depthai-python-extras/tree/master/resources/nn))

Simply change the paths above to run the other models there.
