const fs = require('fs')

const cache = {}

function consistentReadSync(filename, callback) {
  if(cache[filename]) {
    return cache[filename]
  } else {
    return fs.readFileSync(filename, 'utf-8')
  }
}

function consistentReadAsync(filename, callback) {
  if(cache[filename]) {
    process.nextTick(() => callback(cache[filename]))
  } else {
    fs.readFile(filename, 'utf-8', (err, data) => {
      cache[filename] = data
      callback(data)
    })
  }
}

function inconsistentRead(filename, callback) {
  if(cache[filename]) {
    callback(cache[filename])
  } else {
    fs.readFile(filename, 'utf-8', (err, data) => {
      cache[filename] = data
      callback(data)
    })
  }
}

function createFileReader(filename) {
  const listeners = []
  consistentReadAsync(filename, value => {
    listeners.forEach(listener => listener(value))
  })

  return {
    onDataReady: listener => listeners.push(listener)
  }
}

const reader1 = createFileReader('racer.js')
reader1.onDataReady(data => {
  console.log('first call',)

  const reader2 = createFileReader('racer.js')
  reader2.onDataReady(data => {
    console.log('Second call')
  })

  const reader3 = createFileReader('racer.js')
  reader3.onDataReady(data => {
    console.log('Third call')
  })
})