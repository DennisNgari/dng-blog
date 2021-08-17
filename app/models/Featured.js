const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

const FeaturedSchema = new mongoose.Schema({
  postId: {
    type: String,
    default: uuidv1,
    required: true,
    unique: true,
  },
  categoryId: {
    type: String,
    default: uuidv1,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Featured", FeaturedSchema);
 
