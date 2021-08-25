/*******************************
		Initialize Routes
*******************************/
const CategorySchema = require("../models/Category");

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
	          GET
    Get posts by Category
*******************************/
const getPostsByCategory = async (req, res) => {
  const { category } = req.params;
  const posts = await PostSchema.find({});
  try {
    const singleCategory = posts.filter(
      (post) => post.category.toString() === category
    );
    if (!singleCategory) {
      return res.status(404).json({ message: "category DOES NOT Exist" });
    }
    res.status(200).json(singleCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};

/*******************************
	          PUT
  Create a new category
*******************************/
const createNewCategory = async (req, res) => {
  /* Add the authorId from the auth-token as the FK in the CategorySchema.
        This is used to control the access for deleting and adding new categories.
    */

  const tokenId = await req.author._id;
  //Check if the category already exists.
  const categoryExists = await CategorySchema.findOne({
    categoryName: req.body.categoryName,
  });
  if (categoryExists)
    return res.status(400).json({ message: "Category already exists!" });

  //Create a New Category.
  const newCategory = new CategorySchema({
    categoryName: req.body.categoryName,
    authorId: tokenId,
  });

  try {
    const category = await newCategory.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*******************************
	        PUT
  Update a category
*******************************/
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await CategorySchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Category DOES NOT Exist! " });
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
  getPostsByCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
};