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
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  console.log(typeof sender, typeof text)
  if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
    sendText(sender, text)
  }
  res.sendStatus(200)
})

function sendText(sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีค่ะ เราเป็นผู้ช่วยปรึกษาด้านความรัก สำหรับหมามิ้น 💞'
      }
    ]
  }
  request(
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer {2tBqrB8DQKsRxH9c28ro9NGOm1gJRPdTY44ISz31oKxKqO8d/3WaSGPNrHAnXcmS3shX51TVLgulWtHpZaSuJEeTAGCkNWLJ4DYQeDlnZAEYfSyT71CxK6q/wQLqB7S7L9wlXlcCwJaGkXTFmr7STAdB04t89/1O/w1cDnyilFU=}'
      },
      url: 'https://api.line.me/v2/bot/message/push',
      method: 'POST',
      body: data,
      json: true
    },
    function(err, res, body) {
      if (err) console.log('error')
      if (res) console.log('success')
      if (body) console.log(body)
    }
  )
}
