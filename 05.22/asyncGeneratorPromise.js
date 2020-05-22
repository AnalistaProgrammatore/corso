const fs = require('fs')

function run(promise) {
  promise
    .then(result => generator.next(result))
    .catch(err => generator.throw(err))
}

function *readFiles(files) {
  for(const file of files) {
    try {
      const fileData = yield run(fs.promises.readFile(file, 'utf8'))
      console.log(fileData)
    } catch(err) {
      console.log(err)
    } 
  }
}

//asyncFlow(readFile
const generator = readFiles(['generator.js', 'iterables.js', 'makeRangeIterator.js'])
generator.next()
