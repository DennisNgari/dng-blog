const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");

//Get all the imports
const {
  createNewPost,
  updateNewPost,
  getAllPosts,
  getSpecificPostById,
  GetDetailsOfPostAuhor,
  deletePost,
} = require("../controllers/posts");

/*******************************
	      POST
  Create a New post
*******************************/
router.post("/newpost", /*verifyToken*/ createNewPost);

/*******************************
	    PUT
  Update a post
*******************************/
router.put("/updatepost/:id", updateNewPost);

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
// Get the details of the post Author
// incomplete...
*******************************/
router.get("/author/:authorId", GetDetailsOfPostAuhor);

/*******************************
	       DELETE
  Remove a specific post
*******************************/
router.delete("/:id", /*verifyToken,*/ deletePost);

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
