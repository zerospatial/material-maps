$('.filter').click(function() {
  console.log('test');
  var id = $(this).attr('id');
  $('.' + id).fadeIn();
  $('.app').not('.' + id).hide();
});
$('#reset').click(function() {
  $('.app').fadeIn();
});
