const { Schema, ObjectId, mongoose, mongoose_paginate } = require("./_plugins");
const { VOTE } = require("../constants/constants");
const { fieldsCommon, optionsSchemaCommon } = require("./_utils");
const VoteSchema = new Schema(
  {
    book_id: { type: String, required: true },
    user_id: { type: ObjectId, ref: "user", required: true },
    star: { type: Number, enum: VOTE, default: 0, required: true },
    ...fieldsCommon()
  },
  { ...optionsSchemaCommon({ collection: "vote" }) }
);
VoteSchema.plugins(mongoose_paginate);
const Vote = mongoose.model("vote", VoteSchema);
module.exports = Vote;
