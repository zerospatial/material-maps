window.map;
$("#mapLayerSwitcher").on('change', '.mdl-checkbox', function(e) {
	var layer = e.target.id;
	/*console.log($(e));*/
	if (layer != 'checkbox-0') {
		!map.hasLayer(mapLayers[layer])
		? map.addLayer(mapLayers[layer])
		: map.removeLayer(mapLayers[layer])
	}
});

/*
* Check all checkboxes code
*/
/*
$("#checkall input").change(function() {
		var listaElementos = document.querySelectorAll('.check');

		for(var i=0, n=listaElementos.length; i<n; i++){
			var element = listaElementos[i];

			if($('#checkall input').is(":checked")) {
				element.MaterialCheckbox.check();
	  	}
		  else {
				element.MaterialCheckbox.uncheck();
		  }
		}
	});

	$('.check').change(function(){

		var listaElementos = document.querySelectorAll('.check');

		for(var i=0, n=listaElementos.length; i<n; i++){
			var element = listaElementos[i];
			if($('.check input:checked').length == $('.check input').length ) {
				document.querySelector('#checkall').MaterialCheckbox.check();
			}else{
				document.querySelector('#checkall').MaterialCheckbox.uncheck();
			}
		}
	});*/

function layerSwitcher(e) {
  console.log($(e))
}

var searchControl;

map = new L.map('map', {
  center: {% if page.center %}{{page.center}}{% else %}[39,-82]{% endif %},
  zoom: {% if page.zoom %}{{page.zoom}}{% else %}10{% endif %},
  fullscreenControl: true,
  fullscreenControlOptions: {
    position: 'topright'
  }
});
map.on('resize', function () {
  map.invalidateSize();
	console.log('resized')
});
L.hash(map);
map.createPane('tilepane');
map.getPane('tilepane').style.zindex = 190;
var basemaps = []

basemaps["streets"] = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

basemaps["contrast"] = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

{% if page.basemap %}
//{% if page.basemap == "streets" %}alert(true);{% else%}alert(false);{% endif %}
var currentBasemap = "{{page.basemap}}";
basemaps[currentBasemap].addTo(map);
{%else%}
var currentBasemap = "streets";
basemaps["streets"].addTo(map);
{% endif %}

var n = 1;
for (b in basemaps) {
  console.log(b, "{{page.basemap}}");
  var st = b.toString();
  addMapBasemapsToggle("basemapSwitcher",b, b.toUpperCase(),{% if page.basemap == st %}true{% else%}false{% endif %},n);
  n = n+1
}
document.getElementById(currentBasemap + 'label').MaterialRadio.check();

//layerControl.addBaseLayer(basemaps["streets"], "Streets");

//layerControl.addBaseLayer(basemaps["contrast"], "Contrast");

$(".mdl-radio").change(function() {
  basemapSwitch(this);
});

function basemapSwitch(e) {
  /*console.log($(e));*/
  if($(e).hasClass('is-checked')) {
    var newBasemap = ($(e).children()[0].id).toString();
    console.log(newBasemap);
    console.log(currentBasemap);
    if (currentBasemap != newBasemap) {
      map.removeLayer(basemaps[currentBasemap]);
      map.addLayer(basemaps[newBasemap]);
      currentBasemap = newBasemap;
    }
  }
}

{% if page.layers %}
{% for layer in page.layers %}
{% assign words = layer.name | split: ' ' %}
{% capture layername %}{% for word in words %}{{ word | capitalize }}{% endfor %}{%endcapture%}
addMapLayersToggle("mapLayerSwitcher", "{{layername}}", "{{layer.name}}", true);
componentHandler.upgradeAllRegistered();

{% if layer.type == "wms" %}
map.createPane('wmspane');
map.getPane('wmspane').style.zindex = 250;
mapLayers["{{layername}}"] = L.tileLayer.wms("{{layer.url}}", {
  layers: {% for layer in layer.layers %}'{{layer}}{% unless forloop.last %},{% endunless %}{%endfor%}',
  transparent: true,
  format: 'image/{{layer.format}}',
	pane: 'wmspane',
	opacity: {% if layer.opacity %}{{layer.opacity}}{% else %}0.8{%endif %}
}).addTo(map);

{%else%}
/*{{layername}}*/
var {{layername}}Id = 0;
var {{layername}}Style = {
  color: {% if layer.color %}"{{layer.color}}"{% else%}"skyblue"{%endif%},
  fillColor: {% if layer.color %}"{{layer.fill}}"{% else%}"skyblue"{%endif%},
  weight: {% if layer.weight %}{{layer.weight}}{% else%}4{%endif%}
};

function showPopupCard(props) {
  var popup = "";
  for (var k in props) {
    var v = String(props[k]);
    popup += '<strong>' + k + '</strong><br>' + v + '<br>' + '<hr style="margin:5px 0px;">';
  };
  document.getElementById("mm-info-box").style.display = 'block';
  document.getElementById("map-layer--info-txt").innerHTML = popup;
}

