import React from "react";
import ContactList from "./ContactListApp";

const App = () => {
  return (
    <div>
      <h1 className="contact-list">Contact List App</h1>{" "}
      {/* Heading for the app */}
      <ContactList /> {/* Render the ContactList component */}
    </div>
  );
};

export default App;
