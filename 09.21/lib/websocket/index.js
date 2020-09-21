const WebSocketServer = require('ws').Server
const createBroadcast = require('./broadcast')
const { redisPublisher, redisSubscriber } = require('../redis/pubsub')

module.exports = (server) => {
  const wss = new WebSocketServer({ server })
  const broadcast = createBroadcast(wss)

  wss.on('connection', ws => {
    console.log('Client connected')
    ws.on('message', msg => {
      console.log(`Message sent: ${msg}`)
      redisPublisher.publish('chat_messages', msg)
    })
  })

  redisSubscriber.subscribe('chat_messages')
  redisSubscriber.on('message', (channel, message) => {
    console.log(channel)
    broadcast(message)
  })
}