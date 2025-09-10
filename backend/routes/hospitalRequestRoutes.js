import express from "express";
import HospitalRequest from "../models/HospitalRequestModel.js";
import { authenticate, authorize } from "../middleware/auth.js";
import Blood from "../models/BloodModel.js";

const router = express.Router();

// Hospital A creates a request to Hospital B
router.post("/", authenticate, authorize("hospital", "admin"), async (req, res) => {
  try {
    const { toHospital, bloodType, quantity } = req.body;

    if (!toHospital || !bloodType || !quantity) {
      return res.status(400).json({ success: false, message: "toHospital, bloodType and quantity are required" });
    }

    const request = new HospitalRequest({
      fromHospital: req.user.id,
      toHospital,
      bloodType,
      quantity
    });

    await request.save();
    res.status(201).json({ success: true, message: "Request sent successfully", request });
  } catch (error) {
    console.error("Create hospital request error:", error);
    res.status(500).json({ success: false, message: "Server error while creating request" });
  }
});

// Hospital B (receiver) or Admin → view incoming requests
router.get("/incoming", authenticate, authorize("hospital", "admin"), async (req, res) => {
  try {
    const requests = await HospitalRequest.find({ toHospital: req.user.id })
      .populate("fromHospital", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (error) {
    console.error("Get incoming requests error:", error);
    res.status(500).json({ success: false, message: "Server error while fetching incoming requests" });
  }
});

// Hospital A → view outgoing requests
router.get("/outgoing", authenticate, authorize("hospital", "admin"), async (req, res) => {
  try {
    const requests = await HospitalRequest.find({ fromHospital: req.user.id })
      .populate("toHospital", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (error) {
    console.error("Get outgoing requests error:", error);
    res.status(500).json({ success: false, message: "Server error while fetching outgoing requests" });
  }
});

// Hospital B or Admin → approve/reject request
router.put("/:id/status", authenticate, authorize("hospital", "admin"), async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const request = await HospitalRequest.findOne({ _id: req.params.id, toHospital: req.user.id });

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found or not authorized" });
    }

    request.status = status;
    await request.save();

    res.json({ success: true, message: `Request ${status} successfully`, request });
  } catch (error) {
    console.error("Update request status error:", error);
    res.status(500).json({ success: false, message: "Server error while updating request status" });
  }
});


// Approve/Reject hospital request
router.put("/:id/status", authenticate, authorize("hospital", "admin"), async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const request = await HospitalRequest.findOne({ _id: req.params.id, toHospital: req.user.id });

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found or not authorized" });
    }

    // If approved → update blood stock
    if (status === "approved") {
      // Check Hospital B (receiver)’s stock
      const donorStock = await Blood.findOne({
        hospital: req.user.id,
        bloodType: request.bloodType,
        status: "available"
      });

      if (!donorStock || donorStock.quantity < request.quantity) {
        return res.status(400).json({ success: false, message: "Not enough stock available" });
      }

      // Deduct stock from Hospital B
      donorStock.quantity -= request.quantity;
      if (donorStock.quantity === 0) {
        donorStock.status = "used";
      }
      await donorStock.save();

      // Add stock to Hospital A
      let receiverStock = await Blood.findOne({
        hospital: request.fromHospital,
        bloodType: request.bloodType,
        status: "available"
      });

      if (receiverStock) {
        receiverStock.quantity += request.quantity;
        await receiverStock.save();
      } else {
        // Create new entry for Hospital A
        receiverStock = new Blood({
          hospital: request.fromHospital,
          bloodType: request.bloodType,
          quantity: request.quantity,
          collectionDate: new Date(),
          status: "available"
        });
        await receiverStock.save();
      }
    }

    request.status = status;
    await request.save();

    res.json({ success: true, message: `Request ${status} successfully`, request });
  } catch (error) {
    console.error("Update request status error:", error);
    res.status(500).json({ success: false, message: "Server error while updating request status" });
  }
});

export default router;
