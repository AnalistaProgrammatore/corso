const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const request = promisify(require('request'))
const readFile = fs.promises.readFile
const writeFile = fs.promises.writeFile
const { urlToFilepath, getPageLinks } = require('../utils')

function saveFile(filepath, contents) {
  return fs.promises.mkdir(path.dirname(filepath), { recursive: true })
    .then(() => writeFile(filepath, contents))
    .then(() => {
      console.log(`Downloaded and saved: ${filepath}`)
      return contents
    })
    .catch(err => Promise.reject(err))
}

function download(url, filepath) {
  return request(url)
    .then(response => {
      return saveFile(filepath, response.body)
    })
    .catch(err => Promise.reject(err))
}

function spiderLinks(currentUrl, body, nesting) {
  let promise = Promise.resolve()
  if(nesting === 0) return promise
  
  const links = getPageLinks(currentUrl, body)
  for(const link of links) {
    promise = promise.then(() => spider(link, nesting-1))
  }

  return promise
}

const visited = new Map()

function spider(url, nesting) {
  if(visited.has(url)) {
    return Promise.resolve()
  }

  visited.set(url, true)
  const filepath = urlToFilepath(url)
  return readFile(filepath, 'utf-8')
    .then(body => spiderLinks(url, body, nesting))
    .catch(err => {
      if(err.code !== 'ENOENT') return Promise.reject(err)
      return download(url, filepath)
        .then(body => spiderLinks(url, body, nesting))
    })
}

module.exports = spider