import express from "express";
import dotenv from "dotenv";

dotenv.config();

//db connection
import { connectToDB } from "./utils/db.js";

//routes
import adminRoutes from "./routes/admin.js";
import tahsilRoutes from "./routes/tehsil.js";

import adminRoutes from "./routes/admin.js";
import { connectToDB } from "./utils/db.js";
const app = express();

app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/tahsil", tahsilRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDB(process.env.MONGO_URL);
  console.log("localhost running on " + PORT);
});
