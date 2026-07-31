import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Droplet,
  Search,
  RefreshCw,
  Calendar,
  MapPin,
  Download,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "lucide-react";

const API_URL = "https://blood-bank-urer.onrender.com/api/admin";

function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    bloodGroup: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  const token = localStorage.getItem("token");
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const fetchDonations = async (showToast = false) => {
    try {
      if (showToast) setRefreshing(true);
      else setLoading(true);

      const res = await fetch(`${API_URL}/donations`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch donation history: ${res.status}`);
      }

      const data = await res.json();
      setDonations(data.donations || []);

      if (showToast) {
        toast.success("Donation history updated");
      }
    } catch (error) {
      console.error("Fetch donations error:", error);
      toast.error(error.message || "Failed to load donation history");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const filteredDonations = donations
    .filter((item) => {
      const matchesSearch =
        !filters.search ||
        item.donorName?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.donorEmail?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.facility?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.city?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesBloodGroup =
        filters.bloodGroup === "all" || item.bloodGroup === filters.bloodGroup;

      return matchesSearch && matchesBloodGroup;
    })
    .sort((a, b) => {
      let compareValue = 0;

      if (filters.sortBy === "donor") {
        compareValue = (a.donorName || "").localeCompare(b.donorName || "");
      } else if (filters.sortBy === "units") {
        compareValue = (a.quantity || 0) - (b.quantity || 0);
      } else {
        compareValue = new Date(a.donationDate) - new Date(b.donationDate);
      }

      return filters.sortOrder === "asc" ? compareValue : -compareValue;
    });

  const stats = {
    totalDonations: donations.length,
    totalUnits: donations.reduce((sum, item) => sum + (item.quantity || 1), 0),
    verified: donations.filter((item) => item.verified).length,
    recent: donations.filter((item) => {
      const donationDate = new Date(item.donationDate);
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      return donationDate >= last30Days;
    }).length,
  };

  const exportToCSV = () => {
    const headers = [
      "Date",
      "Donor Name",
      "Donor Email",
      "Blood Group",
      "Units",
      "Facility",
      "City",
      "State",
      "Verified",
      "Remarks",
    ];

    const rows = filteredDonations.map((item) => [
      new Date(item.donationDate).toLocaleDateString("en-IN"),
      item.donorName || "",
      item.donorEmail || "",
      item.bloodGroup || "",
      item.quantity || 1,
      item.facility || "",
      item.city || "",
      item.state || "",
      item.verified ? "Yes" : "No",
      item.remarks || "",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-donation-history.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Donation history exported");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Droplet className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Donation History
          </h2>
          <p className="text-gray-500">Fetching donation records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-xl">
                <Droplet className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Donation History
                </h1>
                <p className="text-gray-600 mt-1">
                  View all recorded donations across the system
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => fetchDonations(true)}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Refreshing..." : "Refresh Data"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {stats.totalDonations}
                </div>
                <div className="text-sm text-gray-600">Total Donations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stats.totalUnits}
                </div>
                <div className="text-sm text-gray-600">Units Collected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.verified}
                </div>
                <div className="text-sm text-gray-600">Verified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.recent}
                </div>
                <div className="text-sm text-gray-600">Last 30 Days</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  placeholder="Search by donor, email, facility, or city..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <select
              value={filters.bloodGroup}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, bloodGroup: e.target.value }))
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Blood Groups</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="date">Sort by Date</option>
              <option value="donor">Sort by Donor</option>
              <option value="units">Sort by Units</option>
            </select>

            <button
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
                }))
              }
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {filters.sortOrder === "asc" ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
          </div>
        </div>

        {filteredDonations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-red-100">
            <Droplet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No donation records found
            </h3>
            <p className="text-gray-600">
              Try changing the filters to see donation history.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredDonations.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 rounded-xl bg-red-100 text-red-600">
                      <Droplet className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.donorName}
                        </h3>
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                          {item.bloodGroup}
                        </span>
                        {item.verified && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                            <CheckCircle size={12} />
                            Verified
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        {item.donorEmail}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-red-500" />
                          <span>
                            {new Date(item.donationDate).toLocaleDateString(
                              "en-IN",
                              {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span>
                            {item.facility}
                            {item.city ? `, ${item.city}` : ""}
                            {item.state ? `, ${item.state}` : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplet className="w-4 h-4 text-red-500" />
                          <span>{item.quantity || 1} unit(s)</span>
                        </div>
                      </div>

                      {item.remarks && (
                        <p className="text-sm text-gray-500 mt-3">
                          Note: {item.remarks}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDonations;
