import express from "express";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controller/item.controller.js";

const router = express.Router();

router.get("/api/items", getItems);
router.get("/api/items/:id", getItemById);
router.post("/api/items", createItem);
router.put("/api/items/:id", updateItem);
router.delete("/api/items/:id", deleteItem);

export default router;
