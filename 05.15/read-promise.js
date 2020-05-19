const fs = require('fs')

const readFilePromise = fs.promises.readFile

// RISOLUZIONE IN SERIE -> CHAINING
fs.promises.readFile('data/hello', 'utf-8')
  .then(data => {
    console.log(data)
    return readFilePromise('data/course', 'utf-8')
  })
  .then(data => {
    console.log(data)
    return readFilePromise('data/world', 'utf-8')
  })
  .then(data => {
    console.log(data)
    return readFilePromise('data/tenjin', 'utf-8') 
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log('ERRORE!!!!')
    console.log(err)
  })

// ESECUZIONE IN PARALLELO
const promises = [
  readFilePromise('data/course', 'utf-8'),
  readFilePromise('data/hello', 'utf-8'),
  readFilePromise('data/world', 'utf-8'),
  readFilePromise('data/tenjin', 'utf-8')
]

Promise.all(promises)
  .then(data => {
    console.log(data)
  })
  .catch(err => console.log(err))

Promise.race(promises)
  .then(data => {
    console.log(data)
  })
  .catch(err => console.log(err))