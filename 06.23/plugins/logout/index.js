const parentRequire = module.parent.require 

const authService = parentRequire('./lib/authService')
const tokenDb = parentRequire('./lib/tokenDb')

module.exports = function(app) {
  const oldLogin = authService.login
  authService.login = (username, password) => {
    oldLogin(username, password)
      .then(token => {
        return tokenDb.put(token, { username })
      })
      .catch(err => Promise.reject(err))
  }

  const oldCheckToken = authService.checkToken
  authService.checkToken = token => {
    tokenDb.get(token)
      .then(res => oldCheckToken(res))
      .catch(err => Promise.reject(err))
  }

  authService.logout = token => {
    return tokenDb.del(token)
  }
  
  app.get('/logout', (req, res) => {
    authService.logout(req.query.token)
      .then(() => {
        res.status.status(200).send({ ok: true })
      })
  })
}