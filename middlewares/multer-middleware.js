const multer = require("multer");

const storage = multer.diskStorage({
  // tell multer where to save uploaded files
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const multipleUpload = upload.fields([{ name: "image", maxCount: 2 }]);

module.exports = multipleUpload;
