import express from "express";
import {
  getAllDonors,
  getHospitalDashboard,
  getHospitalHistory,
  getHospitalRequests,
  getHospitalStock,
  hospitalRequestBlood,
  logContactAttempt,
} from "../controllers/hospitalController.js";
import { markDonation } from "../controllers/donorController.js";
import { protectFacility } from "../middlewares/facilityMiddleware.js";

const router = express.Router();

router.get("/dashboard", protectFacility, getHospitalDashboard);
router.get("/blood/stock", protectFacility, getHospitalStock);
router.get("/blood/requests", protectFacility, getHospitalRequests);
router.post("/blood/request", protectFacility, hospitalRequestBlood);
router.get("/history", protectFacility, getHospitalHistory);
router.get("/donors", protectFacility, getAllDonors);
router.post("/donors/:id/contact", protectFacility, logContactAttempt);
router.post("/donors/:id/donate", protectFacility, markDonation);

export default router;
