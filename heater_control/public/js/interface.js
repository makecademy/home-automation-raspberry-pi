// Function to control lamp
$(document).ready(function() {

  // Set target temperature
  $("#set").click(function() {

    var target = $('#target').val();
    console.log(target);
    $.get('/set?target=' + target);

  });

  // Refresh sensor data
  refreshSensors();
  setInterval(refreshSensors, 5000);

});


function refreshSensors() {

  $.get('/temperature', function(json_data) {
    $("#temperature").text('Current temperature: ' + json_data.temperature + ' C');  
    });
    
    $.get('/target', function(data) {
      $("#targetIndicator").text('Target temperature: ' + data.target + ' C');  
    }); 
    
      $.get('/heater', function(json_data) {
       $("#heater").text('Heater ' + json_data.heater);
      });
    
 
}
