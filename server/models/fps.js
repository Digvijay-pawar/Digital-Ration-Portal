import { Schema, model, mongoose } from "mongoose";

const fpsSchema = new Schema(
    {
        fpsId: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullName: { type: String, required: true },
        mobileNumber: { type: String, required: true, unique: true },
        tehsilId: {
            type: String,
            ref: "Tehsil",
            required: true
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
        beneficiaries: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RationCard",
            },
        ],
        stock: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Stock",
            },
        ],
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: "Transactions"
            },
        ],
    },
    { timestamps: true }
);

const fps = model("fps", fpsSchema);

export default fps;
