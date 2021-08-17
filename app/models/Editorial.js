const mongoose = require("mongoose");

const EditorialSchema = new mongoose.Schema({
  postId: {
    type: String,
    default: uuidv1,
    required: true,
    unique: true,
  },
  top: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Editorial", EditorialSchema);

