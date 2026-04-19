/**
 * Notification Service for sending updates to donors
 * Currently simulates Email and SMS notifications
 */

export const sendDonationNotification = async ({ donor, facilityName, quantity, bloodGroup }) => {
  try {
    const timestamp = new Date().toLocaleString();
    
    const message = `
========================================
🔔 DONATION NOTIFICATION
========================================
To: ${donor.fullName} (${donor.email})
Phone: ${donor.phone}
Date: ${timestamp}

Dear ${donor.fullName},

Thank you for your life-saving donation!
You have successfully donated ${quantity} unit(s) of ${bloodGroup} blood.

Facility: ${facilityName}

Your contribution helps save lives. You can view your full donation history in your profile.

Best Regards,
BBMS Team
========================================
`;

    console.log(message);
    
    // In a production environment, you would integrate with a service here:
    // Example: Nodemailer for Email
    // Example: Twilio for SMS
    
    return { success: true, message: "Notification simulated in console" };
  } catch (error) {
    console.error("❌ Notification Service Error:", error);
    return { success: false, error: error.message };
  }
};
