import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Only logged-in users can access this
router.get("/profile", requireAuth, requireRole("donor"), (req, res) => {
  res.json({ message: "Welcome User Dashboard" });
});

export default router;
