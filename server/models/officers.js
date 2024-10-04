import { Schema, model } from "mongoose";

const officersSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    email: { type: String, required: true },
    post: { type: String, required: true },
  },
  { timestamps: true }
);
const Officers = model("Officers", officersSchema);
export default Officers;
