Computer Vision
===============

.. toctree::
   :hidden:

   tutorials/creating-custom-nn-models.rst

Our platform supports computer vision (CV) functions to be performed on the device itself. While you can't run `OpenCV <https://github.com/opencv/opencv>`__,
you can use many of its supported functions. With DepthAI pipeline builder you can:

- **Crop, rotate, warp/dewarp, mirror, flip, transform perspective**, etc. with `ImageManip <https://docs.luxonis.com/projects/api/en/latest/components/nodes/image_manip/>`__ node
- **Detect edges** (Sobel filter) with `EdgeDetector <https://docs.luxonis.com/projects/api/en/latest/components/nodes/edge_detector/>`__ node
- **Detect and track features** with `FeatureTracker <https://docs.luxonis.com/projects/api/en/latest/components/nodes/feature_tracker/>`__ node
- **Track objects** (Kalman filter, Hungarian algorithm) with `ObjectTracker <https://docs.luxonis.com/projects/api/en/latest/components/nodes/object_tracker/>`__ node. Out-of-the-box support for Yolo and MobileNet object detectors.
- **Perceive stereo depth** (Census Tranform, Cost Matching and Aggregation) with `StereoDepth <https://docs.luxonis.com/projects/api/en/latest/components/nodes/stereo_depth/>`__ node

If you would like to use any **other CV functions**, see :ref:`Run your own CV functions on-device`
documentation on how to implement and run CV functions efficiently on the device's hardware-accelerated blocks.

.. image:: https://user-images.githubusercontent.com/18037362/153769346-f5aed759-d398-44f1-a397-3cb185b68f2e.gif

**Some other CV examples**:

- `Lossless zooming <https://github.com/luxonis/depthai-experiments/tree/master/gen2-lossless-zooming>`__
- `Host-side WLS depth filtering <https://github.com/luxonis/depthai-experiments/tree/master/gen2-wls-filter>`__
- `PointCloud visualization <https://github.com/luxonis/depthai-experiments/tree/master/gen2-rgbd-projection>`__

.. include::  /pages/includes/footer-short.rst
