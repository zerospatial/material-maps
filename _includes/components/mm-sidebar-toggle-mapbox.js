/*
* make menu into arrow on open desktop
*/
function addVisible() {
  if($("#mm-sidebar--wrapper").hasClass('demo-drawer')) {
    console.log('test');
    $("#mm-sidebar--wrapper").addClass('is-visible');
    $(".mdl-layout__drawer-button").html("<i class='material-icons'>keyboard_arrow_left</i>");
  }else{
    setTimeout(function() {
      addVisible()
    },1000)
  }
}
$(function(){
  if ($(window).width() > 1024) {
    addVisible()
  }
})
$("#mm-header").on('click', ".mdl-layout__drawer-button", function() {
    var main = $(".mdl-layout__content");
    var header = $("#mm-header");
    var btn = $(".mdl-layout__drawer-button");
    var sideb = $("#mm-sidebar--wrapper");
    if ($(window).width() > 1024) {
      if (!sideb.hasClass("is-visible")) {
        sideb.css("transform", "translateX(-290px)");
        main.css("margin-left","0");
        header.css("margin-left", "0");
        btn.html("<i class='material-icons'>menu</i>").css("left","0").css("margin-left","0");
        return false
      }
      else
      {
        header.css("margin-left","280px");
        main.css("margin-left","280px");
        btn.html("<i class='material-icons'>keyboard_arrow_left</i>").css("margin-left","280px");
        sideb.css("transform", "translateX(0)");
      }
  }
});
