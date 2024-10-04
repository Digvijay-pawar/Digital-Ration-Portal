import Admin from "../models/admin.js";
import Tehsil from "../models/tehsil.js";
import { hashPassword, comparePassword, createJWT } from "../utils/auth.js";
import Address from "../models/address.js";
import { generateTehsilId } from "../utils/uniqueIds.js";


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
    const { password, street, taluka, district, state, pincode } = req.body;

    // Generate a new tehsil ID
    const tehsilId = await generateTehsilId();

    // Check if the generated tehsil ID already exists
    let existingTehsil = await Tehsil.findOne({ tehsilId });
    if (existingTehsil) {
      return res
        .status(409)
        .json({ message: "Tehsil ID already exists", success: false });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create and save the address first
    const address = new Address({
      street,
      taluka,
      district,
      state,
      pincode,
    });
    const savedAddress = await address.save(); // Save the address to the database

    // Create a new Tehsil instance with the saved address's ObjectId
    const tehsil = new Tehsil({
      tehsilId,
      password: hashedPassword,
      address: savedAddress._id, // Use the ObjectId of the saved address
    });

    // Save the new tehsil to the database
    await tehsil.save();

    // Respond with a success message
    res.status(201).json({
      message: "Tehsil registered successfully",
      success: true,
      tehsil,
    });
  } catch (error) {
    console.error("Error adding tehsil:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


export const removeTehsil = async (req, res) => {
  try {
    const { tehsilId } = req.params; // Get tehsilId from request parameters

    // Find and delete the Tehsil by its ID
    const deletedTehsil = await Tehsil.findOneAndDelete({ tehsilId });

    if (!deletedTehsil) {
      return res
        .status(404)
        .json({ message: "Tehsil not found", success: false });
    }

    // Respond with a success message
    res.status(200).json({
      message: "Tehsil removed successfully",
      success: true,
      tehsil: deletedTehsil,
    });
  } catch (error) {
    console.error("Error removing tehsil:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};