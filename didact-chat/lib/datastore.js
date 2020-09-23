const path = require('path')
const levelup = require('levelup')
const leveldown = require('leveldown')
const redisdown = require('redisdown')
const redis = require('redis')
const { STORE } = require('../env')

const createRedisStore = model => {
  const redisClient = redis.createClient()
  return levelup(redisdown(model), { redisClient })
}

const createLevelStore = model => {
  database = path.resolve(__dirname, '../db')
  return levelup(leveldown(`${database}/${model}`))
}

const createDatastore = model => {
  const datastores = {
    leveldown: createLevelStore,
    redisdown: createRedisStore
  }
  const datastore = datastores[STORE]
  if(!datastore) throw new Error('DATASTORE_NOT_FOUND') 
  return datastore(model)
}

module.exports = createDatastore