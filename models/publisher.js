const { Schema, mongoose, mongoose_paginate } = require("./_plugins");
const { fieldsCommon, optionsSchemaCommon } = require("./_utils");
const PublisherSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    ...fieldsCommon()
  },
  { ...optionsSchemaCommon({ collection: "publisher" }) }
);
PublisherSchema.plugins(mongoose_paginate);
const Publisher = mongoose.model("publisher", PublisherSchema);
module.exports = Publisher;
