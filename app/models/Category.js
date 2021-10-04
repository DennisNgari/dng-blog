const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  categoryImage: { type: String, require: true },
});

/**************************************
	 Change the Tittle to sentence Case.
*****************************************/
//Change the category to sentence case before saving in the db.
CategorySchema.pre("save", function (next) {
  this.categoryName = this.categoryName.toTitleCase();
  next();
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
