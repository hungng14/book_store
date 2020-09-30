const authorCtl = require('../../../controllers/author');
const validator = require('../../../middlewares/author');

module.exports = (router) => {
    router.get('/admin/author', authorCtl.view);
    router.get('/admin/author/list', authorCtl.list);
    router.post('/admin/author/create', validator.createMiddleware, authorCtl.create);
    router.post('/admin/author/update', validator.updateMiddleware, authorCtl.update);
};
