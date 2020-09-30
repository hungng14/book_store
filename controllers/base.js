const path = require('path');
const { writeLog } = require('../logs/config_log');
const { generatorTime } = require('../utils/shared');
const { TITLE_WEB_ADMIN, TITLE_WEB_MEMBER } = require('../constants/constants');

class BaseController {
    resJsonSuccess(res, result = {}) {
        return res.json(result);
    }

    resJsonError(res, error = '', file_name) {
        const msg = `${generatorTime()}: ${JSON.stringify(error)}`;
        writeLog(file_name, msg);
        return res.json(error);
    }

    renderPageAdmin(req, res, params) {
        const commonProp = {
            title: TITLE_WEB_ADMIN,
            infoUser: {
                username: req.user.username,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
            },
        };
        Object.assign(params, commonProp);
        return res.render(`admin/${params.path}`, params);
    }

    renderPageUser(req, res, params) {
        const commonProp = {
            title: TITLE_WEB_MEMBER,
            layout: path.join(__dirname, '../views/user/layouts/main'),
        };
        Object.assign(params, commonProp);
        return res.render(`user/${params.path}`, params);
    }
}
module.exports = BaseController;
