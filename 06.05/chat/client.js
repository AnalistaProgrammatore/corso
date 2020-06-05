const chalk = require('chalk')
const moment = require('moment')
const readline = require('readline')
const input = readline.createInterface(process.stdin, process.stdout)
const ChatProtocol = require('./protocol/ChatProtocol')

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

async function run() {
  let socket = new ChatProtocol()
  socket.connect(process.argv[3], process.argv[2], () => console.log('Connected to ** CHAT SERVER 1.1 **'))
  const commands = clientCommands(socket)
  socket.on('data', async ({ command, data }) => {
    if(!commands[command]) throw new Error('COMMAND_NOT_FOUND')
    await commands[command](data)
  })

  socket.on('close', () => console.log('Connection Closed'))
}

run().catch(console.error)