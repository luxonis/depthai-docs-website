---
layout: default
title: Tutorial - Object Detector Training with Mobilenet SSD v2
toc_title: Custom Object Detector Training Demo
description: Learn how to detect objects of your choice in real time!
order: 4
---

# {{ page.title }}

In this tutorial you will learn how to train a custom object detector for use on DepthAI.  An example which was quickly trained using this technique is shown below:

[![Alt text](https://img.youtube.com/vi/0ToLVHW9oVw/0.jpg)](https://www.youtube.com/watch?v=0ToLVHW9oVw)

### Step 0: Trial Run with Canned Data Set

To get an idea about how this works before diving right in, run the following Colab Notebook that will train on images included in the repo cloned in the notebook.

This will allow you to step through the whole flow, see training work and example inference, before attempting your own dataset.

[https://drive.google.com/open?id=1SvTS8i3ea1Xj6DqpYZwSS5ibyvoyj5fi](https://drive.google.com/open?id=1SvTS8i3ea1Xj6DqpYZwSS5ibyvoyj5fi)

To use your own images for training read below:

### Step 1: Find or Generate Images of the Objects of Interest

- you can take photos or download them from google images
- for the three fruit model trained as an example in this repo we have 240 training images. the number of images needed depends on the type and number of objects you wish to detect. for simple objects in simple scenes even a few tens suffice
- preferably they should have .jpg extension
- the images should be representative: the objects should be pictured at various angles and scales, in conditions/environment where you expect to perform detection
- the model is not great at detecting relatively small objects
- the Mobilenet SSDv2 model that you will train uses as input images of size `(300x300)` 
- the training images do not have to be that size, but should be fairly uniformly sized
- for best performance and speed resize all images to e.g. `(800x 600)` or `(600x600)`

If you need help resizing before annotating, you can use the notebook below to resize on your google drive:

[https://drive.google.com/open?id=1t1voebiZ42Bu7_3IEIWdZEURw9o3J7Cq](https://drive.google.com/open?id=1t1voebiZ42Bu7_3IEIWdZEURw9o3J7Cq)


### Step 2: Annotate the Images to Generate Ground Truth

In this step you will generate what is called 'ground truth data' by labeling the images.

- You can either label the images yourself using [labelImg](https://github.com/tzutalin/labelImg)
*Tip: use shortcuts (`w`: draw box, `d`: next file, `a`: previous file, etc.) to accelerate the annotation.*

- Or you can use an image labeling service like [basic.ai](https://www.basic.ai/)

We've done both.  For quick prototyping and initial training we just label ourselves, as you can label a couple hundred images in an hour or so once you get good with the tool.

Then as we refine and really want to dial-in a model, we use [basic.ai](https://www.basic.ai/) to get thousands of images labeled with ground truth.


### Step 3: Organize the Images for Training

To train the network, you want to set aside some of the ground-truth images that can be used to evaluate the performance of the trainging run.  That is to say, you don't want to use all of your dataset for training, as then you won't be able to effectively asses how training is running - as testing the network on the images it was trained on will not give you a realistic view of how the network will perform in the real world.

To do so:
1. Randomly select approximately 20% of your images and place them in a `test` folder together with the corresponding `.xml.` annotation files.
2. Place the remaining images in a `train` folder together with their annotations.
3. Select a few extra images with no annotations to be used as an evaluation after the training is complete and place them in a `final_test_folder`
4. Upload the three folders to your google drive

### Step 4: Train a Network on Your Custom Data

With your dataset prepared and labeled, use the following Google Colab network to perform the training.

[https://drive.google.com/open?id=1p1KEb37RS3h5HvjxSzcByeCmWdhdYBOD](https://drive.google.com/open?id=1p1KEb37RS3h5HvjxSzcByeCmWdhdYBOD)

