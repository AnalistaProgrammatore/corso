const level = require('level')
const JSONStream = require('JSONStream')
const amqp = require('amqplib')

const db = level('./history')

require('http').createServer((req, res) => {
  res.writeHead(200)
  db.createValueStream()
    .pipe(JSONStream.stringify())
    .pipe(res)
}).listen(8090)

let channel, queue
amqp.connect('amqp://localhost')
  .then(conn => conn.createChannel())
  .then(ch => {
    channel = ch
    return channel.assertExchange('chat', 'fanout')
  })
  .then(() => channel.assertQueue('chat_history'))
  .then(q => {
    queue = q.queue
    return channel.bindQueue(queue, 'chat')
  })
  .then(() => {
    return channel.consume(queue, msg => {
      const content = msg.content.toString()
      console.log('Saving message:', content)
      db.put(Date.now(), content, err => {
        if(!err) channel.ack(msg)
      })
    })
  })