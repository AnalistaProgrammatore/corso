const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')

const createAuthController = require('./auth')
const authController = require('users-db', 'secret')
const app = express()

app.use(bodyParser.json())

app.post('/login', authController.login)
app.get('/checkToken', authController.checkToken)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ ok: false, err: 'INTERNAL_SERVER_ERROR' })
})

http.createServer(app).listen(8080, () => console.log('auth server started at port 8080'))