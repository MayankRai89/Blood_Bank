import express from "express";
import HospitalCamp from "../models/HospitalCampModel.js";
import User from "../models/UserModel.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// GET all upcoming or ongoing camps
router.get("/camps", async (req, res) => {
  try {
    const camps = await HospitalCamp.find({
      status: { $in: ["upcoming", "ongoing"] }
    }).populate("hospital", "name email address phone");

    res.json({ success: true, camps });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Donor registers for a camp
router.post("/camps/:id/register", authenticate, authorize("donor"), async (req, res) => {
  try {
    const camp = await HospitalCamp.findById(req.params.id);
    if (!camp) {
      return res.status(404).json({ success: false, message: "Camp not found" });
    }

    if (!["upcoming", "ongoing"].includes(camp.status)) {
      return res.status(400).json({ success: false, message: "Camp is not open for registration" });
    }

    const donor = await User.findById(req.user._id);

    // ✅ Eligibility checks
    const age = Math.floor((Date.now() - new Date(donor.healthInfo?.dob)) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 18) {
      return res.status(400).json({ success: false, message: "Donor must be 18 or older" });
    }

    if (donor.healthInfo?.hasDiseases) {
      return res.status(400).json({ success: false, message: "Donor is not eligible due to health conditions" });
    }

    if (donor.lastDonationDate) {
      const diffDays = Math.floor((Date.now() - new Date(donor.lastDonationDate)) / (1000 * 60 * 60 * 24));
      if (diffDays < 45) {
        return res.status(400).json({ success: false, message: "Minimum 45 days required between donations" });
      }
    }

    // Check if already registered
    const alreadyRegistered = camp.registeredDonors.some(d => d.donor.toString() === donor._id.toString());
    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: "Already registered for this camp" });
    }

    // Add donor
    camp.registeredDonors.push({ donor: donor._id });
    await camp.save();

    res.status(201).json({ success: true, message: "Donor registered successfully", camp });
  } catch (error) {
    console.error("Donor register error:", error);
    res.status(500).json({ success: false, message: "Server error while registering donor" });
  }
});

// GET donor's registered camps
router.get("/donor/camps", authenticate, authorize("donor"), async (req, res) => {
  try {
    const camps = await HospitalCamp.find({
      "registeredDonors.donor": req.user._id
    }).populate("hospital", "name address");

    res.json({ success: true, camps });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
