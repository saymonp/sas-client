const crypto = require('crypto')
const fs = require('fs')

const encryptRSA = (toEncrypt, publicKey) => {
  const buffer = Buffer.from(toEncrypt, 'utf8')
  const encrypted = crypto.publicEncrypt(publicKey, buffer)
  return encrypted.toString('base64')
}

const decryptRSA = (toDecrypt) => {
  const privateKey = fs.readFileSync("./private.key", 'utf8')
  const buffer = Buffer.from(toDecrypt, 'base64')
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: '',
    },
    buffer,
  )
  return decrypted.toString('utf8')
}

module.exports = {
    encryptRSA,
    decryptRSA
};