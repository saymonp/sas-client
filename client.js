const axios = require('axios');
const crypto = require('crypto');

const {
    encrypt, decrypt
} = require('./crypt');
const {
    encryptRSA
} = require('./cryptRSA');

const createMessage = async (content, key) => {
    try{
    const session = await axios.post('http://localhost:3333/api/v1/login', {
        email: "email@gmail.com",
        password: "banana123"
    });

    const hash = encrypt(content, key);

    const keyEnc = encryptRSA(key, session.data.publicKey)

    const message = {
        hash,
        key: keyEnc,
        hash_validation: crypto.createHash('sha256').update(content).digest('base64')
    }

    const response = await axios.post('http://localhost:3333/api/v1/createMessage',
        message, {
            headers: {
                Authorization: `Bearer ${session.data.token}`
            }
        });

    console.log("Id da mensagem:", response.data.id);

    const msgShow = await axios.get(`http://localhost:3333/api/v1/showMessage/${response.data.id}`, {
        headers: {
            Authorization: `Bearer ${session.data.token}`
        }
    });
    const decryptMessage = decrypt(msgShow.data.message, key);
    console.log("Mensagem plana:", decryptMessage);
} catch (err) {
    console.log(err);
}
}

const key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
createMessage('Mensagem secreta', key);