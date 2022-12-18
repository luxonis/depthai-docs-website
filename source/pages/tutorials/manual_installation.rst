Manual DepthAI installation
###########################

In :ref:`First steps with DepthAI` we used installer (either Windows installer, or bash script installer) to install depthai dependencies,
download the ``depthai`` repository from Github, install its requirements and run the DepthAI demo script. You can also manually perform all these steps,
as described below.

Install DepthAI dependencies
****************************

Please refer to `documentation here <https://docs.luxonis.com/projects/api/en/latest/install/>`__ to install depthai dependencies.

Download demo script
********************

DepthAI demo is located in `depthai repository <https://github.com/luxonis/depthai>`__ on :octicon:`mark-github;1em` Github.

.. tabs::

  .. tab:: Clone the repository with git

      `Git <https://en.wikipedia.org/wiki/Git>`__ can be used to download (clone) the code, and later easily update it to get all the newest features.
      Open the terminal session and go to a directory of preference, where you'd like to download DepthAI demo script.
      Then, run the following command to download the demo script:

      .. code-block:: bash

        $ git clone https://github.com/luxonis/depthai.git
        $ cd depthai

  .. tab:: Download repository zip

      First, download a depthai repository from Github - `shortcut here <https://github.com/luxonis/depthai/archive/refs/heads/main.zip>`__.
      You can then unpack the archive file to a directory of preference.

.. dropdown:: (Optional) Create python virtualenv

    To create and use the virtualenv, you can follow an `official python guide to virtualenvs <https://docs.python.org/3/tutorial/venv.html>`__ or
    follow os-specific guides on the web, like `"How to Create Python 3 Virtual Environment on Ubuntu 20.04" <https://linoxide.com/how-to-create-python-virtual-environment-on-ubuntu-20-04/>`__

    This will make sure that you are using a fresh environment and that Python 3 is the default interpreter - this can help to prevent potential issues.

    I usually create and use virtualenvs by running

    .. code-block:: bash

    $ python3 -m venv myvenv
    $ source myvenv/bin/activate
    $ pip install -U pip

    And this may require installing these packages prior

    .. code-block:: bash

    $ apt-get install python3-pip python3-venv


Install requirements
********************

Once the demo source code is downloaded and you have your **terminal opened in the depthai folder**, you can
install all additional packages that the DepthAI demo requires (together with the `depthai API Python library <https://pypi.org/project/depthai/>`__):


.. code-block:: bash

  depthai $ python3 install_requirements.py

Afterwards, you can continue with the :ref:`Default run` of the DepthAI demo.