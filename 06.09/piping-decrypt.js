const fs = require('fs')
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

function createCaesarDecription(key) {
  return new Decripter(key)
}

const input = fs.createReadStream('hello.txt.enc')
const decrypt = createCaesarDecription(10)
const output = fs.createWriteStream('hello-dec.txt')

input
  .pipe(decrypt)
  .pipe(output)