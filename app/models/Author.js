const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

const AuthorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, min: 10, max: 13 },
    password: { type: String, required: true, min: 6, max: 1025 },
    avator: { type: String, default: "" },
    role: { type: String, default: "standard" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("Author", AuthorSchema);
