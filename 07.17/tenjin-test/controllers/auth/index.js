const signin = {
  get: (req, res) => res.render('signin', { title: 'Signin' }),
  post: (req, res) => res.redirect('/')
}

const signup = {
  get: (req, res) => res.render('signup', { title: 'Signup' }),
  post: (req, res) => res.redirect('/')
}

module.exports = { signin, signup }