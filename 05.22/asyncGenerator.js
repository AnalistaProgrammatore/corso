const fs = require('fs')

function *readFile(callback) {
  const fileData = yield fs.readFile('generator.js', 'utf8', callback)
  console.log(fileData)
}

function resolveAsync(err, result) {
  if(err) return generator.throw(err)
  generator.next(result)
}

const generator = readFile(resolveAsync)
generator.next()


