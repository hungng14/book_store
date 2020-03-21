const BaseService = require('./base');
const user_model = require('../models/user');
const { STATUS } = require('../constants/constants');
const { isEmpty, generatorTime } = require('../utils/shared');
const { get_decoded } = require('../utils/utils');

class CrudService extends BaseService {
    constructor() {
        super();
        this.user_collect = user_model;
    }

    listAll(query = {}, populate) {
        try {
            const coll_name = this.schema_name;
            const promise = this[`${coll_name}_collect`].find(query).populate(populate);
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
            const coll_name = this.schema_name;
            const promise = this[`${coll_name}_collect`].paginate(query, options_);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    listActive(query = {}, fields, populate) {
        try {
            const coll_name = this.schema_name;
            query.status = STATUS.active;
            const promise = this[`${coll_name}_collect`].find(query).select(fields).populate(populate);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    listActiveWithPagination(query = {}, options = {}) {
        try {
            query.status = STATUS.active;
            const defaul_options = {
                limit: 10,
                page: 1,
                sort: {
                    _id: -1,
                },
            };
            const options_ = !isEmpty(options) ? options : defaul_options;
            const coll_name = this.schema_name;
            const promise = this[`${coll_name}_collect`].paginate(query, options_);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    create(data) {
        try {
            const coll_name = this.schema_name;
            const decoded = get_decoded() || {};
            data.created_date = generatorTime();
            data.created_by = decoded.user_o_id;
            const promise = this[`${coll_name}_collect`].create(data);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    updateOne(conditions, set, options = {}) {
        try {
            const coll_name = this.schema_name;
            const decoded = get_decoded();
            set.updated_by = decoded.user_o_id;
            set.updated_at = generatorTime();
            const promise = this[`${coll_name}_collect`].findOneAndUpdate(conditions, set, options);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    getInfo(conditions, fields, populate) {
        try {
            const coll_name = this.schema_name;
            const promise = this[`${coll_name}_collect`].findOne(conditions).select(fields).populate(populate);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }

    removeOne(conditions) {
        try {
            const coll_name = this.schema_name;
            const promise = this[`${coll_name}_collect`].deleteOne(conditions);
            return this.promise(promise);
        } catch (error) {
            throw error;
        }
    }
}
module.exports = CrudService;
