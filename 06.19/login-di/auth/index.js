const createAuthController = require('./authController')
const createAuthService = require('./authService')
const createDb = require('./db')

module.exports = (dbName, secretKey) => {
  const db = createDb(dbName)
  const authService = createAuthService(db, secretKey)
  const authController = createAuthController(authService)

  return authController
} 