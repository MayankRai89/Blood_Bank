"use client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // 🔒 Handle facility waiting approval or rejected cases
        if (data.message?.includes("awaiting admin approval")) {
          setError(
            "Your account is awaiting admin approval. Please wait for confirmation.",
          );
          return;
        }
        if (data.message?.includes("rejected")) {
          setError("Your registration has been rejected by admin.");
          return;
        }

        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token and role from response
      const role = data.user?.role || "unknown";
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      // ✅ Redirect based on backend response or fallback
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

      // ✅ Navigate to the dashboard or home
      navigate(targetPath, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-red-50 via-gray-50 to-red-100">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100 transition-all">
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              ✉️ Email ID Login
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">
            Sign In with Email ID
          </h2>
          <p className="text-center text-gray-500 mb-6 text-xs">
            Enter your registered Email ID and Password to access your dashboard
          </p>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-5 flex items-center text-xs">
              <span className="mr-2 text-base">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Registered Email ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="your.name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition disabled:opacity-50 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition disabled:opacity-50 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold shadow-lg hover:from-red-700 hover:to-red-800 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  ✉️ Login with Email ID
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">New to Blood Bank Portal?</p>
            <div className="flex justify-center gap-3 text-xs font-semibold">
              <Link to="/register/donor" className="text-red-600 hover:underline">
                Donor Register
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/register/facility" className="text-red-600 hover:underline">
                Facility Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
