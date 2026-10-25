import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddItem = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || name.trim() === "") {
      setError("Name is required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/items", { name });
      navigate("/items");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create item");
    }
  };

  return (
    <div>
      <h1>Add Item</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddItem;
