const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contact.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de contactos:', err);
      return;
    }

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de contactos:', err);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);

    if (contact) {
      console.log('Contacto encontrado:');
      console.table([contact]);
    } else {
      console.log('No se encontró ningún contacto con el ID proporcionado.');
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de contactos:', err);
      return;
    }

    let contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (contacts.length === updatedContacts.length) {
      console.log('No se encontró ningún contacto con el ID proporcionado.');
    } else {
      fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2),
        (err) => {
          if (err) {
            console.error('Error al escribir en el archivo de contactos:', err);
            return;
          }
          console.log('Contacto eliminado exitosamente.');
        }
      );
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de contactos:', err);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir en el archivo de contactos:', err);
        return;
      }
      console.log('Contacto agregado exitosamente.');
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
