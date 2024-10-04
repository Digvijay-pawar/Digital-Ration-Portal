import express from "express";
import { loginTehsil, addFps, removeFps, getAllFps, getFpsById} from "../controllers/tehsil.js";
import authMiddleware from "../middleware/admin.auth.js";

const router = express.Router();

router.post("/login", loginTehsil);

//protected routes

//fps manage API
router.post("/fps",authMiddleware, addFps);
router.delete("/fps/:fpsId",authMiddleware, removeFps);
router.get("/fps/:fpsId",authMiddleware, getFpsById);
router.get("/fps",authMiddleware, getAllFps);

//stock allocation API
// router.get("/stock", getStock);



export default router;