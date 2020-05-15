const express = require('express')
const app = express()
const port = 3000

app.all('/', (req, res) => {
  console.log('home page request')
  res.send('<h1>Hello HOME PAGE!</h1>')
})

app.all('/course/:id', (req, res) => {
  const id = req.params.id
  console.log('course page request with id', id)
  res.send(`<h1>Hello COURSE ${id}!</h1>`)
})

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})
