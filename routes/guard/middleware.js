const configJWT = require('../../configs/jwt');
const { responseError } = require('../../utils/shared');
const utils = require('../../utils/utils');

module.exports = (router, verifyProp) => {
    router.use(async (req, res, next) => {
        try {
            console.log('ok')
            const { token } = req.user || {};
            console.log(req.user)
            console.log(req.session)
            const decoded = await configJWT[verifyProp](token);
            req.decoded = decoded;
            utils.setDecoded(decoded);
            return next();
        } catch (error) {
            console.log(error)
            if (req.method === 'GET') return res.render('404', { layout: false });
            const { name } = error;
            if (name === 'JsonWebTokenError') return res.json(responseError(1002, error));
            if (name === 'TokenExpiredError') return res.json(responseError(1005, error));
            return res.json(responseError(1001, error));
        }
    });
};
