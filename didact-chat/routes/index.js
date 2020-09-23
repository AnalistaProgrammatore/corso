const {
  root,
  signin,
  signup,
  signout
} = require('../controllers')

module.exports = (app, models) => {
  app.get('/', root().get),
  app.get('/signup', signup(models.users).get)
  app.post('/signup', signup(models.users).post)
  app.get('/signin', signin().get)
  app.get('/signout', signout().get)
}