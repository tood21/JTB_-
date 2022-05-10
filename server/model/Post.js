const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    content: String,
    text: String,
    postNum: Number,
    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { Collection: "posts" }
);

const Post = mongoose.model("post", postSchema);

module.exports = { Post };
