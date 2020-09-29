const BaseController = require('./base');
const accountService = require('../services/account');

class AccountController extends BaseController {
    constructor() {
        super();
    }

    async view(req, res) {
        try {
            return this.renderPageAdmin(req, res, { path: 'account/index' });
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

    async create(req, res) {
        try {
            const result = await accountService.create(req.body);
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
}
module.exports = new AccountController();
