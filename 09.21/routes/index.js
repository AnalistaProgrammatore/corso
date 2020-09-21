const {
  root,
  signin,
  signup,
  signout
} = require('../controllers')

module.exports = app => {
  app.get('/', root.get),
  app.get('/signup', signup.get)
  app.get('/signin', signin.get)
  app.get('/signout', signout.get)
}