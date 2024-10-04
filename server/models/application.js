import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    nameOfApplicant: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ["SC", "OBC", "ST", "GENERAL", "OTHERS"]
    },
    status: {
        type: String,
        enum: ["Success", "Pending", "Reject"],
        default: "Pending"
    },
    familyMembers: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "User",
            required: true
        }
    ]
})

const Application = model("Application", applicationSchema);

export default Application;
