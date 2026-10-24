import mongoose from "mongoose";
import Contact from "../models/contact.model.js";

// POST /api/contacts - Add contact
export const addContact = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    // Phone must be exactly 10 digits
    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits with no letters",
      });
    }

    // If email provided, validate format
    if (email && email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const newContact = await Contact.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Contact added successfully",
      data: newContact,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/contacts - Get all contacts sorted A to Z
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ name: 1 });
    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/contacts/:id - Get contact by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/contacts/:id - Delete contact
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    return res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
