// Function to control lamp
$(document).ready(function() {

  // Click on buttons
  $("#on").click(function() {
    $.get('/digital/12/1');
  });

  $("#off").click(function() {
    $.get('/digital/12/0');
  });

  // Refresh sensor data
  refreshSensors();
  setInterval(refreshSensors, 5000);

});

function refreshSensors() {

  $.get('/temperature', function(json_data) {
    $("#temperature").text('Temperature: ' + json_data.temperature + ' C');

	$.get('/humidity', function(json_data) {
      $("#humidity").text('Humidity: ' + json_data.humidity + ' %');
    });
  });

}
