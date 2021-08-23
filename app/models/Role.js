// const mongoose = require("mongoose");

// const RoleSchema = new mongoose.Schema(
//   {
//     role: { type: String, default: "standard" },
//   },
//   { timestamps: true, strict: true }
// );

// module.exports = mongoose.model("Role", RoleSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  role: String,
});

const Role = mongoose.model("role", roleSchema);
module.exports = Role;
