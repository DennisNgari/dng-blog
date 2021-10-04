const router = require("express").Router();
const verifyToken = require("../middlewares/auth");

//Initialize the routes

const {
  createNewCategory,
  getAllCategories,
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
	      DELETE
  Delete a Category
*******************************/
router.delete("/deletecategory/:id", deleteCategory);

//Export
module.exports = router;
