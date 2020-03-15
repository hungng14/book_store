const { Schema, mongoose, mongoose_paginate } = require("./_plugins");
const { fieldsCommon, optionsSchemaCommon } = require("./_utils");
const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: {type: String},
    birth_date: { type: Date },
    date_of_death: { type: Date },
    nationality: { type: String },
    description: { type: String },
    ...fieldsCommon()
  },
  { ...optionsSchemaCommon({ collection: "author" }) }
);
AuthorSchema.plugins(mongoose_paginate);
const Author = mongoose.model("author", AuthorSchema);
module.exports = Author;
