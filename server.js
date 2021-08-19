const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Load ENV Variables
require("dotenv").config();

app.use(express.json());

/************************* 
		Set Up DB 
*************************/
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("connected");
  }
);

/*******************************
		Import Routes
*******************************/

const homeRoute = require("./app/routes/home");
const authorRoute = require("./app/routes/authors");
const postsRoute = require("./app/routes/posts");
const authRoute = require("./app/routes/auth");

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

/*******************************
		Set port, listen for requests
*******************************/
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
