const BaseController = require('./base');

class CategoryController extends BaseController {
    constructor() {
        super();
    }

    async view(req, res) {
        try {
            return super.renderPageAdmin(req, res, { path: 'category/index' });
        } catch (error) {
            console.log(error)
            return super.resJsonError(res, error, 'category');
        }
    }
}
module.exports = new CategoryController();
