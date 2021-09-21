const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fullName: { type: String },
    description: { type: String },
    readTime: { type: String },
    headerImage: { type: String, require: true },
    featured: { type: String, default: "false" },
    editorial: { type: String, default: "false" },
    body: { type: String, require: true },
    slug: { type: String, slug: "title" },
    tags: { type: [], required: true },
    category: { type: String, required: true },
    // author: {
    //   id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Author",
    //   },
    // },
  },
  { timestamps: true }
);

/**************************************
	 Change the Tittle to sentence Case.
*****************************************/
String.prototype.toTitleCase = function () {
  var i, j, str, lowers, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  lowers = [
    "A",
    "Is",
    "An",
    "The",
    "And",
    "But",
    "Or",
    "For",
    "Nor",
    "As",
    "At",
    "By",
    "For",
    "From",
    "In",
    "Into",
    "Near",
    "Of",
    "On",
    "Onto",
    "To",
    "With",
  ];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(
      new RegExp("\\s" + lowers[i] + "\\s", "g"),
      function (txt) {
        return txt.toLowerCase();
      }
    );

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ["Id", "Tv"];
  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(
      new RegExp("\\b" + uppers[i] + "\\b", "g"),
      uppers[i].toUpperCase()
    );

  return str;
};
/**************************************
      Format the title
****************************************/
PostSchema.pre("save", function (next) {
  this.title = this.title.toTitleCase();
  next();
});

/**************************************
      Create the Post Slug
****************************************/
PostSchema.pre("save", function (next) {
  this.slug = this.title.split(" ").join("-").toLowerCase();
  next();
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
