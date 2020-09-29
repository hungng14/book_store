const BaseController = require('./base');
const accountService = require('../services/account');

class AccountController extends BaseController {
    constructor() {
        super();
    }

    async list(req, res) {
        try {
            const result = await accountService.list(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }

    async create(req, res) {
        try {
            const result = await accountService.create(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }

    async update(req, res) {
        try {
            const result = await accountService.updateOne(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }

    async delete(req, res) {
        try {
            const result = await accountService.deleteOne(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }
}
module.exports = new AccountController();
