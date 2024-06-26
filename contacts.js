import * as fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const contactsPath = path.resolve('db', 'contacts.json');
// This path.resolve() method accepts string as a sequence of paths into an absolute path

async function readContacts() {
  const contacts = await fs.readFile(contactsPath, { encoding: 'utf-8' });
  return JSON.parse(contacts);
  // converts to array of objects
}

async function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  // converts to json format(string)
}

async function listContacts() {
  const arrListOfContacts = await readContacts();

  return arrListOfContacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();

  const contact = contacts.find(contact => contact.id === contactId);

  if (typeof contact === 'undefined') {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();

  const indexOfcontact = contacts.findIndex(contact => contact.id === contactId);
  if (indexOfcontact === -1) {
    return null;
  }

  const removedContact = contacts[indexOfcontact];

  contacts.splice(indexOfcontact, 1);
  //  method splice mutates  arr of objects(contacts)

  await writeContacts(contacts);
  // then we rewrite  arr of objects
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();

  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);

  await writeContacts(contacts);
  return newContact;
}

export default {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};
