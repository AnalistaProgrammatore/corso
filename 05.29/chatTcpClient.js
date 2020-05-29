const net = require('net')

const connectionToServer = new net.Socket()
connectionToServer.connect(process.argv[3], process.argv[2], () => {
  console.log('Connected to ** CHAT SERVER 1.0 **')
})

connectionToServer.on('readable', () => {
  let chunk
  while((chunk = connectionToServer.read()) !== null) {
    console.log(chunk.toString())
  }
})

/** PROCESSO LETTURA DATI DA CONSOLE */
process.stdin
  .on('readable', () => {
    let chunk
    while((chunk = process.stdin.read()) !== null) {
      connectionToServer.write(chunk) 
    }
  }) 

connectionToServer.on('close', () => console.log('Connection Closed'))