$(document).scroll(function() {
  var scroll = $(this).scrollTop();
  if (scroll >= 500) {
    $("#popUp").css("margin-left", "25px");
    $("#plus").css("margin-left", "-425px");
  }
  if (scroll <= 600) {
    $("#popUp").css("margin-left", "-425px");
    $("#plus").css("margin-left", "0px");
  }
});

$("#plus").click(function() {
  $("#popUp").css("margin-left", "10px");
  $("#plus").css("margin-left", "-425px");
});

$(".close").click(function() {
  $("#popUp").css("margin-left", "-425px");
  $("#plus").css("margin-left", "0px");
});