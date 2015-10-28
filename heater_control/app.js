// Imports
var express = require('express');
var gpio = require('rpi-gpio');
var sensorLib = require('node-dht-sensor');

// App
var app = express();

// View engine
app.set('view engine', 'jade');

// Temperature variables
var currentTemperature;
var targetTemperature;
var threshold = 1;

// Set views
app.use(express.static(path.join(__dirname, 'public')));

// Interface
app.get('/', function(req, res){
  res.render('interface');
});

// Commands
app.get('/temperature', function(req, res){
  res.json({temperature: currentTemperature}); 
});

app.get('/heater', function(req, res){
  if (heaterStatus == true) {
    res.json({heater: 'ON'}); 
  }
  else {
    res.json({heater: 'OFF'}); 
  }
});

app.get('set', function(req, res){

  // Set target temp
  console.log(req.params.target);
  targetTemperature = req.params.target;

});

// Check temperature vs threshold every 10 seconds
setInterval(function() {

  // If we crossed high threshold
  if (currentTemperature > (targetTemperature + threshold)) {

    // Set heater off
    gpio.setup(7, gpio.DIR_OUT, function() {
      gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('Heater OFF');
       });
    });

  }

  // If we crossed low threshold
  if (currentTemperature < (targetTemperature - threshold)) {

    // Set heater off
    gpio.setup(7, gpio.DIR_OUT, function() {
      gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Heater ON');
       });
    });
    
  }

}, 10000);

// Start server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

// DHT sensor
var dht_sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 23);
    },
    read: function () {
        var readout = sensorLib.read();
        var currentTemperature = readout.temperature.toFixed(2);

        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
            'humidity: ' + readout.humidity.toFixed(2) + '%');
        setTimeout(function () {
            dht_sensor.read();
        }, 2000);
    }
};

if (dht_sensor.initialize()) {
    dht_sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}
