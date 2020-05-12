const spider = require('./spider/v5-sequential-pattern')

let nesting = parseInt(process.argv[3])
if(isNaN(nesting)) nesting = 1

spider(process.argv[2], nesting, err => {
  if(err) {
    console.log(err)
    process.exit(0)
  } else {
    console.log('Download complete')
  }
})