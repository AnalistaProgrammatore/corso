const redis = require('redis')

const redisSubscriber = redis.createClient()
const redisPublisher = redis.createClient()

module.exports = { redisSubscriber, redisPublisher }