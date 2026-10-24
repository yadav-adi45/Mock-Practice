import express from "express";
import { addBook, getBooks, issueBook } from "../controller/book.controller.js";

const router = express.Router();

router.post("/api/books", addBook);
router.get("/api/books", getBooks);
router.post("/api/books/:id/issue", issueBook);

export default router;
