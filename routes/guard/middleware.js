const config_jwt = require('../../configs/jwt');
const { responseError: response_error } = require('../../utils/shared');
const utils = require('../../utils/utils');

module.exports = (router) => {
    router.use(async (req, res, next) => {
        try {
            const { token } = req.headers;
            const decoded = await config_jwt.verify(token);
            req.decoded = decoded;
            utils.set_decoded(decoded);
            return next();
        } catch (error) {
            const { name } = error;
            if (name === 'JsonWebTokenError') return res.json(response_error(1002, error));
            if (name === 'TokenExpiredError') return res.json(response_error(1005, error));
            return res.json(response_error(1001, error));
        }
    });
};
