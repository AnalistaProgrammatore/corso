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
    console.log(getPageLinks(url, body))
    saveFile(filepath, body, err => {
      if(err) return callback(err)
      console.log(`Downloaded and saved: ${url}`)
      callback(null, body)
    })
  })
}

function spider(url, callback) {
  const filepath = urlToFilepath(url)
  fs.access(filepath, fs.constants.F_OK, err => {
    if (!err) return callback(null, filepath, false)
    console.log(`Downloading ${url}`)
    download(url, filepath, err => {
      if(err) return callback(err)
      callback(null, filepath, true )
    })
  })
}

module.exports = spider