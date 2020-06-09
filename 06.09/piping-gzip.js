const fs = require('fs')
const zlib = require('zlib')

const input = fs.createReadStream('hello.txt')
const gzip = zlib.createGzip()
const output = fs.createWriteStream('hello.txt.gz')

input
  .pipe(gzip)
  .pipe(output)