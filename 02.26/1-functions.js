const fs = require('fs')
const path = require('path')

const myJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './myjson.json')).toString()
)

const f = function({ a = 50, b = 51 } = {}) {
  console.log(a, b)
}

f(myJson)
f()