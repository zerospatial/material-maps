/*
* Reveal custom layer control
*/
$(".mm-reveal--title").on('click', function(e) {
  console.log(e);
  var v = e.target.value;
  var a = e.target.parentElement.children;
  console.log(a);
  if (v < 1) {
    var c = e.target.parentElement.children[2];
    a[0].className += " rotate-90"
    //console.log(e.target.parentElement["aria-expanded"])
    //console.log(c);
    var ht = c.scrollHeight;
    c.style.height =  ht + "px";
    e.target.parentElement["aria-expanded"] = true;
    e.target.parentElement.children[1].value = 1;
    return false
  }
  if (v > 0) {
    var c = e.target.parentElement.children[2];
    a[0].className = "material-icons mm-reveal--icon";
    var ht = c.scrollHeight;
    c.style.height =  0;
    e.target.parentElement["aria-expanded"] = false;
    e.target.parentElement.children[1].value = 0;
  }
});
