const cluster = require('cluster')
const os = require('os')

if(cluster.isMaster) {
  const cpus = os.cpus().length
  for(let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  /*cluster.on('exit', (worker, code) => {
    if(code !== 0) {
      console.log('Worker crashed. Starting new worker')
      cluster.fork()
    }
  })*/
} else {
  const port = process.argv[2] || 8080
  const createChildServer = require('./app')
  createChildServer(port)
}