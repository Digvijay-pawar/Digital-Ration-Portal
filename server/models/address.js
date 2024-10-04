import {Schema, model} from "mongoose";
const addressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    taluka: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
      match: /^[1-9][0-9]{5}$/,
    },
  },
  { timestamps: true }
);


const Address = model("Address", addressSchema);
export default Address;