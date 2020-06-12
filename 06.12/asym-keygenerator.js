const crypto = require('crypto')
const fs = require('fs')

const keys = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 })

fs.writeFileSync('private.pem', keys.privateKey.export({ format: 'pem', type: 'pkcs1' }))
fs.writeFileSync('public.pem', keys.publicKey.export({ format: 'pem', type: 'pkcs1' }))