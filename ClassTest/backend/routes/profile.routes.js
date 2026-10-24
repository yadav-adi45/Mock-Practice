import express from "express"
import { createProfile, getProfile, updateProfile } from "../controller/profile.controller";


const router = express.Router();


router.post("/api/profiles", createProfile);
router.get("/api/profiles/:id", getProfile);
router.put("/api/profiles", updateProfile);

export default router;