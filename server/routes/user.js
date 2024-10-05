import express from "express";
import { addUser } from "../controllers/user.js";
const router = express.Router();

import upload from "../middleware/multer.js"; // Import multer config

router.post("/registerUser", upload.single("aadhaarCard"), addUser);

export default router;