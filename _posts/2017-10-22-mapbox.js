---
title: Counties
api: mapbox
subtitle: A Mapbox GL Map
basemap: streets
tags: services
image: counties.jpg
inspect: true
modal:
  show: true
  text: >-
    This is a modal window.
#map options
layers:
  - name: Counties #no hyphens or special characters, written as you want it in the legend
    shape: polygon
    type: geojson
    mbxtype: fill
    url: ../../assets/data/counties.geojson
    color: red
    weight: 1
    fill: red
    tooltip: ["NAME", "POPULATION"] #lists can be formatted as a bracketed list of strings or as a dashed list like the popup
    popup:
     - NAME
     - POPULATION
    fit: true
    search: NAME
---
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});
map.on('mouseenter', "Counties", function(e) {
  map.getCanvas().style.cursor = 'pointer';
  popup.setLngLat(e.features[0].geometry.coordinates)
      .setHTML('<pre>'+JSON.stringify(e.features[0].properties, null,4)+'</pre>')
      .addTo(map);
});

map.on('mouseleave', "Counties", function() {
  map.getCanvas().style.cursor = '';
  popup.remove();
});
