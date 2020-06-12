const crypto = require('crypto')

function createNodeCryptoSystem(secret, vector) {
  const iv = Buffer.from(vector).slice(0, 16)
  const key = Buffer.from(secret).slice(0, 24)
  return {
    createCipher() {
      const cipher = crypto.createDecipheriv('aes-192-cbc', key, iv)
      return cipher
    },
    createDecipher() {
      const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv)
      return decipher
    }
  }
}

module.exports = createNodeCryptoSystem