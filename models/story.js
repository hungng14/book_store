const {
    Schema, ObjectId, mongoose, mongoose_paginate,
} = require('./_plugins');

const { optionsSchemaCommon, fieldsCommon } = require('./_stuffs');

const StorySchema = new Schema(
    {
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        categoryOId: {
            type: ObjectId, ref: 'category', required: true, index: true,
        },
        authorOId: { type: ObjectId, ref: 'author' },
        ageLimitOId: { type: ObjectId, ref: 'age_limit' },
        profileImage: { type: String },
        source: { type: String },
        description: { type: String },
        ...fieldsCommon(),
    },
    { ...optionsSchemaCommon({ collection: 'story' }) },
);
StorySchema.plugin(mongoose_paginate);
const Story = mongoose.model('story', StorySchema);
module.exports = Story;
