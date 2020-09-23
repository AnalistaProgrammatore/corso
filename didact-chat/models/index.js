const Users = require('./Users')

async function connect() {
  const users = await Users.connect()
  return { users }
}

module.exports = connect