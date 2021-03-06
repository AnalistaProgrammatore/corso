const fs = require('fs')
const { promisify } = require('util')
const writeFile = fs.promises.writeFile
const path = require('path')
const request = promisify(require('request'))

const serial = tasks => tasks.reduce(
  (prev, task) => {
    return prev.then(() => task())
  }, Promise.resolve()
)

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

module.exports = { download, serial }