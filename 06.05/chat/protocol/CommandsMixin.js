const commands = {
  ACK () {
    this.write({ command: 'ACK' })
  },
  WELCOME () {
    this.write({ command: 'WELCOME', data: `Hello to ** CHAT SERVER 1.1 **\nYour connection id is: ${this.uuid}`})
  },
  HELLO (name) {
    this.write({ command: 'HELLO', data: name })
  },
  GOODBYE (client) {
    this.write({ command: 'GOODBYE', data: { client: client.name, date: Date.now() }})
  },
  SEND (message) {
    this.write({ command: 'SEND', data: message })
  },
  RECEIVE (sender, message) {
    this.write({ command: 'RECEIVE', data: { from: sender.name, date: Date.now(), message }})
  }
}

module.exports = commands