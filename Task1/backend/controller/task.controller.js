import Task from "../models/task.model.js";

// Create a new task (POST /api/tasks)
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty and must be at least 3 characters",
      });
    }

    const newTask = new Task({
      title: title.trim(),
    });

    const savedTask = await newTask.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: savedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all tasks, newest first (GET /api/tasks)
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Toggle task completed status (PATCH /api/tasks/:id/toggle)
export const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.completed = !task.completed;
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task toggled successfully",
      data: task,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete a task (DELETE /api/tasks/:id)
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
