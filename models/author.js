const {
    Schema, mongoose, mongoose_paginate,
} = require('./_plugins');
const { optionsSchemaCommon, fieldsCommon } = require('./_stuffs');

const AuthorSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        ...fieldsCommon(),
    },
    { ...optionsSchemaCommon({ collection: 'author' }) },
);
AuthorSchema.plugin(mongoose_paginate);
const Author = mongoose.model('author', AuthorSchema);
module.exports = Author;
