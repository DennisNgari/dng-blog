const jwt = require("jsonwebtoken");
const config = process.env;

/*******************************
	Verify User Token with 
        Token Secret Key
*********************************/

const verifyToken = (req, res, next) => {
  const token = req.header["x-auth-token"];
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};

/*******************************
	Check who is the
      Logged-in Author
*********************************/

//Admin
const verifyAdmin = async (req, res, next) => {
  const aauth = await AuthorSchema.findOne({ _id: author._id })
    .populate("roles")
    .exec((err, loggedInUser) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (loggedInUser.role === "standard") {
        next();
        return;
      }
    });
  return res.status(403).json({ message: "Unauthorized! " });
};

module.exports = { verifyToken, verifyAdmin };
