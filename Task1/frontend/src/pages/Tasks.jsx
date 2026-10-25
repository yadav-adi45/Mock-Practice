import { useState, useEffect } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
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

  const handleToggle = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${id}/toggle`);
      fetchTasks();
    } catch (err) {
      setError("Failed to toggle task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return (
    <div>
      <h1>Tasks</h1>

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

export default Tasks;
