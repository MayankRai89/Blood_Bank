// middleware/auth.js
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_env";

// require token and attach req.user = { id, role }
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token invalid or expired" });
  }
};

// roles can be string or array; usage: requireRole("hospital") or requireRole(["admin","hospital"])
export const requireRole = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "Not authenticated" });

  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!allowed.includes(req.user.role)) {
    return res.status(403).json({ msg: "Access denied: insufficient role" });
  }
  next();
};
