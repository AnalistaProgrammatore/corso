const express = require('express')

const app = express()

const port = process.argv[2] || process.env.PORT

app.use(express.static('public'))
const server = require('http').createServer(app).listen(port, () => console.log(`server listening to ${port}`))

