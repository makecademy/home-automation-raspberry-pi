// Imports
var express = require('express');
var app = express();

// View engine
app.set('view engine', 'jade');

// Set public folder
app.use(express.static(__dirname + '/public'));

// node-aREST
var rest = require("arest")(app);
//rest.addDevice('xbee','/dev/ttyUSB0');
rest.addDevice('http','192.168.1.104');

// Interface routes
app.get('/', function(req, res){
  var devices = rest.getDevices();
  res.render('interface', {devices: devices});
});

// Start server
var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});
