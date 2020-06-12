const ChatProtocol = require('./protocol/ChatProtocol')
const tls = require('tls')
const fs = require('fs')

let clients = new Map()

function broadcast(message, sender) {
  if(clients.length < 2) return
  for([uuid, client] of clients) {
    if(uuid !== sender.uuid) {
      client.RECEIVE(sender, message)
    }
  }
}

const cert = fs.readFileSync('ca/chat-cert.pem')
const key = fs.readFileSync('ca/chat-key.pem')

/**
 * @see https://nodejs.org/api/tls.html#tls_tls_connect_options_callback
 * 
 * 1. l'opzione "rejectUnauthorized" è necessaria per far accettare al protocollo TLS un
 * certificato sostanzialmente non valido in quanto quando lo abbiamo creato abbiamo inserito
 * dati non validi:
 * Ad esempio il nome dell'host in questo caso è localhost che non è accettato come valido dal certificato che abbiamo creato
 * oggi a lezione
 * 
 * 2. l'ozione "ca" invece è indispensabile in quanto il nostro certificato è "self-signed" cioè non è stato creato da un certification authority
 * reale e riconosiuta come tale, per cui bisogna indicare sia al server che al client di utilizzare la ca che abbiamo creato in fase di creazione
 * delle chiavi e del certificato
 */
tls.createServer(
  { key, cert, ca: [cert], rejectUnauthorized: false }, 
  socket =>  {
  //STREAM -> ChatProtocol
  const protocol = new ChatProtocol(socket)
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