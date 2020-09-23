const uuid = require('uuid').v4
const createDatastore = require('../lib/datastore')

class BaseModel {
  static instance = null
  constructor(model) {
    this.datastore = createDatastore(model)
  }

  async create(value) {
    const key = uuid()
    await this.datastore.put(key, JSON.stringify(value))
    return key
  }

  async update(key, value) {
    
    await this.datastore.put(key, JSON.stringify(value))
  }

  async read(key) {
    const val = await this.datastore.get(key)
    return JSON.parse(val)
  }

  async remove(key) {
    await this.datastore.del(key)
  }

  static connect(model) {
    if(this.instance === null) {
      this.instance = new this(model)
    }
    return this.instance
  }

  validate() {
    return true
  }
}

module.exports = BaseModel