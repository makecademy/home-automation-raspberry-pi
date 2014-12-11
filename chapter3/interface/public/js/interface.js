// Function to control lamp
$(document).ready(function() {

  // Configure XBee sensors
  $.get('/devices', function( devices ) {

    // Set inputs
    for (i = 0; i < devices.length; i++){

      // Get device
      var device = devices[i];

      // Set input
      $.get('/' + device.name + '/mode/8/i');

    }

    setInterval(function() {

      for (i = 0; i < devices.length; i++){

        // Get device
        var device = devices[i];

        // Get data
        $.get('/' + device.name + '/digital/8', function(json_data) {

            // Update display  
            if (json_data.return_value == 0){
              $("#" + json_data.id).html("No motion");
              $("#" + json_data.id).css("color","red");    
            }
            else {
              $("#" + json_data.id).html("Motion detected");
              $("#" + json_data.id).css("color","green");  
            }    
          
        });
      }

    }, 2000);

  });

  // Click on buttons
  $("#1").click(function() {
    $.get('/my_RPi/digital/12/1');
  });

  $("#2").click(function() {
    $.get('/my_RPi/digital/12/0');
  });
  
  // Refresh sensor data
  refreshSensors();
  setInterval(refreshSensors, 5000);
  
  // // Refresh camera picture
  // setInterval(function() {
    
  //   // Take picture
  //   $.get("/camera/snapshot");
  
  // }, 10000);
  
  // setInterval(function() {
 
  //   // Reload picture
  //   d = new Date();
  //   $("#camera").attr("src","/pictures/image.jpg?" + d.getTime());
  
  // }, 1000);

});

function refreshSensors() {

  $.get('/my_RPi/temperature', function(json_data) {
    $("#temperature").text('Temperature: ' + json_data.temperature + ' C');
	
	$.get('/my_RPi/humidity', function(json_data) {
      $("#humidity").text('Humidity: ' + json_data.humidity + ' %');
    });
  });
	
}
