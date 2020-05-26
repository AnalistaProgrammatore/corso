const fs = require('fs')

fs.readFile('hello', (err, res) => {
  console.log(Buffer.isBuffer(res))
})

const buffer = Buffer.from([48, 44, 40], 'utf8')
for(const byte of buffer) {
  console.log(Buffer.from([byte]).toString('ascii'))
}

// 100 -> Big Endian
// 001 -> Little Endian -> 4