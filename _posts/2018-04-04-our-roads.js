---
layout: material
title: "Our Roads"
subtitle: "Exploring Data on Ohio's Transportation Infrastructure"
about: >-
  Our Roads examines Ohio's transportation infrastructure using open data from the Ohio TIMS site. <strong>Our Roads</strong> was initially inspired by <a href='https://api.tiles.mapbox.com/v4/enf.ee407c6a/page.html?access_token=pk.eyJ1IjoiZW5mIiwiYSI6IkNJek92bnMifQ.xn2_Uj9RkYTGRuCGg4DXZQ#8/40.303/-81.041' target='_blank'>this amazing map</a> of national HPMS traffic volumes.<br><br><img src='../../assets/post-images/landscape/hpms-map2.png' style='width:100%;'></img>
showmodal: true
tags: mapboxgl rtpo infrastructure
layer-info:
  - title: Popup Window
permalink: /:title/
hash: true
category: dev
basemap: dark
minZoom: 6
zoom: 8.36
center: "[-82.92,40.023]"
filters:
  - title: Road Data
    type: radio
  - field: aadt
    name: Daily Traffic (AADT)
    checked: true
  - field: pcr
    name: Pavement Condition
    disabled: true
  - field: cmsc
    name: Car Growth Rate
    disabled: true
  - field: cmst
    name: Truck Growth Rate
    disabled: true
  - field: func
    name: Functional Class
    disabled: true
css: >-
  /*.mapboxgl-ctrl-top-right {      top: 0;}*/
  @media screen and (min-width:900px) {.ovrdc-modal-inner .mdl-card {
    max-width: 800px;
  }}
  .mdl-card__supporting-text {
    width:96%;
  }

image: our-roads2.png
---
if (firstBuild === 1) {
  var filters = [],
    field = "";
  $('#map-controls--filters input').each(function(){
    filters.push({
      id: this.id,
      value: this.value
    });
  });
  function filterMap(e) {
    if ($(e).hasClass('is-checked')) {
      field = $(e).attr('for');
      $(e).addClass('active');
      console.log(field);
    }
  }/*end filter map function*/

  $(".map-controls--filters-toggle").change(function() {
    filterMap(this);
  });

  function resetMap() {
    var x = document.querySelector("#aadt_label");
    x.MaterialRadio.check();
    field = "";
    field = "aadt";
    filterMap(x);
    map.flyTo(view);
  }

  $("#map-controls--reset").click(function() {
    resetMap();
  });
}
var trafficPaint = {
	'line-color': {
		'property': 'FAC_AADT_T',
			'stops': [
				[0, '#5d5487'],
        [5143, '#9b59a1'],
        [14823, '#c76693'],
        [35699, '#e47e85'],
        [85356, '#f5c380'],
				[191217, '#f1e797']
			]
		},/*5143,14823,35699,85356,191217 - jenks breaks qgis*/
  'line-width': {
		'property': 'FAC_AADT_T',
			'stops': [
				[0,1],
        [14823, 2],
        [191217,9]
			]
		},
	'line-opacity': {
    'property': 'FAC_AADT_T',
    'stops': [
      [0,0.3],
      [85356,1]
    ]
  }
};

/*if (!map.getSource('omt')) {
  map.addSource('omt', {
    "type": "vector",
   'url':'https://tileserver.ovrdc.org/meta/north-america_us-tilejson.json'
  })
}*/

if (!map.getSource('adtsource')) {
  map.addSource('adtsource', {
  'type': 'vector',
  'url': 'https://tileserver.ovrdc.org/meta/tims_aadt_oct_2017_min-tilejson.json'
  });
}

/*if (!map.getLayer('roadsBackground')) {
  mglLayers.roadsBackground = {
    'id':'roadsBackground',
    'type':'line',
    'source':'omt',
    'source-layer':'transportation',
    'paint': {
      'line-color':'#5d5487',
      'line-opacity':0.3
    }
  }
  map.addLayer(mglLayers["roadsBackground"]);
}*/

/* add pcr local, state and cms car and truck and add toggles*/
if (!map.getLayer('aadt')) {
  mglLayers.aadt = {
    'id': 'aadt',
    'type': 'line',
    'source': 'adtsource',
    'source-layer':'ohio_aadt_2017',
    'paint': trafficPaint,
    'filter': [">=", "FAC_AADT_T", 85356],
    'layout': {
      'line-join':'round'
    }
  };
  map.addLayer({
		'id': 'aadt',
		'type': 'line',
		'source': 'adtsource',
    'source-layer':'ohio_aadt_2017',
		'paint': trafficPaint,
    'filter': [">=", "FAC_AADT_T", 85356],
    'layout': {
      'line-join':'round'
    }
	});
}
if (!map.getLayer('aadtsmall')) {
  mglLayers.aadtsmall = {
    'id': 'aadtsmall',
    'type': 'line',
    'source': 'adtsource',
    'source-layer':'ohio_aadt_2017',
    'paint': trafficPaint,
    'filter': ["<", "FAC_AADT_T", 85356],
    'layout': {
      'line-join':'round'
    }
  }
  map.addLayer({
    'id': 'aadtsmall',
    'type': 'line',
    'source': 'adtsource',
    'source-layer':'ohio_aadt_2017',
    'paint': trafficPaint,
    'filter': ["<", "FAC_AADT_T", 85356],
    'layout': {
      'line-join':'round'
    }
  }, 'aadt');
}
