const categoryCtl = require('../../../controllers/category');
const validator = require('../../../middlewares/category');

module.exports = (router) => {
    router.get('/admin/category', categoryCtl.view);
    router.get('/admin/category/list', categoryCtl.list);
    router.post('/admin/category/create', validator.createMiddleware, categoryCtl.create);
    router.post('/admin/category/update', validator.updateMiddleware, categoryCtl.update);
};
