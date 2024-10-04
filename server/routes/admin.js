import express from "express";

import {
  loginAdmin,
  registerAdmin,
  adminDashboard,
  addTehsil,
} from "../controllers/admin.js";

import authMiddleware from "../middleware/admin.auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

router.get("/dashboard", authMiddleware, adminDashboard);

router.post("/add-tehsil", addTehsil);

export default router;
