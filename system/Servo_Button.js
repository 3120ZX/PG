var rpio = require('rpio');
const Gpio = require('pigpio').Gpio;

var button1 = 19;
var LED = 21;

const motor = new Gpio(11, {mode: Gpio.OUTPUT});
rpio.open(LED, rpio.OUTPUT, rpio.LOW);
rpio.open(button1, rpio.INPUT, rpio.PULL_UP);


function ledswitch()
{
	global.state = rpio.read(button1) ? 'pressed' : 'released';
	console.log(button1,state);
	
	if (state == 'pressed')
	{
		rpio.write(LED,rpio.HIGH);
		motor.servoWrite(1900);
		//rpio.sleep(3);
	}
	else
	{
		rpio.write(LED,rpio.LOW);
		motor.servoWrite(900);
	};
	exports.state = state;
}
rpio.poll(button1, ledswitch);
