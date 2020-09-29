const { writeLog } = require('../logs/config_log');
const { generatorTime } = require('../utils/shared');
const { TITLE_WEB_ADMIN } = require('../constants/constants');

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
        };
        Object.assign(params, commonProp);
        return res.render(params.path, params);
    }
}
module.exports = BaseController;
