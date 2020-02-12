We'll execute a DepthAI example Python script to ensure your setup is configured correctly. Follow these steps to test DepthAI:

1. Start a terminal session.
2. Access your local copy of of the `depthai-python-extras` from step 4.
    ```
    cd [depthai-python-extras repo from step 4]
    ```
3. Run `python3 examples/test.py`.<br/>
    The script launches a window, starts the cameras, and displays a video stream annotated with object localization metadata:

    {: style="max-width:50%"}
    ![object localization demo](/images/object_localization.png)

    In the screenshot above, DepthAI identified a tv monitor (1.286 m from the camera) and a chair (3.711 m from the camera). See [the list of object labels](https://github.com/luxonis/depthai-python-extras/blob/master/resources/nn/object_detection_4shave/labels_for_mobilenet_ssd.txt) on GitHub.
