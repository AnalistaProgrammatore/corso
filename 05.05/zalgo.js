const fs = require('fs')

const cache = {}

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

function syncRead(filename) {
  if(cache[filename]) {
    return cache[filename]
  }
  cache[filename] = fs.readFileSync(filename)
  return cache[filename]
}

function asyncRead(filename, callback) {
  if(cache[filename]) {
    process.nextTick(() => callback(cache[filename]))
  } else {
    fs.readFile(filename, 'utf-8', (err, data) => {
      cache[filename] = data
      callback(data)
    })
  }
}

function createFileReader(filename) {
  const listeners = []
  asyncRead(filename, value => {
    listeners.forEach(listener => listener(value))
  })

  return {
    onDataReady: listener => {
      listeners.push(listener)
    }
  }
}

const reader1 = createFileReader('data')
reader1.onDataReady(data => {
  console.log('first call',)

  const reader2 = createFileReader('data')
  reader2.onDataReady(data => {
    console.log('Second call')
  })
})