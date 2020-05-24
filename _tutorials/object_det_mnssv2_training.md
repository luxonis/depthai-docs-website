---
layout: default
title: Tutorial - Custom Object Detector Training
toc_title: Custom Object Detector Training
description: Learn how to detect objects of your choice in real time with DepthAI!
order: 5
---

# {{ page.title }}


Need to use DepthAI to detect objects which **aren't already available in the [OpenVINO Model Zoo](https://docs.luxonis.com/tutorials/openvino_model_zoo_pretrained_model/)** or for which there **isn't** already a **model online**?

Well, you're in luck:

In this tutorial you will learn how to train a **custom object detector** for use on **DepthAI** for real-time spatialAI - where these objects are in physical space (x, y, and z, in meters), and what they are (e.g. 'Apple').  

At the end of this tutorial **you** will have trained this same model and have it running on DepthAI:

[![Alt text](https://img.youtube.com/vi/0ToLVHW9oVw/0.jpg)](https://www.youtube.com/watch?v=0ToLVHW9oVw)

This tutorial trains MobileNet SSD v2, which is a popular object detector based on the [SSD: Single Shot MultiBox Detector](https://towardsdatascience.com/review-ssd-single-shot-detector-object-detection-851a94607d11), implemented with a [MobileNetv2 backbone](https://ai.googleblog.com/2018/04/mobilenetv2-next-generation-of-on.html) from Google.

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

To train the network, you want to set aside some of the ground-truth images that can be used to evaluate the performance of the trainging run.  That is to say, you don't want to use all of your dataset for training, as then you won't be able to effectively assess how training is running - as testing the network on the images it was trained on will not give you a realistic view of how the network will perform in the real world.

To do so:
1. Randomly select approximately 20% of your images and place them in a `test` folder together with the corresponding `.xml.` annotation files. If your dataset is small, select only 5-10% of images for the `test` folder.
2. Place the remaining images in a `train` folder together with their annotations.
3. Select a few extra images with no annotations to be used as an evaluation after the training is complete and place them in a `final_test_folder`
4. Upload the three folders to your google drive

### Step 4: Train a Network on Your Custom Data

With your dataset prepared and labeled, use this Google Colab network to perform the training:
([![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/luxonis/depthai-ml-training/blob/master/colab-notebooks/Easy_Object_Detection_With_Custom_Data_Demo_Training.ipynb))
The notebook will also help you convert the Tensorflow trained model to a blob file that will run on the DepthAI modules.
Download the blob file to use it in the next step.

### Step 5: Run your model in DepthAI

Now we use the model trained at step 4, in its .blob format, to run it on DepthAI.
In your DepthAI folder, go to the `resources/nn directory`. There you will see a folder called `mobilenet-ssd`. Since your model is also a mobilenet ssd, make a copy of that folder and rename it as you see fit for your model. If you trained a model for dog breeds, you could call it dog_detective.
Enter the folder and delete the mobilenet-ssd.blob. Paste here your own blob from above and give it the same name as the folder, i.e. 'dog_detective.blob'. Also rename the .json files to match the folder and blob name, i.e. 'dog_detective.json' and 'dog_detective_depth.json'.

In both the .json files you will see a category called labels. Those are the default mobilenet-ssd labels trained on Pascal '07 dataset. 
Modify the labels according to the labels for your trained model. So if you had 4 dog breeds in the dog_detective, write those 4 breeds in the order you have them in your training data labels. Of course, remove all the unnecessary labels, except for "background". This label must remain and always on top. You should end up with "background" + your labels, i.e. 5 labels in total for the dog_detective.
If the model consistently predicts a poodle as a husky for example, it most likely means your labels are not in the correct order. Don't worry, just change the order of the labels to match the detections.

Remember, you have to change the labels in both .json files. 

You are ready to run your very own trained model on DepthAI. 
Open a terminal in your DepthAI directory and run:

`python3 test.py -cnn <your folder name>` i.e. 
`python3 test.py -cnn dog_detective`

If you wish to disable the spatial measurements associated with the detected objects, run the comand with the '-dd' (disable depth) flag.

`python3 test.py -dd -cnn <your folder name>`

Enjoy!

For questions/comments please [contact us](https://docs.luxonis.com/support/)!


### Step 4.5: Alternative way to obtain the .blob

Once you have an Intermediate Representation of your model from the colab notebook( the .xml and .bin files), you can also use OpenVINO on your local computer to convert this model and run it on DepthAI (insted of using the server in the notebook).

See [here](https://github.com/luxonis/depthai#conversion-of-existing-trained-models-into-intel-movidius-binary-format) for instructions.

<div class="alert alert-primary" role="alert">
<i class="material-icons">
error
</i>
  Using the RPi Compute Edition or a pre-flashed DepthAI Raspberry Pi µSD card? <strong>OpenVINO is pre-installed.</strong><br/>
  <span class="small">So you can convert the model with this pre-installed OpenVINO instance.</span>
</div>
 

