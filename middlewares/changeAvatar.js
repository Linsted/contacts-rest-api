const { HttpError } = require("../helpers/httpError");
const Jimp = require("jimp");

const changeAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path } = req.file;
  if (!_id) {
    throw HttpError(401);
  }
  console.log("in changeAvatar", req.file);
  Jimp.read(path, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).writeAsync(path);
  });
  next();
};

module.exports = changeAvatar;
