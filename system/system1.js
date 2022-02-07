//Library
const Gpio = require('pigpio').Gpio;
var rpio = require('rpio');

//Constant (for calculating)
const MICROSECDONDS_PER_CM = 1e6/34321;

//Distance Sensor 1
const trigger1 = new Gpio(23, {mode: Gpio.OUTPUT});
const echo1 = new Gpio(24, {mode: Gpio.INPUT, alert: true});
var LED1 = 12;
rpio.open(LED1, rpio.OUTPUT, rpio.LOW);

// Make sure trigger is low
trigger1.digitalWrite(0);

//Servo 1 (Entry Gate)
var button1 = 19;
var LEDServo1 = 21;
const motor1 = new Gpio(11, {mode: Gpio.OUTPUT});
rpio.open(LEDServo1, rpio.OUTPUT, rpio.LOW);
rpio.open(button1, rpio.INPUT, rpio.PULL_UP);

//Servo 2 (Exit Gate)
var button2 = 29;
var LEDServo2 = 31;
const motor2 = new Gpio(13, {mode: Gpio.OUTPUT});
rpio.open(LEDServo2, rpio.OUTPUT, rpio.LOW);
rpio.open(button2, rpio.INPUT, rpio.PULL_UP);

//Detecting Distance from each Sensor
const sensor1 = () => {
  let startTick1;
  
  echo1.on('alert', (level1, tick1) => {
    if (level1 == 1) {
      startTick1 = tick1;
    } 
    else {
    const endTick1 = tick1;
    const diff1 = (endTick1 >> 0) - (startTick1 >> 0); // Unsigned 32 bit arithmetic
    var distance1 = diff1 / 2 / MICROSECDONDS_PER_CM;
      
    if (distance1 < 3){
		var status1 ="red";
		rpio.write(LED1,rpio.LOW);
	}
	else {
		var status1 = "green";
		rpio.write(LED1,rpio.HIGH);
	}
      //console.log("Sensor 1 =",distance1);
      //console.log("Sensor 1 =",status1);
      exports.status1 = status1;
  }});
};
sensor1();


// Trigger a distance measurement once per second
setInterval(() => {
  trigger1.trigger(10, 1);
}, 1000);

//Servo Motor Control
function ServoControl1()
{
	global.servo1 = rpio.read(button1) ? 'pressed' : 'released';
	//console.log(button1,servo1);
	
	if (servo1 == 'pressed')
	{
		rpio.write(LEDServo1,rpio.HIGH);
		motor1.servoWrite(1900);
		//rpio.sleep(3);
	}
	else
	{
		rpio.write(LEDServo1,rpio.LOW);
		motor1.servoWrite(900);
	};
	exports.servo1 = servo1;
}
rpio.poll(button1, ServoControl1);

function ServoControl2()
{
	global.servo2 = rpio.read(button2) ? 'pressed' : 'released';
	//console.log(button2,servo2);
	
	if (servo2 == 'pressed')
	{
		rpio.write(LEDServo2,rpio.HIGH);
		motor2.servoWrite(1900);
		//rpio.sleep(3);
	}
	else
	{
		rpio.write(LEDServo2,rpio.LOW);
		motor2.servoWrite(900);
	};
	exports.servo2 = servo2;
}
rpio.poll(button2,ServoControl2);
