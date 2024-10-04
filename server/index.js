const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const db = require('./utils/db')

//routes
const adminRoutes = require("./routes/admin")


const app = express()

app.use(express.json())

//admin
app.use("/admin", adminRoutes)

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log("localhost running on " + PORT)
})