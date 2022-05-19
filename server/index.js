const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", require("./router/post.js"));
app.use("/api/user", require("./router/user.js"));

app.listen(port, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log("Connection MongoDB...");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
