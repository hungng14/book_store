const BaseController = require('./base');
const user_ser = require('../services/user');

class SignInController extends BaseController {
    constructor() {
        super();
    }

    async signIn(req, res) {
        try {
            const result = await user_ser.signIn(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'sign_in');
        }
    }

    async signInWithSocial(req, res) {
        try {
            const result = await user_ser.signInWithSocial(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'sign_in');
        }
    }

    async register(req, res) {
        try {
            const result = await user_ser.register(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'sign_in');
        }
    }
}

module.exports = new SignInController();
