import User from "../models/user.js";
import Address from "../models/address.js"; 

export async function addUser(req, res) {
  try {
    const {
      email,
      aadhaarNumber,
      mobileNumber,
      fullName,
      dob,
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

    // Create or find the address
    const address = await Address.findOne({
      street,
      taluka,
      district,
      state,
      pincode,
    });

    // If address doesn't exist, create a new one
    const addressId = address
      ? address._id
      : await Address.create({ street, taluka, district, state, pincode });

    // Create the user
    const newUser = new User({
      email,
      aadhaarNumber,
      mobileNumber,
      fullName,
      dob,
      relationship,
      income,
      addressId: addressId._id, // Use the address ID
    });

    // Save the user to the database
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
}
