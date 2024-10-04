import mongoose from "mongoose";

export async function connectToDB(URI) {
  mongoose
    .connect(URI)
    .then(() => {
      console.log("db connected...");
    })
    .catch((error) => {
      console.log("error in db connection " + error);
    });
}
