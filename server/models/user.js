import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    aadhaarNumber: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    isHead: {
      type: Boolean,
      default: false,
    },
    relationship: {
      type: String,
      enum: ["father", "son", "mother", "daughter", "spouse", "self"],
      required: function () {
        return !this.isHead;
      },
    },
    income: {
      type: Number,
      required: true,
    },
    aadhaarCardUrl: {
      type: String,
      required: true,
    },
    incomeProofUrl: {
      type: String,
      required: false,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
