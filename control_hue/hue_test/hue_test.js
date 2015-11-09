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

// Hue configuration
var host = "192.168.0.129",
    username = "your-user-name",
    api = new HueApi(host, username),
    state = lightState.create();

// Turn the lamp with ID '1' on
api.setLightState(1, state.on())
    .then(displayResult)
    .fail(displayError)
    .done();

// Turn the lamp with ID '1' off
api.setLightState(1, state.off())
    .then(displayResult)
    .fail(displayError)
    .done();
