const level = require('level')

const db = level('tokens-db')

function read(key) {
  return db.get(key)
    .then(value => JSON.parse(value))
    .catch(err => Promise.reject(err))
}

function put(key, object) {
  return db.put(key, JSON.stringify(object))
}

function del(key) {
  return db.del(key)
}

module.exports = { read, put, del }