const router = require("express").Router();
const verifyToken = require("../middlewares/auth");

//Initialize the routes

const {
  createNewCategory,
  getAllCategories,
  getPostsByCategory,
  deleteCategory,
} = require("../controllers/category");

/*******************************
	          POST
  Create a new category
*******************************/
router.post("/newcategory", createNewCategory);

/*******************************
	          GET
    Get all the Categories
*******************************/

router.get("/", getAllCategories);

/*******************************
	          GET
    Get posts by Category
*******************************/
//What the User clicks a category in the frontEnd, the category is taken as the " :category".
router.get("/:category", getPostsByCategory);

/*******************************
	      DELETE
  Delete a Category
*******************************/
router.delete("/deletecategory/:id", deleteCategory);

//Export
module.exports = router;
