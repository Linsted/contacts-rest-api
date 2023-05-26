const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
} = require("../../controllers/user-controller");
const authenticate = require("../../middlewares/authenticate");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticate, logoutUser);
router.get("/current", authenticate, currentUser);
router.patch("/", authenticate, updateSubscription);
module.exports = router;
