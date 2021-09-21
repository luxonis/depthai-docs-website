Run your own CV functions on-device
===================================

As mentioned in :ref:`On-device programming`, you can create **custom CV models** with your favorite NN library, convert & compile it into the
:code:`.blob` and run it on the device. This tutorial will cover how to do just that.

If you are interested in **training & deploying your own AI models**, refer to :ref:`Custom training`.

**Demos:**

- `Frame concatenation <https://github.com/luxonis/depthai-experiments/tree/master/gen2-custom-models/generate_model#concatenate-frames>`__ - using `PyTorch <https://pytorch.org/>`__
- `Laplacian edge detection <https://github.com/luxonis/depthai-experiments/tree/master/gen2-custom-models/generate_model#blur-frames>`__ - using :ref:`Kornia`
- `Frame blurring <https://github.com/luxonis/depthai-experiments/tree/master/gen2-custom-models/generate_model#corner-detection>`__ - using :ref:`Kornia`
- `Tutorial on running custom models on OAK <https://rahulrav.com/blog/depthai_camera.html>`__ by Rahul Ravikumar
- `Harris corner detection in PyTorch <https://github.com/kunaltyagi/pytorch_harris/>`__ by Kunal Tyagi


Create a custom model with PyTorch
**********************************

**TL;DR** if you are interested in implementation code, it's `here <https://github.com/luxonis/depthai-experiments/blob/master/gen2-custom-models/generate_model/pytorch_concat.py>`__.

#. **Create PyTorch NN module**

    We first need to create a Python class that extends PyTorch's `nn.Module <https://pytorch.org/docs/stable/generated/torch.nn.Module.html>`__.
    We can then put our NN logic into the :code:`forward` function of the created class.
    In the example of frame concatenation, we can use `torch.cat <https://pytorch.org/docs/master/generated/torch.cat.html#torch-cat>`__
    function to concatenate multiple frames:

    .. code-block:: python

        class CatImgs(nn.Module):
            def forward(self, img1, img2, img3):
                return torch.cat((img1, img2, img3), 3)

    For a more complex module, please refer to `Harris corner detection in PyTorch <https://github.com/kunaltyagi/pytorch_harris/>`__ demo by Kunal Tyagi.

#. **Export the NN module to onnx**

    Since PyTorch isn't directly supported by OpenVINO, we first need to export the model to `onnx format <https://onnx.ai/>`__ and then to OpenVINO.
    PyTorch has `integrated support for onnx <https://pytorch.org/docs/stable/onnx.html>`__, so exporting to onnx is as simple as:

    .. code-block:: python

        # For 300x300 frames
        X = torch.ones((1, 3, 300, 300), dtype=torch.float32)
        torch.onnx.export(
            CatImgs(),
            (X, X, X), # Dummy input for shape
            "path/to/model.onnx",
            opset_version=12,
            do_constant_folding=True,
        )

    This will export the concatenate model into onnx format. We can visualize the created model using `Netron app <https://netron.app/>`__:

    .. image:: /_static/images/tutorials/custom_model/concat_model.png

#. **Simplify onnx model**

    When exporting the model to onnx, PyTorch isn't very efficient. It creates tons unnecessary operations/layers which increases the size of your
    network (which can lead to lower FPS). That's why we recommend using `onnx-simplifier <https://github.com/daquexian/onnx-simplifier>`__,
    a simple python package that removes unnecessary operations/layers.

    .. code-block:: python

        import onnx
        from onnxsim import simplify

        onnx_model = onnx.load("path/to/model.onnx")
        model_simpified, check = simplify(onnx_model)
        onnx.save(model_simpified, "path/to/simplified/model.onnx")

    Here is an example of how significant was the simplification using the onnx-simplifier. On the left, there's a blur model (from Kornia) exported
    directly from PyTorch, and on the right, there’s a simplified network of **the same functionality**:

    .. image:: /_static/images/tutorials/custom_model/blur_comparison.png

#. **Convert to OpenVINO/blob**

    Now that we have (simplified) onnx model, we can convert it to OpenVINO and then to the :code:`.blob` format. For additional information about
    converting models, see :ref:`Converting model to MyriadX blob`.

    This would usually be done first by using `OpenVINO's model optimizer <https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_Deep_Learning_Model_Optimizer_DevGuide.html>`__
    to convert from onnx to IR format (.bin/.xml) and then using `Compile tool <https://docs.openvinotoolkit.org/latest/openvino_inference_engine_tools_compile_tool_README.html>`__
    to compile to :code:`.blob`. But we could also use blobconverter to convert from onnx directly to .blob.

    Blobconverter just does both of these steps at once - without the need of installing OpenVINO. You can compile your onnx model like this:

    .. code-block:: python

        import blobconverter

        blobconverter.from_onnx(
            model="/path/to/model.onnx",
            output_dir="/path/to/output/model.blob",
            data_type="FP16",
            shaves=6,
            use_cache=False,
            optimizer_params=[]
        )

#. **Use the .blob in your pipeline**

    You can now use your :code:`.blob` model with the `NeuralNetwork <https://docs.luxonis.com/projects/api/en/latest/components/nodes/neural_network/>`__ node.
    Check `depthai-experiments/custom-models <https://github.com/luxonis/depthai-experiments/tree/master/gen2-custom-models>`__ to run the demo applications
    that use these custom models.

Kornia
******

`Kornia <https://kornia.readthedocs.io/en/latest/>`__, "State-of-the-art and curated Computer Vision algorithms for AI.", has a **set
of common computer vision algorithms implemented in PyTorch**. This allows users to do something similar to:

.. code-block:: python

    import kornia

    class Model(nn.Module):
        def forward(self, image):
            return kornia.filters.gaussian_blur2d(image, (9, 9), (2.5, 2.5))

and use the exact same procedure as described in :ref:`Create a custom model with PyTorch` to achieve `frame blurring <https://github.com/luxonis/depthai-experiments/blob/master/gen2-custom-models/generate_model/kornia_blur.py>`__,
as shown below:

.. image:: /_static/images/tutorials/custom_model/blur.jpeg

.. note::
    during our testing, we have found that **several algorithms aren't supported** by either the OpenVINO framework or by the VPU. We have
    submitted an `Issue <https://github.com/openvinotoolkit/openvino/issues/7557>`__ for `Sobel filter <https://kornia.readthedocs.io/en/latest/filters.html?highlight=sobel#kornia.filters.Sobel>`__
    already.
