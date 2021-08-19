const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

const CategorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    default: uuidv1,
    required: true,
    unique: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
