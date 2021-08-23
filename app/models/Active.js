const mongoose = require("mongoose");

const ActiveSchema = new mongoose.Schema(
  {
    active: { type: Boolean, default: true },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("Active", ActiveSchema);
