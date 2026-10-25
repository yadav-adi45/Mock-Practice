import { useState, useEffect } from "react";
import axios from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      setContacts(res.data.data);
    } catch (err) {
      setError("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      setError("Failed to delete contact");
    }
  };

  const filteredContacts = contacts.filter((c) => {
    const s = search.toLowerCase();
    return c.name.toLowerCase().includes(s) || c.phone.includes(s);
  });

  return (
    <div>
      <h1>Contacts</h1>

      {error && <p>{error}</p>}

      <input
        type="text"
        placeholder="Search by name or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredContacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <div>
          {filteredContacts.map((contact) => (
            <div key={contact._id}>
              <p>Name: {contact.name}</p>
              <p>Phone: {contact.phone}</p>
              {contact.email && <p>Email: {contact.email}</p>}
              <button onClick={() => handleDelete(contact._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;
