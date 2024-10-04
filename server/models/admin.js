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
  tahsilOffices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TahsilOffice",
    },
  ],
  stock: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
  ],
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;