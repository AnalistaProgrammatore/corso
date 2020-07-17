const fs = require('fs')
const path = require('path')

function getMockUp(mockup) {
  return (req, res) => {
    const mockupPath = path.resolve(__dirname, mockup)
    console.log(req.params)
    fs.readFile(mockupPath, (err, html) => {
      if(err) {
        console.log(err)
        if(err.code === 'ENOENT') {
          return res.status(404).send('<h1>404 PAGE NOT FOUND</h1>')
        }
        return res.status(500).send('<h1>500 INTERNAL SERVER ERROR</h1>')
      }
      res.status(200).send(html.toString())
    })
  }
}

module.exports = {
  getMockUp
}