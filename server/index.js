import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//db connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected...")
  })
  .catch((error) => {
    console.log("error in db connection " + error)
  })

import adminRoutes from "./routes/admin.js"

const app = express();

app.use(express.json());

app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("localhost running on " + PORT);
});
