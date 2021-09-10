const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multipleUpload = require("./middlewares/multer-middleware");
const nodemailer = require("nodemailer");
const deleteAllFilesInFolder = require("./helpers/helper");
const fs = require("fs");
const path = require("path");

const uploadsDirectory = "./uploads";

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var imagesArray = [];
let msg;

app.get("/", (req, res) => {
  res.send("app for testing multer");
});

app.post("/uploadimage", multipleUpload, async (req, res) => {
  try {
    const { email, text } = req.body;

    const image1 = req.files.image[0].originalname;
    const image2 = req.files.image[1].originalname;

    // nodemailer for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    //read images from uploads folder
    await fs.readdir(path.resolve(__dirname, "uploads"), (err, files) => {
      if (err) throw err;

      for (let file of files) {
        imagesArray.push(file);
        console.log(imagesArray);
      }

      msg = {
        from: process.env.EMAIL, // sender address
        to: `${email}`, // list of receivers
        subject: "ModularCx", // Subject line
        text: `${text}`, // plain text body
        html: 'Model images :<br> <img src="cid:unique@nodemailer.com"/> <br><br>  <img src="cid:unique1@nodemailer.com"/>',
        attachments: [
          {
            filename: "input.png",
            path: __dirname + "/uploads/" + image1,
            cid: "unique@nodemailer.com", //same cid value as in the html img src
          },
          {
            filename: "input.png",
            path: __dirname + "/uploads/" + image2,
            cid: "unique1@nodemailer.com", //same cid value as in the html img src
          },
        ],
      };
      transporter.sendMail(msg);
    });

    //setTimeout(deleteAllFilesInFolder(), 10000);

    res.send(`email sent:${text}`);
  } catch (err) {
    return res.status(500).json({
      message: `ERROR: ${err}`,
      success: false,
    });
  }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
