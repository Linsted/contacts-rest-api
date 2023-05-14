const fs = require('fs/promises')
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => { 
    const contacts = await listContacts();
    const contactByid =  contacts.find(contact => contact.id === contactId);
    return contactByid || null;
};

const removeContact = async (contactId) => {
  
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) { return null }; 
    const [deletedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
 
  
  
}

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newUser = {
        id: shortid.generate(),
        name,
        email,
        phone,
    };

    contacts.push(newUser);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newUser;
}

const updateContact = async (contactId, body) => { 
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) { return null };
 const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
  
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
