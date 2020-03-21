const { Schema, mongoose, mongoose_paginate } = require('./_plugins');
const { fieldsCommon, optionsSchemaCommon } = require('./_utils');
const { ROLES } = require('../constants/constants');

const UserSchema = new Schema(
    {
        fullname: { type: String, required: true, index: true },
        avatar: { type: String },
        email: { type: String, index: true },
        mobile: { type: String, index: true },
        role: { type: Number, enum: ROLES, required: true },
        ...fieldsCommon(),
    },
    { ...optionsSchemaCommon({ collection: 'user' }) },
);
UserSchema.plugin(mongoose_paginate);
const User = mongoose.model('user', UserSchema);
module.exports = User;
