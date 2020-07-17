const express = require('express')

module.exports = controller => {
  const router = express.Router()
  router.get('/:id', controller.get)
  router.get('/:slug', controller.get)

  return router
}