const level = require('level')
const uuid = require('uuid').v4

const usersDb = level('users-db')
const users = [
  { username: 'marco', password: 'secret' },
  { username: 'aldo', password: 'secret' },
  { username: 'claudio', password: 'secret' }
]

const insertPromises = users.map(user => usersDb.put(user.username, JSON.stringify({ password: user.password })))

Promise.all(insertPromises)
  .then(users => {
    console.log(users)
  })