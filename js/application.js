$(function() {
  $('[data-toggle="tooltip"]').tooltip()
});

/* https://github.com/tscanlin/tocbot#options */
tocbot.init({
  // Where to render the table of contents.
  tocSelector: '#toc',
  // Where to grab the headings to build the table of contents.
  contentSelector: 'main',
  // Which headings to grab inside of the contentSelector element.
  headingSelector: 'h2, h3',
  orderedList: false,
  extraListClasses: 'toc-list-mods',
  collapseDepth: 6,
  headingObjectCallback: tocTitleOrContent
});

// AnchorJS - https://milanaryal.com.np/adding-hover-anchor-links-to-header-on-github-pages-using-jekyll/
(function () {
  'use strict';

  anchors.options.placement = 'left';

  anchors.add('main > h2, main > h3, main > h4, main > h5, main > h6');

})();

function tocTitleOrContent(object, ele) {
  var tocTitle = ele.getAttribute("data-toc-title")
  if (tocTitle) {
    object.textContent = tocTitle
  } else {
    object.textContent = textContent(ele)
  }
  object.textContent = shortenMethodNames(object.textContent)
  return object
}

function textContent(ele) {
  return $(ele).clone()    //clone the element
    .children() //select all the children
    .remove()   //remove all the children
    .end()  //again go back to selected element
    .text();
}

function shortenMethodNames(string) {
  // "depthai.init_device(cmd_file_path) → bool" => "depthai.init_device"
  return string.replace(/\([\w=,]*\)\s*→\s*\w+/,'')
}
