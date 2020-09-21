const { courses, home, auth } = require('../controllers')

const course = require('./course')

module.exports = app => {
  /** ROUTER */
  app.get('/', home.get)
  
  app.use('/course', course(courses))

  app.route('/signin')
    .get(auth.signin.get)
    .post(auth.signin.post)
  
  app.route('/signup')
    .get(auth.signup.get)
    .post(auth.signup.post)
}