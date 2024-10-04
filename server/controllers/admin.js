import Admin from "../models/admin.js";
import Tehsil from "../models/tehsil.js";
import { hashPassword, comparePassword, createJWT } from "../utils/auth.js";

// Register Admin
export async function registerAdmin(req, res) {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ id });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await hashPassword(password);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// Login Admin
export async function loginAdmin(req, res) {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await createJWT(
      { admin: { username: admin.username } },
      process.env.ADMIN_JWT_SECRET
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export async function adminDashboard(req, res) {
  res.json({ message: "Hi from dashboard", user: req.user });
}

// Add Tehsil
export async function addTehsil(req, res) {
  try {
    const { tehsilId, password, address } = req.body;

    let tehsil = await Tehsil.findOne({ id: tehsilId });
    if (tehsil) {
      return res
        .status(402)
        .json({ message: "Tehsil ID already exists", success: false });
    }

    const hashedPassword = await hashPassword(password);

    tehsil = new Tehsil({
      tehsilId,
      password: hashedPassword,
      address,
    });

    await tehsil.save();

    res.status(201).json({
      message: "Tehsil registered successfully",
      success: true,
      tehsil,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}


export async function removeTehsil(req, res) {
    try {
        
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
}

