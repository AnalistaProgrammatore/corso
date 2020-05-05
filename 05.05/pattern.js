const EventEmmiter = require('events').EventEmitter
const FindPattern = require('./FindPattern')
const fs = require('fs')

function findPattern(files, regex) {
  const emitter = new EventEmmiter()
  for(const file of files) {
    fs.readFile(file, 'utf8', (err, content) => {
      if(err) return emitter.emit('error', err)
      emitter.emit('fileread', file)
      const match = content.match(regex)
      if(match !== null) {
        match.forEach(elem => emitter.emit('found', file, elem))
      }
    })
  }
  return emitter
}

const patternEmitter = findPattern(['data.json', 'data'], /Hello \w+/g)
patternEmitter
  .on('fileread', fileName => console.log(fileName, 'was read'))
  .on('found', (fileName, element) => console.log('found ', element, ' in ', fileName))
  .on('error', err => console.log(err))

console.log('ciao ciao')

patternEmitter.on('found', (fileName, element) => console.log('ho trovateo ', element))

const findPatternObject = new FindPattern(/Hello \w+/g)
findPatternObject.on('ready', () => console.log('ready'))
findPatternObject
  .addFile('data.json')
  .addFile('data')
  .find()
  .on('fileread', fileName => console.log(fileName, 'was read'))
  .on('found', (fileName, element) => console.log('found ', element, ' in ', fileName))
  .on('error', err => console.log(err))