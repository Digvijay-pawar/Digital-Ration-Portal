import express from "express";

import {
  loginAdmin,
  registerAdmin,
  adminDashboard,
  addTehsil,
  removeTehsil,
  getAllTehsils,
  getTehsil,
  addStock,
  getAllStock,
} from "../controllers/admin.js";

import authMiddleware from "../middleware/admin.auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

router.get("/dashboard", authMiddleware, adminDashboard);

// tehsil add
router.post("/addtehsil", addTehsil);
// tehsil remove
router.delete("/tehsils/:tehsilId", removeTehsil);
// view tehsils
router.get("/tehsils", getAllTehsils);
// view tehsil
router.get("/tehsil/:tehsilId", getTehsil);

// add stock
router.post("/addstock/:adminId/:month", addStock);

router.get("/allstock", getAllStock);
export default router;
