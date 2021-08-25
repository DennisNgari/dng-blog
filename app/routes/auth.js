const router = require("express").Router();

// Get the imports
const { registerNewAuthor, login } = require("../controllers/auth");

/*******************************
	        POST 
      Register a new Author
*******************************/
router.post("/register", registerNewAuthor);

/*******************************
	        POST 
        Login a User.
*******************************/
router.post("/login", login);

module.exports = router;
