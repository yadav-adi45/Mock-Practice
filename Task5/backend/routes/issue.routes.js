import express from "express";
import { getIssues, returnBook } from "../controller/issue.controller.js";

const router = express.Router();

router.get("/api/issues", getIssues);
router.post("/api/issues/:issueId/return", returnBook);

export default router;
