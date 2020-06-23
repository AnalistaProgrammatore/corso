/** VERSIONE: Explicit extension -> Plugin controlled extension */
/** CORE DELL'APPLICAZIONE: tendenzialmente l'entry point */
const express = require('express')
const app = express()
const thePlugin = require('thePlugin')
// inizializzo il plugin
thePlugin(app)

/** PLUGIN */
module.exports = function (app) {
  app.get('/newRoute', function(req, res) {
    //....
  })
}

/** VERSIONE: IoC -> Inversion of Control -> Application controlled extension */
/** CORE DELL'APPLICAZIONE: tendenzialmente l'entry point */
const express = require('express')
const app = express()

const thePlugin = require('thePlugin')()

//inizializzo il plugin
app[thePlugin.method](thePlugin.route, thePlugin.handler)


/** PLUGIN */
module.exports = function () {
  return {
    method: 'get',
    route: '/newRoute',
    handler: function(req, res) {
      //...
    }
  }
}