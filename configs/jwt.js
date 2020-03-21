const jwt = require('jsonwebtoken');

class JWT {
    constructor() {
        this.secret = process.env.SECRET;
    }

    async sign(payload = {}, expiresIn = '2h') {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secret, { expiresIn, mutatePayload: true }, (err, token) => {
                if (err) throw reject(err);
                return resolve(token);
            });
        });
    }

    async verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) return reject(err);
                return resolve(decoded);
            });
        });
    }
}

const ins = new JWT();
module.exports = ins;
