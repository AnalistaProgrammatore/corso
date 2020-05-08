const urlParse = require('url').parse
const slug = require('slug')
const path = require('path')

function urlToFilename(url) {
  const parsedUrl = urlParse(url);
  const urlPath = parsedUrl.path.split('/')
    .filter(component => component !== '')
    .map(component => slug(component))
    .join('/');
  let filename = path.join(parsedUrl.hostname, urlPath)
  if(!path.extname(filename).match(/htm/)) {
    filename += '.html'
  }
  return filename
}

module.exports = { urlToFilename }