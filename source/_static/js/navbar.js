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
    "        <li><a target=\"_blank\" href=\"https://docs.luxonis.com/\" class=\"lux-navbar-active\">Documentation</a></li>\n" +
    "        <li><a target=\"_blank\" href=\"https://discuss.luxonis.com/\">Discuss</a></li>\n" +
    "        <li><a target=\"_blank\" href=\"https://luxonis.com/careers\">Careers</a></li>\n" +
    "        <li><a target=\"_blank\" href=\"https://luxonis.com/team\">Team</a></li>\n" +
    "        <li><a target=\"_blank\" href=\"https://luxonis.com/contact\">Contact</a></li>\n" +
    "        <li><a target=\"_blank\" href=\"http://shop.luxonis.com\">Shop</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div id=\"lux-doc-navbar\" class=\"lux-navbar-container\">\n" +
    "    <div class=\"lux-navbar\">\n" +
    "      <ul>\n" +
    "        <li><a target=\"_blank\" href=\"/en/latest/\">Main</a></li>\n" +
    "        <li><a target=\"_blank\" href=\"/projects/api/\">API</a></li>\n" +
    "        <li><a target=\"_blank\" href=\"/projects/gui/\">GUI</a></li>\n" +
    "        <li><a target=\"_blank\" href=\"/projects/hardware/\">Hardware</a></li>\n" +
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

document.onreadystatechange = function(e) {
  if (document.readyState === 'interactive') {
    addNavbar()
    adjustNavbarPosition()
    document.getElementsByClassName("wy-side-scroll")[0].scrollTop = 0;
    if (location.pathname.startsWith("/projects")) {
      var links = document.querySelectorAll("#lux-doc-navbar a[href^='/projects']");
      for (var i = 0; i < links.length; i++) {
        if (location.pathname.includes(links[i].pathname)) {
          links[i].classList.add('lux-navbar-active')
        }
      }
    } else {
      var main = document.querySelector("#lux-doc-navbar a:not([href^='/projects'])")
      main.classList.add('lux-navbar-active')
    }
  }
}
