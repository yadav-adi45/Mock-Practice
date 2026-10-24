import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createExpense,
  getExpenses,
  deleteExpense,
  getExpenseSummary,
} from "../controller/expense.controller.js";

const router = express.Router();

router.post("/api/expenses", requireAuth, createExpense);
router.get("/api/expenses", requireAuth, getExpenses);
router.get("/api/expenses/summary", requireAuth, getExpenseSummary);
router.delete("/api/expenses/:id", requireAuth, deleteExpense);

export default router;
