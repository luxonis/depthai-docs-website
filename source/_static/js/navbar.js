if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

function addNavbar() {
  var navbarHtml = "" +
    "  <div id=\"lux-global-navbar\" class=\"lux-navbar-container\">\n" +
    "    <div class=\"lux-navbar\">\n" +
    "      <ul>\n" +
    "        <li><a href=\"https://luxonis.com\">\n" +
    "          <img src=\"https://discuss.luxonis.com/assets/logo-fuhmgk6r.png\" alt=\"Luxonis\">\n" +
    "        </a></li>\n" +
    "        <li><a href=\"https://luxonis.com/depthai\">Solutions</a></li>\n" +
    "        <li><a href=\"https://luxonis.com/about\">About</a></li>\n" +
    "        <li><a href=\"https://discuss.luxonis.com/\">Discuss</a></li>\n" +
    "        <li><a href=\"https://luxonis.com/jobs\">Jobs</a></li>\n" +
    "        <li><a href=\"https://docs.luxonis.com/\" class=\"lux-navbar-active\">Docs</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div id=\"lux-doc-navbar\" class=\"lux-navbar-container\">\n" +
    "    <div class=\"lux-navbar\">\n" +
    "      <ul>\n" +
    "        <li><a href=\"/\">Main</a></li>\n" +
    "        <li><a href=\"/projects/api/\">API</a></li>\n" +
    "        <li><a href=\"/projects/gui/\">GUI</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>"
  document.body.insertAdjacentHTML( 'afterbegin', navbarHtml );
}

function adjustNavbarPosition() {
  var navbar = document.getElementsByClassName("wy-nav-side")[0];
  var offset = 146 - window.pageYOffset;
  if (offset >= 0) {
    navbar.style.top = offset + "px";
  } else {
    navbar.style.top = 0 + "px";
  }
}

window.onscroll = adjustNavbarPosition

window.onload = function(){
  addNavbar()
  adjustNavbarPosition()
  document.getElementsByClassName("wy-side-scroll")[0].scrollTop = 0;
  if (location.pathname.startsWith("/projects")) {
    var links = document.querySelectorAll("#lux-doc-navbar a[href^='/projects']");
    for (var i = 0; i < links.length; i++) {
      if(location.pathname.includes(links[i].pathname)) {
        links[i].classList.add('lux-navbar-active')
      }
    }
  } else {
    var main = document.querySelector("#lux-doc-navbar a:not([href^='/projects'])")
    main.classList.add('lux-navbar-active')
  }
}