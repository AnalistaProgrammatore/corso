class ImagePng extends Image {
  constructor(path) {
    if(!path.match(/\.png/)) {
      throw new Error(`${path} is not a PNG`)
    }
   }
}

module.exports = ImagePng