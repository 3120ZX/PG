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

//Distance Sensor 2
const trigger2 = new Gpio(8, {mode: Gpio.OUTPUT});
const echo2 = new Gpio(7, {mode: Gpio.INPUT, alert: true});
var LED2 = 22;
rpio.open(LED2, rpio.OUTPUT, rpio.LOW);

//Distance Sensor 3
const trigger3 = new Gpio(20, {mode: Gpio.OUTPUT});
const echo3 = new Gpio(21, {mode: Gpio.INPUT, alert: true});
var LED3 = 36;
rpio.open(LED3, rpio.OUTPUT, rpio.LOW);

//Distance Sensor 4
const trigger4 = new Gpio(3, {mode: Gpio.OUTPUT});
const echo4 = new Gpio(4, {mode: Gpio.INPUT, alert: true});
var LED4 = 3;
rpio.open(LED4, rpio.OUTPUT, rpio.LOW);

//Distance Sensor 5
const trigger5 = new Gpio(27, {mode: Gpio.OUTPUT});
const echo5 = new Gpio(22, {mode: Gpio.INPUT, alert: true});
var LED5 = 11;
rpio.open(LED5, rpio.OUTPUT, rpio.LOW);

// Make sure trigger is low
trigger1.digitalWrite(0);
trigger2.digitalWrite(0);
trigger3.digitalWrite(0);
trigger4.digitalWrite(0);
trigger5.digitalWrite(0);

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
  let startTick2;
  let startTick3;
  let startTick4;
  let startTick5;
  
  echo1.on('alert', (level1, tick1) => {
    if (level1 == 1) {
      startTick1 = tick1;
    } 
    else {
    const endTick1 = tick1;
    const diff1 = (endTick1 >> 0) - (startTick1 >> 0); // Unsigned 32 bit arithmetic
    var distance1 = diff1 / 2 / MICROSECDONDS_PER_CM;
      
    if (distance1 < 3){
		var distancestatus1 ="red";
		rpio.write(LED1,rpio.LOW);
	}
	else {
		var distancestatus1 = "green";
		rpio.write(LED1,rpio.HIGH);
	}
      console.log("Sensor 1 =",distance1);
      console.log("Sensor 1 =",distancestatus1);
  }});

  echo2.on('alert', (level2, tick2) => {
    if (level2 == 1) {
      startTick2 = tick2;
    } 
    else {
    const endTick2 = tick2;
    const diff2 = (endTick2 >> 0) - (startTick2 >> 0); // Unsigned 32 bit arithmetic
    var distance2 = diff2 / 2 / MICROSECDONDS_PER_CM;
      
    if (distance2 < 3){
		var distancestatus2 ="red";
		rpio.write(LED2,rpio.LOW);
	}
	else {
		var distancestatus2 = "green";
		rpio.write(LED2,rpio.HIGH);
	}
      console.log("Sensor 2 =",distance2);
      console.log("Sensor 2 =",distancestatus2);
  }});
  
  echo3.on('alert', (level3, tick3) => {
    if (level3 == 1) {
      startTick3 = tick3;
    } 
    else {
    const endTick3 = tick3;
    const diff3 = (endTick3 >> 0) - (startTick3 >> 0); // Unsigned 32 bit arithmetic
    var distance3 = diff3 / 2 / MICROSECDONDS_PER_CM;
      
    if (distance3 < 3){
		var distancestatus3 ="red";
		rpio.write(LED3,rpio.LOW);
	}
	else {
		var distancestatus3 = "green";
		rpio.write(LED3,rpio.HIGH);
	}
      console.log("Sensor 3 =",distance3);
      console.log("Sensor 3 =",distancestatus3);
  }});
  
  echo4.on('alert', (level4, tick4) => {
    if (level4 == 1) {
      startTick4 = tick4;
    } 
    else {
    const endTick4 = tick4;
    const diff4 = (endTick4 >> 0) - (startTick4 >> 0); // Unsigned 32 bit arithmetic
    var distance4 = diff4 / 2 / MICROSECDONDS_PER_CM;
      
    if (distance4 < 3){
		var distancestatus4 ="red";
		rpio.write(LED4,rpio.LOW);
	}
	else {
		var distancestatus4 = "green";
		rpio.write(LE4,rpio.HIGH);
	}
      console.log("Sensor 4 =",distance4);
      console.log("Sensor 4 =",distancestatus4);
  }});
  
  echo5.on('alert', (level5, tick5) => {
    if (level5 == 5) {
      startTick5 = tick5;
    } 
    else {
    const endTick5 = tick5;
    const diff5 = (endTick5 >> 0) - (startTick5 >> 0); // Unsigned 32 bit arithmetic
    var distance5 = diff5 / 2 / MICROSECDONDS_PER_CM;
      
    if (distance5 < 3){
		var distancestatus5 ="red";
		rpio.write(LED5,rpio.LOW);
	}
	else {
		var distancestatus5 = "green";
		rpio.write(LED5,rpio.HIGH);
	}
      console.log("Sensor 5 =",distance5);
      console.log("Sensor 5 =",distancestatus5);
  }});
};



sensor1();
//sensor2();
//sensor3();
//sensor4();
//sensor5();


// Trigger a distance measurement once per second
setInterval(() => {
  trigger1.trigger(10, 1);
  trigger2.trigger(10, 1);
  trigger3.trigger(10, 1);
  trigger4.trigger(10, 1);
  trigger5.trigger(10, 1);
}, 1000);

//Servo Motor Control
function ServoControl1()
{
	global.state1 = rpio.read(button1) ? 'pressed' : 'released';
	console.log(button1,state1);
	
	if (state1 == 'pressed')
	{
		rpio.write(LEDServo1,rpio.HIGH);
		motor1.servoWrite(1900);
		rpio.sleep(3);
	}
	else
	{
		rpio.write(LEDServo1,rpio.LOW);
		motor1.servoWrite(900);
	};
	//module.export = state1;
}
rpio.poll(button1, ServoControl1);

function ServoControl2()
{
	global.state2 = rpio.read(button2) ? 'pressed' : 'released';
	console.log(button2,state2);
	
	if (state2 == 'pressed')
	{
		rpio.write(LEDServo2,rpio.HIGH);
		motor2.servoWrite(1900);
		rpio.sleep(3);
	}
	else
	{
		rpio.write(LEDServo2,rpio.LOW);
		motor2.servoWrite(900);
	};
	//module.export = state2;
}
rpio.poll(button2, ServoControl2);
