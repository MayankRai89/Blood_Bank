import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Creates a Nodemailer transporter using Google OAuth2 credentials
 */
const createTransporter = () => {
  if (
    process.env.GOOGLE_USER &&
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  ) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    });
  }
  return null;
};

/**
 * Notification Service for sending real thank-you email updates to donors
 */
export const sendDonationNotification = async ({ donor, facilityName, locationName, quantity = 1, bloodGroup }) => {
  try {
    const timestamp = new Date().toLocaleString();
    const targetLocation = locationName || facilityName || "Blood Bank Facility";
    const recipientEmail = donor.email;

    console.log(`\n========================================`);
    console.log(`🔔 DONATION NOTIFICATION DISPATCH`);
    console.log(`To: ${donor.fullName} (${recipientEmail})`);
    console.log(`Location: ${targetLocation}`);
    console.log(`Quantity: ${quantity} unit(s) of ${bloodGroup}`);
    console.log(`Date: ${timestamp}`);
    console.log(`========================================\n`);

    const transporter = createTransporter();

    if (transporter && recipientEmail) {
      const mailOptions = {
        from: `"Blood Bank Management System" <${process.env.GOOGLE_USER}>`,
        to: recipientEmail,
        subject: `🩸 Thank You for Your Life-Saving Donation at ${targetLocation}!`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 28px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Blood Bank Management System</h1>
              <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Life-Saving Donation Certificate & Thank You Confirmation</p>
            </div>
            
            <div style="padding: 32px; background-color: #ffffff; color: #1f2937; line-height: 1.6;">
              <h2 style="color: #111827; margin-top: 0;">Dear ${donor.fullName},</h2>
              
              <p>We extend our deepest gratitude for your noble blood donation. Your generous contribution directly helps save lives in critical situations.</p>
              
              <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 18px; margin: 24px 0; border-radius: 8px;">
                <p style="margin: 4px 0; font-size: 14px;"><strong>📍 Donation Location / Event:</strong> ${targetLocation}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>🩸 Blood Group:</strong> <span style="color: #dc2626; font-weight: bold;">${bloodGroup}</span></p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>📦 Units Donated:</strong> ${quantity} Unit(s)</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>📅 Date & Time:</strong> ${timestamp}</p>
              </div>

              <p>Your blood donation has been recorded into the inventory at <strong>${targetLocation}</strong> and is now ready to assist patients in emergency care, surgeries, and treatment.</p>
              
              <div style="margin: 32px 0; text-align: center;">
                <a href="https://blood-bank-tan.vercel.app/login" style="background-color: #dc2626; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);">Access Your Donor Profile</a>
              </div>

              <p style="margin-top: 30px; font-size: 14px; color: #4b5563;">With sincere appreciation,<br><strong>The Blood Bank Management System Team</strong></p>
            </div>
            
            <div style="background-color: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
              This is an automated donation receipt email sent by BBMS. Thank you for giving the gift of life.
            </div>
          </div>
        `,
      };

      const mailResult = await transporter.sendMail(mailOptions);
      console.log(`✅ Donation thank-you email sent to ${recipientEmail}! MessageId:`, mailResult.messageId);
      return { success: true, messageId: mailResult.messageId };
    } else {
      console.log("ℹ️ Transporter not configured or recipient email missing. Logged notification to console.");
      return { success: true, message: "Logged to console" };
    }
  } catch (error) {
    console.error("❌ Notification Email Service Error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Send Welcome Email on Registration or Login
 */
export const sendWelcomeEmail = async ({ email, name, role }) => {
  try {
    const transporter = createTransporter();
    if (transporter && email) {
      const mailOptions = {
        from: `"Blood Bank Management System" <${process.env.GOOGLE_USER}>`,
        to: email,
        subject: `🩸 Welcome to Blood Bank Management System, ${name || "User"}!`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 28px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Blood Bank Management System</h1>
              <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Registration Confirmation & Account Access</p>
            </div>
            
            <div style="padding: 32px; background-color: #ffffff; color: #1f2937; line-height: 1.6;">
              <h2 style="color: #111827; margin-top: 0;">Welcome, ${name || "User"}!</h2>
              
              <p>Your account has been successfully registered on the Blood Bank Portal as a <strong>${role?.toUpperCase() || "USER"}</strong>.</p>
              
              <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0; border-radius: 6px;">
                <p style="margin: 4px 0; font-size: 14px;"><strong>Registered Email:</strong> ${email}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>Role:</strong> ${role}</p>
              </div>

              <p>You can now log in to your account at any time using your Email ID and Password, or via Google Sign-In.</p>
              
              <div style="margin: 28px 0; text-align: center;">
                <a href="https://blood-bank-tan.vercel.app/login" style="background-color: #dc2626; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">Log In to Portal</a>
              </div>

              <p style="margin-top: 30px; font-size: 14px; color: #4b5563;">Warm regards,<br><strong>Blood Bank Management System Team</strong></p>
            </div>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email sent to ${email}! MessageId:`, info.messageId);
    }
  } catch (err) {
    console.warn("⚠️ Welcome Email Error:", err.message);
  }
};
