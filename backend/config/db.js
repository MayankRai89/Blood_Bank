import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const localFallbackUri = "mongodb://127.0.0.1:27017/bloodbank";

  if (primaryUri) {
    try {
      const conn = await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 5000 });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.warn(`⚠️ Cloud MongoDB connection failed (${error.message}). Attempting fallback to local MongoDB...`);
    }
  }

  try {
    const conn = await mongoose.connect(localFallbackUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ Fallback Local MongoDB Connected: ${conn.connection.host}`);
  } catch (fallbackError) {
    console.error("❌ Both Primary and Local Fallback MongoDB connections failed:", fallbackError.message);
    process.exit(1);
  }
};

export default connectDB;
