const BaseController = require('./base');
const storyService = require('../services/story');
const chapterService = require('../services/chapter');
const { isEmpty } = require('../utils/shared');

class StoryController extends BaseController {
    constructor() {
        super();
    }

    async view(req, res) {
        try {
            return super.renderPageAdmin(req, res, { path: 'story/index' });
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async viewChaptersOfStory(req, res) {
        try {
            const { storyOId } = req.params;
            const infoStory = await storyService.findOne({ storyOId, usePopulate: true });
            if (isEmpty(infoStory)) return res.render('404', { layout: false });
            return super.renderPageAdmin(req, res, {
                path: 'story/chapters',
                story: JSON.stringify({
                    storyOId,
                    name: infoStory.name,
                    code: infoStory.code,
                    authorName: (infoStory.author || {}).name || '',
                    categoryName: (infoStory.category || {}).name || '',
                }),
            });
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async create(req, res) {
        try {
            const result = await storyService.create(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async createChapter(req, res) {
        try {
            const result = await chapterService.create(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async updateChapter(req, res) {
        try {
            const result = await chapterService.updateOne(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async listChapter(req, res) {
        try {
            const result = await chapterService.list(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async list(req, res) {
        try {
            const result = await storyService.list(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async getInfo(req, res) {
        try {
            const result = await storyService.getInfo(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async update(req, res) {
        try {
            const result = await storyService.updateOne(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async delete(req, res) {
        try {
            const result = await storyService.deleteOne(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async deleteChapter(req, res) {
        try {
            const result = await chapterService.deleteOne(req.body);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async getInfoChapter(req, res) {
        try {
            const result = await chapterService.getInfo(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }
}
module.exports = new StoryController();
