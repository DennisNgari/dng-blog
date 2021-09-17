const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");

//Get all the imports
const {
  createNewPost,
  updateNewPost,
  getAllPosts,
  getSpecificPostById,
  getPostsOfLoggedInAuthor,
  GetDetailsOfPostAuhor,
  deletePost,
} = require("../controllers/posts");

/*******************************
	      POST
  Create a New post
*******************************/
router.post("/newpost", verifyToken, createNewPost);

/*******************************
	    PUT
  Update a post
*******************************/
router.put("/updatepost/:id", verifyToken, updateNewPost);

/*******************************
	      GET
  Get all Posts
*******************************/
router.get("/", getAllPosts);

/*******************************
	      GET
  Get specific post based on PostId
*******************************/
router.get("/:id", getSpecificPostById);

/*******************************
	          GET
// Get all the posts of the logged in author.
*******************************/
router.get("/loggedauthor/:id", verifyToken, getPostsOfLoggedInAuthor);

/*******************************
	          GET
// Get the details of the post Author
*******************************/
router.get("/author/:authorId", GetDetailsOfPostAuhor);

/*******************************
	       DELETE
  Remove a specific post
*******************************/
router.delete("/deleteonepost/:id", verifyToken, deletePost);

/*******************************
	//GET posts by slug
*******************************/
// router.get("/slug/:slug", getPostBySlugorAuthor);

/*******************************
	//GET
  Get all the featured Posts
*******************************/

/*******************************                                                            
	//GET
  Get the editorial Posts.
*******************************/

/*******************************
	//GET
  Get all the featured Posts by category.
*******************************/

//Export
module.exports = router;
