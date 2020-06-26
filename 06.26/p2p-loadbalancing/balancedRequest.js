const http = require('http');
const servers = [
  { ip: 'localhost', port: '8081' },
  { ip: 'localhost', port: '8082' }
]

let index = 0;

module.exports = (options, callback) => {
  //ROUND ROBIN
  const target = servers[index]
  index = (index + 1) % servers.length
  return http.request(
    { ...options, hostname: target.ip, port: target.port },
    res => {
      let str
      res.on('data', chunk => {
        str += chunk.toString()
      })
      .on('end', () => {
        callback(null, str)
      })
      .on('err', () => callback(err))
    }
  ).end()
}