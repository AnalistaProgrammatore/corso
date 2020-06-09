const fs = require('fs')
const zlib = require('zlib')

const input = fs.createReadStream('hello.txt.gz')
const gunzip = zlib.createGunzip()
const output = fs.createWriteStream('hello-gunzip.txt')

input
  .pipe(gunzip)
  .pipe(output)