const Joi = require('joi');
const { HttpError } = require("../helpers/httpError");
const { ctrlWrapper } = require('../decorators/ctrlWrapper');
const { listContacts, getContactById,removeContact, addContact, updateContact } = require('../models/contacts');






const fetchAllContacts = async (req, res) => {
    const contacts = await listContacts();
  res.json(contacts);

};

const fetchContactById = async (req, res ) => { 
    const id = req.params.contactId;
    const contactById = await getContactById(id);
    if (!contactById) { throw HttpError(404) };
    res.json(contactById);

};

const deleteContact = async (req, res ) => { 
    const id = req.params.contactId;
    const deletedContact = await removeContact(id);
    if (!deletedContact) { throw HttpError(404) }
    res.json({ message: 'contact deleted' })

};

const addTheContact = async (req, res) => { 

   const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{10}$/).required()
});
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw HttpError(400, "Missing required field")
    }

    const newUser = await addContact(req.body);
    res.status(201).json(newUser);

 
};

const updateTheContact = async (req, res) => { 
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string().pattern(/^\d{10}$/)
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


};



module.exports = {
    fetchAllContacts: ctrlWrapper(fetchAllContacts),
    fetchContactById: ctrlWrapper(fetchContactById),
    deleteContact: ctrlWrapper(deleteContact),
    addTheContact: ctrlWrapper(addTheContact),
    updateTheContact: ctrlWrapper(updateTheContact),

};