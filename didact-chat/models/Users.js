const { createHash } = require('crypto')
const BaseModel = require('./BaseModel')

class Users extends BaseModel {
  static EMAIL_REGEX = /\S+@\S+\.\S+/
  static ERRORS = {
    EMPTY_USERNAME: 'EMPTY_USERNAME',
    EMPTY_EMAIL: 'EMPTY_EMAIL',
    INVALID_EMAIL: 'INVALID_EMAIL'
  }
  constructor() {
    super('users')
    this.error = null
  }

  async create(user) {
    if(!this.validate(user)) throw this.error
    user.password = this.cryptPassword(user.password)
    console.log('create user:', user)
    return await super.create(user)
  }

  async update(email, user) {
    if(!this.validate(user)) throw this.error
    user.password = this.cryptPassword(user.password)
    console.log('update user:', email, user)
    await super.update(email, user)
  }

  validate(user) {
    if(user.username === '') {
      this.error = new Error(Users.ERRORS.EMPTY_USERNAME)
      return false
    }
    if(user.email === '') {
      this.error = new Error(Users.ERRORS.EMPTY_EMAIL)
      return false
    }
    if(!Users.EMAIL_REGEX.test(user.email)) {
      this.error = new Error(Users.ERRORS.INVALID_EMAIL)
      return false
    }
    return true
  }

  cryptPassword(password) {
    const hash = createHash('sha256')
    hash.update(password)
    return hash.digest('hex')
  }
}

module.exports = Users