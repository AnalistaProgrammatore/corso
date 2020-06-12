const ChatProtocol = require('./ChatProtocol')
const createCryptoSystem = require('./crypto')

class SecureChatProtocol extends ChatProtocol {
  constructor(socket) {
    super(socket)
    this.crypto = createCryptoSystem('node', 'b9c8d28781a52beb852d71e6dad679a83b7a908c', '8fd33cea7febb3592182a5359e9a16caf3517511')
  }

  static generateSharedKey() {
    const key = Math.floor(Math.random() * (2 ** 8))
    console.log('new key generated:', key)
    return key
  }

  produce(buffer, encoding, callback) {
    const encripter = this.crypto.createCipher()
    encripter.pipe(this._socket)
    encripter.write(buffer, encoding, callback)
  }

  onReadable() {
    const decipher = this.crypto.createDecipher()
    let rawData = Buffer.alloc(0)
    let chunk
    while((chunk = this._socket.read()) !== null) {
      rawData = Buffer.concat([rawData, chunk])
    }
    if(rawData.length > 0) {
      decipher.write(rawData)
      let decipherData = Buffer.concat([decipher.read(), decipher.end()])
      this.demux(decipherData)
    }
  }
}

module.exports = SecureChatProtocol