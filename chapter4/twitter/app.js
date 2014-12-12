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

  // Twitter
  var Twit = require('twit')

  var T = new Twit({
    consumer_key:         '...'
	, consumer_secret:      '...'
	, access_token:         '...'
	, access_token_secret:  '...'
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
  checkTemperature();
  setInterval(checkTemperature, 10000);  

}, 5000);

// Start server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
