const router = require("express").Router();

//Get all the imports
const { verifyToken, verifyUser } = require("../middlewares/auth");
const {
  getAllAuthors,
  updateAuthor,
  getSpecificAuthor,
  deleteAuthorAndPosts,
  deleteAuthorAlone,
} = require("../controllers/authors");

/*******************************
	        PUT
  Update Author credentials based on Token.
*******************************/
router.put("/updateauthor/:id", updateAuthor);

/*******************************
	        GET
      Get all Authors.
*******************************/
router.get("/", /* verifyToken,*/ getAllAuthors);

/*******************************
	        GET
      Get a specific author
*******************************/
router.get("/:id", verifyToken, getSpecificAuthor);

/*******************************
	        DELETE
  Delete an individual Author but leave the Posts.
*******************************/
router.delete(
  "/delete-author/:id",
  [verifyToken, verifyUser],
  deleteAuthorAlone
);

/*******************************
	        DELETE
  Delete an individual Author and all their posts.
*******************************/
router.delete("/:id", [verifyToken, verifyUser], deleteAuthorAndPosts);

module.exports = router;
