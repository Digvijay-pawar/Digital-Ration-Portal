const Admin = require('../models/admin');
const { hashPassword, comparePassword, createJWT } = require('../utils/auth');


// Secret key for JWT signing
const JWT_SECRET = process.env.ADMIN_JWT_SECRET;

// Register Admin
async function registerAdmin(req, res) {
    const { id, password } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ id });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password using the utility function
        const hashedPassword = await hashPassword(password);

        // Create new admin
        const newAdmin = new Admin({
            id,
            password: hashedPassword,
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Login Admin
async function loginAdmin(req, res) {
    const { id, password } = req.body;

    try {
        // Check if admin exists
        const admin = await Admin.findOne({ id });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords using the utility function
        const isMatch = await comparePassword(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT using the utility function
        const token = await createJWT({ admin: { id: admin.id } }, JWT_SECRET);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

async function adminDashboard(req, res) {
    res.json({message: "Hi from dashboard", user: req.user})
}
module.exports = {
    loginAdmin,
    registerAdmin,
    adminDashboard
};
