import { Schema, model, mongoose } from "mongoose";

const tehsilSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);

const Tehsil = model("tehsil", tehsilSchema);

module.exports = Tehsil;
