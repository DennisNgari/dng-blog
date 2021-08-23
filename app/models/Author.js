// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

// const AuthorSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true, min: 10, max: 13 },
//     password: { type: String, required: true, min: 6, max: 1025 },
//     avator: { type: String, default: "" },
//     role: { type: ObjectId, ref: "Role" },
//     active: { type: ObjectId, ref: "Active" },
//     token: { type: String },
//   },
//   { timestamps: true, strict: true }
// );

// module.exports = mongoose.model("Author", AuthorSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const authorSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, min: 10, max: 13 },
  password: { type: String, required: true, min: 6, max: 1025 },
  avator: { type: String, default: "" },
  role: {
    type: ObjectId,
    ref: "role",
  },
});

const Author = mongoose.model("author", authorSchema);
module.exports = Author;
