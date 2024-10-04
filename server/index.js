import express from "express";
import dotenv from "dotenv";

dotenv.config();

<<<<<<< HEAD
//db connection
import { connectToDB } from "./utils/db.js";

//routes
import adminRoutes from "./routes/admin.js"
import tahsilRoutes from "./routes/tehsil.js"
=======
import adminRoutes from "./routes/admin.js";
import { connectToDB } from "./utils/db.js";
>>>>>>> 35bd328ac8c75610174840f84b57378e77f1fd11
const app = express();

app.use(express.json());

<<<<<<< HEAD
app.use("/admin", adminRoutes);
app.use("/tahsil", tahsilRoutes);
=======
app.use("/api/v1/admin", adminRoutes);
>>>>>>> 35bd328ac8c75610174840f84b57378e77f1fd11

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDB(process.env.MONGO_URL);
  console.log("localhost running on " + PORT);
});
