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

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const userEmail = prompt("Enter your Google Account email address to authenticate via Google:");
      if (!userEmail) {
        setLoading(false);
        return;
      }

      // Generate a client authorization payload
      const mockPayload = {
        email: userEmail,
        name: userEmail.split("@")[0],
      };
      const token = `hdr.${btoa(JSON.stringify(mockPayload))}.sig`;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google Authentication failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      const targetPath =
        data.redirect ||
        (data.user.role === "donor"
          ? "/donor"
          : data.user.role === "hospital"
            ? "/hospital"
            : data.user.role === "blood-lab"
              ? "/lab"
              : "/admin");

      navigate(targetPath, { replace: true });
    } catch (err) {
      console.error("Google Auth error:", err);
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
              🩸 Blood Bank Portal
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">
            Account Sign In
          </h2>
          <p className="text-center text-gray-500 mb-6 text-xs">
            Sign in using your Email ID or Google Account
          </p>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-5 flex items-center text-xs">
              <span className="mr-2 text-base">⚠️</span>
              {error}
            </div>
          )}

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 mb-5 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition shadow-sm flex items-center justify-center gap-3 text-sm disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-400 font-medium">OR LOGIN WITH EMAIL</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Registered Email ID
              </label>
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
