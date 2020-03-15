const {
    Schema, ObjectId, mongoose, mongoose_paginate,
} = require('./_plugins');
const { fieldsCommon, optionsSchemaCommon } = require('./_utils');

const CommentSchema = new Schema(
    {
        book_id: { type: ObjectId, ref: 'book', required: true },
        user_id: { type: ObjectId, ref: 'user', required: true },
        content: { type: String },
        ...fieldsCommon(),
    },
    { ...optionsSchemaCommon({ collection: 'comment' }) },
);
CommentSchema.plugins(mongoose_paginate);
const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;
