# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import requests
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'DepthAI Docs'
copyright = '2020, Luxonis'
author = 'Luxonis'

# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    "sphinx_tabs.tabs",
    "sphinx.ext.intersphinx",
    "sphinx.ext.autosectionlabel",  # https://github.com/sphinx-doc/sphinx/issues/7697 wait for this and implement
    "sphinx_rtd_theme",
    "sphinxcontrib.spelling",
    "notfound.extension",
    "sphinx_design",
    "sphinx_copybutton",
]

# See https://github.com/sphinx-doc/sphinx/issues/7728
suppress_warnings = ['autosectionlabel.*']

spelling_word_list_filename = '../ci/spelling_wordlist.txt'

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'sphinx_rtd_theme'

html_theme_options = {
    "collapse_navigation" : False
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']
html_logo = "_static/images/logo.png"
html_favicon = '_static/images/favicon.png'
html_css_files = [
    'css/index.css',
    'css/navbar.css',
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
]
html_js_files = [
    'js/navbar.js',
    'js/fixIndexToctree.js',
]
html_title = 'DepthAI documentation | Luxonis'

intersphinx_mapping = {'python': ('https://docs.python.org/3', None)}

windows_installer_url = None
for demo_release in requests.get("https://api.github.com/repos/luxonis/depthai/releases").json():
    if not demo_release["draft"] and "sdk" not in demo_release["tag_name"]:
        windows_installer_url = next(map(lambda asset: asset["browser_download_url"], filter(lambda asset: ".exe" in asset["name"], demo_release["assets"])), None)
        if windows_installer_url is not None:
            break


variables_to_export = {
    "windows_installer_url": f"`Windows Installer <{windows_installer_url}>`__",
}
rst_epilog = '\n'.join(map(lambda x: f".. |{x}| replace:: {variables_to_export[x]}", variables_to_export))
