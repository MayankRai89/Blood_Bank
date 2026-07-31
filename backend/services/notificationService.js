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
      const certId = `CERT-${Math.floor(100000 + Math.random() * 900000)}`;

      const mailOptions = {
        from: `"Blood Bank Management System" <${process.env.GOOGLE_USER}>`,
        to: recipientEmail,
        subject: `📜 Official Certificate & Proof of Blood Donation - ${targetLocation}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; border: 2px solid #dc2626; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            
            <!-- Header Certificate Banner -->
            <div style="background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%); color: white; padding: 32px; text-align: center; border-bottom: 4px solid #7f1d1d;">
              <p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; opacity: 0.9;">Official Proof of Donation</p>
              <h1 style="margin: 6px 0 0 0; font-size: 26px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Certificate of Blood Donation</h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.85;">Issued by ${targetLocation}</p>
            </div>
            
            <!-- Certificate Body -->
            <div style="padding: 36px; background-color: #ffffff; color: #1f2937; line-height: 1.7;">
              
              <div style="text-align: center; margin-bottom: 24px;">
                <p style="font-size: 15px; color: #4b5563; margin: 0;">This official certificate verifies that</p>
                <h2 style="color: #b91c1c; font-size: 24px; font-weight: 700; margin: 4px 0;">${donor.fullName}</h2>
                <p style="font-size: 14px; color: #4b5563; margin: 0;">has voluntarily donated blood to support patient care and medical emergencies.</p>
              </div>

              <!-- Official Record Table -->
              <div style="background-color: #fef2f2; border: 1px solid #fca5a5; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;"><strong>Certificate ID:</strong></td>
                    <td style="padding: 6px 0; font-weight: bold; color: #111827; text-align: right;">${certId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;"><strong>Organization / Facility:</strong></td>
                    <td style="padding: 6px 0; font-weight: bold; color: #111827; text-align: right;">${targetLocation}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;"><strong>Donor Name:</strong></td>
                    <td style="padding: 6px 0; font-weight: bold; color: #111827; text-align: right;">${donor.fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;"><strong>Blood Group:</strong></td>
                    <td style="padding: 6px 0; font-weight: bold; color: #dc2626; font-size: 16px; text-align: right;">${bloodGroup}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;"><strong>Units Donated:</strong></td>
                    <td style="padding: 6px 0; font-weight: bold; color: #111827; text-align: right;">${quantity} Unit(s)</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;"><strong>Date & Time:</strong></td>
                    <td style="padding: 6px 0; font-weight: bold; color: #111827; text-align: right;">${timestamp}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 13px; color: #4b5563; text-align: center;">
                This email serves as valid legal proof and receipt of blood donation at <strong>${targetLocation}</strong> for academic, corporate, or civic verification.
              </p>

              <div style="margin: 28px 0; text-align: center;">
                <a href="https://blood-bank-tan.vercel.app/login" style="background-color: #dc2626; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);">View Official Profile & History</a>
              </div>

              <p style="margin-top: 30px; font-size: 13px; color: #6b7280; text-align: center;">
                Issued by <strong>${targetLocation}</strong> via Blood Bank Management System.<br>
                Thank you for saving lives!
              </p>
            </div>
            
            <div style="background-color: #f9fafb; padding: 16px; text-align: center; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
              Official Digital Record • Certificate ID: ${certId} • Blood Bank Management System
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

/**
 * Send Email Verification Link Email
 */
export const sendVerificationLinkEmail = async ({ email, name, token }) => {
  try {
    const transporter = createTransporter();
    const verificationUrl = `https://blood-bank-tan.vercel.app/verify-email?token=${token}`;

    if (transporter && email) {
      const mailOptions = {
        from: `"Blood Bank Management System" <${process.env.GOOGLE_USER}>`,
        to: email,
        subject: `🔑 Verify Your Email Address - Blood Bank Portal`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 28px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Blood Bank Management System</h1>
              <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Account Email Address Verification</p>
            </div>
            
            <div style="padding: 32px; background-color: #ffffff; color: #1f2937; line-height: 1.6;">
              <h2 style="color: #111827; margin-top: 0;">Hello ${name || "User"},</h2>
              
              <p>Thank you for registering on the Blood Bank Portal. Please click the button below to verify your email address and activate full account privileges:</p>
              
              <div style="margin: 32px 0; text-align: center;">
                <a href="${verificationUrl}" style="background-color: #dc2626; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);">Verify Email Address</a>
              </div>

              <p style="font-size: 13px; color: #6b7280; word-break: break-all;">Or copy and paste this verification link into your browser:<br><a href="${verificationUrl}" style="color: #dc2626;">${verificationUrl}</a></p>

              <p style="margin-top: 30px; font-size: 14px; color: #4b5563;">This verification link will expire in 24 hours.<br><br>Best regards,<br><strong>Blood Bank Management System Team</strong></p>
            </div>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Verification link email sent to ${email}! MessageId:`, info.messageId);
    }
  } catch (err) {
    console.warn("⚠️ Verification Email Error:", err.message);
  }
};
