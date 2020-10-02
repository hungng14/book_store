const CrudService = require('./crud');
const { STATUS } = require('../constants/constants');
const {
    responseError, responseSuccess, isEmpty, compareValue,
} = require('../utils/shared');

class StoryService extends CrudService {
    constructor() {
        super();
    }

    async list(data) {
        try {
            const query = { isDeleted: false };
            const options = {
                limit: +data.limit || 10,
                page: +data.page || 1,
                sort: { [data.sortKey || '_id']: data.sortOrder || -1 },
                select: 'code name status state description source profileImage createdDate authorOId categoryOId',
                populate: [
                    this.populateModel('author', '-_id name'),
                    this.populateModel('category', '-_id name'),
                ],
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
        if (data.code) conditions.code = data.code;
        if (data.storyOId) conditions._id = data.storyOId;
        const promise = this.collectionCurrent().findOne(conditions);
        if (data.usePopulate) {
            promise.populate([
                this.populateModel('author', '-_id name'),
                this.populateModel('category', '-_id name'),
            ]);
        }
        const result = await promise.lean();
        return result;
    }

    async create(data) {
        try {
            const existName = await this.findOne({ code: data.code });
            if (existName) return responseError(1141);
            const set = {
                name: data.name,
                code: data.code,
                categoryOId: data.categoryOId,
                createdBy: data.createdBy,
                status: STATUS.New,
            };
            if ('authorOId' in data) set.authorOId = data.authorOId;
            if ('ageLimitOId' in data) set.ageLimitOId = data.ageLimitOId;
            if ('state' in data) set.state = data.state;
            if ('source' in data) set.source = data.source;
            if ('description' in data) set.description = data.description;
            if ('profileImage' in data) set.profileImage = data.profileImage;
            const result = await super.create(set);
            if (!isEmpty(result)) return responseSuccess(201);
            return responseError(1006);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async updateOne(data) {
        try {
            const findName = await this.findOne({ code: data.code });
            if (findName && !compareValue(findName._id, data.storyOId)) {
                return responseError(1141);
            }
            const conditions = {
                _id: data.storyOId,
                isDeleted: false,
            };
            const set = { };
            if ('name' in data) set.name = data.name;
            if ('code' in data) set.code = data.code;
            if ('categoryOId' in data) set.categoryOId = data.categoryOId;
            if ('authorOId' in data) set.authorOId = data.authorOId;
            if ('ageLimitOId' in data) set.ageLimitOId = data.ageLimitOId;
            if ('state' in data) set.state = data.state;
            if ('source' in data) set.source = data.source;
            if ('description' in data) set.description = data.description;
            if ('profileImage' in data) set.profileImage = data.profileImage;
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
                _id: data.storyOId,
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

    async getInfo(data) {
        try {
            const conditions = {
                _id: data.storyOId,
                isDeleted: false,
            };
            const result = await super.getInfo(conditions);
            if (isEmpty(result)) return responseError(1010);
            return responseSuccess(204, result);
        } catch (error) {
            throw responseError(1000, error);
        }
    }
}

module.exports = new StoryService();
