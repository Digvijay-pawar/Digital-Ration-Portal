import express from "express";
import dotenv from "dotenv";

dotenv.config();

const db = require("./utils/db");

const adminRoutes = require("./routes/admin");

const app = express();

app.use(express.json());

app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("localhost running on " + PORT);
});
