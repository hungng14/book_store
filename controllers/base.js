const { writeLog } = require('../logs/config_log');
const { generatorTime } = require('../utils/shared');

class BaseController {
    resJsonSuccess(res, result = {}) {
        return res.json(result);
    }

    resJsonError(res, error = '', file_name) {
        const msg = `${generatorTime()}: ${JSON.stringify(error)}`;
        writeLog(file_name, msg);
        return res.json(error);
    }
}
module.exports = BaseController;
