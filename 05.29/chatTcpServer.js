const net = require('net')


const clients = []

function broadcast(message, sender) {
  if(clients.length < 2) return
  for(const client of clients) {
    if(client.uuid !== sender.uuid) {
      client.write(`Message from ${sender.uuid}: ${message}`)
    }
  }
}

net
  .createServer(socket => {
    // client connesso
    clients.push(socket)
    socket.uuid = clients.length
    
    console.log('client connected', socket.remoteAddress, 'with uuid', clients.length)
    
    socket.write('Hello to ** CHAT SERVER 1.0 **\n')
    socket.write(`Your connection id is: ${clients.length}`)
    
    socket.on('readable', () => {
      let chunk
      while((chunk = socket.read()) !== null) {
        console.log('read', chunk.length, 'bytes:', chunk.toString())
        broadcast(chunk.toString(), socket)
      }
    })
  })
  .listen(3000, () => console.log('Server is listening on port 3000'))