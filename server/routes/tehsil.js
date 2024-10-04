import express from "express";
import { loginTahsil, addFps, removeFps, getAllFps, getFpsById, changeTahsilPassword} from "../controllers/tehsil.js";
import authMiddleware from "../middleware/admin.auth.js";

const router = express.Router();

router.post("/login", loginTahsil);
router.post("/change-password", changeTahsilPassword)

//protected routes
router.post("/fps",authMiddleware, addFps);
router.delete("/fps",authMiddleware, removeFps);
router.get("/fps/:id",authMiddleware, getFpsById);
router.get("/fps",authMiddleware, getAllFps);

export default router;