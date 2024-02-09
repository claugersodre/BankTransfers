const crypto = require('crypto');
const hashPassword = async (password) => {
    return await crypto.createHash('md5').update(password).digest('hex');
}

module.exports = hashPassword