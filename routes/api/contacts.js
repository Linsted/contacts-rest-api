const express = require("express");
const router = express.Router();
const {
  fetchAllContacts,
  fetchContactById,
  addTheContact,
  deleteContact,
  updateFavorite,
  updateTheContact,
  filterUserByFavourite,
} = require("../../controllers/contacts-controller");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, filterUserByFavourite, fetchAllContacts);
router.get("/:contactId", authenticate, fetchContactById);
router.delete("/:contactId", authenticate, deleteContact);
router.post("/", authenticate, addTheContact);
router.put("/:contactId", authenticate, updateTheContact);
router.patch("/:contactId/favorite", authenticate, updateFavorite);

module.exports = router;
