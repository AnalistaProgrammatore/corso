const ChatProtocol = require('./ChatProtocol')
const { createCaesarDecription, createCaesarEncryption } = require('./crypto/caesar')

class SecureChatProtocol extends ChatProtocol {
  constructor(socket) {
    super(socket)
    this.key = 10
  }

  static generateSharedKey() {
    const key = Math.floor(Math.random() * (2 ** 8))
    console.log('new key generated:', key)
    return key
  }

  produce(buffer, encoding, callback) {
    const encripter = createCaesarEncryption(this.key)
    encripter.pipe(this._socket)
    encripter.write(buffer, encoding, callback)
  }

  consume(bytes) {
    const decripter = createCaesarDecription(this.key)
    const readedBytes = this._socket.read(bytes)
    if(!readedBytes) return null
    decripter.write(readedBytes)
    const data = decripter.read(bytes)
    return data
  }
}

module.exports = SecureChatProtocol