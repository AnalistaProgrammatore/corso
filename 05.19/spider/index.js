const spider = require('./lib/v4')

let nesting = parseInt(process.argv[3])
if(isNaN(nesting)) nesting = 1

spider(process.argv[2], nesting)
  .then(() => console.log('Download complete'))
  .catch(err => console.log(err))