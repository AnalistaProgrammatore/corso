const EventEmitter = require('events').EventEmitter
const fs = require('fs')

class FindPattern extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile(file) {
    this.files.push(file)
    return this
  }

  find() {
    for(const file of this.files) {
      fs.readFile(file, 'utf8', (err, content) => {
        if(err) return this.emit('error', err)
        this.emit('fileread', file)
        const match = content.match(this.regex)
        if(match !== null) {
          match.forEach(elem => this.emit('found', file, elem))
        }
      })
    }
    return this
  }
}

module.exports = FindPattern

module.exports.instance = regex => {
  return new FindPattern(regex)
}