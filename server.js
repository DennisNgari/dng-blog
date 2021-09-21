const express = require("express");
const app = express();

// Load ENV Variables
require("dotenv").config();
app.use(express.json());

/************************* 
		Connect to the DB 
*************************/
const connection = require("./app/controllers/db");
connection();

/*******************************
	Image Upload and Storage.
*******************************/
// Upload media files
const multer = require("multer");
const path = require("path");
// Make the images folder public.
app.use("/images", express.static(path.join(__dirname, "app/images")));

// This takes our file and saves it in the images folder.
// The filename ois the name the user is providing.

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./app/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
// Upload the file
const upload = multer({ storage: storage });
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded!");
});
/*******************************
		Import Routes
*******************************/
const authRoute = require("./app/routes/auth");
// const homeRoute = require("./app/routes/home");
const authorRoute = require("./app/routes/authors");
const postsRoute = require("./app/routes/posts");
const categoryRoute = require("./app/routes/category");
// const mediaRoute = require("./app/routes/media");

/*******************************
		Initialize Routes
*******************************/
// //Only handles login and the issuance of verification tokens.
app.use("/api/v1/auth", authRoute);

// // //Get all editorial, featured posts, category posts et.al
// // app.use("/api/v1/home", homeRoute);

// // // The authors can update their credentials and posts here.
app.use("/api/v1/authors", authorRoute);

// //View all posts, categories and individual posts.
app.use("/api/v1/posts", postsRoute);

//Create new categories and create post based on category.
app.use("/api/v1/category", categoryRoute);

// //Create new media and their captions
// app.use("/api/v1/media", mediaRoute);

/*******************************
		Set port, listen for requests
*******************************/
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
