import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  RefreshCw,
  Building2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import socket from "../../socket";

const API_URL = "https://blood-bank-urer.onrender.com/api/admin";

const statusStyles = {
  Upcoming: "bg-blue-100 text-blue-800 border-blue-200",
  Ongoing: "bg-green-100 text-green-800 border-green-200",
  Completed: "bg-gray-100 text-gray-800 border-gray-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

function AdminCamps() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    sortBy: "date",
    sortOrder: "asc",
  });

  const token = localStorage.getItem("token");

  const fetchCamps = async (showToast = false) => {
    try {
      if (showToast) setRefreshing(true);
      else setLoading(true);

      const res = await fetch(`${API_URL}/camps`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch camps: ${res.status}`);
      }

      const data = await res.json();
      setCamps(data.camps || []);

      if (showToast) {
        toast.success("Camp list updated");
      }
    } catch (error) {
      console.error("Fetch camps error:", error);
      toast.error(error.message || "Failed to load camps");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCamps();

    socket.connect();
    const handleCampUpdated = () => {
      console.log("Real-time update: Camp updated!");
      fetchCamps(false);
    };

    socket.on("camp-updated", handleCampUpdated);

    return () => {
      socket.off("camp-updated", handleCampUpdated);
    };
  }, []);

  const filteredCamps = camps
    .filter((camp) => {
      const matchesSearch =
        !filters.search ||
        camp.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        camp.location?.venue
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        camp.location?.city
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        camp.hospital?.name
          ?.toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || camp.status === filters.status;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let compareValue = 0;

      if (filters.sortBy === "title") {
        compareValue = (a.title || "").localeCompare(b.title || "");
      } else if (filters.sortBy === "status") {
        compareValue = (a.status || "").localeCompare(b.status || "");
      } else {
        compareValue = new Date(a.date) - new Date(b.date);
      }

      return filters.sortOrder === "asc" ? compareValue : -compareValue;
    });

  const stats = {
    total: camps.length,
    upcoming: camps.filter((camp) => camp.status === "Upcoming").length,
    ongoing: camps.filter((camp) => camp.status === "Ongoing").length,
    completed: camps.filter((camp) => camp.status === "Completed").length,
    cancelled: camps.filter((camp) => camp.status === "Cancelled").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Camps
          </h2>
          <p className="text-gray-500">Fetching all blood donation camps...</p>
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
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Blood Camps
                </h1>
                <p className="text-gray-600 mt-1">
                  View upcoming, ongoing, and completed donation camps
                </p>
              </div>
            </div>

            <button
              onClick={() => fetchCamps(true)}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600">Total Camps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.upcoming}
                </div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.ongoing}
                </div>
                <div className="text-sm text-gray-600">Ongoing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">
                  {stats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stats.cancelled}
                </div>
                <div className="text-sm text-gray-600">Cancelled</div>
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
                  placeholder="Search by camp title, hospital, venue, or city..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="status">Sort by Status</option>
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

        {filteredCamps.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-red-100">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No camps found
            </h3>
            <p className="text-gray-600">
              Try changing the filters to see upcoming or ongoing camps.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCamps.map((camp) => (
              <div
                key={camp._id}
                className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {camp.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(camp.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[camp.status] || statusStyles.Upcoming}`}
                  >
                    {camp.status === "Completed" ? (
                      <CheckCircle size={12} />
                    ) : camp.status === "Cancelled" ? (
                      <XCircle size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    {camp.status}
                  </span>
                </div>

                {camp.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {camp.description}
                  </p>
                )}

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-red-500 flex-shrink-0" />
                    <span>{camp.hospital?.name || "Unknown facility"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-red-500 flex-shrink-0" />
                    <span>
                      {camp.time?.start || "--"} - {camp.time?.end || "--"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <span>
                      {camp.location?.venue}, {camp.location?.city},{" "}
                      {camp.location?.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-red-500 flex-shrink-0" />
                    <span>
                      Expected donors: {camp.expectedDonors || 0}
                      {camp.actualDonors
                        ? ` • Actual donors: ${camp.actualDonors}`
                        : ""}
                    </span>
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

export default AdminCamps;
