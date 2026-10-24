import mongoose from "mongoose";
import Book from "../models/book.model.js";
import Issue from "../models/issue.model.js";

// POST /api/books - Add book
export const addBook = async (req, res) => {
  try {
    const { title, author, totalCopies } = req.body;

    if (!title || !author || !totalCopies || Number(totalCopies) < 1) {
      return res.status(400).json({ success: false, message: "Invalid book data" });
    }

    const copies = parseInt(totalCopies, 10);
    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      totalCopies: copies,
      availableCopies: copies, // Set by server, not client
    });

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/books - List all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ title: 1 });
    return res.status(200).json({ success: true, data: books });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/books/:id/issue - Issue book
export const issueBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberName } = req.body;

    if (!memberName || memberName.trim() === "") {
      return res.status(400).json({ success: false, message: "Member name is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid book ID" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ success: false, message: "No copies available" });
    }

    book.availableCopies -= 1;
    await book.save();

    const issue = await Issue.create({
      book: book._id,
      memberName: memberName.trim(),
    });

    return res.status(201).json(issue);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
