const fs = require('fs')
const nodePromisify = require('util').promisify

/**
fs.readFile('data/course', 'utf-8', (err, result) => {
  if(err) throw err
  console.log(result)
})

function readFilePromise(path, ...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, ...args, (err, result) => {
      if(err) return reject(err)
      resolve(result)
    })
  })
}

readFilePromise('data/course', 'utf-8')
  .then(data => console.log(data))
  .catch(err => {
    throw err
  })
*/

/**
 * 
 * @param {Function} f una funzione asincrona gestita tramite callback(err, results) 
 */
function promisify(f) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      const callback = (err, ...results) => {
        if(err) return reject(err)
        resolve(...results)
      }
      args.push(callback)
      f.call(this, ...args)
    })
  }
}

const readFilePromise = promisify(fs.readFile)
readFilePromise('data/course', 'utf-8')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    throw err
  })

const readFilePromiseNode = nodePromisify(fs.readFile)
readFilePromiseNode('data/course', 'utf-8')
  .then(data => console.log(data))
  .catch(err => {
    throw err
  })