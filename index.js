import { program } from 'commander';
import Contacts from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await Contacts.listContacts();
      console.log(contacts);
      break;

    case 'get':
      const getById = await Contacts.getContactById(id);
      console.log(getById);
      break;

    case 'add':
      const add = await Contacts.addContact(name, email, phone);
      console.log(add);
      break;

    case 'remove':
      const removed = await Contacts.removeContact(id);
      console.log(removed);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
