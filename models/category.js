const { Schema, mongoose, mongoose_paginate } = require("./_plugins");
const { fieldsCommon, optionsSchemaCommon } = require("./_utils");

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    ...fieldsCommon()
  },
  { ...optionsSchemaCommon({ collection: "category" }) }
);
CategorySchema.plugins(mongoose_paginate);
const Category = mongoose.model("category", CategorySchema);
module.exports = Category;
