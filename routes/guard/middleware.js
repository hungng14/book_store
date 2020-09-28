const configJWT = require('../../configs/jwt');
const { responseError: response_error } = require('../../utils/shared');
const utils = require('../../utils/utils');

module.exports = (router) => {
    router.use(async (req, res, next) => {
        try {
            const { token } = req.headers;
            const decoded = await configJWT.verifyMember(token);
            req.decoded = decoded;
            utils.setDecoded(decoded);
            return next();
        } catch (error) {
            const { name } = error;
            if (name === 'JsonWebTokenError') return res.json(response_error(1002, error));
            if (name === 'TokenExpiredError') return res.json(response_error(1005, error));
            return res.json(response_error(1001, error));
        }
    });
};
