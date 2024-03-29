/*This is the Authentication Route that handles login logic, the issuance of 
authentication tokens and adding new Authors.
*/

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Get the imports
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation");

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
const registerNewAuthor = async (req, res) => {
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

  //Create a New Author in the database.
  const { fullName, email, phone } = req.body;

  const newAuthor = new AuthorSchema({
    fullName,
    email: email,
    phone,
    password: hashPass,
  });

  //Generate a token when the author registers.
  const token = jwt.sign(
    { authorId: newAuthor._id, email },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );

  //Save the token
  newAuthor.token = token;

  //Save the new Author and the Role.
  try {
    const author = await newAuthor.save();
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*******************************
	        POST 
        Login a User.
*******************************/
const login = async (req, res) => {
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
  const { role, fullName } = author;
  const token = jwt.sign(
    { authorId: author._id, email, role, fullName },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  //Save and replace the old token with the new one.
  author.token = token;
  // res.header("x-auth-token", token).send(token);
  res.status(200).json(author);
};

module.exports = { registerNewAuthor, login };
