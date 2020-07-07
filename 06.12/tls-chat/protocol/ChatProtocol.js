const tls = require('tls')
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

  connect(options, port, host, callback) {
    const socket = tls.connect(port, host, options, callback)
    this.decorate(socket)
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
    let data = Buffer.alloc(0)
    let chunk
    while((chunk = this._socket.read()) !== null) {
      data = Buffer.concat([data, chunk])
    }
    if(data.length > 0) this.demux(data) 
  }

  /**
   * 
   * @param {Buffer} data 
   */
  demux(data) {
    let dataLength = data.slice(0, 4).readUInt32BE()
    if(dataLength > ChatProtocol.JSON_SIZE_LIMIT) {
      this._socket.destroy(new Error('MAX_LENGTH_EXEEDED'))
      return
    }

    let checksum = data.slice(4, 4 + 64)
    let body = data.slice(4 + 64)

    if(checksum.toString() !== this.checksum(body.toString())) {
      this._socket.destroy(new Error('INVALID_CHECKSUM'))
      return
    }

    let object
    try {
      object = JSON.parse(body.toString())
    } catch(err) {
      this._socket.destroy(err)
      return
    }
    this.push(object)
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
    this.produce(buffer, encoding, callback)
  }

  produce(buffer, encoding, callback) {
    this._socket.write(buffer, encoding, callback)
  }

  _final(callback) {
    this._socket.end(callback)
  }
}

Object.assign(ChatProtocol.prototype, CommandsMixin)

module.exports = ChatProtocol