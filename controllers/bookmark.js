const BaseController = require('./base');
const bookmarkService = require('../services/bookmark');

class BookmarkController extends BaseController {
    constructor() {
        super();
    }

    async viewList(req, res) {
        try {
            if ((req.session.infoMember || {}).accountOId) {
                req.query.accountOId = req.session.infoMember.accountOId;
                return super.renderPageUser(req, res, { path: 'bookmark/index' });
            }
            return super.renderPage404(res);
        } catch (error) {
            return super.resJsonError(res, error, 'bookmark');
        }
    }

    async create(req, res) {
        try {
            const result = await bookmarkService.create(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'bookmark');
        }
    }

    async listActive(req, res) {
        try {
            if ((req.session.infoMember || {}).accountOId) {
                req.query.accountOId = req.session.infoMember.accountOId;
            }
            const result = await bookmarkService.listActive(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'bookmark');
        }
    }

    async list(req, res) {
        try {
            if ((req.session.infoMember || {}).accountOId) {
                req.query.accountOId = req.session.infoMember.accountOId;
            }
            const result = await bookmarkService.list(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'bookmark');
        }
    }
}
module.exports = new BookmarkController();
