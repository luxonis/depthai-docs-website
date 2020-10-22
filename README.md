# Luxonis DepthAI Docs Website

## How to contribute

The DepthAI docs are designed to be easily updated. See an issue? Follow these steps:

* While on a https://docs.luxonis.com page with an issue, scroll down to the footer.
* Click the "Edit on GitHub" link. This takes you the page source.
* For simple changes (like a typo), _anyone_ can edit the page directly on GitHub and submit a PR. Repository contributors with write access can also commit changes directly to `master`. However, use caution: `master` is auto-deployed on changes so limit direct commits to minor changes and use PRs for more significant updates.
* For complex changes (like adding a new page to the site), follow the "Local Development" steps below.

## Local Development

The site is powered by [Jekyll](https://jekyllrb.com/).

### Setup

Install ruby:
`sudo apt-get install ruby-full`

Run `bundle install` to install Ruby gem dependencies.

### Dependencies

Ruby v2.6.2 or 2.7.0.
Tested on Ubuntu 18.04 and 20.04.

### Running the local web server

Start via `foreman start`. By default, the server runs at http://127.0.0.1:4000.

### Deploying

`git push` the `master` branch to deploy via [Netlify](https://www.netlify.com/).
