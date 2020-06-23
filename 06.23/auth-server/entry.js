const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')

// inizializzazione dei plugins
const installedPlugins = [
  { id: 0, name: 'auth-logout' }
]

for(const plugin of installedPlugins) {
  try {
    const install = require(plugin.name)
    console.log(install)
    install(app)
  } catch(err) {
    console.log(err)
  }
}

const authController = require('./lib/authController')

const app = express()

app.use(bodyParser.json())

app.post('/login', authController.login)
app.get('/checkToken', authController.checkToken)

app.use((err, req, res, next) => {
  res.status(500).send({ ok: false, err: 'INTERNAL_SERVER_ERROR' })
})

http.createServer(app).listen(8080, () => console.log('auth server started at port 8080'))