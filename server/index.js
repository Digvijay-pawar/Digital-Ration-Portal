import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

//routes
import adminRoutes from "./routes/admin.js";
import tehsilRoutes from "./routes/tehsil.js";
import userRoutes from "./routes/user.js";

import { connectToDB } from "./utils/db.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRoutes);

app.use("/user", userRoutes);

app.use("/tehsil", tehsilRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDB(process.env.MONGO_URL);
  console.log("localhost running on " + PORT);
});
