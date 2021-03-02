Verify installation
*******************

We'll execute a DepthAI example Python script to ensure your setup is configured correctly. Follow these steps to test DepthAI:

#. Start a terminal session.
#. Clone the depthai example repository.

  .. code-block:: bash

    git clone https://github.com/luxonis/depthai.git

#. Access your local copy of `depthai <https://github.com/luxonis/depthai>`__.

  .. code-block:: bash

    cd [depthai repo]

#. Install the example repository requirements.

  .. code-block:: bash

    python -m pip install -r requirements.txt

#. Run demo script.

  .. code-block:: bash

    python3 depthai_demo.py

  The script launches a window, starts the cameras, and displays a video stream
  annotated with object localization metadata:

  .. image:: /_static/images/products/bw1097-detection.png
    :alt: Depth projection

  In the screenshot above, DepthAI identified a TV monitor (1.286 m from the camera) and a chair (3.711 m from the camera).

  See `the list of object labels <https://docs.luxonis.com/tutorials/openvino_model_zoo_pretrained_model/#run-depthai-default-model>`__ in our pre-trained OpenVINO model tutorial.
