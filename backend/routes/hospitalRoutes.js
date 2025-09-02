// routes/hospital.js
import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { addBloodStock } from "../controllers/hospitalController.js";

const router = express.Router();

// Sample hospital dashboard route
router.get(
  "/profile",
  requireAuth,
  requireRole("hospital"),
  (req, res) => {
    res.json({
      msg: `Welcome Hospital!`,
      hospitalId: req.user.id,
      role: req.user.role,
    });
  }
);




// only hospitals can add stock
router.post("/stock", requireAuth, requireRole("hospital"), addBloodStock);

export default router;
