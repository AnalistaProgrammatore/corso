module.exports = usersModel => ({ 
  get: [
    (req, res) => {
      res.render('signup')
    }
  ],
  post: [
    (req, res) => {
      usersModel.create(req.body)
        .then(id => res.json({ id, email: req.body.email }))
        .catch(err => {
          console.error(err)
          res.status(422).json({ error: err.message })
        })
    }
  ]
})