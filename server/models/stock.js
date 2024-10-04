import mongoose from "mongoose"

const stockSchema = new mongoose.Schema({
    month: {
        type: String,
        enum: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ],
        required: true
    },
    wheat: {
        type: Number,
        default: 0,
    },
    bajra: {
        type: Number,
        default: 0,
    },
    sugar: {
        type: Number,
        default: 0,
    },
    corn: {
        type: Number,
        default: 0,
    },
    oil: {
        type: Number,
        default: 0,
    }
})

const Stock = model("Stock", stockSchema);

module.exports = Stock;
