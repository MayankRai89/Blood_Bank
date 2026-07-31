import React, { useState } from "react";
import {
  Phone, Mail, MapPin, Send, User,
  MessageSquare, Globe, Instagram, Facebook, Linkedin,
  Clock, Heart, ArrowRight,
} from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";

/* ── data ─────────────────────────────────────────────────────── */
const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Emergency Helpline",
    lines: ["+91 12345 67890", "Available 24/7"],
    color: "#dc2626",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@BloodDonor.org", "info@BloodDonor.org"],
    color: "#be123c",
  },
  {
    icon: MapPin,
    title: "Head Office",
    lines: ["Jabalpur, Madhya Pradesh", "India — 482003"],
    color: "#9f1239",
  },
];

const SOCIAL = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook,  label: "Facebook"  },
  { icon: Linkedin,  label: "LinkedIn"  },
  { icon: Globe,     label: "Website"   },
];

/* ── component ────────────────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  /* shared input style */
  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    padding: "13px 16px 13px 44px",
    borderRadius: 12, border: "1.5px solid #e5e7eb",
    fontSize: 14, outline: "none", transition: "border .2s, box-shadow .2s",
    fontFamily: "inherit",
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <Header />

      {/* ══════════ HERO ══════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg,#0a0000 0%,#1a0000 35%,#7f1d1d 65%,#dc2626 100%)",
        minHeight: "50vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden", paddingTop: 72,
      }}>
        {/* blobs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%", background: "rgba(220,38,38,0.2)", top: -100, right: -80, filter: "blur(60px)", animation: "blobFloat 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "72px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "8px 20px", color: "#fca5a5", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f87171", boxShadow: "0 0 8px #f87171", display: "inline-block", animation: "livePing 1.5s ease-in-out infinite" }} />
            We're Here to Help
          </div>
          <h1 style={{ fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, color: "#fff", marginBottom: 16, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Get in{" "}
            <span style={{ background: "linear-gradient(90deg,#f87171,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Touch
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            We're here to support you. Reach out for any help, queries, or blood-related assistance — we respond within 24 hours.
          </p>
        </div>

        {/* wave */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70 }}>
            <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ══════════ CONTACT CARDS ═════════════════════════════ */}
      <section style={{ background: "#fff", padding: "20px 24px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {CONTACT_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i}
                style={{ borderRadius: 22, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1.5px solid #fee2e2", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(220,38,38,0.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)"; }}>
                <div style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)", padding: "24px 20px", textAlign: "center" }}>
                  <Icon size={30} color="rgba(255,255,255,0.9)" />
                </div>
                <div style={{ background: "#fff", padding: "20px", textAlign: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#111", marginBottom: 8 }}>{card.title}</div>
                  {card.lines.map((l, j) => (
                    <div key={j} style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>{l}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════ FORM + INFO ═══════════════════════════════ */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "start" }}>

          {/* Left — info */}
          <div>
            <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase" }}>Contact</span>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 900, color: "#111", marginTop: 14, marginBottom: 14, letterSpacing: "-0.02em" }}>
              Send Us a Message
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.75, marginBottom: 28 }}>
              Have questions about blood donation, camp organisation, or need support? We're always ready to help.
            </p>

            {/* Info items */}
            {[
              { icon: Phone,  text: "+91 12345 67890"        },
              { icon: Mail,   text: "support@BloodDonor.org" },
              { icon: MapPin, text: "Jabalpur, Madhya Pradesh"},
              { icon: Clock,  text: "Mon – Sat, 9 AM – 8 PM" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color="#dc2626" />
                  </div>
                  <span style={{ color: "#374151", fontWeight: 600, fontSize: 14 }}>{item.text}</span>
                </div>
              );
            })}

            {/* Social icons */}
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              {SOCIAL.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i}
                    style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", border: "1.5px solid #fee2e2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .25s", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.querySelector("svg").style.color = "#fff"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#fee2e2"; e.currentTarget.querySelector("svg").style.color = "#dc2626"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <Icon size={18} color="#dc2626" style={{ transition: "color .25s" }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 28, padding: "36px 32px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1.5px solid #fee2e2", display: "flex", flexDirection: "column", gap: 20 }}>

            {sent && (
              <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 12, padding: "14px 18px", color: "#166534", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                ✅ Message sent! We'll get back to you soon.
              </div>
            )}

            {[
              { label: "Full Name",     name: "name",    type: "text",  icon: User,          placeholder: "Enter your name"    },
              { label: "Email Address", name: "email",   type: "email", icon: Mail,          placeholder: "Enter your email"   },
              { label: "Phone Number",  name: "phone",   type: "text",  icon: Phone,         placeholder: "Enter phone number" },
            ].map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.name}>
                  <label style={{ fontWeight: 700, fontSize: 13, color: "#374151", display: "block", marginBottom: 7 }}>{field.label}</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>
                      <Icon size={16} />
                    </div>
                    <input
                      type={field.type} name={field.name}
                      value={form[field.name]} onChange={handleChange}
                      placeholder={field.placeholder}
                      style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.1)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Message */}
            <div>
              <label style={{ fontWeight: 700, fontSize: 13, color: "#374151", display: "block", marginBottom: 7 }}>Message</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 14, top: 15, color: "#9ca3af" }}>
                  <MessageSquare size={16} />
                </div>
                <textarea
                  name="message" rows={4}
                  value={form.message} onChange={handleChange}
                  placeholder="Write your message here..."
                  style={{ ...inputStyle, paddingTop: 13, paddingBottom: 13, resize: "vertical", verticalAlign: "top" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.1)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            <button type="submit"
              style={{ width: "100%", background: "linear-gradient(135deg,#dc2626,#991b1b)", color: "#fff", fontWeight: 800, fontSize: 15, padding: "14px", borderRadius: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 6px 20px rgba(220,38,38,0.35)", transition: "all .25s", fontFamily: "inherit" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(220,38,38,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(220,38,38,0.35)"; }}>
              <Send size={17} /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ══════════ MAP ═══════════════════════════════════════ */}
      <section style={{ position: "relative" }}>
        <div style={{ borderTop: "4px solid #dc2626" }}>
          <iframe
            title="map"
            style={{ width: "100%", height: 380, display: "block", border: "none" }}
            src="https://maps.google.com/maps?q=Navi%20Jabalpur&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
          />
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes blobFloat {
          0%,100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; transform: translateY(0) scale(1); }
          50%      { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; transform: translateY(-20px) scale(1.05); }
        }
        @keyframes livePing {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.8); opacity: 0.3; }
        }
        @media (max-width: 900px) {
          section > div[style*="repeat(3,1fr)"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
