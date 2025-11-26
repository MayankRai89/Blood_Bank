import BloodRequest from "../models/bloodRequestModel.js";
import Blood from "../models/bloodModel.js";

// ------------------- HOSPITAL SENDS REQUEST -------------------
export const sendBloodRequest = async (req, res) => {
  try {
    const hospitalId = req.user._id;
    const { bloodLab, bloodGroup, units } = req.body;

    if (!bloodLab || !bloodGroup || !units) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const request = await BloodRequest.create({
      hospital: hospitalId,
      bloodLab,
      bloodGroup,
      units,
    });

    res.json({ message: "Blood request sent successfully", request });
  } catch (err) {
    res.status(500).json({ message: "Failed to send request" });
  }
};

// ------------------- LAB VIEW REQUESTS -------------------
export const getLabRequests = async (req, res) => {
  try {
    const labId = req.user._id;

    const requests = await BloodRequest.find({ bloodLab: labId })
      .populate("hospital", "name email phone")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to load requests" });
  }
};

// ------------------- LAB ACCEPT REQUEST -------------------
export const acceptBloodRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await BloodRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // CHECK IF ENOUGH STOCK AVAILABLE
    const stock = await Blood.findOne({
      bloodLab: request.bloodLab,
      bloodGroup: request.bloodGroup,
    });

    if (!stock || stock.quantity < request.units) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Reduce stock
    stock.quantity -= request.units;
    await stock.save();

    request.status = "Accepted";
    await request.save();

    res.json({ message: "Request Accepted", request });
  } catch (err) {
    res.status(500).json({ message: "Failed to accept request" });
  }
};

// ------------------- LAB REJECT REQUEST -------------------
export const rejectBloodRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { reason } = req.body;

    const request = await BloodRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "Rejected";
    request.reason = reason || "Not specified";
    await request.save();

    res.json({ message: "Request Rejected", request });
  } catch (err) {
    res.status(500).json({ message: "Failed to reject request" });
  }
};

// ------------------- HOSPITAL VIEW REQUEST HISTORY -------------------
export const getHospitalRequests = async (req, res) => {
  try {
    const hospitalId = req.user._id;

    const requests = await BloodRequest.find({ hospital: hospitalId })
      .populate("bloodLab", "name email phone")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to load history" });
  }
};
