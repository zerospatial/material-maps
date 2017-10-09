---
---
{% include assets/jquery-3.1.1.min.js %}
{% include node_modules/leaflet/dist/leaflet.js %}
{% include assets/leaflet-omnivore.min.js %}
{% include assets/Leaflet.fullscreen.min.js %}
{% include assets/material-dashboard/material.min.js %}
{% include assets/leaflet-fullscreen/Control.Fullscreen.js %}
{% include assets/leaflet-search/leaflet-search.src.js %}
{% include assets/leaflet-hash.js %}
/*
* Reveal custom layer control
*/
$(".md-reveal--title").on('click', function(e) {
  console.log(e);
  var v = e.target.value;
  if (v < 1) {
    console.log(e.target.parentElement["aria-expanded"])
    var x = e.target.parentElement.children[1];
    console.log(x);
    var ht = x.scrollHeight;
    x.style.height =  ht + "px";
    e.target.parentElement["aria-expanded"] = true;
    e.target.parentElement.children[0].value = 1;
    return false
  }
  if (v > 0) {
    var x = e.target.parentElement.children[1];
    var ht = x.scrollHeight;
    x.style.height =  0;
    e.target.parentElement["aria-expanded"] = false;
    e.target.parentElement.children[0].value = 0;
  }
});
