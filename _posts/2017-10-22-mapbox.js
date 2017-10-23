---
title: Counties
api: mapbox
subtitle: A Mapbox GL Map
basemap: streets
tags: services
image: counties.jpg
inspect: true
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
