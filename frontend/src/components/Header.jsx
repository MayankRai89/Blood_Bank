import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, ChevronDown } from "lucide-react";

const WEBSITE_NAME = import.meta.env.VITE_WEBSITE_NAME || "BloodConnect";

export default function Header({ currentUser }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: "Home",    path: "/" },
    { name: "About",   path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const authLinks = currentUser
    ? [
        { name: "Dashboard", path: "/dashboard", primary: false },
        { name: "Profile",   path: "/profile",   primary: false },
      ]
    : [
        { name: "Login",                path: "/login",             primary: false },
        { name: "Register as Donor",    path: "/register/donor",    primary: true  },
        { name: "Register as Facility", path: "/register/facility", primary: true  },
      ];

  const isActive = (path) => location.pathname === path;

  /* ── shared transition styles ── */
  const headerBg = scrolled
    ? "rgba(255,255,255,0.96)"
    : "rgba(255,255,255,0)";
  const headerShadow = scrolled
    ? "0 4px 24px rgba(0,0,0,0.10)"
    : "none";
  const headerBorder = scrolled
    ? "1px solid rgba(220,38,38,0.12)"
    : "1px solid transparent";
  const textColor = scrolled ? "#111" : "#fff";
  const subTextColor = scrolled ? "#dc2626" : "rgba(255,200,200,0.9)";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: headerBg,
          backdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
          boxShadow: headerShadow,
          borderBottom: headerBorder,
          transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg,#dc2626,#991b1b)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: scrolled ? "0 4px 16px rgba(220,38,38,0.4)" : "0 4px 20px rgba(0,0,0,0.3)",
              transition: "box-shadow .3s",
            }}>
              {/* blood-drop SVG */}
              <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
                <path d="M10 1C10 1 2 9 2 15a8 8 0 0016 0C18 9 10 1 10 1Z" fill="white" />
                <ellipse cx="7" cy="13" rx="2.5" ry="4" fill="rgba(255,255,255,0.35)" transform="rotate(-15 7 13)" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: textColor, lineHeight: 1, transition: "color .3s" }}>
                {WEBSITE_NAME}
              </div>
              <div style={{ fontSize: 11, color: subTextColor, fontWeight: 500, transition: "color .3s" }}>
                Blood Management System
              </div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  padding: "8px 16px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                  textDecoration: "none",
                  color: isActive(link.path)
                    ? "#dc2626"
                    : (scrolled ? "#374151" : "rgba(255,255,255,0.88)"),
                  background: isActive(link.path)
                    ? (scrolled ? "#fee2e2" : "rgba(255,255,255,0.15)")
                    : "transparent",
                  transition: "all .2s",
                  position: "relative",
                }}
                onMouseEnter={e => {
                  if (!isActive(link.path)) {
                    e.currentTarget.style.background = scrolled ? "#f3f4f6" : "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = scrolled ? "#dc2626" : "#fff";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(link.path)) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = scrolled ? "#374151" : "rgba(255,255,255,0.88)";
                  }
                }}
              >
                {link.name}
              </Link>
            ))}

            {/* Divider */}
            <div style={{ width: 1, height: 24, background: scrolled ? "#e5e7eb" : "rgba(255,255,255,0.25)", margin: "0 8px" }} />

            {/* Auth links */}
            {authLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  padding: link.primary ? "9px 20px" : "8px 16px",
                  borderRadius: 12,
                  fontSize: 14, fontWeight: 700,
                  textDecoration: "none",
                  background: link.primary
                    ? "linear-gradient(135deg,#dc2626,#b91c1c)"
                    : "transparent",
                  color: link.primary
                    ? "#fff"
                    : (isActive(link.path) ? "#dc2626" : (scrolled ? "#374151" : "rgba(255,255,255,0.88)")),
                  boxShadow: link.primary ? "0 4px 16px rgba(220,38,38,0.35)" : "none",
                  border: link.primary ? "none" : "none",
                  transition: "all .25s",
                  marginLeft: link.primary ? 4 : 0,
                }}
                onMouseEnter={e => {
                  if (link.primary) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(220,38,38,0.5)";
                  } else if (!isActive(link.path)) {
                    e.currentTarget.style.background = scrolled ? "#f3f4f6" : "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = scrolled ? "#dc2626" : "#fff";
                  }
                }}
                onMouseLeave={e => {
                  if (link.primary) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(220,38,38,0.35)";
                  } else if (!isActive(link.path)) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = scrolled ? "#374151" : "rgba(255,255,255,0.88)";
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: mobileOpen ? "rgba(220,38,38,0.12)" : "transparent",
              border: "none", cursor: "pointer",
              padding: 8, borderRadius: 10,
              color: scrolled ? "#111" : "#fff",
              transition: "all .2s",
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div style={{
          maxHeight: mobileOpen ? 600 : 0,
          overflow: "hidden",
          transition: "max-height .35s cubic-bezier(.4,0,.2,1)",
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(20px)",
          borderTop: mobileOpen ? "1px solid #fee2e2" : "none",
        }}>
          <div style={{ padding: "16px 24px 24px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  display: "block", padding: "12px 16px", borderRadius: 12,
                  fontWeight: 600, fontSize: 15, textDecoration: "none",
                  color: isActive(link.path) ? "#dc2626" : "#374151",
                  background: isActive(link.path) ? "#fee2e2" : "transparent",
                  borderLeft: isActive(link.path) ? "3px solid #dc2626" : "3px solid transparent",
                  marginBottom: 4,
                  transition: "all .2s",
                }}
              >
                {link.name}
              </Link>
            ))}
            <div style={{ height: 1, background: "#fee2e2", margin: "12px 0" }} />
            {authLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  display: "block", padding: "12px 16px", borderRadius: 12,
                  fontWeight: 700, fontSize: 15, textDecoration: "none",
                  color: link.primary ? "#fff" : (isActive(link.path) ? "#dc2626" : "#374151"),
                  background: link.primary ? "linear-gradient(135deg,#dc2626,#b91c1c)" : (isActive(link.path) ? "#fee2e2" : "transparent"),
                  marginBottom: 6, textAlign: link.primary ? "center" : "left",
                  boxShadow: link.primary ? "0 4px 16px rgba(220,38,38,0.3)" : "none",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}