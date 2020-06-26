const http = require('http')
const pid = process.pid

const port = process.argv[2] || 8080

http.createServer((req, res) => {
  for (let i = 1e7; i > 0; i--) {}
  console.log(`Handling request from ${pid}`);
  res.end(`Hello from ${pid}\n`);
}).listen(port, () => console.log('server listening on port', port))