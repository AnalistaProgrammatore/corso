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
const { urlToFilepath } = require('../utils')

function spider(url, callback) {
  const filepath = urlToFilepath(url)
  fs.access(filepath, fs.constants.F_OK, err => {
    if(err) {
      console.log(`Downloading ${url}`)
      request(url, (err, response, body) => {
        console.log(response.headers)
        if(err) {
          callback(err)
        } else {
          fs.mkdir(path.dirname(filepath), { recursive: true }, err => {
            if(err) {
              callback(err)
            } else {
              fs.writeFile(filepath, body, err => {
                if(err) {
                  callback(err)
                } else {
                  callback(null, filepath, true)
                }
              })
            }
          })
        }
      })
    } else {
      callback(null, filepath, false)
    }
  })
}

module.exports = spider