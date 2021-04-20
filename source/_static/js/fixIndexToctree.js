window.addEventListener("DOMContentLoaded", function() {
  var els = document.querySelectorAll("a.reference[href='#ecosystem']");
  if(els.length > 0) {
    var el = els[0]
    el.parentNode.removeChild(el.nextElementSibling)
  }
})