const fs = require("fs");
const path = require("path");
const util = require("util");

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

const uploadsDirectory = "./uploads";

// deletes all the files in the compressed and uploads folder
const deleteAllFilesInFolder = async () => {
  try {
    let files = await readdir(uploadsDirectory);
    if (files.length > 0) for (let file of files) await unlink(path.join(uploadsDirectory, file));
  } catch (err) {
    throw new Error("Something went wrong while deleting the files \n " + err);
  }
};

module.exports = deleteAllFilesInFolder;
