const CategorySchema = require("../models/Category");
const PostSchema = require("../models/Post");

/*******************************
	// Sort all Posts by dates Updated.
*******************************/
// function custom_sort(a, b) {
//   return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
// }
// PostSchema.sort(custom_sort);

/*******************************
	          GET
    filter posts by editorial.
*******************************/
const getEditorialPosts = async (req, res) => {
  const posts = await PostSchema.find({});
  try {
    const singleCategory = posts.filter((post) => post.editorial === true);
    if (!singleCategory) {
      return res.status(404).json({ message: "category DOES NOT Exist" });
    }
    res.status(200).json(singleCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};

/*******************************
	          GET
    filter posts by featured and Category
*******************************/
const filterByfeatureAndCategory = async (req, res) => {
  const { category } = req.params;
  const posts = await PostSchema.find({});
  try {
    const featuredPost = posts.filter((post) => post.featured === true);
    if (!featuredPost) {
      return res.status(404).json({ message: "No post is featured" });
    }
    if ((featuredPost.category = category)) {
      res.status(200).json(featuredPost);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

/*******************************
	          GET
    filter posts by Categories
*******************************/
const filterByCategory = async (req, res) => {
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

module.exports = {
  getEditorialPosts,
  filterByfeatureAndCategory,
  filterByCategory,
  getAllCategories,
};
