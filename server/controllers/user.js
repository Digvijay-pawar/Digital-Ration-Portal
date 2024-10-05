import User from "../models/user.js"; // Import the User model
import Address from "../models/address.js"; // Import the Address model

export async function addUser(req, res) {
  try {
    // Get user details from the request body
    const {
      email,
      aadhaarNumber,
      mobileNumber,
      fullName,
      dob,
      isHead,
      relationship,
      income,
      street,
      taluka,
      district,
      state,
      pincode,
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Handle file upload
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Aadhaar card file is required." });
    }
    const aadhaarCardUrl = `/uploads/${req.file.filename}`; // Store the file URL

    // Create or find the address
    const address = await Address.findOne({
      street,
      taluka,
      district,
      state,
      pincode,
    });

    const addressId = address
      ? address._id
      : await Address.create({ street, taluka, district, state, pincode });

    // Create the user
    const newUser = await new User.create({
      email,
      aadhaarNumber,
      mobileNumber,
      fullName,
      dob,
      isHead,
      relationship: isHead ? null : relationship,
      income,
      aadhaarCardUrl,
      addressId: addressId._id, // Use the address ID
    });

    // Save the user to the database
    // await newUser.save();
    console.log("---------------------------");

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
}
