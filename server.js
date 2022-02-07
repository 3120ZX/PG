const express = require('express')
const app = express()
const path = require('path')

app.set('view engine','ejs')

app.get('/', (req, res) => {
	console.log('listening to port 8000')
	res.render('index',{text: 'TESTING'})
})

var resources = path.join(__dirname+ '/Resources')
app.use(express.static(resources))

var styles = path.join(__dirname+ '/styles')
app.use(express.static(styles))


const webRouter = require('./routes/web')
app.use('/',webRouter)

app.listen(8000)
