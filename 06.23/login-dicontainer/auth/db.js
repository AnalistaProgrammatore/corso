const level = require('level')

module.exports = serviceLocator => {
  const dbName = serviceLocator.get('dbName')
  const db = level(dbName)

  function read(key) {
    return db.get(key)
      .then(value => JSON.parse(value))
      .catch(err => Promise.reject(err))
  }

  return { read }
} 