map.on('sourcedataloading', function(e) {
  console.log('sourcedataloading');
  var checkLoaded = setInterval(loaded, 100);
  if (!$("#map-loading").is(':visible')) {
    $("#map-loading").show();
  };
  function loaded() {
    if (map.areTilesLoaded()) {
      window.clearInterval(checkLoaded);
      $("#map-loading").hide();
    }
  }
});
