import Tahsil from '../models/tehsil.js'
import fps from '../models/fps.js';
import { createJWT, comparePassword, hashPassword} from '../utils/auth.js';
import Address from "../models/address.js"; // Import the Address model
export async function changeTahsilPassword(req, res) {
    const { tehsilId, oldPassword, newPassword } = req.body;

    try {
        // Find the tahsil by its ID
        const tahsil = await Tahsil.findOne({ tehsilId });
        if (!tahsil) {
            return res.status(404).json({ message: "Tahsil not found" });
        }

        // Compare the old password with the stored password
        const isMatch = await comparePassword(oldPassword, tahsil.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        // Hash the new password
        const hashedNewPassword = await hashPassword(newPassword);

        // Update the password in the database
        tahsil.password = hashedNewPassword;
        await tahsil.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

export async function loginTahsil(req, res) {
    const { tehsilId, password } = req.body;

    try {
        const tahsil = await Tahsil.findOne({ tehsilId });
        if (!tahsil) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, tahsil.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await createJWT(
            { tahsilId: { tahsilId: tahsil.tahsilId } },
            JWT_SECRET
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export async function addFps(req, res) {
    const { password, mobileNumber, fullName, street, taluka, district, state, pincode, tehsilId } = req.body;

    try {
        // Check if the FPS with the same mobile number already exists
        const existingFps = await Fps.findOne({ mobileNumber });
        if (existingFps) {
            return res.status(400).json({ message: "FPS with this mobile number already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        // Create a new address record
        const newAddress = new Address({
            street,
            taluka,
            district,
            state,
            pincode,
        });

        // Save the address to the Address collection
        const savedAddress = await newAddress.save();

        // Create a new FPS instance and link the saved address
        const newFps = new fps({
            password: hashedPassword,
            fullName,
            mobileNumber,
            address: savedAddress._id, // Store the address reference (ObjectId)
            tehsilId: req.user.tahsilId
        });

        // Save the new FPS to the database
        await newFps.save();

        res.status(201).json({ message: "FPS added successfully", fpsId: newFps.fpsId });
    } catch (error) {
        console.error("Error adding FPS:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

// Remove FPS function
export async function removeFps(req, res) {
    const { fpsId } = req.params; // fpsId passed through request parameters

    try {
        // Find the FPS by its ID
        const fpsToRemove = await Fps.findOne({ fpsId });

        if (!fpsToRemove) {
            return res.status(404).json({ message: "FPS not found" });
        }

        // Remove the corresponding address from the Address table
        await Address.findByIdAndRemove(fpsToRemove.address);

        // Remove the FPS entry from the FPS table
        await Fps.findOneAndRemove({ fpsId });

        res.status(200).json({ message: "FPS removed successfully" });
    } catch (error) {
        console.error("Error removing FPS:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

// Get FPS by ID
export async function getFpsById(req, res) {
    const { fpsId } = req.params;

    try {
        // Find the FPS by its ID and populate the address reference
        const fps = await Fps.findOne({ fpsId }).populate('address');
        
        if (!fps) {
            return res.status(404).json({ message: "FPS not found" });
        }

        res.status(200).json(fps);
    } catch (error) {
        console.error("Error fetching FPS:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

// Get all FPS
export async function getAllFps(req, res) {
    try {
        // Find all FPS entries and populate the address reference
        const allFps = await Fps.find().populate('address');
        
        if (!allFps.length) {
            return res.status(404).json({ message: "No FPS entries found" });
        }

        res.status(200).json(allFps);
    } catch (error) {
        console.error("Error fetching all FPS:", error);
        res.status(500).json({ message: "Server error", error });
    }
}