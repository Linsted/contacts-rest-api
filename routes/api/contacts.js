const express = require('express')
const router = express.Router();
const { fetchAllContacts, fetchContactById, addTheContact,
    deleteContact,
    updateFavorite,
    updateTheContact
} = require('../../controllers/contacts-controller');


router.get('/', fetchAllContacts);
router.get('/:contactId', fetchContactById);
router.delete('/:contactId', deleteContact);
router.post('/', addTheContact);
router.put('/:contactId', updateTheContact);
router.patch("/:contactId/favorite", updateFavorite);

module.exports = router;

