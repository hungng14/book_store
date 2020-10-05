const {
    Schema, ObjectId, mongoose, mongoose_paginate,
} = require('./_plugins');

const { optionsSchemaCommon, fieldsCommon } = require('./_stuffs');

const BookmarkSchema = new Schema(
    {
        accountOId: {
            type: ObjectId, ref: 'account', required: true, index: true,
        },
        storyOId: { type: ObjectId, required: true, ref: 'story' },
        chapterOId: { type: ObjectId, ref: 'chapter' },
        ...fieldsCommon(),
    },
    { ...optionsSchemaCommon({ collection: 'bookmark' }) },
);
BookmarkSchema.plugin(mongoose_paginate);
const Bookmark = mongoose.model('bookmark', BookmarkSchema);
module.exports = Bookmark;
