/*
* Mapbox Layer Switcher based on visibility: visible || none
*/

/* store values for something later - not using right now*/
var filters = [];
$('#map-controls--filters input').each(function(){
  filters.push({
    id: this.id,
    value: this.value
  });
});

function filterMap(e) {
  var filteredMapLayer = $(e).attr('for');
  console.log(mglLayers[filteredMapLayer])
  console.log(filteredMapLayer);
  console.log($(e).hasClass('is-checked'));
  if ($(e).hasClass('is-checked')) {
    $(e).removeClass('active');
    map.setLayoutProperty(filteredMapLayer, 'visibility', 'visible');
    mglLayers[filteredMapLayer].layout.visibility = 'visible';
  }else{
    $(e).addClass('active');
    map.setLayoutProperty(filteredMapLayer, 'visibility', 'none');
    mglLayers[filteredMapLayer].layout.visibility = 'none';
  }
  if (typeof(mapLayers) != 'undefined') {
    console.log(mglLayers[filteredMapLayer])
  }
}

$(".map-controls--filters-toggle").change(function() {
  filterMap(this);
});
