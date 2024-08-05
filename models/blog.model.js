const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "authors",
  },
});

const Blog = mongoose.model("blogs", blogSchema);

module.exports = {
  Blog,
};
