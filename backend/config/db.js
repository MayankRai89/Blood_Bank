import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import Admin from "../models/adminModel.js";

mongoose.set("bufferCommands", false);

const seedDefaultAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        name: "Mayank Rai",
        email: "admin@bloodbank.com",
        password: "admin@admin",
        role: "admin",
        isActive: true,
      });
      console.log("👑 Default Admin created: admin@bloodbank.com / admin@admin");
    }
  } catch (err) {
    console.warn("⚠️ Admin seeding check warning:", err.message);
  }
};

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const localFallbackUri = "mongodb://127.0.0.1:27017/bloodbank";

  if (primaryUri) {
    try {
      const conn = await mongoose.connect(primaryUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      await seedDefaultAdmin();
      return;
    } catch (error) {
      console.warn(
        `⚠️ Cloud MongoDB connection failed (${error.message}). Attempting fallback to local MongoDB...`,
      );
    }
  }

  try {
    const conn = await mongoose.connect(localFallbackUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ Fallback Local MongoDB Connected: ${conn.connection.host}`);
    await seedDefaultAdmin();
  } catch (fallbackError) {
    console.error(
      "❌ Both Primary and Local Fallback MongoDB connections failed:",
      fallbackError.message,
    );
    console.warn(
      "⚠️ Web server running without DB connection. Please verify MONGO_URI in Render Environment Variables.",
    );
  }
};

export default connectDB;
