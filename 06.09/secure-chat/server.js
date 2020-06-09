const SecureChatProtocol = require('./protocol/SecureChatProtocol')

let clients = new Map()

let sharedKey = SecureChatProtocol.generateSharedKey()

setInterval(() => {
  sharedKey = SecureChatProtocol.generateSharedKey()
}, 10000)

function broadcast(message, sender) {
  if(clients.length < 2) return
  for([uuid, client] of clients) {
    if(uuid !== sender.uuid) {
      client.RECEIVE(sender, message)
    }
  }
}

require('net').createServer(socket =>  {
  //STREAM -> ChatProtocol
  const protocol = new SecureChatProtocol(socket)
  clients.set(protocol.uuid, protocol)
  console.log('client connected', protocol.remoteAddress, 'with uuid', protocol.uuid)

  protocol.WELCOME()

  protocol
    .on('data', dataObject => {
      const { command, data } = dataObject
      switch(command) {
        case 'HELLO':
          const c = clients.get(protocol.uuid)
          c.name = data
          clients.set(c.uuid, c)
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
      clients.delete(protocol.uuid)
      console.log(`client uuid ${protocol.uuid} disconnected`)
      for([uuid, client] of clients) {
        client.GOODBYE(protocol)
      }
    })
}).listen(3000, () => console.log('Server is listening on port 3000'))