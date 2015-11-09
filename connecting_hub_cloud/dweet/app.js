// Imports
var request = require('request');

// Global variables
var temperature;
var humidity;

// Automation
setTimeout(function(){

  // Function to refresh data
  refreshMeasurements = function() {

    // Log on Dweet.io
	  var dweet_request = 'https://dweet.io/dweet/for/' +
	    'my_rpi_name' +
	    '?temperature=' + temperature +
	    '&humidity=' + humidity;

	    request(dweet_request, function(error, response, body){
	      console.log(body);
	    });
  }

  // Send data every 10 seconds
  refreshMeasurements();
  setInterval(refreshMeasurements, 10000);

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
