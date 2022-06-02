Deploying Custom Models
=======================

This tutorial will go through the process of deploying a custom trained (or pretrained) model to the OAK camera.
As mentioned in  details in :ref:`Converting model to MyriadX blob` tutorial, you first need to convert the model to
OpenVINO's IR format (.xml/.bin) and then compile it to .blob in order to then deploy it to the OAK camera.

1. Face mask recognition model
------------------------------

For our first tutorial we will deploy the `SBD_Mask classification <https://github.com/sbdcv/sbd_mask>`__ model, as it
already has pretrained .onnx model in the `/models folder <https://github.com/sbdcv/sbd_mask/tree/41c6730e6837f63c1285a0fb46f4a2143e02b7d2/model>`__.

From the examples in the repo you can see that they are using CenterFace face detection model, and then SBD_Mask
classification model to recognize whether the person (more specifically the face image) is wearing a mask.

Converting to .blob
^^^^^^^^^^^^^^^^^^^

Since the `.onnx model <https://github.com/sbdcv/sbd_mask/blob/41c6730e6837f63c1285a0fb46f4a2143e02b7d2/model/sbd_mask.onnx>`__
is already provided, we don't need to export the trained model (to eg. frozen TF model). After downloading the model,
we can use `blobconverter.luxonis.com <blobconverter.luxonis.com>`__ to convert it to ``.blob``. I will be using the latest
version of OpenVINO (2021.4 as of time of writing), and I can select ONNX Model as the source. After clicking ``Continue``
button, we can drag&drop the .onnx file to the ``Browse...`` button.

.. image:: /_static/images/tutorials/deploying-custom-model/sbd-blobconverter.png

Before we click ``Convert``, we should double check the default values for Model Optimizer and Compile params.

Model optimizer parameters
""""""""""""""""""""""""""

Model optimizer converts other model formats to OpenVINO's IR format, which produces .xml/.bin files. This format of
the model can be deployed accross multiple Intel's devices, CPU, GPU, iGPU, **VPU** (which we are interested in), and FPGA.

**--data_type=FP16** will convert the model to FP16 data type. Since VPU on the OAK cameras only supports FP16,
we will want this enabled (and is there by default). More `information here <https://docs.openvino.ai/2022.1/openvino_docs_MO_DG_FP16_Compression.html#doxid-openvino-docs-m-o-d-g-f-p16-compression>`__.

**Mean** and **Scale** will normalize the input image to the model; ``new_value = (byte - mean) / scale``.
Color/Mono cameras on OAK camera will output frames in U8 data type (``0..255``). Models are usually trained with
normalized frames ``-1..1`` or ``0..1``, so we need to normalize our OAK frames as well. Common options:

- If the model requires ``-1..1`` values, mean=127.5 and scale=255 (``(0..255 - 127.5) / 255 = -1..1``)
- If the model requires ``0..1`` values, mean=0 and scale=255 (``(0..255 - 127.5) / 255 = -1..1``)

We could either read the repository to find out the required input values,
or `read the code <https://github.com/sbdcv/sbd_mask/blob/41c6730e6837f63c1285a0fb46f4a2143e02b7d2/deploy.py#L10-L19>`__:

.. code-block:: python

    def classify(img_arr=None, thresh=0.5):
        blob = cv2.dnn.blobFromImage(img_arr, scalefactor=1 / 255, size=(csize, csize), mean=(0, 0, 0),
                                    swapRB=True, crop=False)
        net.setInput(blob)

        heatmap = net.forward(['349'])
        match = m_func.log_softmax(torch.from_numpy(heatmap[0][0]), dim=0).data.numpy()
        index = np.argmax(match)

        return (0 if index > thresh else 1, match[0])

These few lines actually contain both logic for decoding (which we will use later) AND contain info about the required
input values - ``scalefactor=1 / 255`` and ``mean=(0, 0, 0)``, so the pretrained model expects ``0..1`` input values.

For Model Optimizer we will use the following arguments:

.. code-block::
    --data_type=FP16 --mean_values=[0,0,0] --scale_values=[255,255,255]

