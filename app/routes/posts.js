const router = require("express").Router();

/*******************************
		Initialize Routes
*******************************/
const verifyToken = require("../controllers/verifyToken");
const PostSchema = require("../models/Post");

/*******************************
	      POST
  Create a New post
*******************************/
router.post("/newpost", verifyToken, async (req, res) => {
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
    console.log("saved..");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/*******************************
	//GET all Posts
*******************************/
router.get("/", async (req, res) => {
  const posts = await PostSchema.find({});
  try {
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*******************************
	GET a specific Post by ID.
//Problem Not getting the individual post
*******************************/
router.get("/:id", verifyToken, async (req, res) => {
  //The params.id in the PostsSchema is the authorId and not PostId
  if (req.author._id === req.params.id) {
    try {
      const posts = await PostSchema.find({});

      const filteredposts = posts.filter((post) => {
        return post.authorId === req.params.id;
      });
      res.status(200).json(filteredposts);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  res.status(500).json({ message: "User DOES NOT exist! " });
});

/*******************************
	//GET posts by category
*******************************/

/*******************************
	//GET Editorial Posts
*******************************/

/*******************************
	//GET Featured Posts
*******************************/

/*******************************
	//GET posts by slug
*******************************/

/*******************************
	    PATCH
  Update a New post
*******************************/

/*******************************
	       DELETE
  Remove a specific post
*******************************/

module.exports = router;
