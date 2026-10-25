import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || title.trim().length < 3) {
      setError("Title cannot be empty and must be at least 3 characters");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/tasks", { title });
      setTitle("");
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div>
      <h1>Add Task</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
