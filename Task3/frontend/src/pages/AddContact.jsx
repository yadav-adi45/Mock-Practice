import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddContact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddContact = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:5000/api/contacts", {
        name,
        phone,
        email,
      });
      navigate("/contacts");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add contact");
    }
  };

  return (
    <div>
      <h1>Add Contact</h1>
      {error && <p>{error}</p>}
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
    </div>
  );
};

export default AddContact;
