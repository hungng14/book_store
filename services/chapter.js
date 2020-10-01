const CrudService = require('./crud');
const {
    responseError, responseSuccess, isEmpty, compareValue,
} = require('../utils/shared');

class ChapterService extends CrudService {
    constructor() {
        super();
    }

    async list(data) {
        try {
            const query = { isDeleted: false, storyOId: data.storyOId };
            if ('chapterNumber' in data) query.chapterNumber = data.chapterNumber;
            const options = {
                limit: +data.limit || 1,
                page: +data.page || 1,
                sort: { [data.sortKey || '_id']: data.sortOrder || -1 },
                select: 'chapterNumber title content',
            };
            const result = await super.listWithPagination(query, options);
            if (!isEmpty(result)) return responseSuccess(202, result);
            return responseError(1008);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async findOne(data) {
        const conditions = {
            isDeleted: false,
        };
        if (data.storyOId) conditions.code = data.storyOId;
        if (data.chapterNumber) conditions.code = data.chapterNumber;
        if (data.title) conditions.code = data.title;
        const result = await this.collectionCurrent().findOne(conditions).lean();
        return result;
    }

    async create(data) {
        try {
            const existChapterNumber = await this.findOne({
                storyOId: data.storyOId,
                chapterNumber: data.chapterNumber,
            });
            if (existChapterNumber) return responseError(1142);
            const existTitle = await this.findOne({
                storyOId: data.storyOId,
                title: data.title,
            });
            if (existTitle) return responseError(1143);
            const set = {
                chapterNumber: data.chapterNumber,
                title: data.title,
                content: data.content,
                storyOId: data.storyOId,
            };
            const result = await super.create(set);
            if (!isEmpty(result)) return responseSuccess(201);
            return responseError(1006);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async updateOne(data) {
        try {
            if ('chapterNumber' in data) {
                const existChapterNumber = await this.findOne({
                    storyOId: data.storyOId,
                    chapterNumber: data.chapterNumber,
                });
                if (existChapterNumber && !compareValue(existChapterNumber._id, data.chapterOId)) {
                    return responseError(1141);
                }
            }
            if ('title' in data) {
                const existTitle = await this.findOne({
                    storyOId: data.storyOId,
                    title: data.title,
                });
                if (existTitle && !compareValue(existTitle._id, data.chapterOId)) {
                    return responseError(1143);
                }
            }

            const conditions = {
                _id: data.chapterOId,
                isDeleted: false,
            };
            const set = { };
            if ('chapterNumber' in data) set.chapterNumber = data.chapterNumber;
            if ('title' in data) set.title = data.title;
            if ('storyOId' in data) set.storyOId = data.storyOId;
            const result = await super.updateOne(conditions, set);
            if (isEmpty(result)) return responseError(1007);
            return responseSuccess(203);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async deleteOne(data) {
        try {
            const conditions = {
                _id: data.chapterOId,
                isDeleted: false,
            };
            const set = {
                isDeleted: true,
            };
            const result = await super.updateOne(conditions, set);
            if (isEmpty(result)) return responseError(1009);
            return responseSuccess(205);
        } catch (error) {
            throw responseError(1000, error);
        }
    }
}

module.exports = new ChapterService();