import React, { useState } from "react";

const AddContactForm = ({ onAddContact }) => {
  const [name, setName] = useState(""); // State for name input field
  const [email, setEmail] = useState(""); // State for email input field

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) return; // Check if name or email is empty

    onAddContact({ name, email }); // Call the onAddContact function with the new contact object

    setName(""); // Clear the name field
    setEmail(""); // Clear the email field
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name input field */}
      <input
        className="p-3 mb-2 bg-info bg-gradient text-dark rounded-5"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Email input field */}
      <input
        className="p-3 mb-2 bg-info bg-gradient text-dark rounded-5"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Submit button */}
      <button
        className="p-3 mb-2 bg-info bg-gradient text-dark rounded-5"
        type="submit"
      >
        Add Contact
      </button>
    </form>
  );
};

export default AddContactForm;
