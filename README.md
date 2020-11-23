# Luxonis DepthAI Docs Website

## How to contribute

The DepthAI docs are designed to be easily updated. See an issue? Follow these steps:

* While on a https://docs.luxonis.com page with an issue, scroll down to the footer.
* Click the "Edit on GitHub" link. This takes you the page source.
* For simple changes (like a typo), _anyone_ can edit the page directly on GitHub and submit a PR. Repository contributors with write access can also commit changes directly to `master`. However, use caution: `master` is auto-deployed on changes so limit direct commits to minor changes and use PRs for more significant updates.
* For complex changes (like adding a new page to the site), follow the "Local Development" steps below.

## Local Development

The site is powered by [Sphinx](https://github.com/sphinx-doc/sphinx).

### Setup

```
./install_dependencies.sh
```

### Dependencies

- CMake v3.18.2
- Sphinx v4

### Running the local web server

```
make html
cd build/html
python3 -m http.server
```

The server runs at http://127.0.0.1:8000.

### Deploying

`git push` the `master` branch to deploy via [ReadTheDocs](https://readthedocs.org/).

### Update redirects

To update redirects on the page, see `source/redirects.yml`.

Then, when everything is updated, please use 

```
rtd-redirects luxonis-docs-website ./source/redirects.yml --pro --username <username> --password <pass>
```

Username and password are the credentials you use to access the RTD website

**You need to have sufficient privileges on the RTD to change the redirects**