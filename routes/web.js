const express = require('express')
const router = express.Router()
var system = require('../system/system1.js');
var BP = -5;

setInterval(()=> {
  global.status1 = system.status1|| 'green';;
  global.servo1 = system.servo1 || 'released';
  global.servo2 = system.servo2 || 'released';;
  
  console.log("status =",status1);
  console.log("servo1 =",servo1);
  console.log("servo2 =",servo2);
  if(servo1=="pressed")
	{
		BP = BP+1;
	}
    
  if(servo2=="pressed")
	{
		BP = BP-1;
	}
exports.BP = BP;
  },1000);



router.get('/panel', (req, res) => {
	console.log('viewing panel')
	res.render('../views/panel', {status1:status1, servo1:servo1, servo2:servo2, BP:BP})
})

router.get('/phone', (req, res) => {
	console.log('viewing phone')
	res.render('../views/phone', {status1:status1, servo1:servo1, servo2:servo2, BP:BP})
})


module.exports = router
