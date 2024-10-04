import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//db connection
import { connectToDB } from "./utils/db.js";

//routes
import adminRoutes from "./routes/admin.js"
import tahsilRoutes from "./routes/tehsil.js"
const app = express();

app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/tahsil", tahsilRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDB(process.env.MONGO_URL);
  console.log("localhost running on " + PORT);
});
