const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

const { Post } = require("./model/Post");
const { Counter } = require("./model/Counter");

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://skkwin:sd12341!@boilerplate.zqy0o.mongodb.net/blog?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log("Connection MongoDB...");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.post("/api/posts/write", (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      const blotPost = new Post(temp);
      blotPost.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post("/api/posts/list", (req, res) => {
  Post.find()
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post("/api/posts/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});
