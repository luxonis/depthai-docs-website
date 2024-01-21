Manual DepthAI installation
###########################

In :ref:`First steps with DepthAI` we used installer (either Windows installer, or bash script installer) to install depthai dependencies,
download the ``depthai`` repository from Github, install its requirements and run the DepthAI Viewer. You can also manually perform all these steps,
as described below.

Install DepthAI dependencies
****************************

Please refer to `documentation here <https://docs.luxonis.com/projects/api/en/latest/install/>`__ to install depthai dependencies.

Install DepthAI Viewer
**********************

To install the DepthAI Viewer (visualization GUI for DepthAI), run:

.. code-block:: bash

  python3 -m pip install depthai-viewer

You can launch the DepthAI Viewer by running:

.. code-block:: bash

  depthai-viewer
  # Or
  python3 -m depthai_viewer

.. image:: /_static/images/tutorials/viewer_demo.png
  :alt: DepthAI Viewer demo

Install DepthAI library
***********************

DepthAI Viewer has it's own `depthai API library <https://github.com/luxonis/depthai-python>`__ bundled in venv, so user
doesn't have to install it separately.


If you wish to run depthai application (python script) separately (eg. `depthai code samples <https://docs.luxonis.com/projects/api/en/latest/tutorials/code_samples/>`__, or `depthai experiments <https://github.com/luxonis/depthai-experiments>`__, or your own depthai application),
you can install the depthai API library with pip:

.. code-block:: bash

  python3 -m pip install depthai

Or, if you prefer C++, you can follow `C++ API installation instructions <https://github.com/luxonis/depthai-core>`__.

