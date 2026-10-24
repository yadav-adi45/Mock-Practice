import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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

  const handleAddContact = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:5000/api/contacts", {
        name,
        phone,
        email,
      });
      setName("");
      setPhone("");
      setEmail("");
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add contact");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete contact");
    }
  };

  const filteredContacts = contacts.filter((c) => {
    const s = search.toLowerCase();
    return c.name.toLowerCase().includes(s) || c.phone.includes(s);
  });

  return (
    <div>
      <h1>Contact Book</h1>

      <form onSubmit={handleAddContact}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>

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

export default App;
