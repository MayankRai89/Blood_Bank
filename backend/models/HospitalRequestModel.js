import mongoose from "mongoose";

const hospitalRequestSchema = new mongoose.Schema({
  fromHospital: {   // Requesting hospital
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  toHospital: {     // Target hospital
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now }
});

const HospitalRequest = mongoose.model("HospitalRequest", hospitalRequestSchema);
export default HospitalRequest;
