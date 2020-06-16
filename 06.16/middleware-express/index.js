const fs = require('fs')
const express = require('express')
const http = require('http')
const app = express()
const bodyParser = require('body-parser')

function loadTemplateFromQuery(template) {
  return (req, res, next) => {
    res.locals.template = template
    if(req.query.template) {
      res.locals.template = `${req.query.template}.html`
    }
    next()
  }
}

function loadTemplate(req, res, next) {
  fs.promises.readFile(res.locals.template, 'utf8')
    .then(data => {
      res.locals.data = data
      next()
    })
    .catch(err => next(err))
}

const createTemplateMiddleware = function(template) {
  return [
    loadTemplateFromQuery(template),
    loadTemplate,
    (req, res) => {
      res.send(res.locals.data)
    }
  ]
}

function login(req, res, next) {
  console.log(req.body)
  res.send('ok')
}

const routes = {
  '/': {
    method: 'get',
    stack: createTemplateMiddleware('index.html'),
  },
  '/course/:id': {
    method: 'get',
    stack: createTemplateMiddleware('course.html')
  },
  '/signin': [
    {
      method: 'get',
      stack: createTemplateMiddleware('signin.html')
    },
    {
      method: 'post',
      stack: login
    }
  ]
}

/**
 * @see https://github.com/expressjs/body-parser
 * @see http://expressjs.com/en/resources/middleware/body-parser.html
 */
const bodyParserMiddleware = bodyParser.urlencoded({ extended: false })

const endpoints = Object.keys(routes)
for(const endpoint of endpoints) {
  const endpointRoutes = Array.isArray(routes[endpoint]) ? routes[endpoint] : [routes[endpoint]]

  for(const route of endpointRoutes) {
    console.log(`configuring middleware for endpoint ${endpoint} for http method ${route.method}`)
    app[route.method](endpoint, bodyParserMiddleware, route.stack)
  }
}

app.use((err, req, res, next) => {
  if(err.code === 'ENOENT') return res.status(404).send('<h1>Page not found</h1>')
  res.status(500).send('<h1>Internal Server Error</h1>')
})

const server = http.createServer(app)
server.listen('8080', () => console.log('server start at port 8080'))