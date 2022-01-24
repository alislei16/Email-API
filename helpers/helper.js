const fs = require("fs");
const path = require("path");
const util = require("util");
const { S3 } = require("aws-sdk");
const { newPath } = require("../middlewares/multer-middleware");
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

const uploadsDirectory = "./uploads";

const s3 = new S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const BucketName = "multerapp/images";

// deletes all the files in the uploads folder
const deleteAllFilesInFolder = async () => {
  try {
    let files = await readdir(uploadsDirectory);
    if (files.length > 0) for (let file of files) await unlink(path.join(uploadsDirectory, file));
  } catch (err) {
    throw new Error("Something went wrong while deleting the files \n " + err);
  }
};

// after i take images from the req and i put this image in file uploads i want to read this images from uploads
//and put them in s3 bucket after that i wnat delete this file (images) from uploads == server
const UploadimageToS3Bucket = async (file, res) => {
  try {
    // let fileObject = await CompressFile(file);
    let filepath = file.path;
    const fileStream = fs.createReadStream(filepath); // create read stream of the images
    let uploadParams = {
      Bucket: BucketName,
      Body: fileStream,
      Key: file.originalname,
    };

    let returnedObjectFromS3 = await s3.upload(uploadParams).promise();
    console.log(`File uploaded successfully. ${returnedObjectFromS3.Location}`);

    return res.status(200).json({
      message: `image has been uploaded successfully`,
      data: returnedObjectFromS3,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `ERROR: ${err}`,
      success: false,
    });
  }
};

module.exports = { deleteAllFilesInFolder, UploadimageToS3Bucket };
