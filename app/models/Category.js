const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  slug: { type: String, slug: "categoryName" },
});

CategorySchema.pre("save", function (next) {
  this.slug = this.categoryName.split(" ").join("-").toLowerCase();
  next();
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
