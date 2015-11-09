// Function to control hue lamp
$(document).ready(function() {

  // Click on buttons
  $("#on").click(function() {
    $.get('/on');
  });

  $("#off").click(function() {
    $.get('/off');
  });

});
