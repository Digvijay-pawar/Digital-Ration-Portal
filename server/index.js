import express from "express"
import dotenv from "dotenv";
dotenv.config();

import { connectToDB } from "./utils/db.js";

import adminRoutes from "./routes/admin.js";

const app = express();

app.use(express.json());

app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDB(process.env.MONGO_URL);
  console.log("localhost running on " + PORT);
});
