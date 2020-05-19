const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const request = promisify(require('request'))
const readFile = fs.promises.readFile
const writeFile = fs.promises.writeFile
const TaskQueue = require('../utils/TaskQueue')
const { urlToFilepath, getPageLinks } = require('../utils')

const downloadQueue = new TaskQueue(2)

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
  if(nesting === 0) return Promise.resolve()

  const links = getPageLinks(currentUrl, body)
  if(links.length === 0) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    let completed = 0
    let errored = false
    for(const link of links) {
      let task = () => {
        return spider(link, nesting - 1)
          .then(() => {
            completed += 1
            if(completed === links.length) {
              resolve()
            }
          })
          .catch(() => {
            if(!errored) {
              errored = true
              reject()
            }
          })
      }
      downloadQueue.push(task)
    }
  })
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