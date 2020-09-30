const { STORY_STATES } = require('../constants/constants');
const {
    Schema, ObjectId, mongoose, mongoose_paginate,
} = require('./_plugins');

const { optionsSchemaCommon, fieldsCommon } = require('./_stuffs');

const StorySchema = new Schema(
    {
        code: { type: String, required: true },
        name: { type: String, required: true },
        categoryOId: {
            type: ObjectId, ref: 'category', required: true, index: true,
        },
        authorOId: { type: ObjectId, ref: 'author' },
        ageLimitOId: { type: ObjectId, ref: 'age_limit' },
        profileImage: { type: String },
        source: { type: String },
        description: { type: String },
        state: { type: String, default: STORY_STATES.FULL, enum: Object.values(STORY_STATES) },
        ...fieldsCommon(),
    },
    { ...optionsSchemaCommon({ collection: 'story' }) },
);
StorySchema.plugin(mongoose_paginate);
StorySchema.index({
    code: 1, isDeleted: 1,
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: { $eq: true },
    },
});
const Story = mongoose.model('story', StorySchema);
module.exports = Story;
