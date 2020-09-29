const BaseController = require('./base');
const accountService = require('../services/account');
const { TITLE_WEB_MEMBER, TITLE_WEB_ADMIN } = require('../constants/constants');

class SignInController extends BaseController {
    constructor() {
        super();
    }

    async viewSignInAdmin(req, res) {
        try {
            return res.render('signInAdmin/index', {
                title: TITLE_WEB_ADMIN,
                layout: false,
            });
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

    async viewSignInMember(req, res) {
        try {
            return res.render('signInMember/index', {
                title: TITLE_WEB_MEMBER,
                layout: false,
            });
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }

    async signInMember(req, res) {
        try {
            const result = await accountService.signInMember(req.body);
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
