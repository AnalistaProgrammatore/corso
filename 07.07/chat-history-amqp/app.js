const express = require('express')
const WebSocketServer = require('ws').Server
const amqp = require('amqplib')
const JSONStream = require('JSONStream')
const request = require('request')
const port = process.argv[2] || process.env.PORT
const app = express()

app.use(express.static('public'))
const server = require('http').createServer(app).listen(port, () => console.log(`server listening to ${port}`))

let channel, queue
amqp.connect('amqp://localhost')
  .then(conn => conn.createChannel())
  .then(ch => {
    channel = ch
    return channel.assertExchange('chat', 'fanout')
  })
  .then(() => {
    return channel.assertQueue(`chat_srv_${port}`, { exclusive: true })
  })
  .then(q => {
    queue = q.queue
    return channel.bindQueue(queue, 'chat')
  })
  .then(() => {
    return channel.consume(queue, msg => {
      console.log(msg)
      msg = msg.content.toString()
      console.log('From queue: ', msg)
      broadcast(msg)
    }, { noAck: true })
  })
  .catch(err => console.log(err))

/** REINVIA IL MESSAGGIO A TUTTI I CLIENT CONNESSI */
const broadcast = msg => wss.clients.forEach(client => client.send(msg))

const wss = new WebSocketServer({ server })
wss.on('connection', ws => {
  console.log('Client connected')

  //query history service
  request('http://localhost:8090')
    .on('error', err => console.log(err))
    .pipe(JSONStream.parse('*'))
    .on('data', msg => ws.send(msg))

  ws.on('message', msg => {
    console.log(`Message sent: ${msg}`)
    channel.publish('chat', '', Buffer.from(msg))
  })
})




