// Global variables
var temperature;
var humidity;

// Automation
setTimeout(function(){

  // Twitter
  var Twit = require('twit')

  var T = new Twit({
    consumer_key:         '...'
	, consumer_secret:      '...'
	, access_token:         '...'
	, access_token_secret:  '...'
  });

  function checkTemperature() {

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
  }

  var last_alert_time = 0;
  checkTemperature();
  setInterval(checkTemperature, 10000);

}, 5000);

// DHT sensor measurements
var dht_sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 23);
    },
    read: function () {
        var readout = sensorLib.read();

        temperature = readout.temperature.toFixed(2));
        humidity = readout.humidity.toFixed(2));

        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
            'humidity: ' + readout.humidity.toFixed(2) + '%');
        setTimeout(function () {
            dht_sensor.read();
        }, 2000);
    }
};

// Init sensor
if (dht_sensor.initialize()) {
    dht_sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}
