// const fs = require('fs/promises')
// const path = require('path');
// const shortid = require('shortid');





const { Schema, model } = require('mongoose');

const contacts = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    
}, { versionKey: false, timestamps: true },);

const Contacts = model("contacts", contacts)


module.exports = Contacts;

// const contactsPath = path.join(__dirname, "/contacts.json");





// const listContacts = async () =>  await Contacts.find();




// const getContactById = async (contactId) => { 
//     const contacts = await Contacts.find();
//     const contactByid =  contacts.find(contact => contact.id === contactId);
//     return contactByid || null;
// };

// const removeContact = async (contactId) => {
  
//     const contacts = await listContacts();
//     const index = contacts.findIndex(contact => contact.id === contactId);
//     if (index === -1) { return null }; 
//     const [deletedContact] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return deletedContact;
 
  
  
// }

// const addContact = async ({ name, email, phone }) => {
//     const contacts = await listContacts();
//     const newUser = {
//         id: shortid.generate(),
//         name,
//         email,
//         phone,
//     };

//     contacts.push(newUser);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newUser;
// }

// const updateContact = async (contactId, body) => { 
//   const contacts = await listContacts();
//   const index = contacts.findIndex(contact => contact.id === contactId);
//   if (index === -1) { return null };
//  const updatedContact = { ...contacts[index], ...body };
//   contacts[index] = updatedContact;
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return updatedContact;
  
// }


