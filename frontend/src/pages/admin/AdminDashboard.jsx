import { useEffect, useState } from "react";
import axios from "../lib/axios";

export default function AdminDashboard() {
  const [hospitals, setHospitals] = useState([]);
  const [donors, setDonors] = useState([]);
  const [blood, setBlood] = useState([]);
  const [requests, setRequests] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all admin data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, bloodRes, requestsRes, donationsRes] = await Promise.all([
          axios.get("/api/admin/users"),
          axios.get("/api/admin/blood"),
          axios.get("/api/admin/requests"),
          axios.get("/api/admin/donations"),
        ]);
        setHospitals(usersRes.data.hospitals);
        setDonors(usersRes.data.donors);
        setBlood(bloodRes.data);
        setRequests(requestsRes.data);
        setDonations(donationsRes.data);
      } catch (err) {
        console.error("Error fetching admin data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle status updates
  const updateRequestStatus = async (id, status) => {
    await axios.patch(`/api/admin/requests/${id}`, { status });
    setRequests(requests.map(r => (r._id === id ? { ...r, status } : r)));
  };

  const updateDonationStatus = async (id, status) => {
    await axios.patch(`/api/admin/donations/${id}`, { status });
    setDonations(donations.map(d => (d._id === id ? { ...d, status } : d)));
  };

  const updateBloodUnits = async (id, units) => {
    await axios.patch(`/api/admin/blood/${id}`, { unitsAvailable: units });
    setBlood(blood.map(b => (b._id === id ? { ...b, unitsAvailable: units } : b)));
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Hospitals */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Hospitals</h2>
        <DataTable data={hospitals} />
      </section>

      {/* Donors */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Donors</h2>
        <DataTable data={donors} />
      </section>

      {/* Blood Stock */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Blood Stock</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Type</th>
              <th className="border p-2">Units Available</th>
              <th className="border p-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {blood.map(b => (
              <tr key={b._id}>
                <td className="border p-2">{b.bloodType}</td>
                <td className="border p-2">{b.unitsAvailable}</td>
                <td className="border p-2">
                  <button
                    onClick={() => updateBloodUnits(b._id, b.unitsAvailable + 1)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => updateBloodUnits(b._id, Math.max(0, b.unitsAvailable - 1))}
                    className="px-2 py-1 bg-red-500 text-white rounded ml-2"
                  >
                    -1
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Requests */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Requests</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Requester</th>
              <th className="border p-2">Blood Type</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r._id}>
                <td className="border p-2">{r.requester?.name}</td>
                <td className="border p-2">{r.bloodType}</td>
                <td className="border p-2">{r.quantity}</td>
                <td className="border p-2">{r.status}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => updateRequestStatus(r._id, "approved")}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateRequestStatus(r._id, "rejected")}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Donations */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Donations</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Donor</th>
              <th className="border p-2">Blood Type</th>
              <th className="border p-2">Units</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(d => (
              <tr key={d._id}>
                <td className="border p-2">{d.donor?.name}</td>
                <td className="border p-2">{d.bloodType}</td>
                <td className="border p-2">{d.unitsDonated}</td>
                <td className="border p-2">{d.status}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => updateDonationStatus(d._id, "approved")}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateDonationStatus(d._id, "rejected")}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// ✅ Reusable data table
function DataTable({ data }) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">City</th>
        </tr>
      </thead>
      <tbody>
        {data.map(u => (
          <tr key={u._id}>
            <td className="border p-2">{u.name}</td>
            <td className="border p-2">{u.email}</td>
            <td className="border p-2">{u.phone}</td>
            <td className="border p-2">{u.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
