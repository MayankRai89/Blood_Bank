import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/adminModel.js";

import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const createAdminUser = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bloodbank";
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
    console.log("Connected to MongoDB.");

    const email = "admin@bloodbank.com";
    const password = "admin@admin";

    let admin = await Admin.findOne({ email });

    if (admin) {
      console.log("Existing Admin found. Updating password and name...");
      admin.name = "Mayank Rai";
      admin.password = password; // pre-save hook will hash this
      admin.isActive = true;
      admin.role = "admin";
      await admin.save();
      console.log("✅ Admin user updated successfully!");
    } else {
      console.log("Creating new Admin user...");
      admin = await Admin.create({
        name: "Mayank Rai",
        email,
        password, // pre-save hook will hash this
        role: "admin",
        isActive: true,
      });
      console.log("✅ Admin user created successfully!");
    }

    console.log(`\n========================================`);
    console.log(`🔑 ADMIN LOGIN CREDENTIALS`);
    console.log(`Email:    admin@bloodbank.com`);
    console.log(`Password: admin@admin`);
    console.log(`Role:     admin`);
    console.log(`ID:       ${admin._id}`);
    console.log(`========================================\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create/update Admin user:", err.message);
    process.exit(1);
  }
};

createAdminUser();
