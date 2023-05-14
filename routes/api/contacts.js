const express = require('express')
const router = express.Router();
const { fetchAllContacts, fetchContactById, deleteContact,addTheContact,updateTheContact } = require('../../controllers/contacts-controller');


router.get('/', fetchAllContacts);
router.get('/:contactId', fetchContactById);
router.delete('/:contactId', deleteContact);
router.post('/', addTheContact);
router.put('/:contactId', updateTheContact);

module.exports = router;

