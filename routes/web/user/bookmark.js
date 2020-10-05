const bookmarkCtl = require('../../../controllers/bookmark');
const validators = require('../../../middlewares/bookmark');

module.exports = (router) => {
    router.post('/bookmark/save', validators.createMiddleware, bookmarkCtl.create);
};
