var crypt = function () {

    const crypto = require('crypto');

    const algorithm = 'aes-192-cbc';
    const password = 'Password used to generate key';
    // Use the async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(password, 'salt', 24);
    // Use `crypto.randomBytes` to generate a random iv instead of the static iv
    // shown here.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    this.encrypt = function (text) {
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    this.decrypt = function (encrypted) {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

};

module.exports = function () {
    return new crypt();
}
// const encrypted = encrypt('some clear text data');
// console.log('encrypted', encrypted);
// console.log('decrypted', decrypt(encrypted));
