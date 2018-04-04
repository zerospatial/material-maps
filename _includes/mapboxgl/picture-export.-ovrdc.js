/* image function save */

$("#map-image-btn").click(function() {
  var blobUrl = map.getCanvas().toDataURL();
  var imgcard = $("#ovrdc-modal--map-info .mdl-card");
  var background = "url('" + blobUrl +  "')";
  //imgcard.css("background","url('" + blobUrl + "')");
  $("#map-image").html('<img src="data:image/jpg;' + blobUrl + '" width="100%"></img>');
  /*if (typeof map.getLayer('selected') != "undefined") {
    var selfeature = map.queryRenderedFeatures({'layers':['selected']});
    var imgname =  "map";
    console.log(imgname)
  }else{
    var imgname = 'map';
  }*/
  var imgname = 'map';
  $("#map-image-href").html('<a href="data:image/png;' + blobUrl + '" download="' + imgname + '.png"><i class="material-icons">file_download</i> Download Image</a>')
  $("#mm-modal--map-info").fadeIn();
});

/* end image function */
