import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || title.trim().length < 3) {
      setError("Title cannot be empty and must be at least 3 characters");
      return;
    }
    setError("");
    try {
      await axios.post("http://localhost:5000/api/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleToggle = async (id) => {
    setError("");
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${id}/toggle`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to toggle task");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {tasks.map((task) => (
          <div key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task._id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
