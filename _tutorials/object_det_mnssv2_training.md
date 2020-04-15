# How to train an Object Detector using Mobilenet SSD v2

If you want to get an idea about how this works before diving right in, run the following Colab Notebook that will train on images included in the repo cloned in the notebook:

https://drive.google.com/open?id=1SvTS8i3ea1Xj6DqpYZwSS5ibyvoyj5fi


To use your own images for training read below:

### Step 1: Find images of the objects

- you can take photos or download them from google images
- for the three fruit model trained as an example in this repo we have 240 training images. the number of images needed depends on the type and number of objects you wish to detect. for simple objects in simple scenes even a few tens suffice
- preferably they should have .jpg extension
- the images should be representative: the objects should be pictured at various angles and scales, in conditions/environment where you expect to perform detection
- the model is not great at detecting relatively small objects
- the Mobilenet SSDv2 model that you will train uses as input images of size `(300x300)` 
- the training images do not have to be that size, but should be fairly uniformly sized
- for best performance and speed resize all images to e.g. `(800x 600)` or `(600x600)`

If you need help resizing before annotating, you can use the notebook below to resize on your google drive:

https://drive.google.com/open?id=1t1voebiZ42Bu7_3IEIWdZEURw9o3J7Cq


### Step 2: Annotate the images
- to annotate the images use https://github.com/tzutalin/labelImg

*Tip: use shortcuts (`w`: draw box, `d`: next file, `a`: previous file, etc.) to accelerate the annotation.*


### Step 3: Organize the images for training
- randomly select approximately 20% of your images and place them in a `test` folder together with the corresponding `.xml.` annotation files
- place the remaining images in a `train` folder together with their annotations 
- select a few extra images with no annotations to be used as an evaluation after the training is complete and place them in a `final_test_folder`
- upload the three folders to your google drive

### Step 4: Open the Colab Notebook for Custom Data

Follow the instructions in the notebook:

https://drive.google.com/open?id=1p1KEb37RS3h5HvjxSzcByeCmWdhdYBOD

