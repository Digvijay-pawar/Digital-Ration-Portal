import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receieverId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
    }
})

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
