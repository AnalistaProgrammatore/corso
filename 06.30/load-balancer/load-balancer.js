const http = require('http')
const httpProxy = require('http-proxy')

const upstreams = [
  { ip: '127.0.0.1', port: '8081' },
  { ip: '127.0.0.1', port: '8082' }
]

let index = 0
const proxy = httpProxy.createProxyServer({})
http.createServer((req, res) => {
  // ROUND ROBIN POLICY
  const upstreamTraget = upstreams[index]
  index = (index + 1) % upstreams.length
  console.log('handling request for target', `http://${upstreamTraget.ip}:${upstreamTraget.port}`)
  proxy.web(req, res, { target: `http://${upstreamTraget.ip}:${upstreamTraget.port}`})
}).listen(8080, () => console.log('load balancer started at port 8080'))