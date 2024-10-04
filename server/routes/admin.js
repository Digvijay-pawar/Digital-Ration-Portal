import express from "express";

import {
  loginAdmin,
  registerAdmin,
  adminDashboard,
  addTehsil,
  removeTehsil,
} from "../controllers/admin.js";

import authMiddleware from "../middleware/admin.auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

router.get("/dashboard", authMiddleware, adminDashboard);


// tehsil add
router.post("/add-tehsil", addTehsil);
// tehsil remove
router.delete("/tehsils/:tehsilId", removeTehsil);


export default router;
