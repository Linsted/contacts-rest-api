
const { HttpError } = require("../helpers/httpError");
const { ctrlWrapper } = require('../decorators/ctrlWrapper');
const {Contact} = require("../models/contact-schema");
const {JoiSchema } = require("../models/contact-schema");



const fetchAllContacts = async (req, res) => {
    const contacts = await  Contact.find();
  res.json(contacts);

};

const fetchContactById = async (req, res ) => { 
  const id = req.params.contactId;
  const contactById = await Contact.findById(id);
    if (!contactById) { throw HttpError(404) };
    res.json(contactById);
};

const deleteContact = async (req, res ) => { 
    const id = req.params.contactId;
    const deletedContact = await Contact.findByIdAndRemove(id);
    if (!deletedContact) { throw HttpError(404) }
    res.json({ message: 'contact deleted' })

};

const addTheContact = async (req, res) => { 
   const schema = JoiSchema.addContactSchema;
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {throw HttpError(400, "Missing required field")};
    const newUser = await Contact.create(req.body);
    res.status(201).json(newUser);
};



const updateTheContact = async (req, res) => {
  const schema = JoiSchema.updateContactSchema;
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {throw HttpError(400, "Missing field")};
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedContact) { throw HttpError(404) };
  res.json(updatedContact);


};  
const updateFavorite = async (req, res) => { 
  const schema = JoiSchema.updateFavoriteSchema;
  const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw HttpError(400, "missing field favorite")
  };
  const { contactId } = req.params;
  const updatedStatusContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!updatedStatusContact) { throw HttpError(404) };
  res.json(updatedStatusContact);
}


module.exports = {
  fetchAllContacts: ctrlWrapper(fetchAllContacts),
  fetchContactById: ctrlWrapper(fetchContactById),
  deleteContact: ctrlWrapper(deleteContact),
  addTheContact: ctrlWrapper(addTheContact),
  updateTheContact: ctrlWrapper(updateTheContact),
  updateFavorite: ctrlWrapper(updateFavorite)

};