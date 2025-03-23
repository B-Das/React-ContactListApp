import React, { useMemo, useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';

// Sample data to match the image
const sampleContacts = [
  { id: 1, name: "Jane Cooper", phone: "(270) 555-0117", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Devon Lane", phone: "(308) 555-0121", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Darrell Steward", phone: "(684) 555-0102", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Devon Lane", phone: "(704) 555-0127", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "Courtney Henry", phone: "(505) 555-0125", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 6, name: "Wade Warren", phone: "(225) 555-0118", avatar: "https://i.pravatar.cc/150?img=6" },
  { id: 7, name: "Bessie Cooper", phone: "(406) 555-0120", avatar: "https://i.pravatar.cc/150?img=7" },
  { id: 8, name: "Robert Fox", phone: "(480) 555-0103", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: 9, name: "Jacob Jones", phone: "(702) 555-0122", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: 10, name: "Jenny Wilson", phone: "(239) 555-0108", avatar: "https://i.pravatar.cc/150?img=10" }
];

const ContactListApp = ({ searchTerm = "" }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: contacts = sampleContacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => Promise.resolve(sampleContacts),
    initialData: sampleContacts,
    staleTime: Infinity
  });

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  return (
    <div className="contacts-list">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search contacts..."
        onChange={(e) => searchTerm = e.target.value}
      />
      {filteredContacts.map(contact => (
        <div key={contact.id} className="contact-item">
          <img 
            src={contact.avatar} 
            alt={contact.name} 
            className="contact-avatar"
          />
          <div className="contact-info">
            <div className="contact-name">{contact.name}</div>
            <div className="contact-phone">{contact.phone}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactListApp;
