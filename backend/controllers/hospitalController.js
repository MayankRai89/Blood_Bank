// controllers/hospitalController.js
import BloodStock from "../models/BloodStock.js";

export const addBloodStock = async (req, res) => {
  try {
    const { bloodType, units } = req.body;
    const hospitalId = req.user.id; // from auth middleware

    if (!bloodType || !units) {
      return res.status(400).json({ msg: "bloodType and units are required" });
    }

    let stock = await BloodStock.findOne({ hospital: hospitalId, bloodType });

    if (stock) {
      stock.units += units; // update existing stock
      await stock.save();
    } else {
      stock = new BloodStock({
        hospital: hospitalId,
        bloodType,
        units,
      });
      await stock.save();
    }

    res.status(200).json({
      msg: "Blood stock updated successfully",
      stock,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
