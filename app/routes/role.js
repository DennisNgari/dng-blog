/*This is the Authentication Route that handles login logic, the issuance of 
authentication tokens and adding new users.
*/
const router = require("express").Router();

const Author = require("../models/Author");
const Role = require("../models/Role");

/*******************************
		Initialize Routes
*******************************/
const RoleSchema = require("../models/Author");

/*******************************
	       POST 
        Update Role
*******************************/
router.post("/updateRole", async (req, res) => {
  //Update the new Role in the database.
  const { role } = req.body;
  const updatedRole = new RoleSchema({
    role: role,
  });

  try {
    const updatedRole = await newRole.save();
    res.status(200).json(role);
  } catch (error) {
    console.log("stop...");
    res.status(500).json({ message: error });
  }
});
// router.get("/", async (req, res) => {
//   AuthorSchema.find()
//     .populate("role") // key to populate
//     .then((user) => {
//       res.json(user);
//     });

router.get("/", async (req, res) => {
  Author.find({})
    .populate("role")
    .exec((err, result) => {
      if (err) {
        return res.json({ error: err });
      }
      res.json({ result: result });
    });
  //   const aauth = await AuthorSchema.find()
  //     .populate("roles")
  //     .exec((err, role) => {
  //       if (err) {
  //         return res.status(500).send({ message: err });
  //       }
  //       return res.status(200).json(role);
  //     });
  //   const aauth = await AuthorSchema.find().populate([{ path: "role" }]);
});

module.exports = router;
