const { Schema, ObjectId, mongoose, mongoose_paginate } = require("./_plugins");
const { fieldsCommon, optionsSchemaCommon } = require("./_utils");
const CommentDetailsSchema = new Schema(
  {
    comment_id: { type: ObjectId, ref: "comment", required: true },
    user_id: { type: ObjectId, ref: "user", required: true },
    content: { type: String },
    ...fieldsCommon()
  },
  { ...optionsSchemaCommon({ collection: "comment_details" }) }
);
CommentDetailsSchema.plugin(mongoose_paginate);
const CommentDetails = mongoose.model("comment_details", CommentDetailsSchema);
module.exports = CommentDetails;
