const categoryCtl = require('../../../controllers/author');

module.exports = (router) => {
    router.get('/admin/author', categoryCtl.view);
};
