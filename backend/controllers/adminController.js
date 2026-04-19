import Donor from "../models/donorModel.js";
import Facility from "../models/facilityModel.js";
import BloodCamp from "../models/bloodCampModel.js";

// 🧩 Get Dashboard Overview Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments();
    const totalFacilities = await Facility.countDocuments();
    const pendingFacilities = await Facility.countDocuments({
      status: "pending",
    });
    const approvedFacilities = await Facility.countDocuments({
      status: "approved",
    });

    // Count total donations across all donors
    const donors = await Donor.find({}, "donationHistory");
    const totalDonations = donors.reduce(
      (sum, donor) => sum + (donor.donationHistory?.length || 0),
      0,
    );

    const activeDonors = await Donor.countDocuments({ isEligible: true });
    const upcomingCamps = await BloodCamp.countDocuments({
      status: { $in: ["Upcoming", "Ongoing"] },
    });

    // 📈 Calculate Growth Data (Last 6 Months)
    const growthData = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = months[d.getMonth()];
      const year = d.getFullYear();
      const monthIndex = d.getMonth();

      const startOfMonth = new Date(year, monthIndex, 1);
      const endOfMonth = new Date(year, monthIndex + 1, 0, 23, 59, 59);

      // Count new donors in this month
      const monthlyDonors = await Donor.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });

      // Count donations in this month
      const donorsWithDonations = await Donor.find({
        "donationHistory.donationDate": { $gte: startOfMonth, $lte: endOfMonth },
      }, "donationHistory");

      let monthlyDonations = 0;
      donorsWithDonations.forEach(donor => {
        monthlyDonations += (donor.donationHistory || []).filter(history => {
          const donationDate = new Date(history.donationDate);
          return donationDate >= startOfMonth && donationDate <= endOfMonth;
        }).length;
      });

      growthData.push({
        name: monthName,
        donors: monthlyDonors,
        donations: monthlyDonations,
      });
    }

    res.status(200).json({
      totalDonors,
      totalFacilities,
      approvedFacilities,
      pendingFacilities,
      totalDonations,
      activeDonors,
      upcomingCamps,
      growthData,
    });
  } catch (err) {
    console.error("Admin Stats Error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// 🧍 Get All Donors
export const getAllDonors = async (req, res) => {
  try {
    // Note: This function was present in your code block but not used in the router
    const donors = await Donor.find().select("-password");
    res.status(200).json({ donors });
  } catch (err) {
    res.status(500).json({ message: "Error fetching donors" });
  }
};

// 🏥 Get All Facilities (Pending + Approved)
export const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json({ facilities });
  } catch (err) {
    res.status(500).json({ message: "Error fetching facilities" });
  }
};

export const getAllCamps = async (req, res) => {
  try {
    const camps = await BloodCamp.find()
      .populate("hospital", "name email phone facilityType address")
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json({ camps });
  } catch (err) {
    console.error("Get All Camps Error:", err);
    res.status(500).json({ message: "Error fetching camps" });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const donors = await Donor.find()
      .select("fullName email bloodGroup donationHistory")
      .populate("donationHistory.facility", "name facilityType address");

    const donations = donors
      .flatMap((donor) =>
        (donor.donationHistory || []).map((donation, index) => ({
          id: donation._id || `${donor._id}-${index}`,
          donorId: donor._id,
          donorName: donor.fullName,
          donorEmail: donor.email,
          donorBloodGroup: donor.bloodGroup,
          donationDate: donation.donationDate,
          bloodGroup: donation.bloodGroup || donor.bloodGroup,
          quantity: donation.quantity || 1,
          remarks: donation.remarks || "",
          verified: Boolean(donation.verified),
          facility: donation.facility?.name || "Unknown facility",
          facilityType: donation.facility?.facilityType || "",
          city: donation.facility?.address?.city || "",
          state: donation.facility?.address?.state || "",
        })),
      )
      .sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));

    res.status(200).json({ donations });
  } catch (err) {
    console.error("Get All Donations Error:", err);
    res.status(500).json({ message: "Error fetching donation history" });
  }
};

// ✅ Approve a Facility
export const approveFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility)
      return res.status(404).json({ message: "Facility not found" });

    facility.status = "approved";

    // HISTORY LOGIC DELETED

    await facility.save();

    res.status(200).json({ message: "Facility approved", facility });
  } catch (err) {
    console.error("Facility Approval Error:", err);
    res.status(500).json({ message: "Error approving facility" });
  }
};

// ❌ Reject / Update Facility Status to Rejected
export const rejectFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility)
      return res.status(404).json({ message: "Facility not found" });

    const { rejectionReason } = req.body;
    if (!rejectionReason)
      return res.status(400).json({ message: "Rejection reason is required." });

    facility.status = "rejected";
    facility.rejectionReason = rejectionReason;

    // HISTORY LOGIC DELETED

    await facility.save();

    res
      .status(200)
      .json({ message: "Facility rejected and status updated", facility });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error rejecting facility" });
  }
};
