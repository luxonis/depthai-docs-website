On-device Pointcloud NN model
=============================

At the time of writing, DepthAI firmware (2.15) doesn't support converting depth to pointcloud.
On the :ref:`On-device programming` page it's mentioned that Script node shouldn't be used for any kind
of heavy computing, so to convert depth to pointcloud, we would need to :ref:`create a custom NN model <Creating custom NN models>`.

`Kornia <https://kornia.github.io/>`__ library has a function called `depth_to_3d <https://kornia.readthedocs.io/en/latest/geometry.depth.html?highlight=depth_to_3d#kornia.geometry.depth.depth_to_3d>`__
which does exactly that; it returns pointcloud from depth map and camera matrix. A smart person
from our Discord community called **jjd9** created a `working demo <https://github.com/jjd9/depthai-experiments/tree/kornia-depth-deprojection/gen2-kornia-depth-deprojection>`__
of the depth_to_3d logic running on the OAK camera.

.. image:: /_static/images/tutorials/custom_model/jjd9.png

Depth to NN model
#################

`StereoDepth <https://docs.luxonis.com/projects/api/en/latest/components/nodes/stereo_depth/>`__'s :code:`depth` output is
U16 (Unsigned INT 16) datatype. Myriad X only supports FP16 datatype, but with OpenVINO's `Compile Tool <https://docs.openvino.ai/2022.1/openvino_inference_engine_tools_compile_tool_README.html>`__
you can add conversion layer at the input with :code:`-ip` or :code:`-iop` arguments. These arguments only support **FP16** (so no
conversion) or **U8** (adds U8 -> FP16 layer before the input).

Current workaround is to set conversion for U8 -> FP16 (:code:`-ip U8`). This means the frame will be twice as wide, as
each depth pixel will be represented by two (U8) integers. So instead of 640x400 depth frame, the model expects 1280x400 frame.

.. code:: python

    # convert the uint8 representation of the image to uint16 (this is needed because the
    # converter only allows U8 and FP16 input types)
    depth = 256.0 * image[:,:,:,1::2] + image[:,:,:,::2]

The code above was added to the model definition. It takes two FP16 numbers and reconstructs the original depth value,
so the :code:`depth` tensor has shape 640x400 and is FP16 datatype. This logic can also be seen in the model architecture:

.. image:: /_static/images/tutorials/custom_model/reconstruction.png

Optimizing the Pointcloud model
###############################

A few improvements could be made, as:

- The camera matrix is hard-coded into the NN model. This means users would have to create their own NN models, which adds unnecesary package dependencies (pytorch, onnx, onnxsim, blobconverter).
- It's fairly slow - pointcloud calculation (without visualization) runs at ~19FPS for 640x400 depth frames.

Since the camera matrix (intrinsics) is static, the part below in red could be calculated once instead of being calculated
every single depth frame. This should reduce the complexity of the model and improve FPS.

.. image:: /_static/images/tutorials/custom_model/graph.png

Since Kornia library is open source, we can start with the architecture of the **depth_to_3d** function (`code here <https://github.com/kornia/kornia/blob/15fb1aebd8f9e16af61efb130efb004f7a7b7e20/kornia/geometry/depth.py#L24>`__)
and remove the unnecessary part of the model. After moving all the logic to the same function, we end with `this code <https://gist.github.com/Erol444/0a9f4ae505ef9208edb144e0237f1050>`__.

We can remove the part of the model that calculates :code:`xyz` vector and calculate it once on the host, then send it to the
model and reuse it for every inference. I have also converted the code so it uses **numpy functions** instead of pytorch ones,
to avoid pytorch dependency:

.. code-block:: python

    def create_xyz(width, height, camera_matrix):
        xs = np.linspace(0, width - 1, width, dtype=np.float32)
        ys = np.linspace(0, height - 1, height, dtype=np.float32)

        # generate grid by stacking coordinates
        base_grid = np.stack(np.meshgrid(xs, ys)) # WxHx2
        points_2d = base_grid.transpose(1, 2, 0) # 1xHxWx2

        # unpack coordinates
        u_coord: np.array = points_2d[..., 0]
        v_coord: np.array = points_2d[..., 1]

        # unpack intrinsics
        fx: np.array = camera_matrix[0, 0]
        fy: np.array = camera_matrix[1, 1]
        cx: np.array = camera_matrix[0, 2]
        cy: np.array = camera_matrix[1, 2]

        # projective
        x_coord: np.array = (u_coord - cx) / fx
        y_coord: np.array = (v_coord - cy) / fy

        xyz = np.stack([x_coord, y_coord], axis=-1)
        return np.pad(xyz, ((0,0),(0,0),(0,1)), "constant", constant_values=1.0)

Moving this logic to the host side has significantly reduced the model's complexity, as seen below.

.. image:: /_static/images/tutorials/custom_model/new_graph.png

On-device Pointcloud demo
#########################

Altering the model has improved the performance of it, but not as much as I would have expected. The demo now runs at about
24FPS (previously 19FPS) for the 640x400 depth frames.

This **demo can be found at** `depthai-experiments <https://github.com/luxonis/depthai-experiments/tree/master/gen2-pointcloud/device-pointcloud>`__.

.. image:: https://user-images.githubusercontent.com/18037362/158055419-5c80d524-3478-49e0-b7b8-099b07dd57fa.png

On the host side we only downsample (for faster visualization). For "cleaner" pointcloud we could also remove statistical
outliers, but that's outside the scope of this tutorial.

.. include::  /pages/includes/footer-short.rst
