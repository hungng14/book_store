const { Schema, ObjectId, mongoose, mongoose_paginate } = require("./_plugins");

const { fieldsCommon, optionsSchemaCommon } = require("./_utils");
const BookSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category_id: { type: ObjectId, ref: "category", required: true },
    price: { type: Number, required: true },
    author_id: { type: ObjectId, ref: "author", required: true },
    publisher_id: { type: ObjectId, ref: "publisher", required: true },
    description: { type: String },
    ...fieldsCommon()
  },
  { ...optionsSchemaCommon({ collection: "book" }) }
);
BookSchema.plugins(mongoose_paginate);
const Book = mongoose.model("book", BookSchema);
module.exports = Book;
