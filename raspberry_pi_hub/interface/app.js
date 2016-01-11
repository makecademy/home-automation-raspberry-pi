// Imports
var express = require('express');
var app = express();

// View engine
app.set('view engine', 'jade');

// Set public folder
app.use(express.static(__dirname + '/public'));

// node-aREST
var rest = require("arest")(app);
rest.addDevice('xbee','/dev/cu.usbserial-A702LF8B');
// rest.addDevice('http','localhost');

// Interface routes
app.get('/', function(req, res){
  var devices = rest.getDevices();
  res.render('interface', {devices: devices});
});

// Start server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
