const level = require('level')

module.exports = dbName => {
  const db = level(dbName)

  function read(key) {
    return db.get(key)
      .then(value => JSON.parse(value))
      .catch(err => Promise.reject(err))
  }

  return { read }
} 