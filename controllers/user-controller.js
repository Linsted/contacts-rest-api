const { User, JoiScheme } = require("../models/user-schema");
const { HttpError } = require("../helpers/httpError");
const { ctrlWrapper } = require("../decorators/ctrlWrapper");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    throw HttpError(409, "User already exists");
  }

  const { error } = JoiScheme.registerUser.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing required field");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json({ message: `User ${newUser.email} registered` });
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw HttpError(401, "Email or password not found");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    throw HttpError(401, "Email or password not found");
  }

  const { error } = JoiScheme.loginUser.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing required field");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "23h",
  });
  await User.findOneAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw HttpError(401);
  }
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: " Successfully logged out" });
};

const currentUser = async (req, res) => {
  const { _id, email, subscription } = req.user;
  if (!_id) {
    throw HttpError(401);
  }
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw HttpError(401);
  }

  const { error } = JoiScheme.updateSubscription.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    throw HttpError(400, "Missing field");
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      subscription: req.body.subscription,
    },
    {
      new: true,
    }
  );
  if (!updatedUser) {
    throw HttpError(404);
  }
  res.json(updatedUser);
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  currentUser: ctrlWrapper(currentUser),
  updateSubscription: ctrlWrapper(updateSubscription),
};
