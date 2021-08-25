const router = require("express").Router();
const verifyToken = require("../controllers/verifyToken");

//Initialize the routes

const {
  getAllCategories,
  createNewCategory,
  getPostsByCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
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
	          PUT
  Create a new category
*******************************/
router.post("/newcategory", verifyToken, createNewCategory);

/*******************************
	        PUT
  Update a category
*******************************/
router.put("/updatecategory/:id", verifyToken, updateCategory);

/*******************************
	      DELETE
  Delete a Category
*******************************/
router.delete("/deletecategory/:id", verifyToken, deleteCategory);

//Export
module.exports = router;
