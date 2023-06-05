const multer = require("multer");
const path = require("path");
// const fs = require("fs/promises");

const tempPath = path.join(__dirname, "..", "temp");
console.log(tempPath);

const multerConfig = multer.diskStorage({
  destination: tempPath,
  filename: (req, file, cb) => {
    const { _id } = req.user;
    cb(null, `${_id}__${file.originalname}`);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
