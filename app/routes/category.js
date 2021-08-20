const router = require("express").Router();

/*******************************
		Initialize Routes
*******************************/
const PostSchema = require("../models/Post");
const CategorySchema = require("../models/Category");
/*******************************
	          GET
    Get posts by Category
*******************************/
//What the User clicks is taken as the :category is taken as the params in the FrontEnd.

router.get("/:category", async (req, res) => {
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
});

/*******************************
	          GET
    Get all the Categories
*******************************/

router.get("/", async (req, res) => {
  const categories = await CategorySchema.find({});
  try {
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});
/*******************************
	          PUT
  Create a new category
*******************************/

router.post("/newcategory", verifyToken, async (req, res) => {
  //Add the authorId from the auth-token as the FK in the PostSchema.
  const tokenId = await req.author._id;
  //Check if the Post exists.
  const postExists = await PostSchema.findOne({
    title: req.body.title,
    body: req.body.body,
    description: req.body.description,
  });
  if (postExists)
    return res.status(400).json({ message: "Post already exists!" });

  try {
    const newPost = new PostSchema({
      authorId: tokenId,
      title: req.body.title,
      body: req.body.body,
      description: req.body.description,
      headerImage: req.body.headerImage,
      slug: req.body.slug,
      tags: req.body.tags,
      category: req.body.category,
    });

    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/*******************************
	          PUT
  Update the Categories
*******************************/

//Export
module.exports = router;
