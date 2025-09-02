import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

app.use("/api/donor", userRoutes);


app.use("/api/hospital", hospitalRoutes);




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
