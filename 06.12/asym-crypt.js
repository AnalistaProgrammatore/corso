const crypto = require('crypto')
const fs = require('fs')

const data = fs.readFileSync('hello-world.txt')
const publicKey = fs.readFileSync('public.pem').toString()

const encryptedData = crypto.publicEncrypt(publicKey, data)

fs.writeFileSync('hello-world.enc', encryptedData)