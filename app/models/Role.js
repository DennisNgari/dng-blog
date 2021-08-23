const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const RoleSchema = new mongoose.Schema(
  {
    author: [{ type: ObjectId, ref: "Author" }],
    role: { type: String, default: "standard" },
  },
  { timestamps: true, strict: true }
);

const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;
