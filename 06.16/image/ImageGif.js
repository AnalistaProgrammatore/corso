class ImageGif extends Image {
  constructor(path) {
    if(!path.match(/\.gif/)) {
      throw new Error(`${path} is not a GIF`)
    }
   }
}

module.exports = ImageGif