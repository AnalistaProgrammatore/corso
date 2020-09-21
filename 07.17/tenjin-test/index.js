const path = require('path')
const http = require('http')
const express = require('express')
const app = express()
const router = require('./routes')

const port = process.argv[2] || process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
router(app)

app.all('*', (req, res) => res.status(404).send('<h1>404 NOT FOUND</h1>')) // FALLBACK 404

http.createServer(app).listen(port, () => console.log('Tenjin listen to port', port))
