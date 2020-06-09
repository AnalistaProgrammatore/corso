const fs = require('fs')
const stream = require('stream')

const MAX = 2 ** 8

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

const input = fs.createReadStream('hello.txt')
const encrypt = createCaesarEncryption(10)
const output = fs.createWriteStream('hello.txt.enc')

input
  .pipe(encrypt)
  .pipe(output)