const BaseController = require('./base');
const accountService = require('../services/account');

class SignInController extends BaseController {
    constructor() {
        super();
    }

    async signInMember(req, res) {
        try {
            const result = await accountService.signInMember(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }

    async signInAdmin(req, res) {
        try {
            const result = await accountService.signInAdmin(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }

    async signInWithSocial(req, res) {
        try {
            const result = await accountService.signInWithSocial(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }

    async register(req, res) {
        try {
            const result = await accountService.register(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }
}

module.exports = new SignInController();
