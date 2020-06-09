const stream = require('stream')

const MAX = 2 ** 8

class Decripter extends stream.Transform {
  constructor(key) {
    super()
    this.key = key
  }
  _transform(chunk, encoding, callback) {
    let decriptedBuffer = this.decript(chunk)
    this.push(decriptedBuffer)
    callback()
  }

  decript(chunk) {
    let decriptedBuffer = Buffer.alloc(chunk.length)
    for(let i = 0; i < chunk.length; i++) {
      decriptedBuffer[i] = (chunk[i] - this.key) % MAX
    }
    return decriptedBuffer
  }
}

class Encripter extends stream.Transform {
  constructor(key) {
    super()
    this.key = key
  }
  
  _transform(chunk, encoding, callback) {
    let encryptedBuffer = this.encrypt(chunk)
    this.push(encryptedBuffer)
    callback()
  }

  encrypt(chunk) {
    let encryptedBuffer = Buffer.alloc(chunk.length)
    for(let i = 0; i < chunk.length; i++) {
      encryptedBuffer[i] = (chunk[i] + this.key) % MAX
    }
    return encryptedBuffer
  }
}

function createCaesarEncryption(key) {
  return new Encripter(key)
}

function createCaesarDecription(key) {
  return new Decripter(key)
}

module.exports = { createCaesarDecription, createCaesarEncryption }