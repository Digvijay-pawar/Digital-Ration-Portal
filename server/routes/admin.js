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

<<<<<<< HEAD
=======
router.post("/add-tehsil", addTehsil);
>>>>>>> 35bd328ac8c75610174840f84b57378e77f1fd11

export default router;
