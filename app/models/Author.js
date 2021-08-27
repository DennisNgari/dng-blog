const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "Standard" },
    phone: { type: String, required: true, min: 10, max: 13 },
    password: { type: String, required: true, min: 6, max: 1025 },
    avator: { type: String, default: "" },
    active: { type: Boolean, default: true },
    token: { type: String },
  },
  { timestamps: true, strict: true }
);
/**************************************
	 Change the email to lower case.
*****************************************/
AuthorSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase();
  next();
});

/**************************************
	Change the fullName to sentence case.
****************************************/
function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}
AuthorSchema.pre("save", function (next) {
  this.fullName = titleCase(this.fullName);
  next();
});

const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
