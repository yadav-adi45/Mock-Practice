import express from "express";
import {
  addContact,
  getContacts,
  getContactById,
  deleteContact,
} from "../controller/contact.controller.js";

const router = express.Router();

router.post("/api/contacts", addContact);
router.get("/api/contacts", getContacts);
router.get("/api/contacts/:id", getContactById);
router.delete("/api/contacts/:id", deleteContact);

export default router;
