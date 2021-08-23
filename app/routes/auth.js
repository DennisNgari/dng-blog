/*This is the Authentication Route that handles login logic, the issuance of 
authentication tokens and adding new users.
*/
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");

const {
  registerValidation,
  loginValidation,
} = require("../controllers/validation");
const Author = require("../models/Author");

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

  //Create a New Author in our database.
  const { fullName, email, phone, role } = req.body;
  //Change the fullName to sentence and email to lower case before saving in the db.
  const titleCase = (str) => {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  };

  const newAuthor = new AuthorSchema({
    fullName: titleCase(fullName),
    email: email.toLowerCase(),
    phone,
    password: hashPass,
  });
  //Generate a token when the author registers.
  const token = jwt.sign(
    { authorId: newAuthor._id, email },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  //Map the new role
  // const newRole = new Role({
  //   author: newAuthor._id,
  // });
  // //Map the new Status
  // const newStatus = new Active({
  //   author: newAuthor._id,
  // });

  //Save the token
  newAuthor.token = token;

  //Save the new Author and the Role.
  try {
    // const role = await newRole.save();
    const newRole = new Role({
      author: newAuthor._id,
    });
    const author = await newAuthor.save();
    const role = await newRole.save();
    console.log(newRole);

    res.status(200).json(author);
  } catch (error) {
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
  // Get user input
  const { email, password } = req.body;
  /*
  The two <if> statements can also be written as;
  if (user && (await bcrypt.compare(password, user.password))){
    -- if correct assign a new token
  }else{
    -- Invalid Username and/password!
  }
  */

  const author = await AuthorSchema.findOne({ email });
  if (!author) return res.status(400).send("Email Does NOT exist!");

  //Checking if the password is correct
  const validPass = await bcrypt.compare(password, author.password);
  if (!validPass) return res.status(400).send("Invalid Password!");

  //Create and assign a TOKEN when the author logs in.
  const token = jwt.sign(
    { authorId: author._id, email },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  //Save and replace the old token with the new one.
  // author.token = newtoken;
  res.header("x-auth-token", token).send(token);
  // res.send(token);
});

module.exports = router;

//Pseudo Code

/*
1. Find the author roles,
 if (req.body.roles){
   role.find({
     name:
   })
 }
 */
