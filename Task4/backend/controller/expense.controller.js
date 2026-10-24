import mongoose from "mongoose";
import Expense from "../models/expense.model.js";

// POST /api/expenses - Create expense
export const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({ success: false, message: "Title, amount, and category are required" });
    }

    if (amount <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be greater than 0" });
    }

    const expense = await Expense.create({
      user: req.user,
      title: title.trim(),
      amount: Number(amount),
      category,
      date: date ? new Date(date) : new Date(),
    });

    return res.status(201).json({ success: true, data: expense });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/expenses - Get user's expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).sort({ date: -1 });
    return res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/expenses/:id - Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    // Check if expense belongs to logged-in user
    if (expense.user.toString() !== req.user.toString()) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await Expense.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/expenses/summary - Category-wise summary aggregation
export const getExpenseSummary = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user) } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $project: { _id: 0, category: "$_id", total: 1 } },
    ]);

    const grandTotal = summary.reduce((acc, item) => acc + item.total, 0);

    return res.status(200).json({
      success: true,
      data: summary,
      grandTotal,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
