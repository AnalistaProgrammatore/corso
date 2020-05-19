const fs = require('fs')
const nodePromisify = require('util').promisify

/*fs.readFile('data/course', 'utf-8', (err, result) => {
  if(err) throw err
  console.log(result)
})*/

function readFilePromise(path, ...args) {
  return new Promise((resolve, reject) => {
    console.log('11 begin executor')
    fs.readFile(path, ...args, (err, result) => {
      if(err) return reject(err)
      console.log('14 resolve: ', result)
      resolve(result)
    })
  })
}

const promise = readFilePromise('data/course', 'utf-8')

promise.then(data => {
  console.log('23', promise)
  console.log('24', data)
})

console.log('27', promise)