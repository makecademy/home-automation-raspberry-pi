// Imports
var gpio = require('rpi-gpio');

// Lamp state
var lampState = false;

// Listen for events
gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);

    // If button is pressed, change the status of the lamp
    if (value == true) {
      lampState = !lampState;
      gpio.setup(7, gpio.DIR_OUT, function() {
        gpio.write(7, lampState, function(err) {
          if (err) throw err;
          console.log('Switch!');
         });
      });
    }
});

// Setup pin 4 as input
gpio.setup(4, gpio.DIR_IN, gpio.EDGE_BOTH);
