Support
=======

Running into issues or have questions? We're here to help. **Before requesting support, please check** :ref:`Troubleshooting documentation page <Troubleshooting>`.
To help you debug the issue you have the fastest and most efficient way, please provide all the details of the issue you are experiencing.


Requesting support
##################

To **request support from our engineers**, please **open an issue on** our `DepthAI Github repository <https://github.com/luxonis/depthai/issues>`__.
You can get support by:

- Creating a post on `our Forum <https://discuss.luxonis.com/>`__
- Joining our `Discord Community <https://luxonis.com/discord>`__ for live assistance from us and engineers like you

.. dropdown:: DepthAI issue - pipeline issues

  If you are experiencing depthai pipeline issues (freezing, crashing, etc.), please provide a Minimal Reproducible Example (**MRE**)
  docs on `how to create MRE here <https://stackoverflow.com/help/minimal-reproducible-example>`__.
  This means everything, including **minimal script, required model .blobs, and any other assets**, should be compressed into single archive.
  Make sure that:

  #. Assets/model blobs are located at the right path.
  #. Remove any unnecessary code: commented out code, and code that isn't relevant to the depthai/pipeline code (so host-side code).
  #. Please provide **minimal reproducible code**. Main script should be as short as possible.

  Besides MRE, please also provide the following information when you are requesting support:

  * Name of the OAK camera (`all camera names here <https://docs.luxonis.com/projects/hardware/en/latest/>`__).
  * The **version** of the **depthai library** and **bootloader** you are using (check with `OAK Device Manager <https://docs.luxonis.com/projects/api/en/latest/components/bootloader/#device-manager>`__). If it's not `the latest release <https://github.com/luxonis/depthai-core/releases>`__, please also try updating the depthai version to the latest (``python -mpip install depthai -U``).
  * If there was a crash, provide debug log by `setting depthai log level <https://docs.luxonis.com/projects/api/en/latest/tutorials/debugging/#depthai-debugging-level>`__ to ``debug``.
  * Screenshot of your pipeline using the `Pipeline Graph tool <https://github.com/geaxgx/depthai_pipeline_graph>`__.

  **IP related issues**

  If you are having an issue with an app that contains your (company's) **Intellectual Property**, eg. NN model or business logic, you should first
  remove this IP before creating MRE:

  - For **NN model**, replace your model with a public model. So if you trained an object detection NN, replace it with eg. public pretrained Mobilenet-SSD.
  - For **business logic**, simply remove the code. MRE shouldn't contain much host-side code where your business logic would be.


.. dropdown:: Hardware (OAK) issue

  Provide detailed description of the problem, describe the device behavior, how and when it fails. When contacting support, please include the following information:

  * Device model, and batch number (from the barcode label). If you don't have the box, provide order number
  * Photos of the whole hardware setup, close captures of region of an issue
  * Board revision (if SoM based, also HW revision of SoM)

  `Example barcode label with marked batch number:`

  .. image:: /_static/images/barcode.png
    :alt: Barcode label
    :align: center


.. dropdown:: Image Quality issues

  If you are experiencing image quality issues (blurry, noisy, etc.), please first check `Improving Image Quality <https://docs.luxonis.com/projects/api/en/latest/tutorials/image_quality/>`__ docs.
  For reporting an issue, please provide detailed description of the problem, how and when the device fails. Please include the following information:

  * Device model, and batch number (from the barcode label). If you don't have the box, please let us know your order number and when did you purchase the device.
  * Image captures (high resolution), please add remarks to the images if needed


.. dropdown:: Calibration issues

  If you encountered an issue while `calibrating an OAK <https://docs.luxonis.com/projects/hardware/en/latest/pages/guides/calibration.html>`__,
  please provide a detailed description of the problem. When contacting support, please include the following information:

  * Device model
  * OS name
  * DepthAI branch used
  * Full command used for calibration
  * Dataset folder
  * `Json file from calibration <https://github.com/luxonis/depthai-python/blob/main/examples/calibration/calibration_dump.py>`__
  * Image outputs


.. dropdown:: Converting the NN issues

  We officially support models for which we have notebooks at `depthai-ml-training <https://github.com/luxonis/depthai-ml-training/tree/master/colab-notebooks>`__.
  If you encounter any error during converting blob via `tools.luxonis.com <https://tools.luxonis.com>`__ or `blobconverter <https://blobconverter.luxonis.com>`__,
  please provide the following information:

  * Screenshot of your setup, including error message
  * .pt file used
  * Training procedure - notebook/repo/library name, version, commit
  * Exact input parameters
  * Current output, expected output, and input images for testing

  For support, we suggest creating an Issue on `depthai-ml-training <https://github.com/luxonis/depthai-ml-training/tree/master/colab-notebooks>`__ repository.

  `Example screenshot:`

  .. image:: /_static/images/tools_error.png
    :alt: Blobconverter error screenshot
    :align: center

Refunds and returns policy
##########################

At Luxonis, we are customer-focused. Our success is only possible if our customers believe in the value of our products. If for any reason you are not satisfied with your purchase, please let us know and we will make it right.

If you desire a refund, please contact support@luxonis.com with your order number and reason for the return. Refund requests within 60 days of the purchase date will be honored in full.

Shipping costs for returns within 60 days of purchase will be covered by Luxonis. Shipping costs for returns after 60 days from the purchase date will be born by the customer.

If a return is initiated because of damaged, defective, or incorrect goods, Luxonis will provide a replacement order at no cost to the customer.

Refunds will be processed within 14 days after the product has been returned.

.. include::  /pages/includes/footer-long.rst
