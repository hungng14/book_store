const categoryCtl = require('../../../controllers/category');

module.exports = (router) => {
    router.get('/admin/category', categoryCtl.view);
};
