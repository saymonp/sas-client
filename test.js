const crypto = require('crypto');
const fs = require('fs');

const { encrypt, decrypt } = require('./crypt');
const { encryptRSA, decryptRSA } = require('./cryptRSA');

// Chave utilizada na criptografia AES
const key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

// Método AES para criptografar a mensagem
const content = 'Mensagem secreta';
const hash = encrypt(content, key);

// Encripta a chave AES atraves do algoritmo RSA com a chave RSA pública
const keyEnc = encryptRSA(key, fs.readFileSync("./public.key", "utf8"));

// Gera a hash de validação da mensagem
const hash_validation = crypto.createHash('sha256').update(content).digest('base64');

// Mensagem que será enviada para o servidor
const message = { hash, key: keyEnc, hash_validation };

console.log("Enviar para o servidor", message);

// -----------

// No servidor
// A chave é descriptografada com a chave RSA privada cuja o único detentor é a API
const keyDec = decryptRSA(message.key, fs.readFileSync("./private.key", "utf8"));

// Descriptografa a mensagem para a validação com hash
const messageDec = decrypt(hash, keyDec);

// Verifica a mensagem
if (message.hash_validation !== crypto.createHash("sha256").update(messageDec).digest("base64")) {
    throw "Dados corrompidos ou adulterados";
}

// Envia para o cliente
const messageToClient = message.hash;

// No cliente ao receber a mensagem
const decryptMessage = decrypt(messageToClient, key);
console.log("Mensagem plana:", decryptMessage);

