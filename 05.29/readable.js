const Chance = require('chance')
const stream = require('stream')
const fs = require('fs')

const chance = new Chance()

class RandomStream extends stream.Readable {
  constructor(options) {
    super()
  }

  _read(size) {
    const chunk = chance.string()
    this.push(chunk, 'utf8')
    if(chance.bool({ likelihood: 50 })) {
      this.push(null)
    }
  }
}

class StdInStream extends stream.Readable {
  constructor(options) {
    super(options)
  }

  _read(size = 16 * 1024) {
    const buffer = Buffer.alloc(size)  
    fs.read(0, buffer, 0, size, 0, (err, numBytes, bufRef) => {
      if(err) return this.emit('error', err)
      this.push(bufRef)
    })
  }
}

/*const stdin = new StdInStream()
stdin.on('readable', () => {
  let chunk
  while((chunk = randomStream.read()) !== null) {
    console.log('Chunk received: ', chunk.toString())
  }
})*/


const randomStream = new RandomStream()
randomStream
  .on('readable', () => {
    let chunk
    console.log('data available')
    while((chunk = randomStream.read(1)) !== null) {
      console.log('Chunk received: ', chunk.toString())
    }
  })