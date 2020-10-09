const categoryCtl = require('../../../controllers/category');

module.exports = (router) => {
    router.get('/category/list-active', categoryCtl.listActive);
};
