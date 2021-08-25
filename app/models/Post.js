const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, min: 6, max: 200 },
    headerImage: { type: String, required: false },
    authorId: { type: String, required: true, unique: true },
    body: { type: String, min: 6, max: 1250 },
    slug: { type: String, slug: "title" },
    tags: { type: [] },
    category: { type: Array, required: false },
    postId: { type: String, default: uuidv1, required: true, unique: true },
  },
  { timestamps: true }
);
PostSchema.pre("save", function (next) {
  this.slug = this.title.split(" ").join("-");
  next();
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
