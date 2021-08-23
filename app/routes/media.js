const router = require("express").Router();
const multer = require("multer");
const verifyToken = require("../controllers/verifyToken");

/*******************************
		Initialize Routes
*******************************/
const MediaSchema = require("../models/Media");

/*******************************
	          GET
    Get all the media Files.
*******************************/

router.get("/", async (req, res) => {
  const media = await MediaSchema.find({});
  try {
    res.status(200).json(media);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Export
module.exports = router;
