"use client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register'
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  
  // Registration state
  const [regData, setRegData] = useState({
    role: "donor",
    fullName: "",
    name: "", // for facility
    email: "",
    password: "",
    phone: "",
    bloodGroup: "O+",
    age: 25,
    gender: "Male",
    address: { street: "Main St", city: "City", state: "State", pincode: "110001" },
    type: "hospital",
    licenseNumber: "LIC12345",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    if (!loginData.email || !loginData.password) {
      setError("Please fill in all email and password fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message?.includes("awaiting admin approval")) {
          setError("Your account is awaiting admin approval. Please wait for confirmation.");
          return;
        }
        if (data.message?.includes("rejected")) {
          setError("Your registration has been rejected by admin.");
          return;
        }
        throw new Error(data.message || "Login failed");
      }

      const role = data.user?.role || "unknown";
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      const targetPath =
        data.redirect ||
        (role === "donor"
          ? "/donor"
          : role === "hospital"
            ? "/hospital"
            : role === "blood-lab"
              ? "/lab"
              : role === "admin"
                ? "/admin"
                : "/");

      navigate(targetPath, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    if (!regData.email || !regData.password) {
      setError("Please provide a valid email ID and password.");
      setLoading(false);
      return;
    }

    try {
      const payload = { ...regData };
      if (regData.role === "donor") {
        if (!payload.fullName) payload.fullName = payload.email.split("@")[0];
        if (!payload.phone) payload.phone = "9876543210";
      } else {
        if (!payload.name) payload.name = payload.email.split("@")[0] + " Facility";
        if (!payload.phone) payload.phone = "9876543210";
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccessMsg(data.message || "Registration successful! You can now log in.");
      setLoginData({ email: regData.email, password: regData.password });
      setTimeout(() => {
        setActiveTab("login");
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-red-50 via-gray-50 to-red-100">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100 transition-all">
          
          {/* Header titles */}
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
            Blood Bank Portal
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Sign in or create an account with your Email ID
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6 border border-gray-200">
            <button
              type="button"
              onClick={() => { setActiveTab("login"); setError(""); setSuccessMsg(""); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "login"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Email Login
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab("register"); setError(""); setSuccessMsg(""); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "register"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Email Register
            </button>
          </div>

          {/* Error & Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm flex items-center">
              <span className="mr-2 text-lg">⚠️</span>
              {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm flex items-center">
              <span className="mr-2 text-lg">✅</span>
              {successMsg}
            </div>
          )}

          {/* LOGIN TAB */}
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition disabled:opacity-50 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition disabled:opacity-50 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold shadow-lg hover:from-red-700 hover:to-red-800 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Authenticating...
                  </>
                ) : (
                  "Login with Email"
                )}
              </button>
            </form>
          ) : (
            /* REGISTER TAB */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Account Role
                </label>
                <select
                  name="role"
                  value={regData.role}
                  onChange={handleRegChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm"
                >
                  <option value="donor">Blood Donor</option>
                  <option value="hospital">Hospital Facility</option>
                  <option value="blood-lab">Blood Bank / Lab</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {regData.role === "donor" ? "Full Name" : "Facility Name"}
                </label>
                <input
                  type="text"
                  name={regData.role === "donor" ? "fullName" : "name"}
                  placeholder={regData.role === "donor" ? "Mayank Rai" : "City Hospital"}
                  value={regData.role === "donor" ? regData.fullName : regData.name}
                  onChange={handleRegChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={regData.email}
                  onChange={handleRegChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={regData.password}
                  onChange={handleRegChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm"
                />
              </div>

              {regData.role === "donor" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Blood Group
                    </label>
                    <select
                      name="bloodGroup"
                      value={regData.bloodGroup}
                      onChange={handleRegChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                    >
                      {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="9876543210"
                      value={regData.phone}
                      onChange={handleRegChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold shadow-lg hover:from-red-700 hover:to-red-800 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  "Register Account"
                )}
              </button>
            </form>
          )}

          {/* Links for detailed registration forms */}
          <div className="mt-6 border-t border-gray-100 pt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">Detailed Registration Forms:</p>
            <div className="flex justify-center gap-4 text-xs font-semibold">
              <Link to="/register/donor" className="text-red-600 hover:underline">
                Donor Registration
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/register/facility" className="text-red-600 hover:underline">
                Facility Registration
              </Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
