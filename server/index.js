import express from "express";
import dotenv from "dotenv";

dotenv.config();

//db connection
import { connectToDB } from "./utils/db.js";


import Address from "./models/address.js";

//routes
import adminRoutes from "./routes/admin.js";
import tehsilRoutes from "./routes/tehsil.js";

const app = express();

app.use(express.json());

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/tehsil", tehsilRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDB(process.env.MONGO_URL);
  console.log("localhost running on " + PORT);
});
