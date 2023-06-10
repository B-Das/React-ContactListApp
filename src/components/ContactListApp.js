import React, { useState, useEffect } from "react";
import axios from "axios";
import AddContactForm from "./AddContactForm";//import add contacts component
import Loading from "./Loading"; //import loading component

const ContactListApp = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingContact, setAddingContact] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch contacts from the API
  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching contacts:", error);
    }
  };

  // Add a new contact
  const addContact = async (contact) => {
    try {
      setAddingContact(true); // Set addingContact to true while adding a new contact
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        contact
      );
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.log("Error adding contact:", error);
    } finally {
      setAddingContact(false); // Set addingContact back to false after adding the contact (whether successful or not)
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
    setEditedName("");
    setEditedEmail("");
  };

  // Update a contact
  const updateContact = (contactId) => {
    try {
      const updatedContact = contacts.find(
        (contact) => contact.id === contactId
      );
      updatedContact.name = editedName;
      updatedContact.email = editedEmail;
      setContacts([...contacts]);
      setEditingContactId(null);
      setEditedName("");
      setEditedEmail("");
    } catch (error) {
      console.log("Error updating contact:", error);
    }
  };

  // Delete a contact
  const deleteContact = (contactId) => {
    try {
      setContacts(contacts.filter((contact) => contact.id !== contactId));
    } catch (error) {
      console.log("Error deleting contact:", error);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Contact List</h1>
      <AddContactForm onAddContact={addContact} />
      <hr />
      {loading ? (
        <Loading /> // Display the loading component if contacts are loading
      ) : contacts.length === 0 ? (
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
                      startEditingContact(
                        contact.id,
                        contact.name,
                        contact.email
                      )
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
      {addingContact && <Loading />} {/* Display the loading component while adding a new contact */}
    </div>
  );
};

export default ContactListApp;
