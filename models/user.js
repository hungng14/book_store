const { Schema, mongoose, mongoose_paginate } = require('./_plugins');
const { fieldsCommon, optionsSchemaCommon } = require('./_utils');

const UserSchema = new Schema(
    {
        name: { type: String, required: true, index: true },
        avatar: { type: String },
        email: { type: String, index: true },
        mobile: { type: String, index: true },
        role: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
        ...fieldsCommon(),
    },
    { ...optionsSchemaCommon({ collection: 'user' }) },
);
UserSchema.plugins(mongoose_paginate);
const User = mongoose.model('user', UserSchema);
module.exports = User;
