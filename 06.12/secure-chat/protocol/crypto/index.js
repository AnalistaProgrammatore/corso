function createCryptoSystem(strategy, secret, vector) {
  const strategies = {
    caesar: require('./caesar'),
    node: require('./node')
  }
  if(!Object.keys(strategies).includes(strategy)) {
    throw new Error('INVALID_CRYPTO_STRATEGY')
  }
  return strategies[strategy](secret, vector)
}

module.exports = createCryptoSystem