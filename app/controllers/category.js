// Load .env Variables
require("dotenv").config();

/*******************************
		Initialize Routes
*******************************/
const CategorySchema = require("../models/Category");

//Get The Imports
// const { verifyToken } = require("../middlewares/auth");

/*******************************
	          GET
    Get all the Categories
*******************************/

const getAllCategories = async (req, res) => {
  const categories = await CategorySchema.find({});
  try {
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

/*******************************
	          POST
  Create a new category
*******************************/
const createNewCategory = async (req, res) => {
  //Check if the category already exists.
  const categoryExists = await CategorySchema.findOne({
    categoryName: req.body.categoryName,
  });
  if (categoryExists)
    return res.status(400).json({ message: "Category already exists!" });

  //Create a New Category.
  const newcategory = new CategorySchema({
    categoryName: req.body.categoryName,
    categoryImage: req.body.categoryImage,
  });

  try {
    const category = await newcategory.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*******************************
	      DELETE
  Delete a Category
*******************************/
const deleteCategory = async (req, res) => {
  try {
    await CategorySchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category has been deleted." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllCategories,
  createNewCategory,
  deleteCategory,
};
