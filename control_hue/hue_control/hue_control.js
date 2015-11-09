// Imports
var express = require('express');
var app = express();

// View engine
app.set('view engine', 'jade');

// Set public folder
app.use(express.static(__dirname + '/public'));

// Import Hue API module
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

// Display result & errors
var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

// Interface route
app.get('/', function(req, res){

  res.render('interface');

});

// Hue configuration
var host = "192.168.0.129",
    username = "your-user-name",
    api = new HueApi(host, username),
    state = lightState.create();

// Lamp control routes
app.get('/on', function(req, res){

  // Turn the lamp with ID '1' on
  api.setLightState(1, state.on())
      .then(displayResult)
      .fail(displayError)
      .done();

});

app.get('/off', function(req, res){

  // Turn the lamp with ID '1' off
  api.setLightState(1, state.off())
      .then(displayResult)
      .fail(displayError)
      .done();

});

// Start server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
