const jwt = require("jsonwebtoken");

/*******************************
	Verify User Token with 
        Token Secret Key
*********************************/

const verifyToken = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.author = decoded;
    res.locals.user = req.author;
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

const verifyUser = async (req, res, next) => {
  const author = res.locals.user;
  const role = author.role;
  if (role === "Admin") {
    next();
    return;
  } else {
    return res.status(403).json({ message: "Unauthorized! " });
  }
};

module.exports = { verifyToken, verifyUser };

// const verifyAdmin = async (req, res, next) => {
//   const author = res.locals.user;

//   Role.findOne({ author: author.authorId })
//     .populate("author")
//     .exec((err, loggedInUser) => {
//       if (err) {
//         return res.status(500).send({ message: err });
//       }
//       const { role } = loggedInUser;
//       if (role === "Admin") {
//         next();
//         return;
//       } else {
//         return res.status(403).json({ message: "Unauthorized! " });
//       }
//     });
// };
