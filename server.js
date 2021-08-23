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
		Import Routes
*******************************/

const homeRoute = require("./app/routes/home");
const authorRoute = require("./app/routes/authors");
const postsRoute = require("./app/routes/posts");
const authRoute = require("./app/routes/auth");
const categoryRoute = require("./app/routes/category");
const mediaRoute = require("./app/routes/media");
const roleRoute = require("./app/routes/role");

/*******************************
		Initialize Routes
*******************************/
app.use("/api/v1/home", homeRoute);

// The authors can update their credentials and posts here.
app.use("/api/v1/authors", authorRoute);

//View all posts, categories and individual posts.
app.use("/api/v1/posts", postsRoute);

//Only handles login and the issuance of verification tokens.
app.use("/api/v1/auth", authRoute);

//Create new categories and create post based on category.
app.use("/api/v1/category", categoryRoute);

//Create new media and their captions
app.use("/api/v1/media", mediaRoute);

//Create new role and their update the current one.
app.use("/api/v1/role", roleRoute);

/*******************************
		Set port, listen for requests
*******************************/
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
