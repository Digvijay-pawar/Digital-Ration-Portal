const express = require("express")

const {loginAdmin, registerAdmin, adminDashboard} = require("../controllers/admin.js")
const authMiddleware = require("../middleware/admin.auth.js")

const router = express.Router()

router.post("/login", loginAdmin)
router.post("/register", registerAdmin)

//make it protected
router.get("/dashboard",authMiddleware, adminDashboard)


module.exports = router