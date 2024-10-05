import { Schema, model} from "mongoose";
import mongoose from "mongoose";

const tehsilSchema = new Schema(
  {
    tehsilId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    fps_shops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fps",
      },
    ],
    officers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Officers",
      },
    ],
    stock: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
      },
    ],
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transactions" },
    ],
    allocatedStock: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
      },
    ],
  },
  { timestamps: true }
);

const Tehsil = model("Tehsil", tehsilSchema);

export default Tehsil;
