import mongoose from "mongoose";
import Issue from "../models/issue.model.js";
import Book from "../models/book.model.js";

// GET /api/issues - Get all issues (history)
export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("book").sort({ issuedAt: -1 });
    return res.status(200).json({ success: true, data: issues });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/issues/:issueId/return - Return book
export const returnBook = async (req, res) => {
  try {
    const { issueId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(issueId)) {
      return res.status(400).json({ success: false, message: "Invalid issue ID" });
    }

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue record not found" });
    }

    if (issue.returnedAt) {
      return res.status(400).json({ success: false, message: "Already returned" });
    }

    const book = await Book.findById(issue.book);
    if (book && book.availableCopies < book.totalCopies) {
      book.availableCopies += 1;
      await book.save();
    }

    issue.returnedAt = new Date();
    await issue.save();

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: issue,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
