const spider = require('./spider/v1')

spider(process.argv[2], (err, filepath, downloaded) => {
  if(err) {
    console.log(err)
  } else if(downloaded) {
    console.log(`Completed the download of "${filepath}"`)
  } else {
    console.log(`"${filepath}" was already downloaded`)
  }
})