const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    tahsilOffices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TahsilOffice'
        }
    ]
})


const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin
