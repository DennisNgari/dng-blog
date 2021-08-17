const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  mediaName: {
    type: String,
  },
  mediaCaption: {
    type: String,
  },
});

module.exports = mongoose.model("Media", MediaSchema);
 
