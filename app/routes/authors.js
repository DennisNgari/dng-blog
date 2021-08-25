const router = require("express").Router();

//Get all the imports
const { verifyToken, verifyAdmin } = require("../middlewares/auth");
const {
  getAllAuthors,
  updateAuthor,
  getSpecificAuthor,
  deleteAuthorAndPosts,
  deleteAuthorAlone,
} = require("../controllers/authors");

/*******************************
	        PUT
  Update Author credentials and posts based on Token.
*******************************/
router.put("/:id", verifyToken, updateAuthor);

/*******************************
	        GET
      Get all Authors.
*******************************/
router.get("/", verifyToken, getAllAuthors);

/*******************************
	        GET
      Get a specific author
*******************************/
router.get("/:id", verifyToken, getSpecificAuthor);

/*******************************
	        DELETE
  Delete an individual Author but leave the Posts.
*******************************/
router.delete("/deleteone/:id", [verifyToken, verifyAdmin], deleteAuthorAlone);

/*******************************
	        DELETE
  Delete an individual Author and all their posts.
*******************************/
router.delete("/:id", [verifyToken, verifyAdmin], deleteAuthorAndPosts);

module.exports = router;
