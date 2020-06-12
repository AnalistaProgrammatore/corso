const chalk = require('chalk')
const moment = require('moment')
const readline = require('readline')
const input = readline.createInterface(process.stdin, process.stdout)
const ChatProtocol = require('./protocol/ChatProtocol')
const tls = require('tls')
const fs = require('fs')

/**
 * Funzione che implementa la gestione comandi del protocollo per il client
 * @see https://www.npmjs.com/package/chalk libreria gestione terminale colorato
 * @see https://nodejs.org/api/readline.html libreria node per la gestione dell'input da terminale
 * @see https://momentjs.com/docs/ libreria per la gestione delle date
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date documentazione oggetto Date in Javascript
 * @param {Socket} socket 
 */
function clientCommands(socket) {
  return {
    KEY(key) {
      
    },
    WELCOME(data) {
      console.log(chalk.yellow(data))
      return new Promise(() => input.question('Enter your name: ', name => socket.HELLO(name)))
    },
    ACK() {
      return new Promise(() => input.question('> ', message => socket.SEND(message)))
    },
    RECEIVE({ from, date, message }) {
      const head = chalk.blue(`${moment(date).format('DD/MM/YYYY HH:mm')} - ${from}`)
      const msg = `${head}: ${message}`
      console.log(msg)
      return new Promise(() => input.question('> ', message => socket.SEND(message))) 
    },
    GOODBYE({ client, date }) {
      console.log(chalk.red(`${moment(date).format('DD/MM/YYYY HH:mm')} - ${client} leave the chat room`))
      return new Promise(() => input.question('> ', message => socket.SEND(message)))
    }
  }
}

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
async function run() {
  let socket = new ChatProtocol()
  const key = await fs.promises.readFile('ca/chat-key.pem')
  const cert = await fs.promises.readFile('ca/chat-cert.pem')
  socket.connect({ key, cert, ca: [cert], rejectUnauthorized: false }, process.argv[3],  process.argv[2], () => console.log('Connected to ** CHAT SERVER 1.1 **'))
  const commands = clientCommands(socket)
  socket.on('data', async ({ command, data }) => {
    if(!commands[command]) throw new Error('COMMAND_NOT_FOUND')
    await commands[command](data)
  })

  socket.on('close', () => console.log('Connection Closed'))
}

run().catch(console.error)