const fs = require('fs')
const http = require('http')
const express = require('express')
const app = express()
const router = require('./routes')

const port = process.argv[2] || process.env.PORT

app.use(express.static('public'))
router(app)

http.createServer(app).listen(port, () => console.log('Tenjin listen to port', port))
