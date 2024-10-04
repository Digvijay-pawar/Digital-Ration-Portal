import mongoose from "mongoose";

const rationSchema = new mongoose.Schema({
    rationNumber: {
        type: String,
        required: true,
        unique: true
    },
    cardType: {
        type: String,
        enum: ["White", "Saffron", "Yellow"],
        required: true
    },
    familyMember: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "User",
            required: true
        }
    ],
    fpsId: {
        type: mongoose.Schema.Types.ObjectId, ref: "fps",
        required: true
    },
    stockId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Stock",
        required: true
    }

})

const Ration = model("Ration", rationSchema);

export default Ration;
