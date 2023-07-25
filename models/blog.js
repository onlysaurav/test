const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  assets: {
    type: Array,
  },
});
const blog = mongoose.model("blog", blogSchema);
module.exports = blog;
