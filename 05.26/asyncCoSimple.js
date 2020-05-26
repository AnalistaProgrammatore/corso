const fs = require('fs')

function co(generatorFunction, ...args) {
  function run(result) {
    let ret = generator.next(result)
    if(!ret.done) {
      ret.value
        .then(result => run(result))
        .catch(err => generator.throw(err))
    }
  }
  
  let generator = generatorFunction(...args)
  run()
}

const files = [
  process.argv[2], process.argv[3]
]

co(function* () {
  try {
    const first = yield fs.promises.readFile(files[0])
    console.log('first', first)
    const second = yield fs.promises.readFile(files[1])
    console.log('second', second)
  } catch(err) {
    console.log('Failure to read:', err)
  }
})
