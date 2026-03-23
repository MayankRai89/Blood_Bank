import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Whitelist routes
const whitelist = ["/api/auth/login", "/api/auth/register"];

// ✅ Authentication Middleware
export const authenticate = async (req, res, next) => {
  try {
    // ✅ Skip whitelist routes
    if (whitelist.includes(req.path)) {
      return next();
    }

    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalid or expired",
    });
  }
};

// ✅ Admin has access to EVERYTHING
export const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return next(); // allow everything
  }

  return res.status(403).json({
    message: "Admin access required",
  });
};

// ✅ Optional: Role-based control
export const authorize = (...roles) => {
  return (req, res, next) => {
    // ✅ Admin bypass (superuser)
    if (req.user.role === "admin") {
      return next();
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};
