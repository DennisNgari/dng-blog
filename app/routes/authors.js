const router = require("express").Router();
const bcrypt = require("bcrypt");
const verifyToken = require("../controllers/verifyToken");

/*******************************
		Initialize Routes
*******************************/
const AuthorSchema = require("../models/Author");
const PostSchema = require("../models/Post");

/*******************************
	        PUT
  Update Author credentials and posts based on Token.
*******************************/
router.put("/:id", verifyToken, async (req, res) => {
  // Compare the token with the id passed on the params.
  if (req.author._id === req.params.id) {
    // The authorId is passed via the verifyToken middleware.
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      // Update the new User and send the data of the updated user in Json form.
      const updatedUser = await AuthorSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      //Instead of sending back the entire data only send a message of confirmation..
      //Use local storage on the front end for confirmation before sending to the db.
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "You can only update your account!" });
  }
});

/*******************************
	        GET
      Get all Authors.
*******************************/
router.get("/", verifyToken, async (req, res) => {
  const authors = await AuthorSchema.find({});
  try {
    //Destructure the Author output so as not to return the password.
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/*******************************
	        GET
      Get a specific author
*******************************/
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const author = await AuthorSchema.findById(req.params.id);
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/*******************************
	        DELETE
  Delete an individual Author but leave the Posts.
*******************************/
router.delete("/deleteone/:id", verifyToken, async (req, res) => {
  if (req.author._id === req.params.id) {
    try {
      await AuthorSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted." });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "You can only DELETE your account!" });
  }
});

/*******************************
	        DELETE
  Delete an individual Author and all their posts.
*******************************/
router.delete("/:id", verifyToken, async (req, res) => {
  //The req.params.id should be gotten from the body of the post i.e the authorId in the post schema.
  if (req.author._id === req.params.id) {
    try {
      const author = await AuthorSchema.findById(req.params.id);
      try {
        //Delete the posts belonging to that specific author based in the authorId.
        await PostSchema.deleteMany({
          authorId: req.params.id,
        });
        await AuthorSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted." });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } catch (error) {
      res.status(404).json({ message: "user NOT found!" });
    }
  } else {
    res.status(401).json({ message: "You can only DELETE your account!" });
  }
});

module.exports = router;
