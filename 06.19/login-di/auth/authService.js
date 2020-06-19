const jwt = require('jwt-simple')

module.exports = (db, secretKey) => {

  const tokenSecret = secretKey
  const users = db

  function login(username, password) {
    return users.read(username)
      .then(user => {
        console.log(user, username)
        if(user.password !== password) return Promise.reject(new Error('INVALID_LOGIN'))
        const token = jwt.encode({
          username: username,
          expire: Date.now() + (1000 * 60 * 60)
        }, tokenSecret)
        
        return token 
      })
      .catch(err => Promise.reject(err))
  }

  function checkToken(token) {
    let userData
    try {
      userData = jwt.decode(token, tokenSecret)
      if(userData.expire <= Date.now()) return Promise.reject(new Error('TOKEN_EXPIRED'))
    } catch(err) {
      return Promise.reject(err)
    }

    return users.read(userData.username)
      .then(user => {
        return { ...user, username: userData.username }
      })
  }

  return { login, checkToken }
}