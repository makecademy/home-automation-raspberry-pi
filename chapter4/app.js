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
  //refreshMeasurements();
  //setInterval(refreshMeasurements, 10000);

  // Twitter
  var Twit = require('twit')

  var T = new Twit({
    consumer_key:         '5uCNehkKI2Fo95LnnxUv2RYlB'
	, consumer_secret:      'QyX7fGAnfqn69NyYsdf6TsE04kHJ1H1jlELrLmoAoYdPWeEASK'
	, access_token:         '2917115452-VU0pgCqOOEnojy9vSKsqpTufgkTqVoAwYyzq3a8'
	, access_token_secret:  'P3EL5bXMHxaFzJGjv3DwwvcyWPg53cGeWNG64aHPecypO'
  });

  function checkTemperature() {
    rpi.getVariable('temperature', function(error, response, body) {
      var temperature = body.temperature;
    
      if (temperature < 22) {

      	// Get date
      	var d = new Date();
      	var n = d.getTime();
		var hour = d.getHours();
		var min  = d.getMinutes();
		var sec  = d.getSeconds();

		// Message
        var message = 'Warning, it is getting cold! Temperature is ' + 
        temperature + ' C at ' + hour + ':' + min + ':' + sec + '.';

        // Post message if more than 1 hour since last message
        if ((n - last_alert_time)/1000/60/60 > 1) {
          T.post('statuses/update', { status: message }, function(err, data, response) {
	        console.log(data);
	        last_alert_time = n;
	        if (err) {console.log(err)};
	      });
        }
      }
    });	
  }

  var last_alert_time = 0;
  //checkTemperature();
  //setInterval(checkTemperature, 10000);  

}, 5000);

// Start server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
