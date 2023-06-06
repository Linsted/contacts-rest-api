const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
  updateAvatar,
  verifyUser,
} = require("../../controllers/user-controller");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");
const changeAvatar = require("../../middlewares/changeAvatar");

router.post("/register", registerUser);
router.get("/verify/:verificationToken", verifyUser);
router.post("/login", loginUser);
router.post("/logout", authenticate, logoutUser);
router.get("/current", authenticate, currentUser);
router.patch("/", authenticate, updateSubscription);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  changeAvatar,
  updateAvatar
);

module.exports = router;
