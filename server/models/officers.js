import { Schema, model } from "mongoose";

const officersSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    mobile_number: { type: Number, required: true },
    email: { type: String, required: true },
    post: { type: String, required: true },
  },
  { timestamps: true }
);
const Officers = model("Officers", officersSchema);
export default Officers;
