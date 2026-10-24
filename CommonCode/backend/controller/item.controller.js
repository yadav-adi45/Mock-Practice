// ==========================================
// UNIVERSAL CONTROLLER BLUEPRINT
// Standard CRUD functions with standard status codes:
// 200 = OK, 201 = Created, 400 = Bad Request, 404 = Not Found, 500 = Server Error
// ==========================================

import mongoose from "mongoose";
import Item from "../models/item.model.js";

// 1. GET ALL (GET /api/items)
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2. GET BY ID (GET /api/items/:id)
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 3. CREATE (POST /api/items)
export const createItem = async (req, res) => {
  try {
    const { name } = req.body;

    // 400 Validation
    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const newItem = await Item.create({ name: name.trim() });
    return res.status(201).json({ success: true, message: "Created successfully", data: newItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 4. UPDATE (PUT or PATCH /api/items/:id)
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.status(200).json({ success: true, message: "Updated successfully", data: updatedItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 5. DELETE (DELETE /api/items/:id)
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const deleted = await Item.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
