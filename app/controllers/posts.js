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

  // Check if the Post already exists.
  const postExists = await PostSchema.findOne({ body: req.body.body });
  if (postExists)
    return res.status(400).json({ message: "Post Already Exists" });

  const {
    title,
    readTime,
    body,
    description,
    category,
    tags,
    headerImage,
    fullName,
  } = req.body;

  const newPost = new PostSchema({
    title,
    readTime,
    description,
    body,
    tags,
    category,
    headerImage,
    fullName,
  });

  // // Save the newPost
  try {
    const post = await newPost.save();
    console.log("saving...");
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

  res.status(401).json({ message: "You can only update your own post!" });
};

/*******************************
	      GET
  Get all Posts (/posts)
  Get all posts by a given Author based on Author Name (/posts?user=name)
  Get all posts by category. (/posts?cat=categoryName)
  Get posts by slug. (/posts?slug=slug)
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
  Get a specific post based on PostId
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
// Incomplete....
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
  // This function delete the posts completely.
  // Make sure to implement filter instead while the Admin is the one allowed to permanently delete.
  // Incomplete...
******************************/
const deletePost = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    if (post.fullName === req.body.fullName) {
      console.log("one..");
      try {
        await PostSchema.findByIdAndDelete(req.params.id);
        console.log("two...");
        res.status(200).json({ message: "Post has been Deleted..." });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res.status(401).json({ message: "You can only delete your Post!" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
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
