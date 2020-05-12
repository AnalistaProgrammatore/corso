/**
 * ALGORITMO DI MINING
 * 1. Controllo che il file che devo scrivere non esista -> utilizzo fs.access()
 * 2. Faccio una request HTTP al URL che viene fornito in input -> utilizzo libreria request
 * 3. Creo la directory e le sotto-direcotry che dovranno contenere il file -> utilizzo fs.mkdir ricorsivo
 * 4. Scrivo il file nella cartella creata -> utilizzo fs.writeFile
 */
const fs = require('fs')
const path = require('path')
const request = require('request')
const { urlToFilepath, getPageLinks } = require('../utils')
const TaskQueue = require('../utils/TaskQueue')
const downloadQueue = new TaskQueue(2)


function saveFile(filepath, contents, callback) {
  fs.mkdir(path.dirname(filepath), { recursive: true }, err => {
    if (err) return callback(err)
    fs.writeFile(filepath, contents, err => {
      if (err) return callback(err)
      callback(null, filepath, true)
    })
  })
}

function download(url, filepath, callback) {
  request(url, (err, response, body) => {
    if (err) return callback(err)
    saveFile(filepath, body, err => {
      if(err) return callback(err)
      console.log(`Downloaded and saved: ${url}`)
      callback(null, body)
    })
  })
}

function spiderLinks(currentUrl, body, nesting, callback) {
  if(nesting === 0) return process.nextTick(() => callback())
  //LISTA DEI LINK PRESENTI NELLA PAGINA CHE STO ANALIZZANDO -> currentUrl
  const links = getPageLinks(currentUrl, body) // 1
  if(links.length === 0) return process.nextTick(() => callback())

  let completed = 0, hasErrors = false
  links.forEach(link => {
    downloadQueue.push(done => {
      spider(link, nesting - 1, err => {
        if(err) {
          hasErrors = true
          return callback(err)
        }
        completed += 1
        if(completed === links.length && !hasErrors) {
          callback()
        }
        done()
      })
    })
  })
}

const visited = new Map()
function spider(url, nesting, callback) {
  if(visited.has(url)) {
    return process.nextTick(callback)
  }

  visited.set(url, true)

  const filepath = urlToFilepath(url)
  fs.readFile(filepath, 'utf8', (err, body) => {
    if(err) {
      if(err.code !== 'ENOENT') return callback(err)
      return download(url, filepath, (err, body) => {
        if(err) return callback(err)
        spiderLinks(url, body, nesting, callback)
      })
    }
    spiderLinks(url, body, nesting, callback)
  })
}

module.exports = spider