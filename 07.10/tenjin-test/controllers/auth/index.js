const signin = {
  get: (req, res) => res.status(200).send('<h1>Hello SignIn</h1>'),
  post: (req, res) => res.redirect('/')
}

const signup = {
  get: (req, res) => res.status(200).send('<h1>Hello SignUp</h1>'),
  post: (req, res) => res.redirect('/')
}

module.exports = { signin, signup }