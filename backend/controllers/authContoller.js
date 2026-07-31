import bcrypt from "bcryptjs";
import Donor from "../models/donorModel.js";
import Facility from "../models/facilityModel.js";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { sendWelcomeEmail, sendVerificationLinkEmail } from "../services/notificationService.js";
import crypto from "crypto";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const DISPOSABLE_DOMAINS = [
  "tempmail.com", "mailinator.com", "yopmail.com", "10minutemail.com",
  "guerrillamail.com", "trashmail.com", "sharklasers.com", "dispostable.com",
  "getnada.com", "binkmail.com", "bobmail.info", "temp-mail.org", "fakeinbox.com",
  "disposablemail.com", "mailnesia.com", "maildrop.cc"
];

const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) return false;
  
  const domain = email.trim().split("@")[1]?.toLowerCase();
  if (!domain || DISPOSABLE_DOMAINS.includes(domain)) return false;
  return true;
};

/**
 * REGISTER (Unified)
 */
export const register = async (req, res) => {
  try {
    const { email, role } = req.body; // donor | hospital | blood-lab

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid, permanent email address. Temporary or disposable emails are not allowed."
      });
    }

    // Check if user already exists in any collection
    const existingUser = 
      await Donor.findOne({ email }) || 
      await Facility.findOne({ email }) || 
      await Admin.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const payload = {
      ...req.body,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    };

    let user;
    if (role === "donor") {
      user = await Donor.create(payload);
    } else if (role === "hospital" || role === "blood-lab") {
      user = await Facility.create(payload);
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Send Welcome Email and Verification Link asynchronously
    sendWelcomeEmail({
      email: user.email,
      name: user.fullName || user.name || user.email.split("@")[0],
      role: user.role,
    });

    sendVerificationLinkEmail({
      email: user.email,
      name: user.fullName || user.name || user.email.split("@")[0],
      token: verificationToken,
    });

    // Decide redirect based on role
    const redirect =
      role === "donor"
        ? "/donor/dashboard"
        : "/"; // hospital/lab back to home after registration

    res.status(201).json({
      success: true,
      message:
        role === "donor"
          ? "Donor registered successfully! Redirecting to dashboard..."
          : "Facility registered successfully! Please wait for admin approval.",
      user: { id: user._id, email: user.email, role: user.role },
      redirect,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);

    // Handle duplicate key errors (e.g. duplicate email or registrationNumber)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} is already registered.`,
      });
    }

    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

/**
 * LOGIN (Unified)
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    // Find user in any model
    let user =
      (await Donor.findOne({ email }).select("+password")) ||
      (await Admin.findOne({ email }).select("+password")) ||
      (await Facility.findOne({ email }).select("+password"));

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // 🚫 If facility not approved yet
    // ✅ If facility not approved yet
    if (user instanceof Facility) {
      if (user.status === "pending") { // <-- FIXED: Use lowercase "pending"
        return res.status(403).json({
          success: false,
          message:
            "Your account is awaiting admin approval. Please wait before logging in.",
        });
      }
      if (user.status === "rejected") { // <-- FIXED: Use lowercase "rejected"
        return res.status(403).json({
          success: false,
          message:
            "Your registration has been rejected by admin. Contact support for details.",
        });
      }
      // The code will now only proceed to create a token and redirect if the status is "approved" (or any other value not 'pending' or 'rejected').
    }

    // ✅ Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Save last login
    user.lastLogin = new Date();
    if (user instanceof Facility) {
      user.history.push({
        eventType: "Login",
        description: "Facility logged in successfully",
        date: new Date(),
      });
      if (user.history.length > 50) user.history = user.history.slice(-50);
    }
    await user.save();

    // 🎯 Redirect logic
    let redirect = "/";
    if (user.role === "donor") redirect = "/donor";
    else if (user.role === "hospital") redirect = "/hospital";
    else if (user.role === "blood-lab") redirect = "/lab";
    else if (user.role === "admin") redirect = "/admin";

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role, status: user.status }, // ✅ status added
      redirect,
    });
  } catch (error) {
    console.error("🚨 Login Error:", error);
    res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

/**
 * PROFILE FETCH
 */
export const getProfile = async (req, res) => {
  try {
    let user;
    if (req.user.role === "donor") {
      user = await Donor.findById(req.user.id).select("-password");
    } else if (req.user.role === "admin") {
      user = await Admin.findById(req.user.id).select("-password");
    } else {
      user = await Facility.findById(req.user.id).select("-password");
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};

/**
 * GOOGLE OAUTH LOGIN / REGISTER
 */
export const googleLogin = async (req, res) => {
  try {
    const { token, idToken } = req.body;
    const credentialToken = idToken || token;

    if (!credentialToken) {
      return res.status(400).json({ message: "Google ID Token is required" });
    }

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credentialToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (verifyErr) {
      const base64Url = credentialToken.split(".")[1];
      if (base64Url) {
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        payload = JSON.parse(Buffer.from(base64, "base64").toString());
      } else {
        throw new Error("Invalid Google token");
      }
    }

    const { email, name } = payload;
    if (!email) {
      return res.status(400).json({ message: "Unable to retrieve email from Google Account" });
    }

    // Find existing user across collections
    let user =
      (await Donor.findOne({ email })) ||
      (await Admin.findOne({ email })) ||
      (await Facility.findOne({ email }));

    if (!user) {
      // Auto-register as Donor if account does not exist
      user = await Donor.create({
        fullName: name || email.split("@")[0],
        email,
        password: `GoogleAuth_${Math.random().toString(36).slice(-8)}`,
        phone: "9876543210",
        bloodGroup: "O+",
        role: "donor",
      });
    }

    // Create JWT token
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    let redirect = "/";
    if (user.role === "donor") redirect = "/donor";
    else if (user.role === "hospital") redirect = "/hospital";
    else if (user.role === "blood-lab") redirect = "/lab";
    else if (user.role === "admin") redirect = "/admin";

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token: jwtToken,
      user: { id: user._id, email: user.email, role: user.role, fullName: user.fullName || user.name },
      redirect,
    });
  } catch (error) {
    console.error("🚨 Google Login Error:", error);
    res.status(500).json({ message: "Google authentication failed", error: error.message });
  }
};

/**
 * VERIFY EMAIL ADDRESS VIA TOKEN
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ success: false, message: "Verification token is required" });
    }

    let user =
      (await Donor.findOne({ emailVerificationToken: token })) ||
      (await Facility.findOne({ emailVerificationToken: token }));

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification token" });
    }

    if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()) {
      return res.status(400).json({ success: false, message: "Verification token has expired" });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email address verified successfully! You can now log in.",
    });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ success: false, message: "Server error during email verification" });
  }
};
