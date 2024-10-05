import Admin from "../models/admin.js";
import Tehsil from "../models/tehsil.js";
import { hashPassword, comparePassword, createJWT } from "../utils/auth.js";
import Address from "../models/address.js";
import { generateTehsilId } from "../utils/uniqueIds.js";
import Stock from "../models/stock.js";

// Register Admin
export async function registerAdmin(req, res) {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
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
// Remove Tehsil
export async function removeTehsil(req, res) {
  try {
    const { tehsilId } = req.params;

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
}
// view All tehsils
export async function getAllTehsils(req, res) {
  try {
    const allTehsils = await Tehsil.find({}).populate("address");

    if (!allTehsils.length) {
      return res.status(404).json({ message: "No tehsils found." });
    }

    return res.json(allTehsils);
  } catch (error) {
    console.error("Error fetching tehsils:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
// view one tehsil
export async function getTehsil(req, res) {
  try {
    const { tehsilId } = req.params;

    const tehsil = await Tehsil.findOne({ tehsilId }).populate("address");

    if (!tehsil) {
      return res.status(404).json({ message: "Tehsil not found." });
    }
    return res.json(tehsil);
  } catch (error) {
    console.error("Error fetching tehsil:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// add stock
export async function addStock(req, res) {
  try {
    const { adminId, month } = req.params;
    const {
      wheat = 0,
      rice = 0,
      bajra = 0,
      sugar = 0,
      corn = 0,
      oil = 0,
    } = req.body;

    const formattedMonth =
      month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

    const stockValues = {
      wheat: parseFloat(wheat) || 0,
      rice: parseFloat(rice) || 0,
      bajra: parseFloat(bajra) || 0,
      sugar: parseFloat(sugar) || 0,
      corn: parseFloat(corn) || 0,
      oil: parseFloat(oil) || 0,
    };

    // Validate the month
    const validMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (!validMonths.includes(formattedMonth)) {
      return res.status(400).json({ message: "Invalid month" });
    }

    let stockEntry = await Stock.findOne({ month: formattedMonth }); // Corrected from formattedMonth

    if (stockEntry) {
      Object.keys(stockValues).forEach((key) => {
        stockEntry[key] += stockValues[key];
      });

      await stockEntry.save();
    } else {
      // Create a new stock entry
      stockEntry = new Stock({
        month: formattedMonth, // Corrected to use formattedMonth
        ...stockValues,
      });

      await stockEntry.save();
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.stock.includes(stockEntry._id)) {
      admin.stock.push(stockEntry._id);
      await admin.save();
    }

    return res.status(200).json({
      message: stockEntry
        ? "Stock updated successfully"
        : "Stock added successfully",
      stockEntry,
      admin,
    });
  } catch (error) {
    console.error("Error adding stock:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// view stock
export async function getAllStock(req, res) {
  try {
    const stocks = await Stock.find({});

    if (stocks.length === 0) {
      return res.status(404).json({ message: "No stock entries found" });
    }

    return res.status(200).json(stocks);
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


export async function allocateStockFromAdmin(req, res) {
  try {
    const { adminId, tehsilId, stockId } = req.params;

    // Find the admin by ID
    const admin = await Admin.findById(adminId).populate("stock");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if the stock exists in the admin's stock list
    const stockExistsInAdmin = admin.stock.some(
      (stockItem) => stockItem._id.toString() === stockId
    );

    if (!stockExistsInAdmin) {
      return res
        .status(400)
        .json({ message: "Stock not available in admin's stock" });
    }

    // Find the tehsil
    const tehsil = await Tehsil.findById(tehsilId);
    if (!tehsil) {
      return res.status(404).json({ message: "Tehsil not found" });
    }

    // Check if the stock is already allocated
    if (!tehsil.allocatedStock.includes(stockId)) {
      tehsil.allocatedStock.push(stockId); // Allocate the stock to the tehsil
      await tehsil.save(); // Save the updated tehsil
    }

    return res.status(200).json({
      message: "Stock successfully allocated to tehsil",
      tehsil,
    });
  } catch (error) {
    console.error("Error allocating stock:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}