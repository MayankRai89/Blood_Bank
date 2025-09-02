import mongoose from "mongoose";

const bloodTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  units: { type: Number, default: 0 }
});

const bloodStockSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
      unique: true // one stock document per hospital
    },
    bloodTypes: [bloodTypeSchema]
  },
  { timestamps: true }
);

export default mongoose.model("BloodStock", bloodStockSchema);
