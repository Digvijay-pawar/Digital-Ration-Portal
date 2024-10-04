import Tehsil from '../models/tehsil.js'
import fps from '../models/fps.js';
import { createJWT, comparePassword, hashPassword } from '../utils/auth.js';
import Address from "../models/address.js"; // Import the Address model
import { generatefpsId } from '../utils/uniqueIds.js';



export async function loginTehsil(req, res) {
    const { tehsilId, password } = req.body;

    try {
        const tehsil = await Tehsil.findOne({ tehsilId });
        if (!tehsil) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, tehsil.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await createJWT(
            { tehsilId: { tehsilId: tehsil.tehsilId } },
            process.env.JWT_SECRET
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error" + error, error });
    }
}

export async function addFps(req, res) {
    const { password, mobileNumber, email, fullName, street, taluka, district, state, pincode, tehsilId } = req.body;

    try {
        // Check if the FPS with the same mobile number already exists
        const existingFps = await fps.findOne({ mobileNumber });
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

        //create fps id
        const fpsId = await generatefpsId();

        // console.log(req.user, req.user.tehsilId.tehsilId)
        // Create a new FPS instance and link the saved address
        const newFps = new fps({
            fpsId,
            password: hashedPassword,
            fullName,
            mobileNumber,
            email,
            address: savedAddress._id, // Store the address reference (ObjectId)
            tehsilId: req.user.tehsilId.tehsilId
        });

        // Save the new FPS to the database
        await newFps.save();

        res.status(201).json({ message: "FPS added successfully", fpsId: newFps.fpsId });
    } catch (error) {
        console.error("Error adding FPS:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

export async function removeFps(req, res) {
    const { fpsId } = req.params; // fpsId passed through request parameters

    try {
        // Find the FPS by its ID
        const fpsToRemove = await fps.findOne({ fpsId });

        if (!fpsToRemove) {
            return res.status(404).json({ message: "FPS not found" });
        }

        // Remove the corresponding address from the Address table
        await Address.findByIdAndDelete(fpsToRemove.address); // Correct method

        // Remove the FPS entry from the FPS table
        await fps.findOneAndDelete({ fpsId }); // Updated 'fps' reference

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
        const fpsUser = await fps.findOne({ fpsId }).populate("address");

        if (!fpsUser) {
            return res.status(404).json({ message: "FPS not found" });
        }

        res.status(200).json(fpsUser);
    } catch (error) {
        console.error("Error fetching FPS:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

// Get all FPS
export async function getAllFps(req, res) {
    try {
        // Find all FPS entries and populate the address reference
        const allFps = await fps.find().populate("address")

        if (!allFps.length) {
            return res.status(404).json({ message: "No FPS entries found" });
        }

        res.status(200).json(allFps);
    } catch (error) {
        console.error("Error fetching all FPS:", error);
        res.status(500).json({ message: "Server error", error });
    }
}