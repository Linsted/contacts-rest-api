const express = require('express')
const Joi = require('joi');
const router = express.Router();
const { listContacts, getContactById, addContact,updateContact, removeContact } = require("../../models/contacts");
const {HttpError} = require("../../helpers/httpError")

router.get('/', async (req, res, next) => {

  try {
    const contacts = await listContacts();
  res.json(contacts)
  } catch (error) {
    next(error);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contactById = await getContactById(id);
    if (!contactById) { throw HttpError(404) };
    res.json(contactById);
  } catch (error) {
    next(error);
  }
  
  
});




router.post('/', async (req, res, next) => {
  
  try {
  
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string()
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw HttpError(400, "Missing required field")
    }

    const newUser = await addContact(req.body);
    res.status(201).json(newUser);

  } catch (error) {
    next(error)
  }

});



router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await removeContact(id);
    if (!deletedContact) { throw HttpError(404) }

    res.json({ message: 'contact deleted' })
  }
  catch (error) {
   next(error)
  }
});

router.put('/:contactId', async (req, res, next) => {

  try {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string()
    }).or('name', 'email', 'phone').required();

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw HttpError(400, "Missing field")
    }
    const id = req.params.contactId;
    const body = req.body;
    const updatedContact = await updateContact(id, body);
    if (!updatedContact) { throw HttpError(404) };
    res.json(updatedContact);

  } catch (error) {
    next(error)
  }


  
});

module.exports = router;

