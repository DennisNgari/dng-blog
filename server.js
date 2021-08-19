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
const usersRoute = require("./app/routes/user");
const postsRoute = require("./app/routes/posts");
const loginRoute = require("./app/routes/auth");

/*******************************
		Initialize Routes
*******************************/
app.use("/api/v1/home", homeRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/posts", postsRoute);
app.use("/api/v1/auth", loginRoute);

// Set port, listen for requests
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
