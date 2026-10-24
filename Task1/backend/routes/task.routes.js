import express from "express";
import {createTask,getTasks,toggleTask,deleteTask} from "../controller/task.controller.js";

const router = express.Router();

router.post("/api/tasks", createTask);
router.get("/api/tasks", getTasks);
router.patch("/api/tasks/:id/toggle", toggleTask);
router.delete("/api/tasks/:id", deleteTask);

export default router;
