const express = require('express')
const path = require('path')
const createWebSocketNetwork = require('./lib/websocket')

const router = require('./routes')


const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const port = process.argv[2] || process.env.PORT

app.use('/assets', express.static('public'))
app.use('/bootstrap/css', express.static(path.resolve(__dirname, './node_modules/bootstrap/dist/css')))
app.use('/bootstrap/js', express.static(path.resolve(__dirname, './node_modules/bootstrap/dist/js')))
app.use('/jquery/js', express.static(path.resolve(__dirname, './node_modules/jquery/dist/')))
router(app)

app.use('*', (req, res) => {
  console.log('[404]', req.path, 'not found')
  res.status(404).render('404')
})

app.use((err, req, res) => {
  console.error(err)
  res.status(500).render('500', { err })
})

const server = require('http').createServer(app).listen(port, () => console.log(`server listening to ${port}`))
createWebSocketNetwork(server)
