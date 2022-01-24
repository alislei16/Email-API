const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { S3 } = require("aws-sdk");
//get all files in the directopry
// var arrayOfFiles = [];
// try {
//   arrayOfFiles = fs.readdirSync("./");
//   console.log(arrayOfFiles);
// } catch (e) {
//   console.log(e);
// }
// //function that return name of the file that is different

// var Path;
// //console.log(iterator);
// for (var value of arrayOfFiles) {
//   if (value.substr(0, 3) == "upl") {
//     Path = value;
//   }
//   console.log(value);
// }
// console.log(Path);
// //rename the file of uploads because i want to reupload in it

// const currPath = Path; // lpath lal file hala2
// const newPath = "./uploads" + uuidv4(); //hayda li 7a a3melo generation mn jdid

// fs.rename(currPath, newPath, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully renamed the directory.");
//   }
// });
// console.log(typeof newPath);

// when i upload in my server file i want to upload in s3 bucket
const s3 = new S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const BucketName = "emailapp-api/models-images";

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

//console.log(typeof multipleUpload);
module.exports = multipleUpload;
