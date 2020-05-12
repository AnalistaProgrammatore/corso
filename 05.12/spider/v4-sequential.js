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
  
  /**
   * 1. LISTA LINK
   * 2. ITERARE i links usando una funzione iteratore che prende in input l'indice dell'array dei link
   * 3. CASO BASE: fermare l'iterazione quando l'indice passato in input alla funzione iteratore è uguale alla length dell'array dei links
   * 4. richiamare la funzione spider sul link che la funzione iteratore sta analizzando
   * 5. iterare al link successivo -> incrementare di 1 l'indice
   */
  function iterate(index) { // 2
    if(index === links.length) return process.nextTick(() => callback()) // 3
    spider(links[index], nesting - 1, err => { // 4
      if(err) return callback(err)
      iterate(index + 1) // 5
    })
  }

  iterate(0)
}

function spider(url, nesting, callback) {
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