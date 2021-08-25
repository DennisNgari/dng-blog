const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const AuthorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, min: 10, max: 13 },
    password: { type: String, required: true, min: 6, max: 1025 },
    avator: { type: String, default: "" },
    active: { type: Boolean, default: true },
    token: { type: String },
    post: [{ type: ObjectId, ref: "Post" }],
  },
  { timestamps: true, strict: true }
);

const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
