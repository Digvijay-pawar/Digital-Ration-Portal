import express from "express";
import { loginTehsil, addFps, removeFps, getAllFps, getFpsById, changeTehsilPassword} from "../controllers/tehsil.js";
import authMiddleware from "../middleware/admin.auth.js";

const router = express.Router();

router.post("/login", loginTehsil);
router.post("/change-password", changeTehsilPassword)

//protected routes
router.post("/fps",authMiddleware, addFps);
router.delete("/fps/:fpsId",authMiddleware, removeFps);
router.get("/fps/:fpsId",authMiddleware, getFpsById);
router.get("/fps",authMiddleware, getAllFps);

export default router;