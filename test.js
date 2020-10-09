const { encrypt, decrypt } = require('./crypt');
const { encryptRSA, decryptRSA } = require('./cryptRSA');

const key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const hash = encrypt('Mensagem secreta', key);

const keyEnc = encryptRSA(key)

const message = { hash, key: keyEnc }

console.log("Enviar para o servidor", message);

// No servidor
const keyDec = decryptRSA(message.key)
console.log(keyDec);
const text = decrypt(hash, keyDec);

console.log(text);