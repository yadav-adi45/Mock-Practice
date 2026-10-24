// ==========================================
// FRONTEND SETUP COMMANDS (Run in terminal):
// 1. npm create vite@latest frontend -- --template react
// 2. cd frontend
// 3. npm i axios react-router-dom
// 4. Clear App.css and index.css (no CSS)
// 5. To run: npm run dev
// ==========================================

import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  // 1. State Variables
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/items";

  // 2. GET: Fetch data from server
  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_URL);
      setItems(res.data.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Run once on page load
  useEffect(() => {
    fetchItems();
  }, []);

  // 3. POST: Add new item
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || name.trim() === "") {
      setError("Name is required");
      return;
    }
    setError("");
    try {
      await axios.post(API_URL, { name });
      setName("");
      fetchItems(); // refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create item");
    }
  };

  // 4. DELETE: Delete an item
  const handleDelete = async (id) => {
    setError("");
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems(); // refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete item");
    }
  };

  return (
    <div>
      <h1>Item Manager</h1>

      {/* Add Form */}
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Status Messages */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && items.length === 0 && <p>No items found</p>}

      {/* Items List */}
      <div>
        {items.map((item) => (
          <div key={item._id}>
            <p>Name: {item.name}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
