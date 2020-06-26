const request = require('./balancedRequest')

for(let i = 10; i >= 0; i--) {
  request({ method: 'GET', path: '/'}, (err, res) => {
    if(err) throw err
    console.log(res)
  })
}