const BaseController = require('./base');
const accountService = require('../services/account');

class AccountController extends BaseController {
    constructor() {
        super();
    }

    async viewAdmin(req, res) {
        try {
            return super.renderPageAdmin(req, res, { path: 'account/admin' });
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }

    async viewMember(req, res) {
        try {
            return super.renderPageAdmin(req, res, { path: 'account/member' });
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }

    async list(req, res) {
        try {
            const result = await accountService.list(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }

    async createAdmin(req, res) {
        try {
            const result = await accountService.createAdmin(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }

    async update(req, res) {
        try {
            const result = await accountService.updateOne(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }

    async delete(req, res) {
        try {
            const result = await accountService.deleteOne(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }

    async getInfo(req, res) {
        try {
            const result = await accountService.getInfo(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'account');
        }
    }
}
module.exports = new AccountController();
