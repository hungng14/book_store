const {
    Schema, mongoose, mongoose_paginate, ObjectId,
} = require('./_plugins');
const { optionsSchemaCommon } = require('./_stuffs');

const ChapterSchema = new Schema(
    {
        chapterNumber: { type: Number, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        wordCount: { type: Number },
        storyOId: {
            type: ObjectId, ref: 'story', required: true, index: true,
        },
        isDeleted: { type: Boolean, required: true, default: false },
    },
    { ...optionsSchemaCommon({ collection: 'chapter' }) },
);
ChapterSchema.plugin(mongoose_paginate);
const Chapter = mongoose.model('chapter', ChapterSchema);
module.exports = Chapter;
