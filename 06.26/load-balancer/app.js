const http = require('http')
const pid = process.pid

const createChildServer = port => {
  http.createServer((req, res) => {
    for(let i = 1e7; i > 0; i--) {}
    console.log(`Handling request from ${pid}`)
    res.end(`Hello from ${pid}\n`)
  }).listen(port, () => console.log(`Started ${pid} at port ${port}`))   
}
// RANDOM CRASH
/*setTimeout(() => {
  throw new Error('ERROR')
}, Math.ceil(Math.random() * 3) * 1000)*/

module.exports = createChildServer