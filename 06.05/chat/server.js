const ChatProtocol = require('./protocol/ChatProtocol')

let clients = []

function broadcast(message, sender) {
  if(clients.length < 2) return
  for(const client of clients) {
    if(client.uuid !== sender.uuid) {
      client.RECEIVE(sender, message)
    }
  }
}

require('net').createServer(socket =>  {
  //STREAM -> ChatProtocol
  const protocol = new ChatProtocol(socket)
  clients.push(protocol)
  console.log('client connected', protocol.remoteAddress, 'with uuid', protocol.uuid)

  protocol.WELCOME()

  protocol
    .on('data', dataObject => {
      const { command, data } = dataObject
      switch(command) {
        case 'HELLO':
          clients = clients.map(client => {
            if(client.uuid !== protocol.uuid) return client
            client.name = data
            return client
          })
          protocol.ACK()
          console.log(`client ${protocol.uuid} set his nickname to ${data}`)
          break;
        case 'SEND':
          broadcast(data, protocol)
          protocol.ACK()
          console.log(`user ${protocol.name} sent message ${data}`)
          break;
      }
    })
    .on('close', () => {
      clients = clients.filter(client => client.uuid !== protocol.uuid)
      console.log(`client uuid ${protocol.uuid} disconnected`)
      for(client of clients) {
        client.GOODBYE(protocol)
      }
    })
}).listen(3000, () => console.log('Server is listening on port 3000'))