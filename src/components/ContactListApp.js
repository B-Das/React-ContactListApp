import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddContactForm from './AddContactForm';

const ContactListApp = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch contacts from the API
  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setContacts(response.data);
    } catch (error) {
      console.log('Error fetching contacts:', error);
    }
  };

  // Add a new contact
  const addContact = async (contact) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', contact);
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.log('Error adding contact:', error);
    }
  };

  // Start editing a contact
  const startEditingContact = (contactId, name, email) => {
    setEditingContactId(contactId);
    setEditedName(name);
    setEditedEmail(email);
  };

  // Cancel editing a contact
  const cancelEditingContact = () => {
    setEditingContactId(null);
    setEditedName('');
    setEditedEmail('');
  };

  // Update a contact
  const updateContact = (contactId) => {
    try {
      // Find the contact to be updated in the state based on the contactId
      const updatedContact = contacts.find((contact) => contact.id === contactId);

      // Update the name and email of the contact
      updatedContact.name = editedName;
      updatedContact.email = editedEmail;

      // Update the state with the modified contact
      setContacts([...contacts]);

      // Reset the editing state
      setEditingContactId(null);
      setEditedName('');
      setEditedEmail('');
    } catch (error) {
      console.log('Error updating contact:', error);
    }
  };

  // Delete a contact
  const deleteContact = (contactId) => {
    try {
      // Remove the contact from the state based on the contactId
      setContacts(contacts.filter((contact) => contact.id !== contactId));
    } catch (error) {
      console.log('Error deleting contact:', error);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Contact List</h1>
      <AddContactForm onAddContact={addContact} />
      <hr />
      {contacts.length === 0 ? (
        <p>No contacts available. Please add some.</p>
      ) : (
        <ul className="list-group">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="list-group-item shadow p-3 mb-2 bg-info bg-gradient text-dark rounded-5"
            >
              {editingContactId === contact.id ? (
                // Edit mode for the contact
                <div>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => updateContact(contact.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={cancelEditingContact}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // Display mode for the contact
                <div>
                  <h3>{contact.name}</h3>
                  <p>Email: {contact.email}</p>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() =>
                      startEditingContact(contact.id, contact.name, contact.email)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactListApp;
