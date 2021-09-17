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
*******************************/

const getAllPosts = async (req, res) => {
  const posts = await PostSchema.find({});
  try {
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
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
// Get all the posts of the logged in author.
*******************************/

const getPostsOfLoggedInAuthor = async (req, res) => {
  //The params.id in the PostsSchema is the authorId and not PostId
  if (
    req.author.authorId === req.body.authorId ||
    req.author.role === "Admin"
  ) {
    try {
      const posts = await PostSchema.find({});

      const filteredposts = posts.filter((post) => {
        return post.authorId === req.body.authorId;
      });
      res.status(200).json(filteredposts);
    } catch (error) {
      res.status(500).json({ message: "No Posts from this User! " });
    }
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
	//GET posts by slug or Author name.
  
*******************************/
// const getPostBySlugorAuthor = async (req, res) => {
//   const username = req.query.slug;
//   const catName = req.query.catName;
//   try {
//     let posts;
//     if (username) {
//       posts = await PostSchema.find({ username });
//     } else if (catName) {
//       posts = await PostSchema.find({
//         category: {
//           $in: [catName],
//         },
//       });
//     } else {
//       posts = await PostSchema.find();
//     }
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json({ message: error });
//   }
// };

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
  getPostsOfLoggedInAuthor,
  GetDetailsOfPostAuhor,
  deletePost,
};
