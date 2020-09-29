const jwt = require('jsonwebtoken');

class JWT {
    constructor() {
        this.secretMember = process.env.SECRET_TOKEN_MEMBER;
        this.secretAdmin = process.env.SECRET_TOKEN_ADMIN;
    }

    async sign(payload = {}, expiresIn = '2h') {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secret, { expiresIn, mutatePayload: true }, (err, token) => {
                if (err) throw reject(err);
                return resolve(token);
            });
        });
    }

    async verifyAdmin(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretAdmin, (err, decoded) => {
                if (err) return reject(err);
                return resolve(decoded);
            });
        });
    }

    async verifyMember(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretMember, (err, decoded) => {
                if (err) return reject(err);
                return resolve(decoded);
            });
        });
    }
}

const ins = new JWT();
module.exports = ins;
