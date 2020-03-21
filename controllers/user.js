const BaseController = require('./base');
const user_ser = require('../services/user');

class UserController extends BaseController {
    constructor() {
        super();
    }

    async list_all(req, res) {
        try {
            const result = await user_ser.listAll(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }

    async list(req, res) {
        try {
            const result = await user_ser.list(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }

    async create(req, res) {
        try {
            const result = await user_ser.create(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }

    async get_info(req, res) {
        try {
            const result = await user_ser.getInfo(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }

    async update(req, res) {
        try {
            const result = await user_ser.updateOne(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }

    async update_status(req, res) {
        try {
            const result = await user_ser.update_status_one(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }

    async delete(req, res) {
        try {
            const result = await user_ser.delete_one(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }

    async remove(req, res) {
        try {
            const result = await user_ser.removeOne(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'user');
        }
    }
}
module.exports = new UserController();
