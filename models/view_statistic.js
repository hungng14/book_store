const {
    Schema, ObjectId, mongoose, mongoose_paginate,
} = require('./_plugins');
const { fieldsCommon, optionsSchemaCommon } = require('./_stuffs');

const ViewStatisticSchema = new Schema(
    {
        storyOId: {
            type: ObjectId, required: true, ref: 'story', unique: true,
        },
        count: { type: Number, default: 0, required: true },
        ...fieldsCommon({ updatedBy: false, createdBy: false }),
    },
    { ...optionsSchemaCommon({ collection: 'view_statistic' }) },
);
ViewStatisticSchema.plugin(mongoose_paginate);
const ViewStatistic = mongoose.model('view_statistic', ViewStatisticSchema);
module.exports = ViewStatistic;
