/*******************************
		Initialize Routes
*******************************/
// const verifyToken = require("../controllers/verifyToken");
const AuthorSchema = require("../models/Author");
const PostSchema = require("../models/Post");

/*******************************
	      POST
  Create a New post
*******************************/
const createNewPost = async (req, res) => {
  //Add the authorId from the auth-token as the FK in the PostSchema.
  const tokenId = await req.author.authorId;
  const authName = await req.author.fullName;
  console.log(authName);

  // Check if the Post already exists.
  const postExists = await PostSchema.findOne({ body: req.body.body });
  if (postExists)
    return res.status(400).json({ message: "Post Already Exists" });
  const { title, subtitle, readTime, body, description, category } = req.body;
  //Change the fullName to sentence and email to lower case before saving in the db.

  //Reference the PostSchema to the AuthorSchema.
  const newPost = new PostSchema({
    title,
    readTime,
    subtitle,
    description,
    body,
    category,
    authorId: tokenId,
    fullName: authName,
  });
  // // Save the newPost
  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/*******************************
	    PUT
  Update a post
******************************/
const updateNewPost = async (req, res) => {
  // Compare the token with the id passed on the params.
  //The req.params.id is gotten from the body of the post i.e the authorId in the post schema.
  if (req.author.authorId === req.body._id || req.author.role === "Admin") {
    try {
      // Update the new User and send the data of the updated user in Json form.
      const updatedPost = await PostSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      //Instead of sending back the entire data only send a message of confirmation..
      //Use local storage on the front end for confirmation before sending to the db.
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "You can only update your own post!" });
  }
};

/*******************************
	      GET
  Get all Posts
  Get all posts from a given Author
  Get all posts by category.
  Get all posts byslug.
*******************************/
const getAllPosts = async (req, res) => {
  const fullName = req.query.user;
  const catName = req.query.cat;
  const slug = req.query.title;
  try {
    let posts;
    if (fullName) {
      posts = await PostSchema.find({ fullName: fullName });
    } else if (catName) {
      posts = await PostSchema.find({
        category: {
          $in: [catName],
        },
      });
    } else if (slug) {
      posts = await PostSchema.find({ slug: slug });
    } else {
      posts = await PostSchema.find({});
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*******************************
	      GET
  Get specific post based on PostId
*******************************/
const getSpecificPostById = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*******************************
	          GET 
// Get the details of the post author
*******************************/
const GetDetailsOfPostAuhor = async (req, res) => {
  const authorId = req.body.authorId;

  try {
    const { fullName, email } = await AuthorSchema.findById({ _id: authorId });

    res.status(200).json({ fullName, email });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*******************************
	       DELETE
  Remove a specific post
  //Uncomplete..
******************************/
const deletePost = async (req, res) => {
  if (req.author.authorId === req.body.authorId) {
    try {
      await PostSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Post has been deleted." });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "You can only DELETE your own Post!" });
  }
};

/*******************************
	//GET 
  Get all the featured Posts
*******************************/

/*******************************
	//GET 
  Get all featured Posts In each Category
*******************************/

/*******************************
	//GET 
  Get the editorial Posts.
*******************************/

module.exports = {
  createNewPost,
  updateNewPost,
  getAllPosts,
  getSpecificPostById,
  GetDetailsOfPostAuhor,
  deletePost,
};
