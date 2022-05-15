const express = require("express");
const multer = require("multer");
const router = express.Router();

const setUpload = require("../util/upload.js");
const { Post } = require("../model/Post");
const { Counter } = require("../model/Counter");
const { User } = require("../model/User.js");

router.post("/write", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    text: req.body.text,
  };
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then((userInfo) => {
          temp.author = userInfo._id;
          const blotPost = new Post(temp);
          blotPost.save().then(() => {
            Counter.updateOne(
              { name: "counter" },
              { $inc: { postNum: 1 } }
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/list", (req, res) => {
  console.log(req.body.category);
  let temp = {};
  if (req.body.category) {
    temp = { category: req.body.category };
  }

  Post.find(temp)
    .populate("author")
    .sort({ postNum: -1 })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .populate("author")
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    text: req.body.text,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/image/upload", setUpload("react-blog/post"), (req, res) => {
  console.log(res.req);
  res.status(200).json({ success: true, filePath: res.req.file.location });
});

module.exports = router;
