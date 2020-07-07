const express = require('express')
const WebSocketServer = require('ws').Server
const args = require('minimist')(process.argv.slice(2))
const zeromq = require('zeromq')
const app = express()

const port = args['http'] || process.env.PORT

app.use(express.static('public'))
const server = require('http').createServer(app).listen(port, () => console.log(`server listening to ${port}`))

const pubSocket = zeromq.socket('pub')
pubSocket.bind(`tcp://127.0.0.1:${args['pub']}`)

const subSocket = zeromq.socket('sub')
const subPorts = Array.isArray(args['sub']) ? args['sub'] : [args['sub']]
subPorts.forEach(subPort => {
  console.log(`Subscribing to ${subPort}`)
  subSocket.connect(`tcp://127.0.0.1:${subPort}`)
})

subSocket.subscribe('chat_messages')
subSocket.on('message', (channel, message) => {
  console.log(`Message: ${message} received from other server to channel ${channel}`)
  broadcast(message.toString())
})

/** REINVIA IL MESSAGGIO A TUTTI I CLIENT CONNESSI */
const broadcast = msg => wss.clients.forEach(client => client.send(msg))

const wss = new WebSocketServer({ server })
wss.on('connection', ws => {
  console.log('Client connected')
  ws.on('message', msg => {
    console.log(`Message sent: ${msg}`)
    //...
    broadcast(msg)
    pubSocket.send(['chat_messages', msg])
  })
})




