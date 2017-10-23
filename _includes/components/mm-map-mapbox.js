window.map;
/* set basemap layer and source objects and default basemap*/
var basemapSources ={
  'osm': {
    "type":"raster",
    "tiles":["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"]
  },
  "stamen": {
    "type": "raster",
    "tiles": ["https://stamen-tiles-a.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"],
    "attribution": 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  "placeholder": {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": []
    }
  }
};

mapBasemaps.streets = {
    "id": "streets",
    "type": "raster",
    "source": "osm",
    "minzoom": 0,
    "maxzoom": 17.2
};

mapBasemaps.contrast = {
  "id": "contrast",
  "type": "raster",
  "source": "stamen",
  "minzoom": 0,
  "maxzoom": 17.2
};
addMapBasemapsToggle("basemapSwitcher","streets", "Streets", true,1);
addMapBasemapsToggle("basemapSwitcher", "contrast", "Contrast", false,2);
var currentBasemap = "{% if page.basemap %}{{page.basemap}}{% else %}streets{%endif%}";

/* start with blank map*/
map = new mapboxgl.Map({
  container: 'map',
  hash: true,
  /*style: 'some mapbox style url*/
  /*below is a blank style*/
  style: {
    "version": 8,
    "name": "blank",
    "sources": basemapSources,
    "layers": [
      {
        "id": "background",
        "type": "background",
        "paint": {
          "background-color": "#1d1f20"
        }
      },
      {
        "id":"placeholder",
        "type":"fill",
        "source": "placeholder",
        "layout": {
          "visibility": "none"
        }
      }
    ]
  },
  center: [-82,39],
  zoom: 4,
  debug: 1
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

map.on('style.load', function() {

  {% if page.layers %}
  {% for layer in page.layers %}
  {% assign words = layer.name | split: ' ' %}
  {% capture layername %}{% for word in words %}{{ word | capitalize }}{% endfor %}{%endcapture%}
  var {{layername}}, {{layername}}Center;
  $.getJSON('{{layer.url}}', function(data) {
  	{{layername}}Data = data;
    console.log(data);
    map.addSource('{{layername}}Source', {
      'type': 'geojson',
      'data': data
    });
    {{layername}}Center = turf.center(data);
    //center: [c.geometry.coordinates[0],c.geometry.coordinates[1]],
    mapLayers.{{layername}} = {
      'id': '{{layername}}',
      'type': 'fill',
      'source': '{{layername}}Source',
      'paint':{
        'fill-color':'skyblue',
        'fill-opacity':0.2,
        "fill-outline-color":"#212121"
      },
      'layout': {
        'visibility': {% if layer.show != false %}'visible'{% else %}'none'{% endif %}
      }
    };
    //map.addLayer(mapLayers["{{layername}}"])
    addMapLayersToggle("mapLayerSwitcher", "{{layername}}", "{{layer.name}}", {% if layer.show != false %}true{% else %}false{% endif %});
  	{% if forloop.last == true%}buildMap();{%endif%}
  });
  {% endfor %}
  {% endif %}

  $("#mapLayerSwitcher").on('change', '.mdl-checkbox', function(e) {
    var layer = e.target.id;
    console.log(layer);
    if (layer != 'checkbox-0') {
      map.getLayoutProperty(layer, 'visibility') === 'none' ?
        map.setLayoutProperty(layer, 'visibility', 'visible') :
        map.setLayoutProperty(layer, 'visibility', 'none')
    }
  });

  $(".mdl-radio").change(function() {
    basemapSwitch(this);
  });
  console.log(mapLayers[0]);
  function basemapSwitch(e) {
    console.log($(e).children()[0].id);
    if($(e).hasClass('is-checked')) {
      var newBasemap = ($(e).children()[0].id).toString();
      console.log(currentBasemap);
      console.log(newBasemap);
      if (currentBasemap != newBasemap) {
        map.removeLayer(currentBasemap);
        map.addLayer(mapBasemaps[newBasemap], "placeholder");
        currentBasemap = newBasemap;
      }
    }
  }
});

function buildMap() {

  map.addLayer(mapBasemaps[currentBasemap]);
  for (layer in mapLayers) {
    console.log(layer);
    console.log(mapLayers[layer]);
    map.addLayer(mapLayers[layer])
  }

  {% if page.inspect == true %}
  map.addControl(new MapboxInspect({
    popup: new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })
  }));
  {% endif %}
  /* the code below is handled by mapbox-gl-inspect for now*/
	/*function identifyFeatures(location, layer, fields) {
	  var identifiedFeatures = map.queryRenderedFeatures(location.point, layer);
	  popup.remove();
	  if (identifiedFeatures != '') {
	    var popupText = "";
	    for (i = 0; i < fields.length; i++) {
	      popupText += "<strong>" + fields[i] + ":</strong> " + identifiedFeatures[0].properties[fields[i]] + "<" + "br" + ">"
	    };
	    popup.setLngLat(location.lngLat)
	      .setHTML(popupText)
	      .addTo(map);
	  }
	}

	map.on('click', function(e) {
	  identifyFeatures(e)
	});

	map.on('mousemove', function(e) {
	  identifyFeatures(e)
	});*/
  /* page content is loaded in the buildMap function */
  {{ content }}
}
