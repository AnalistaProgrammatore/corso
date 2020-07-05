const net = require('net')
const stream = require('stream')
const crypto = require('crypto')
const uuid = require('uuid').v4
const CommandsMixin = require('./CommandsMixin')

/** DECORATOR */
class ChatProtocol extends stream.Duplex {
  static JSON_SIZE_LIMIT = 2 ** 18 // 256KB

  constructor(socket) {
    super({ objectMode: true })

    this.name = '#unnamed'
    this.uuid = uuid()

    this.paused = false
    if(socket) this.decorate(socket)
  }

  decorate(socket) {
    this._socket = socket
    this.remoteAddress = socket.remoteAddress
    this._socket.on('close', err => this.emit('close', err))
    this._socket.on('connect', () => this.emit('connect'))
    this._socket.on('drain', () => this.emit('drain'))
    this._socket.on('end', () => this.emit('end'))
    this._socket.on('error', err => this.emit('error', err))
    this._socket.on('lookup', (err, address, family, host) => this.emit('lookup', err, address, family, host))
    this._socket.on('ready', () => this.emit('ready'))
    this._socket.on('timeout', () => this.emit('timeout'))
    this._socket.on('readable', this.onReadable.bind(this))
  }

  connect(port, host, callback) {
    const socket = new net.Socket()
    this.decorate(socket)
    this._socket.connect(port, host, callback)
    return this
  }

  checksum(data) {
    const hash = crypto.createHash('sha256')
    hash.setEncoding('hex')
    hash.write(data)
    hash.end()
    return hash.read()
  }

  onReadable() {
    while(!this.paused) {
      /** @type {Buffer} */
      let lenBuffer = this._socket.read(4)
      if(!lenBuffer) return

      //convertiamo il buffer in un intero senza sengo a 32 bit
      let dataLength = lenBuffer.readUInt32BE()
      if(dataLength > ChatProtocol.JSON_SIZE_LIMIT) {
        this._socket.destroy(new Error('MAX_LENGTH_EXCEDED'))
        return
      }

      let checksum = this._socket.read(64)
      if(!checksum) {
        this._socket.unshift(lenBuffer)
        return
      }

      let body = this._socket.read(dataLength)
      if(!body) {
        this._socket.unshift(lenBuffer)
        return
      }

      if(checksum.toString() !== this.checksum(body.toString())) {
        this._socket.destroy(new Error('INVALID_CHECKSUM'))
        return
      }

      let object
      try {
        object = JSON.parse(body.toString())
      } catch (err) {
        this._socket.destroy(err)
        return
      }

      let notBackPressure = this.push(object)

      if (!notBackPressure) {
        this.paused = true
      }
    }
  }

  _read() {
    this.paused = false
    setImmediate(this.onReadable.bind(this))
  }

  _write(object, encoding, callback) {
    let json = JSON.stringify(object)
    let jsonBytes = Buffer.byteLength(json)
    let buffer = Buffer.alloc(4 + 64 + jsonBytes)
    buffer.writeUInt32BE(jsonBytes)
    buffer.write(this.checksum(json), 4)
    buffer.write(json, 4 + 64)
    this._socket.write(buffer, encoding, callback)
  }

  _final(callback) {
    this._socket.end(callback)
  }
}

Object.assign(ChatProtocol.prototype, CommandsMixin)

module.exports = ChatProtocol