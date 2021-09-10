const multer = require("multer");
const path = require("path");

const uploadImagesEndSendEmail = async (files, res) => {
  try {
    if (files) {
      return res.status(200).json({
        message: `Images has been uploaded & sended successfully`,
        data: files,
        success: true,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `ERROR: ${err}`,
      success: false,
    });
  }
};
module.exports = {
  uploadImagesEndSendEmail,
};
