const BaseController = require('./base');
const bookmarkService = require('../services/bookmark');

class BookmarkController extends BaseController {
    constructor() {
        super();
    }

    async create(req, res) {
        try {
            const result = await bookmarkService.create(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'bookmark');
        }
    }
}
module.exports = new BookmarkController();
