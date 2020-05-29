const stream = require('stream')
const fs = require('fs')
const path = require('path')

class ToFileStream extends stream.Writable {
  constructor() {
    super({ objectMode: true })
  }

  _write(chunk, encoding, callback) {
    fs.mkdir(path.dirname(chunk.path), { recursive: true }, err => {
      if(err) return callback(err)
      fs.writeFile(chunk.path, chunk.content, callback)
    })
  }
}

const tfs = new ToFileStream()
tfs.write({ path: 'file1.txt', content: 'hello world' })
tfs.write({ path: 'dir/file.txt', content: 'hello dir world' })