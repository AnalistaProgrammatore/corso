const fs = require('fs')
const path = require('path')

function thunkify(fn) {
  return function(...args) {
    const context = this
    return function(callback) {
      args.push((...args) => callback(...args))
      fn.apply(context, args)
    }
  }
}

const readFileThunk = thunkify(fs.readFile)
const writeFileThunk = thunkify(fs.writeFile)

function asyncFlow(generatorFunction) {
  function callback(err, ...args) {
    if(err) return generator.throw(err)
    const thunk = generator.next(args.length > 1 ? args : args[0]).value
    thunk && thunk(callback)
  }

  const generator = generatorFunction()
  const thunk = generator.next().value
  thunk && thunk(callback)
}


asyncFlow(function* () {
  const fileName = path.basename(__filename)
  const myself = yield readFileThunk(fileName, 'utf8')
  yield writeFileThunk(`clone_of_${fileName}`, myself)
  console.log('Clone created')
})