Myriad X compile parameters
"""""""""""""""""""""""""""

After converting model to OpenVINO's IR format (.bin/.xml), we need to use `Compile Tool <https://docs.openvino.ai/2021.4/openvino_inference_engine_tools_compile_tool_README.html>`__
to compile the model to ``.blob``, so it can be deployed to the camera.

Here you can select input layer precision (``-ip``) and number of shave cores used to run the model (using the slider).

**Input layer precision**: Myriad X only supports FP16 precision, so ``-ip U8`` will add conversion layer U8->FP16
on all input layers of the model - which is what we want, so we will use this default argument.

**Shaves**: Myriad X in total has 16 SHAVE cores, which are like mini GPU units. Compiling with more cores can make
the model perform faster, but the proportion of shave cores isn't linear with performance. Firmware will warn you
about possibly optimal number of shave cores, which is ``available_cores/2``, as by default, each model will run on
2 threads. I will use 6 shaves, as that's the optimal number of cores for simple pipelines (which we will create).

Compiling the model
"""""""""""""""""""

Now that we have set arguments to the blobconverter, we can click ``Convert``. This will upload the .onnx model
to blobconverter server, run Model optimizer and Compile tool, and it the blobconverter app will prompt us to save
the ``.blob`` file.

.. figure:: /_static/images/tutorials/deploying-custom-model/sbd-blobconverter-final.png

    Arguments to convert/compile the SBD Mask classification model

Deploying the model
^^^^^^^^^^^^^^^^^^^

Now that we have .blob, we can start designing depthai pipeline. This will be a standard 2-stage pipeline:

#. Run 1st NN model; object detection model (face detection in our case)
#. Crop the high-resolution image to only get the image of the object (face)
#. Use cropped image to run the 2nd NN model; image recognition (**SBD Mask classification** model)

We already have quite a few 2-stage pipeline demos:

- `Age-gender recognition demo <https://github.com/luxonis/depthai-experiments/tree/769029ea4e215d03f741bcf085d1bb6c94009856/gen2-age-gender>`__ - First detect faces, then run age-gender recognition model
- `Emotion recognition demo <https://github.com/luxonis/depthai-experiments/tree/769029ea4e215d03f741bcf085d1bb6c94009856/gen2-emotion-recognition>`__ - First detect faces, then run emotion recognition model
- `Face recognition demo <https://github.com/luxonis/depthai-experiments/tree/769029ea4e215d03f741bcf085d1bb6c94009856/gen2-face-recognition>`__ - First detect faces, then run face recognition model (it also runs head pose estimation in between, `documented here <https://github.com/luxonis/depthai-experiments/tree/769029ea4e215d03f741bcf085d1bb6c94009856/gen2-face-recognition#how-it-works>`__)
- `Person re-identification demo <https://github.com/luxonis/depthai-experiments/tree/769029ea4e215d03f741bcf085d1bb6c94009856/gen2-pedestrian-reidentification>`__ - First detect people, then run person re-id model

We will start with the age-gender recognition demo and simply replace the recognition model, so instead of running
age-gender model, we will run the SBD mask model.

Face detection
""""""""""""""

The age-gender demo uses `face-detection-retail-0004 <https://docs.openvino.ai/2021.4/omz_models_model_face_detection_retail_0004.html>`__
model, which is great in terms of accuracy/performance. So we will leave this part of the code (`lines 0-64 <https://github.com/luxonis/depthai-experiments/blob/769029ea4e215d03f741bcf085d1bb6c94009856/gen2-age-gender/main.py#L1-L64>`__)

Input shape
"""""""""""

Age-gender uses `age-gender-recognition-retail-0013 <https://docs.openvino.ai/latest/omz_models_model_age_gender_recognition_retail_0013.html>`__
recognition model, which requires 62x62 frames. Our SBD-Mask model requires 224x224 as the input frame. You can see
this when opening .xml/.onnx with the `Netron app <https://netron.app/>`__.

