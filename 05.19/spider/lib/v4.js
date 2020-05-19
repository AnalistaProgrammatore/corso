const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const request = promisify(require('request'))
const readFile = fs.promises.readFile
const writeFile = fs.promises.writeFile

function saveFile(filepath, contents) {
  return fs.promises.mkdir(path.dirname(filepath), { recursive: true })
    .then(() => writeFile(filepath, contents))
    .catch(err => Promise.reject(err))
}

function download(url, filepath) {
  return request(url)
    .then(response => {
      return saveFile(filepath, response.body)
    })
    .catch(err => Promise.reject(err))
}

function spider(url, nesting) {
  const filepath = urlToFilepath(url)
  return readFile(filepath, 'utf-8')
    .catch(err => {
      if(err.code !== 'ENOENT') return Promise.reject(err)
      return download(url, filepath)
    })
}

module.exports = spider