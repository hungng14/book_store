const BaseService = require('./base');
const models = require('../models/_utils');
const { isEmpty, generatorTime } = require('../utils/shared');
const { getDecoded } = require('../utils/utils');

class CrudService extends BaseService {
    constructor() {
        super();
        this.accountCollection = models.AccountModel;
        this.authorCollection = models.AuthorModel;
        this.bookmarkCollection = models.BookmarkModel;
        this.categoryCollection = models.CategoryModel;
        this.chapterCollection = models.ChapterModel;
        this.commentReplyCollection = models.CommentReplyModel;
        this.commentCollection = models.CommentModel;
        this.historyCollection = models.HistoryModel;
        this.ratingCollection = models.RatingModel;
        this.storyCollection = models.StoryModel;
        this.viewStatisticCollection = models.ViewStatisticModel;
        this.viewStatisticDetailCollection = models.ViewStatisticDetailModel;
        this.informationCollection = models.InformationModel;
    }

    collectionCurrent() {
        const { collectionName } = this;
        return this[`${collectionName}Collection`];
    }

    listAll(query = {}, populate) {
        try {
            const { collectionName } = this;
            const promise = this[`${collectionName}Collection`].find(query).populate(populate);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    listWithPagination(query = {}, options = {}) {
        try {
            const defaul_options = {
                limit: 10,
                page: 1,
                sort: {
                    _id: -1,
                },
            };
            const options_ = !isEmpty(options) ? options : defaul_options;
            const { collectionName } = this;
            const promise = this[`${collectionName}Collection`].paginate(query, options_);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    create(data) {
        try {
            const { collectionName } = this;
            const decoded = getDecoded();
            if (decoded) {
                data.createdBy = decoded.accountOId;
            }
            const promise = this[`${collectionName}Collection`].create(data);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    updateOne(conditions, set, options = { new: true }) {
        try {
            const { collectionName } = this;
            const decoded = getDecoded();
            if (decoded) {
                set.updatedBy = decoded.accountOId;
            }
            set.updatedAt = generatorTime();
            const promise = this[`${collectionName}Collection`].findOneAndUpdate(conditions, set, options);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    getInfo(conditions, fields, populate) {
        try {
            const { collectionName } = this;
            const promise = this[`${collectionName}Collection`].findOne(conditions).select(fields).populate(populate);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    removeOne(conditions) {
        try {
            const { collectionName } = this;
            const promise = this[`${collectionName}Collection`].deleteOne(conditions);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }
}
module.exports = CrudService;
