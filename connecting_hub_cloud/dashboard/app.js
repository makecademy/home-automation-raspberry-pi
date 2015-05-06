// Imports
var express = require('express');
var request = require('request');
var app = express();

// View engine
app.set('view engine', 'jade');

// Set public folder
app.use(express.static(__dirname + '/public'));

// node-aREST
var rest = require("arest")(app);
rest.addDevice('xbee','/dev/ttyUSB0');
rest.addDevice('http','localhost');

// Interface routes
app.get('/', function(req, res){
  var devices = rest.getDevices();
  res.render('interface', {devices: devices});
});

// Automation
setTimeout(function(){

  // Get device
  rpi = rest.getDevice('my_RPi');

  // Function to refresh data  
  refreshMeasurements = function() {
	  // Get temperature & humidity
	  rpi.getVariable('temperature', function(error, response, body) {
	    var temperature = body.temperature;
	    
	    rpi.getVariable('humidity', function(error, response, body) {
	      var humidity = body.humidity;
	      
	      // Log on Dweet.io
	      var dweet_request = 'https://dweet.io/dweet/for/' + 
	      rpi.name + rpi.id + 
	      '?temperature=' + temperature + 
	      '&humidity=' + humidity;
	      
	      request(dweet_request, function(error, response, body){
	        console.log(body);
	      });
	    
	    });
	  });
  }

  // Send data every 10 seconds
  refreshMeasurements();
  setInterval(refreshMeasurements, 10000);

}, 5000);

// Start server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
