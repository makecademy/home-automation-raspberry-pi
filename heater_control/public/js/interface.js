// Function to control lamp
$(document).ready(function() {

  // Set target temperature
  $("#set").click(function() {

    var target = $('target').val();
    $.get('/set?target=' + target);

  });

  // Refresh sensor data
  refreshSensors();
  setInterval(refreshSensors, 5000);

});


function refreshSensors() {

  $.get('/temperature', function(json_data) {
    $("#temperature").text('Temperature: ' + json_data.temperature + ' C');
  
  $.get('/heater', function(json_data) {
      $("#heater").text('Heater ' + json_data.heater);
    });
  });
  
}