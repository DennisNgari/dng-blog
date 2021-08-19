const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    min: 6,
    max: 200,
  },
  headerImage: {
    type: String,
    required: false,
  },
  authorID: {
    type: String,
    default: uuidv1,
    required: true,
    unique: true,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    min: 6,
    max: 1250,
  },
  slug: {
    type: String,
    min: 6,
    max: 200,
  },
  tags: {
    type: [],
  },
  category: {
    type: Array,
    required: false,
  },
  postId: {
    type: String,
    default: uuidv1,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Post", UserSchema);