.. figure:: /_static/images/tutorials/deploying-custom-model/sbd-mask-netron.png

    Input shape expected by the SBD Mask model

``recognition_manip`` ImageManip node is responsible for cropping high-resolution frame to frames of faces at
the required shape. We will need to change 62x62 to 224x224 shape in Script node (`line 116 <https://github.com/luxonis/depthai-experiments/blob/769029ea4e215d03f741bcf085d1bb6c94009856/gen2-age-gender/main.py#L116>`__)
and as the ImageManip initial configuration (`line 124 <https://github.com/luxonis/depthai-experiments/blob/769029ea4e215d03f741bcf085d1bb6c94009856/gen2-age-gender/main.py#L124>`__).

.. code-block:: diff

        # Inside Script node
                for i, det in enumerate(face_dets.detections):
                    cfg = ImageManipConfig()
                    correct_bb(det)
                    cfg.setCropRect(det.xmin, det.ymin, det.xmax, det.ymax)
                    # node.warn(f"Sending {i + 1}. det. Seq {seq}. Det {det.xmin}, {det.ymin}, {det.xmax}, {det.ymax}")
    -               cfg.setResize(62, 62)
    +               cfg.setResize(224, 224)
                    cfg.setKeepAspectRatio(False)
                    node.io['manip_cfg'].send(cfg)
                    node.io['manip_img'].send(img)
        """)
        cam.preview.link(image_manip_script.inputs['preview'])

        recognition_manip = pipeline.create(dai.node.ImageManip)
    -   recognition_manip.initialConfig.setResize(62, 62)
    +   recognition_manip.initialConfig.setResize(224, 224)
        recognition_manip.setWaitForConfigInput(True)
        image_manip_script.outputs['manip_cfg'].link(recognition_manip.inputConfig)
        image_manip_script.outputs['manip_img'].link(recognition_manip.inputImage)

The pipeline will now send 224x224 cropped frames of all detected faces to the recognition NN.

Change the model
""""""""""""""""

Now that ``recognition_nn`` will get 224x224 frames, we have to change the recognition model to the SBD-Mask
model (`line 132 <https://github.com/luxonis/depthai-experiments/blob/769029ea4e215d03f741bcf085d1bb6c94009856/gen2-age-gender/main.py#L132>`__).
I have placed my ``sbd_mask.blob`` in the same folder as the main.py script.

.. code-block:: diff

        # Second stange recognition NN
        print("Creating recognition Neural Network...")
        recognition_nn = pipeline.create(dai.node.NeuralNetwork)
    -   recognition_nn.setBlobPath(blobconverter.from_zoo(name="age-gender-recognition-retail-0013", shaves=6))
    +   recognition_nn.setBlobPath("sbd_mask.blob") # Path to the .blob
        recognition_manip.out.link(recognition_nn.input)

