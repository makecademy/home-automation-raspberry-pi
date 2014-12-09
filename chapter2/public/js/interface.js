// Function to control lamp
$(document).ready(function() {

  $("#1").click(function() {
    $.get('/digital/12/1');
  });

  $("#2").click(function() {
    $.get('/digital/12/0');
  });

});