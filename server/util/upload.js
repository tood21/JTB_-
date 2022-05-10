const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const path = require("path");
const config = require("../config/dev.js");

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: config.access_key,
    secretAccessKey: config.secret_key,
  },
});

function setUpload(bucket) {
  var upload = multer({
    storage: multerS3({
      s3: S3,
      acl: "public-read-write",
      bucket: bucket,
      key: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension);
      },
    }),
  }).single("file");
  return upload;
}

module.exports = setUpload;
