const BaseController = require('./base');
const storyService = require('../services/story');
const chapterService = require('../services/chapter');
const { isEmpty } = require('../utils/shared');
const { STATUS } = require('../constants/constants');

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

    async viewInfoUser(req, res) {
        try {
            console.log(req.params);
            const { storyOId } = req.params;
            if (!storyOId) return res.render('404');
            const infoStory = await storyService.findOne({
                _id: storyOId,
                status: STATUS.Active,
                usePopulate: true,
            });
            if (!infoStory) return res.render('404');
            console.log(infoStory);
            const data = {
                authorName: (infoStory.author || {}).name || '',
                categoryName: (infoStory.category || {}).name || '',
                name: infoStory.name,
                code: infoStory.code,
            };
            console.log(data);
            return super.renderPageUser(req, res, {
                path: 'story/info',
                infoStory: data,
            });
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async viewChapter(req, res) {
        try {
            console.log(req.params);
            return super.renderPageUser(req, res, { path: 'story/chapter' });
        } catch (error) {
            return super.resJsonError(res, error, 'story');
        }
    }

    async listActive(req, res) {
        try {
            const result = await storyService.listActive(req.query);
            return super.resJsonSuccess(res, result);
        } catch (error) {
            console.log(error);
            return super.resJsonError(res, error, 'story');
        }
    }
}
module.exports = new StoryController();
