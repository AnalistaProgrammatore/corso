const fs = require('fs')

function readSync(filename) {
  return fs.readFileSync(filename)
}

function readJsonAsync(filename, callback, callbackWord) {
  fs.readFile(filename, 'utf-8', (err, data) => {
    if(err) return callback(err)
    let parsed
    try {
      parsed = JSON.parse(data)
      parsed['Hello'].forEach(word => callbackWord(word))
    } catch (err) {
      return callback(err)
    }
    callback(null, parsed)
  })
}

//readSync('data.json')

readJsonAsync('data.json', (err, data) => {
  if(err) throw err
  console.log(data)
}, word => console.log(word))

process.on('uncaughtException', err => {
  console.log(err)
  console.log('eccezione')
  process.exit(1)
})