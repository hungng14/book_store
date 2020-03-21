const { Schema, mongoose, mongoose_paginate } = require('./_plugins');
const { fieldsCommon, optionsSchemaCommon } = require('./_utils');
const { ROLES } = require('../constants/constants');
const { hashPassword, verifyPassword } = require('../configs/bcrypt');

const UserSchema = new Schema(
    {
        fullname: { type: String, required: true, index: true },
        avatar: { type: String },
        email: { type: String, index: true },
        mobile: { type: String, index: true },
        role: { type: Number, enum: ROLES, required: true },
        password: { type: String, required: true },
        ...fieldsCommon(),
    },
    { ...optionsSchemaCommon({ collection: 'user' }) },
);
UserSchema.plugin(mongoose_paginate);
UserSchema.pre(['save', 'findOneAndUpdate'], function (next) {
    const { password } = this;
    if (password) {
        this.password = hashPassword(password);
    }
    next();
});

UserSchema.method('verify_password', function (password) {
    return verifyPassword(password, this.password);
});
const User = mongoose.model('user', UserSchema);
module.exports = User;
