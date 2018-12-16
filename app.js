var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())

app.set('port', process.env.PORT || 4000)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.send('Hello')
})

app.listen(app.get('port'), function() {
  console.log('run at port', app.get('port'))
})

app.post('/webhook', (req, res) => {
  res.sendStatus(200)
})
