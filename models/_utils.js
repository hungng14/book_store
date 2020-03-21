/* eslint-disable class-methods-use-this */

const { STATUS } = require('../constants/constants');
const { ObjectId } = require('./_plugins');

class Utils {
    constructor() {
        this.status = '';
    }

    optionsSchemaCommon({ collection }) {
        return { _id: true, collection, versionKey: false };
    }

    fieldsCommon() {
        return {
            status: {
                type: String, enum: STATUS, default: 10, required: true,
            },
            is_removed: { type: Boolean, default: false },
            created_date: { type: Date, required: true },
            updated_date: { type: Date },
            created_by: { type: ObjectId, ref: 'user', default: null },
            updated_by: { type: ObjectId, ref: 'user', default: null },
        };
    }
}

module.exports = new Utils();