Change decoding
"""""""""""""""

The pipeline will stream SBD-Mask recognition results to the host. ``MultiMsgSync.py`` script will sync
these recognition results with high-resolution color frames and object detection results (to display the
bounding box around faces).

As :ref:`mentioned above <Model optimizer parameters>`, SBD-Mask repository contained decoding logic as well, so
we can just use that. First we need to run ``log_softmax`` function and then ``np.argmax``. I will be using
`scipy's log_softmax <https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.log_softmax.html>`__
function for simplicity. So we need to import ``from scipy.special import log_softmax`` in the script.

.. code-block:: diff

        bbox = frame_norm(frame, (detection.xmin, detection.ymin, detection.xmax, detection.ymax))

        # Decoding of recognition results
    -   rec = recognitions[i]
    -   age = int(float(np.squeeze(np.array(rec.getLayerFp16('age_conv3')))) * 100)
    -   gender = np.squeeze(np.array(rec.getLayerFp16('prob')))
    -   gender_str = "female" if gender[0] > gender[1] else "male"

    +   rec = recognitions[i].getFirstLayerFp16() # Get NN results. Model only has 1 output layer
    +   index = np.argmax(log_softmax(rec))
    +   # Now that we have the classification result we can show it to the user
    +   text = "No Mask"
    +   color = (0,0,255) # Red
    +   if index == 1:
    +       text = "Mask"
    +       color = (0,255,0)


        cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), (10, 245, 10), 2)
        y = (bbox[1] + bbox[3]) // 2

Visualizing results
"""""""""""""""""""

From the decoding step we got the text ("Mask"/"No Mask") which we want to display to the user and color (green/red)
which we will use to color the rectangle around the detected face.

.. code-block:: diff

        text = "No Mask"
        color = (0,0,255) # Red
        if index == 1:
            text = "Mask"
            color = (0,255,0)

    -   cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), (10, 245, 10), 2)
    +   cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), color, 3) # Colorize bounding box and make it thicker
        y = (bbox[1] + bbox[3]) // 2
    -   cv2.putText(frame, str(age), (bbox[0], y), cv2.FONT_HERSHEY_TRIPLEX, 1.5, (0, 0, 0), 8)
    -   cv2.putText(frame, str(age), (bbox[0], y), cv2.FONT_HERSHEY_TRIPLEX, 1.5, (255, 255, 255), 2)
    -   cv2.putText(frame, gender_str, (bbox[0], y + 30), cv2.FONT_HERSHEY_TRIPLEX, 1.5, (0, 0, 0), 8)
    -   cv2.putText(frame, gender_str, (bbox[0], y + 30), cv2.FONT_HERSHEY_TRIPLEX, 1.5, (255, 255, 255), 2)
    +   cv2.putText(frame, text, (bbox[0], y + 30), cv2.FONT_HERSHEY_TRIPLEX, 1.5, (0, 0, 0), 8) # Display Mask/No Mask text
    +   cv2.putText(frame, text, (bbox[0], y + 30), cv2.FONT_HERSHEY_TRIPLEX, 1.5, (255, 255, 255), 2)
        if stereo:
            # You could also get detection.spatialCoordinates.x and detection.spatialCoordinates.y coordinates
            coords = "Z: {:.2f} m".format(detection.spatialCoordinates.z/1000)
            cv2.putText(frame, coords, (bbox[0], y + 60), cv2.FONT_HERSHEY_TRIPLEX, 1, (0, 0, 0), 8)
            cv2.putText(frame, coords, (bbox[0], y + 60), cv2.FONT_HERSHEY_TRIPLEX, 1, (255, 255, 255), 2)

Changing color order
""""""""""""""""""""

I have noticed that end result wasn't very accurate. This can be a result of variety of things (model is just inaccurate,
model lost accuracy due to quantization (INT32->FP16), incorrect mean/scale values, etc.), but I like to first check color
order. ColorCamera node will output BGR color order by default (on ``preview`` output). Model's accuracy won't be best
if you send BGR frames to it and it was trained on RGB frames - which was the issue here.

You can change ``preview``'s color order by adding this line:

.. code-block:: diff

        print("Creating Color Camera...")
        cam = pipeline.create(dai.node.ColorCamera)
        cam.setPreviewSize(1080, 1080)
        cam.setResolution(dai.ColorCameraProperties.SensorResolution.THE_1080_P)
        cam.setInterleaved(False)
        cam.setBoardSocket(dai.CameraBoardSocket.RGB)
    +   cam.setColorOrder(dai.ColorCameraProperties.ColorOrder.RGB)


End result
^^^^^^^^^^

You can view all changes we have made on `Github here <https://github.com/luxonis/depthai-experiments/commit/b72261dbe96ff56f73333b099e6274bd22d1fea9>`__.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/Z61BTUCgGWU" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

You might have noticed that face detection isn't perfect when I have a mask on the face. That's probably because
the `face-detection-retail-0004 <https://docs.openvino.ai/2021.4/omz_models_model_face_detection_retail_0004.html>`__
model wasn't trained on images that had faces covered with masks. The lighting on my face also wasn't the best.
We might get better results if we used `ObjectTracker node <https://docs.luxonis.com/projects/api/en/latest/components/nodes/object_tracker/>`__
to track faces, but that's out of the scope of this tutorial.


