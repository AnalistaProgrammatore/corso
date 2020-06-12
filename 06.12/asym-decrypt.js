const crypto = require('crypto')
const fs = require('fs')

const encryptedData = fs.readFileSync('hello-world.enc')
const privateKey = fs.readFileSync('private.pem').toString()

const data = crypto.privateDecrypt(privateKey, encryptedData)

fs.writeFileSync('hello-world.dec.txt', data)