{% if layer.vectorgrid == true %}
/*vector grid instead of normal leaflet layer*/
map.createPane('vtpane');
map.getPane('vtpane').style.zindex = 240;
var {{layername}}Data = omnivore.{{layer.type}}('{{layer.url}}');
{{layername}}Data.on('ready', function() {
  var {{layername}}GeoJSON = {{layername}}Data.toGeoJSON();
  var gridIndex = 0;
  {{layername}}GeoJSON.features.map(function(feature) {
    gridIndex = gridIndex + 1;
    feature.properties.gridIndex = gridIndex;
    return feature
  });
  mapLayers["{{layername}}"] = L.vectorGrid.slicer({{layername}}GeoJSON, {
    rendererFactory: L.canvas.tile,
    vectorTileLayerStyles: {
      sliced: {{layername}}Style
    },
    maxZoom: 22,
    interactive: true,
    getFeatureId: function(f) {
      return f.properties.gridIndex
    },
    pane: 'vtpane'
  }).addTo(map);

  mapLayers["{{layername}}"].on('click', function(e) {
    console.log(e);
    if (e.layer.feature) {
      var props = e.layer.feature.properties;
      var latlng = [e.latlng.lat,e.latlng.lng];
    }else{
      var props = e.layer.properties;
      var latlng = [Number(e.latlng.lat),Number(e.latlng.lng)];
    }
    if ({{layername}}Id != 0) {
      mapLayers["{{layername}}"].setFeatureStyle({{layername}}Id, {
        color: {{layername}}Style.color,
        weight: {{layername}}Style.weight,
      });
    }
    var popup = "";
    for (var k in props) {
      var v = String(props[k]);
      popup += '<strong>' + k + '</strong><br>' + v + '<br>' + '<hr style="margin:5px 0px;">';
    };
    {{layername}}Id = props.gridIndex;
    setTimeout(function() {
      mapLayers["{{layername}}"].setFeatureStyle({{layername}}Id, {
        color: "goldenrod",
        weight: 4
      }, 100);
      //map.openPopup(popup, latlng);
      document.getElementById("mm-info-box").style.display = 'block';
      document.getElementById("map-layer--info-txt").innerHTML = popup;
    });
  })
  map.on('popupclose', function() {
    mapLayers["{{layername}}"].setFeatureStyle({{layername}}Id, {
      color: {{layername}}Style.color,
      weight: {{layername}}Style.weight,
    });
    document.getElementById("mapLayerInfoWrapper").style.display = 'none';
  });
  {% if layer.search and layer.search != "osm" %}
  searchAndFit();
  {% endif %}
});
{%else%}
/* add normal leaflet layer*/
mapLayers["{{layername}}"] = new L.geoJson(null, {
  style: {{layername}}Style,
  onEachFeature: function(feature, shape) {
    {% if layer.popup == 'all'%}/*test*/
    var popupText = "";
    for (var k in feature.properties) {
      var v = String(feature.properties[k]);
      popupText += '<strong>' + k + '</strong><br>' + v + '<br>' + '<hr style="margin:5px 0px;">';
    };
    shape.bindPopup(popupText);
    {% elsif layer.popup %}shape.bindPopup({% for field in layer.popup %}feature.properties["{{field}}"] + '<br />'{% unless forloop.last %}+{% endunless %}{%endfor%});{% endif%}
    {% if layer.tooltip %}shape.bindTooltip({% for tip in layer.tooltip %}feature.properties["{{tip}}"] + '<br />'{% unless forloop.last %}+{% endunless %}{%endfor%}, {
      sticky: true
    });{%endif%}
  }
}).addTo(map);


var {{layername}}Data = omnivore.{{layer.type}}('{{layer.url}}', null, mapLayers["{{layername}}"]);
{{layername}}Data.on('ready', function() {
  searchAndFit();
})
{%endif%}/*end vector grid if statement*/

var clickedFeature = new L.GeoJSON(null, {
  style: {
    color:'goldenrod',
    fillColor: 'transparent',
    weight: 4,
    interactive: false
  },
  onEachFeature: function(feature, layer) {
    var props = layer.feature.properties;
    showPopupCard(props)
  }
}).addTo(map);

function searchAndFit() {
  {% if layer.fit == true %}map.fitBounds({{layername}}Data.getBounds());{% endif %}

  {% if layer.search and layer.search != "osm" %}
	document.getElementById('mapSearchControl').style.display = 'block';
  var prop = 'Search ' + '{{layer.name}}';
  searchControl = new L.Control.Search({
    /*can only search one layer or layer group at a time*/
    layer: {{layername}}Data,
    propertyName: "{{layer.search}}",
    container: "mapSearchControl",
    textPlaceholder: prop,
    marker: false,
    autoType: false,
    autoCollapse: false,
    minLength: 2,
    zoom:null,
    collapsed: false,
    add: false
  }).addTo(map);

  searchControl.on("search:locationfound", function(e) {
    console.log(e);
    clickedFeature.addData(e.layer.feature);
		map.flyToBounds(e.layer.getBounds());
    searchControl.collapse()
  });
  $("#searchtext" + prop.length).on('input',function() {
    $('.search-tooltip').width($('.search-tooltip').parent().width());
  });
  {% endif %}
}

{%endif%}
{%endfor%} /*end for loop layers */
{%endif%}/* end if layer statement*/

/*page.search*/
{% if page.search == "osm" %}
document.getElementById('mapSearchControl').style.display = 'block';
searchControl = new L.Control.Search({
  url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
  jsonpParam: 'json_callback',
  propertyName: 'display_name',
	container: "mapSearchControl",
  propertyLoc: ['lat','lon'],
  textPlaceholder: 'Search Addresses',
  circleLocation: false,
  autoType: false,
  autoCollapse: false,
  minLength: 2,
  zoom:13,
  collapsed: false
}).addTo(map);

searchControl.on("search:locationfound", function() {
  //console.log('t');
  searchControl.collapse()
});
$("#searchtext16").on('input',function() {
  $('.search-tooltip').width($('.search-tooltip').parent().width());
});
$("#searchtext16").on('change',function() {
  $('.search-tooltip').width($('.search-tooltip').parent().width());
});
{% endif %}

$("#sidebar").on('click', "#maplayerInfoClose", function() {
  document.getElementById("mapLayerInfoWrapper").style.display = 'none';
  clickedFeature.clearLayers();
});

map.on('click', function() {
  clickedFeature.clearLayers();
});
