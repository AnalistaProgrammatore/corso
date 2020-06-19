const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')

const serviceLocator = require('./lib/serviceLocator')

serviceLocator.register('dbName', 'users-db')
serviceLocator.register('secretKey', 'secret')
serviceLocator.factory('db', require('./auth/db'))
serviceLocator.factory('authService', require('./auth/authService'))
serviceLocator.factory('authController', require('./auth/authController'))

const authController = serviceLocator.get('authController')

const app = express()

app.use(bodyParser.json())

app.post('/login', authController.login)
app.get('/checkToken', authController.checkToken)

app.use((err, req, res, next) => {
  res.status(500).send({ ok: false, err: 'INTERNAL_SERVER_ERROR' })
})

http.createServer(app).listen(8080, () => console.log('auth server started at port 8080'))