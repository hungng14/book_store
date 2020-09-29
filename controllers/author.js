const BaseController = require('./base');

class AuthorController extends BaseController {
    constructor() {
        super();
    }

    async view(req, res) {
        try {
            return super.renderPageAdmin(req, res, { path: 'author/index' });
        } catch (error) {
            console.log(error)
            return super.resJsonError(res, error, 'author');
        }
    }
}
module.exports = new AuthorController();
