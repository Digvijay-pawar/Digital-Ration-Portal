import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tehsilOffices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tehsil",
    },
  ],
  stock: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
  ],
  transcation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
