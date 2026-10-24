import express from "express";
import { register, login } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);

export default router;
