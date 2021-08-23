/*This is the Authentication Route that handles login logic, the issuance of 
authentication tokens and adding new users.
*/
const router = require("express").Router();
const Author = require("../models/Author");

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

module.exports = router;
