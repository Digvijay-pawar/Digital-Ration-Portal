import express from "express";

import {
  loginAdmin,
  registerAdmin,
  adminDashboard,
} from "../controllers/admin.js";

import authMiddleware from "../middleware/admin.auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

router.get("/dashboard", authMiddleware, adminDashboard);


export default router;
