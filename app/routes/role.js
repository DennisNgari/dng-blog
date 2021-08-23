/*This is the Authentication Route that handles login logic, the issuance of 
authentication tokens and adding new users.
*/
const router = require("express").Router();
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

/*******************************
		Initialize Routes
*******************************/
const Role = require("../models/Role");

/*******************************
	       POST 
        Update Role
*******************************/

router.put("/updaterole/:id", [verifyToken, verifyAdmin], async (req, res) => {
  try {
    // Update the new Role and send the updated data in Json form.
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //Use local storage on the front end for confirmation before sending to the db.
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//try

/*******************************
	         GET
      Get all Roles
*******************************/
router.get("/roles", [verifyToken, verifyAdmin], async (req, res) => {
  const roles = await Role.find({});
  try {
    res.send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*******************************
	          GET
      Get a specific Role
*******************************/
router.get("/:id", [verifyToken, verifyAdmin], async (req, res) => {
  const posts = await Role.findById(req.params.id);
  try {
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
