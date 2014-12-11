// Imports
var sensorLib = require('node-dht-sensor');
var express = require('express');
var app = express();

// View engine
app.set('view engine', 'jade');

// Set public folder
app.use(express.static(__dirname + '/public'));

// node-aREST
var rest = require("arest")(app);
rest.addDevice('xbee','/dev/ttyUSB0');

// Interface routes
app.get('/interface', function(req, res){
  res.render('interface');
});

// pi-aREST
var piREST = require('pi-arest')(app);

// Raspberry Pi name & ID
piREST.set_id('1');
piREST.set_name('my_RPi');

// DHT sensor
var dht_sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 23);
    },
    read: function () {
        var readout = sensorLib.read();
        
        piREST.variable('temperature',readout.temperature.toFixed(2));
        piREST.variable('humidity', readout.humidity.toFixed(2));
        
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

// Start server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
