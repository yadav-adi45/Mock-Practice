// ==========================================
// UNIVERSAL MONGOOSE MODEL BLUEPRINT
// Replace "Item" and fields with whatever your exam asks:
// e.g. Task (title, completed), Product (name, price), etc.
// ==========================================

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Example Number field:
    // price: { type: Number, required: true },

    // Example Boolean field:
    // completed: { type: Boolean, default: false },

    // Example Date field:
    // date: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // auto creates createdAt and updatedAt
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
