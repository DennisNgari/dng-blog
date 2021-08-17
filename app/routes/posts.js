const express = require('express');
const router = express.Router();
const PostModel = require("../models/Post");

/*******************************
	//GET all Posts
*******************************/
router.get('/', async (req, res) => {
	const posts = await PostModel.find({});
	try {
	  res.send(posts);
	} catch (error) {
	  res.status(500).send(error);
	}
  });


/*******************************
	GET a specific Post by ID.
//Problem Not getting the individual post
*******************************/
router.get("/:postId", async (req, res) => {
	try {
	  const post = await PostModel.findById(req.params.postId);
	  if (!post) return res.status(404).send("Post does not exist.");
	//   return res.status(404).json({ message: 'Post does not exist..' }); 
	  res.json(post);
	} catch (error) {
	  res.json({ message: error });
	}
  });



/*******************************
	//GET posts by category
*******************************/



/*******************************
	//GET Editorial Posts
*******************************/

/*******************************
	//GET Featured Posts
*******************************/

/*******************************
	//GET posts by slug
*******************************/




//-----------------------------//
	//POST New Post Endpoint
//-----------------------------//
router.post('/newpost',async (req,res)=>{
	const post = new PostModel({
		title: req.body.title,
		body: req.body.body,
		description: req.body.description,
		headerImage: req.body.headerImage,
		slug: req.body.slug,
		tags: req.body.tags,
		category: req.body.category
	})
	try {
		await post.save();
    console.log("saved..");
    res.send(post);
	} catch (error) {
		res.status(400).send(error);
	}
})



//################################//
	//PUT Update a Post Endpoint
//################################//

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-//
	//DELETE a single POST
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-//

module.exports = router;
