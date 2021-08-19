const router = require("express").Router();
const bcrypt = require("bcrypt");

/*******************************
		Initialize Routes
*******************************/
const AuthorSchema = require("../models/Author");
const PostSchema = require("../models/Post");

/*******************************
	        PUT
  Update Author credentials.
*******************************/
router.put("/:id", async (req, res) => {
  if (req.body.authorId === req.params.id) {
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
router.get("/", async (req, res) => {
  const authors = await AuthorSchema.find({});
  try {
    //Destructure the Author output so as not to return the password.
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/*******************************
	        DELETE
  Delete an individual Author.
*******************************/
router.delete("/:id", async (req, res) => {
  if (req.body.authorId === req.params.id) {
    try {
      const user = await AuthorSchema.findById(req.params.id);
      try {
        //Delete the posts belonging to a specific autor based in the authorId.
        await PostSchema.deleteMany({
          authorId: user.authorId,
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
