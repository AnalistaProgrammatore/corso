module.exports = authService => {
  function login(req, res, next) {
    const { username, password } = req.body
    authService.login(username, password)
      .then(token => {
        res.status(200).send({ ok: true, token })
      })
      .catch(err => {
        console.log(err)
        EventEmitters.emit('post-login-error', username, password, token)
        res.status(401).send({ ok: false, err: 'INVALID_LOGIN' })
      })
  }
  
  function checkToken(req, res, next) {
    const { token } = req.query
    authService.checkToken(token)
      .then(user => {
        res.locals.data = { ok: true, user }
        next()
      })
      .catch(err => {
        console.log(err)
        res.status(401).send({ ok: false, err: 'INVALID_TOKEN' })
      })
  }

  return { login, checkToken }
}