import { useState, useEffect } from "react";
import axios from "axios";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/items";

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

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  return (
    <div>
      <h1>Items List</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && items.length === 0 && <p>No items found</p>}

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

export default Items;
