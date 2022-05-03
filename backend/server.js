const express = require("express");
const path = require("path");

const app = express();
console.log(__dirname);

app.use(express.static(path.join(__dirname, "../frontend/build/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(8080, function () {
  console.log("start! express server on port 8080");
});
