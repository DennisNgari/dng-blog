const bcrypt = require("bcrypt");

/*******************************
		Initialize Routes
*******************************/
const AuthorSchema = require("../models/Author");
const PostSchema = require("../models/Post");

/*******************************
	        GET
      Get all Authors.
*******************************/
const getAllAuthors = async (req, res) => {
  const authors = await AuthorSchema.find({});
  try {
    //Destructure the Author output so as not to return the password.
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*******************************
	        PUT
  Update Author credentials and posts based on Token.
*******************************/
const updateAuthor = async (req, res) => {
  // Compare the token with the   passed on the params.
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      // Update the new User and send the data of the updated user in Json form.
      const updatedAuthor = await AuthorSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      //Instead of sending back the entire data only send a message of confirmation..
      //Use local storage on the front end for confirmation before sending to the db.
      res.status(200).json(updatedAuthor);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "You can only update your account!" });
  }
};

/*******************************
	        GET
      Get a specific author
*******************************/

const getSpecificAuthor = async (req, res) => {
  try {
    const author = await AuthorSchema.findById(req.params.id);
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*******************************
	        DELETE
  Delete an individual Author but leave the Posts.
*******************************/
const deleteAuthorAlone = async (req, res) => {
  if (req.author.authorId === req.body._id || req.author.role === "Admin") {
    try {
      await AuthorSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Author has been deleted." });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "You can only DELETE your account!" });
  }
};
/*******************************
	        DELETE
  Delete an individual Author and all their posts.
*******************************/
const deleteAuthorAndPosts = async (req, res) => {
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
};

module.exports = {
  getAllAuthors,
  updateAuthor,
  getSpecificAuthor,
  deleteAuthorAlone,
  deleteAuthorAndPosts,
};
