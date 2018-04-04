/*baselayer switcher see _includes/mapboxgl/baselayer-switcher.js*/
//Need to put an improve this map here so that it gives a direct link to osm edit page
function switchLayer(layer) {
  console.log(layer.target);
  console.log('getting current style')
  var currentStyle = [map.getStyle()];
  var str = currentStyle[0].name;
  str = str.replace(/\s+/g, '-').toLowerCase();
  console.log("current style: " + str);
  var layerId = layer.target.id;
  console.log("new style: " + layerId);
  //check if the current style is the same as the clicked style - this means that the style name in the json must match the id of the clicked layer in the material-mapbox template
  if (str != layerId) {
    if (layerId == 'mapbox-satellite-streets') {
      map.setStyle('mapbox://styles/mapbox/satellite-streets-v10');
      //$('#attribution').append('&nbsp<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="https://www.digitalglobe.com/" target="_blank">© DigitalGlobe</a>&nbsp;Powered by <a href="https://www.mapbox.com/mapbox-gl-js/api/" target="_blank">Mapbox GL</a>');
    }else{
      map.setStyle('https://tileserver.ovrdc.org/tileserver-styles/styles/' + layerId + '/style.json');
      //$('#attribution').html('<a href="http://www.ovrdc.org/gis/">© OVRDC</a>&nbsp;<a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>&nbsp;Powered by <a href="https://www.mapbox.com/mapbox-gl-js/api/" target="_blank">Mapbox GL</a>');
    }
    /*map.on('style.load', function() {
      if (typeof(mglSources) != "undefined") {
        for (source in mglSources) {
          if (!map.getSource(source)) {
            map.addSource(source, mglSources[source]);
          }
        }
      }
      if (typeof(mglLayers) != "undefined") {
        for (layer in mglLayers) {
          console.log(mglLayers[layer]);
          console.log(map.getLayoutProperty(layer, 'visibility'));
          if (map.getLayer(layer) && map.getLayoutProperty(layer, 'visibility') != 'none') {
            console.log('adding layer: ', layer)
            map.addLayer(mglLayers[layer])
          }
        }
      }
      map.off('style.load');
    });*/
  }
}
/*var layerList = document.getElementById('map-baselayers--menu');
var inputs = layerList.getElementsByClassName('baselayer');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}*/
$("#map-baselayers--menu").on('click', '.baselayer', switchLayer);

//end baselayer-switcher
