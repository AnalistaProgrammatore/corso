const level = require('level')

const db = level('users-db')

function read(key) {
  return db.get(key)
    .then(value => JSON.parse(value))
    .catch(err => Promise.reject(err))
}

module.exports = { read }