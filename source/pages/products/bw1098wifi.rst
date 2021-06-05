.. _bw1098wifi:

DepthAI LUX-D (OAK-D) with WiFi
###############################


.. image:: /_static/images/products/oak_d_wifi.jpg
  :alt: OAK-D-WiFI

The DepthAI LUX-D WiFi (BW1098OBC_WiFi) is a modified version of the OAK-D with an added WiFi module. This board allows users to quickly prototype standalone embedded 
solutions.

Besides the standard DepthAI capabilites, the LUX-D WiFi gives users access to a lightweight processor with useful features such as Bluetooth, Bluetooth 
Low Energy (BTLE), and WiFi, and comes in a convenient FCC/CE-certified module.

.. note::
  If you would like to find out more about **ESP32**, check the :ref:`ESP32 tutorial`.

.. note::
  All tutorials / example codes (:ref:`First steps with DepthAI`, `depthai-python code samples <https://docs.luxonis.comprojects/api/en/latest/tutorials/code_samples/>`__,
  `depthai-experiments <https://github.com/luxonis/depthai-experiments>`__) on this device as well.

Requirements
************
- PC to program ESP32.

What's in the box?
******************
- BW1098OBC_WiFi
- USB3C cable (6 in.)
- Power Supply

Setup
*****
Install the `Python API <https://docs.luxonis.com/projects/api/en/latest/install/>`__.

.. include::  /pages/includes/verify.rst

Using the ESP32/SPI Interface
*****************************
A number of examples that show how to communicate with the LUX-D WiFi over SPI can be found here:

https://github.com/luxonis/depthai-experiments/tree/master/gen2-spi

All of these examples consist of two parts: An application that runs on the LUX-D WiFi and an application that runs on the MyriadX using the gen2 Pipeline Builder. More information on how to set up both of these can be found in that github's README. 

.. include::  /pages/includes/footer-short.rst