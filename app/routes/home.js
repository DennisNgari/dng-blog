const router = require("express").Router();

const {
  getEditorialPosts,
  filterByfeatureAndCategory,
  filterByCategory,
  getAllCategories,
} = require("../controllers/home");
/*******************************
	          GET
    filter posts by editorial.
*******************************/
router.get("/editorial", getEditorialPosts);

/*******************************
	          GET
    filter posts by featured and Category
*******************************/
router.get("/featured/:category", filterByfeatureAndCategory);

/*******************************
	          GET
    filter posts by Categories
*******************************/
router.get("/:category", filterByCategory);

/*******************************
	          GET
    Get all the Categories
*******************************/
router.get("/:category", getAllCategories);

module.exports = router;
