const ImageJpeg = require('./ImageJpeg')
const ImageGif = require('./ImageGif')
const ImagePng = require('./ImagePng')

/** FACTORY FUNCTION */
function createImage(name) {
  if(name.match(/\.jpeg$/)) {
    return new ImageJpeg(name)
  } else if(name.match(/\.gif$/)) {
    return new ImageGif(name)
  } else if(name.match(/\.png$/)) {
    return new ImagePng(name)
  }
  throw new Error('UNSOPPORTED FORMAT') 
}

module.exports = createImage