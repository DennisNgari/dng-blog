/*This is the Authentication Route that handles login logic, the issuance of 
authentication tokens and adding new users.
*/
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../controllers/validation");

// Load .env Variables
require("dotenv").config();

/*******************************
		Initialize Routes
*******************************/
const AuthorSchema = require("../models/Author");

/*******************************
	        POST 
      Register a new Author
*******************************/
router.post("/register", async (req, res) => {
  // Validate the data before adding a new user.
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //Checking if the user Email Exists.
  const emailExists = await AuthorSchema.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ message: "Email Already Exists" });

  //Checking if the phone Number is already registered.
  const phoneExists = await AuthorSchema.findOne({ phone: req.body.phone });
  if (phoneExists)
    return res
      .status(400)
      .json({ message: "Phone Number is already Registerd.." });

  // Hash the password.
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  //Create a New User
  const newAuthor = new AuthorSchema({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    password: hashPass,
  });

  try {
    const author = await newAuthor.save();
    res.status(200).json(author);
  } catch (error) {
    console.log("stop...");
    res.status(500).json({ message: error });
  }
});

/*******************************
	        POST 
        Login a User.
*******************************/
router.post("/login", async (req, res) => {
  //Validate user data before login.
  const { error } = loginValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //Checking if the Author Exist
  const author = await AuthorSchema.findOne({ email: req.body.email });
  if (!author) return res.status(400).send("Email Does NOT exist!");

  //Checking if the password is correct
  const validPass = await bcrypt.compare(req.body.password, author.password);
  if (!validPass) return res.status(400).send("Invalid Password!");

  //Create and assign a TOKEN
  const token = jwt.sign({ _id: author._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
