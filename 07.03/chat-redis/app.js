const express = require('express')
const WebSocketServer = require('ws').Server
const redis = require('redis')

const redisSubscriber = redis.createClient()
const redisPublisher = redis.createClient()

const app = express()

const port = process.argv[2] || process.env.PORT

app.use(express.static('public'))
const server = require('http').createServer(app).listen(port, () => console.log(`server listening to ${port}`))

/** REINVIA IL MESSAGGIO A TUTTI I CLIENT CONNESSI */
const broadcast = msg => wss.clients.forEach(client => client.send(msg))

const wss = new WebSocketServer({ server })

wss.on('connection', ws => {
  console.log('Client connected')
  ws.on('message', msg => {
    console.log(`Message sent: ${msg}`)
    redisPublisher.publish('chat_messages', msg)
  })
})

redisSubscriber.subscribe('chat_messages')
redisSubscriber.on('message', (channel, ) => {
  console.log(`Message: ${message} received on channel: ${channel}`)
  broadcast(message)
})