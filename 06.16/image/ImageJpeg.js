class ImageJpeg extends Image {
  constructor(path) {
    if(!path.match(/\.jpeg/)) {
      throw new Error(`${path} is not a JPEG`)
    }
   }
}

module.exports = ImageJpeg