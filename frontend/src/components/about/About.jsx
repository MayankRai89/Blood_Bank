import React from "react";
import {
  Heart, Users, Shield, Award, Target, Droplet,
  Clock, MapPin, Phone, Mail, Globe, CheckCircle, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

/* ── data ─────────────────────────────────────────────────────── */
const STATS = [
  { icon: Users,   number: "50,000+",  label: "Lives Saved"      },
  { icon: Droplet, number: "100,000+", label: "Donations"         },
  { icon: MapPin,  number: "500+",     label: "Camps Organized"   },
  { icon: Shield,  number: "99.8%",    label: "Safety Rate"       },
];

const VALUES = [
  { icon: Heart,  title: "Compassion", description: "We believe in the power of human kindness and the impact one person can make in saving lives." },
  { icon: Shield, title: "Safety First", description: "Every donation follows strict medical protocols ensuring donor safety and blood quality." },
  { icon: Users,  title: "Community", description: "Building strong communities where people help each other in times of critical need." },
  { icon: Target, title: "Excellence", description: "Committed to the highest standards in blood collection, processing, and distribution." },
];

const TEAM = [
  { name: "Dr. Sarah Chen",       role: "Medical Director",   image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face", bio: "15+ years in hematology and transfusion medicine" },
  { name: "Michael Rodriguez",    role: "Operations Head",    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", bio: "Expert in healthcare logistics and camp management" },
  { name: "Priya Sharma",         role: "Community Manager",  image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face", bio: "Dedicated to building donor relationships and awareness" },
  { name: "David Kim",            role: "Technology Lead",    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", bio: "Ensuring a seamless digital experience for all users" },
];

const MISSION_POINTS = [
  { icon: Clock,  text: "24/7 Emergency Blood Availability" },
  { icon: Shield, text: "100% Safe & Verified Donors"       },
  { icon: MapPin, text: "Nationwide Network Coverage"       },
];

/* ── component ────────────────────────────────────────────────── */
export default function AboutUs() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <Header />

      {/* ══════════ HERO ══════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg,#0a0000 0%,#1a0000 35%,#7f1d1d 65%,#dc2626 100%)",
        minHeight: "60vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden", paddingTop: 72,
      }}>
        {/* blobs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", background: "rgba(220,38,38,0.2)", top: -120, right: -100, filter: "blur(60px)", animation: "blobFloat 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "40% 60% 70% 30% / 50% 60% 30% 60%", background: "rgba(159,18,57,0.2)", bottom: -80, left: -60, filter: "blur(50px)", animation: "blobFloat 9s ease-in-out infinite reverse" }} />
        {/* dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "8px 20px", color: "#fca5a5", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f87171", boxShadow: "0 0 8px #f87171", display: "inline-block", animation: "livePing 1.5s ease-in-out infinite" }} />
            Our Story
          </div>
          <h1 style={{ fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, color: "#fff", marginBottom: 18, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Saving Lives,{" "}
            <span style={{ background: "linear-gradient(90deg,#f87171,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              One Drop
            </span>{" "}
            at a Time
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, lineHeight: 1.7, maxWidth: 620, margin: "0 auto 36px" }}>
            We are a dedicated platform connecting blood donors with those in need — making donation accessible, safe, and impactful across India.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register/donor">
              <button style={{ background: "#fff", color: "#dc2626", fontWeight: 800, fontSize: 15, padding: "13px 30px", borderRadius: 14, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 8px 28px rgba(0,0,0,0.3)", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.3)"; }}>
                Join Our Mission <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/contact">
              <button style={{ background: "transparent", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 26px", borderRadius: 14, border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* wave */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70 }}>
            <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ══════════ STATS BAR ═════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "20px 24px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", borderRadius: 18, background: "linear-gradient(135deg,#fff5f5,#fff)", border: "1.5px solid #fee2e2", boxShadow: "0 2px 12px rgba(220,38,38,0.07)", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(220,38,38,0.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(220,38,38,0.07)"; }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg,#dc2626,#991b1b)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: "#111", lineHeight: 1 }}>{s.number}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════ MISSION & VISION ══════════════════════════ */}
      <section style={{ background: "#fafafa", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}>
          {/* Mission */}
          <div>
            <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase" }}>Our Mission</span>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, color: "#111", marginTop: 14, marginBottom: 16, letterSpacing: "-0.02em" }}>
              A World Where No One Dies Waiting for Blood
            </h2>
            <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.75, marginBottom: 28 }}>
              We bridge the gap between voluntary blood donors and patients, ensuring timely access to safe blood when it's needed most — any time, anywhere.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {MISSION_POINTS.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={18} color="#dc2626" />
                    </div>
                    <span style={{ color: "#374151", fontWeight: 600, fontSize: 15 }}>{pt.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Vision */}
          <div style={{ background: "#fff", borderRadius: 28, padding: "36px 32px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1.5px solid #fee2e2" }}>
            <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase" }}>Our Vision</span>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#111", marginTop: 14, marginBottom: 14, letterSpacing: "-0.02em" }}>
              Hassle-Free Transfusion for Every Patient
            </h3>
            <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>
              We envision a future supported by a robust network of committed donors and advanced technology — where blood is always available when needed.
            </p>
            <div style={{ background: "linear-gradient(135deg,#fff5f5,#fff)", border: "1.5px solid #fee2e2", borderRadius: 18, padding: "20px 22px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg,#dc2626,#991b1b)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Award size={22} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#111", marginBottom: 4 }}>Quality Promise</div>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  Every unit goes through 12 rigorous quality checks to ensure maximum safety for both donors and recipients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ VALUES ════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#7f1d1d,#dc2626)", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%", background: "rgba(0,0,0,0.15)", top: -80, right: -60, filter: "blur(50px)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "6px 16px", borderRadius: 999, letterSpacing: "0.1em" }}>OUR VALUES</span>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900, color: "#fff", marginTop: 16, marginBottom: 10, letterSpacing: "-0.02em" }}>What We Stand For</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 460, margin: "0 auto" }}>These core principles guide everything we do and define who we are.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i}
                  style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 24, padding: "28px 22px", textAlign: "center", transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.22)"; e.currentTarget.style.transform = "translateY(-7px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Icon size={26} color="#dc2626" />
                  </div>
                  <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 17, marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.65 }}>{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ TEAM ══════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: 12, fontWeight: 700, padding: "6px 16px", borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase" }}>The Team</span>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900, color: "#111", marginTop: 16, marginBottom: 10, letterSpacing: "-0.02em" }}>Meet Our Team</h2>
            <p style={{ color: "#6b7280", maxWidth: 460, margin: "0 auto" }}>Passionate professionals dedicated to making a difference in healthcare.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {TEAM.map((m, i) => (
              <div key={i}
                style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1.5px solid #fee2e2", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-7px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(220,38,38,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)"; }}>
                <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                  <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.4),transparent)" }} />
                </div>
                <div style={{ padding: "20px 20px 22px" }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#111" }}>{m.name}</div>
                  <div style={{ color: "#dc2626", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>{m.role}</div>
                  <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.55, margin: 0 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ═══════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#0a0000,#7f1d1d,#dc2626)", padding: "88px 24px", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%", background: "rgba(255,255,255,0.05)", top: -100, left: -100, filter: "blur(60px)" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Heart size={32} color="#fff" />
          </div>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-0.03em" }}>
            Ready to Make a Difference?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 36px" }}>
            Join thousands of heroes saving lives through blood donation. Your single donation can save up to 3 lives.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register/donor">
              <button style={{ background: "#fff", color: "#dc2626", fontWeight: 800, fontSize: 15, padding: "14px 32px", borderRadius: 14, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 8px 28px rgba(0,0,0,0.3)", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.3)"; }}>
                Become a Donor <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/contact">
              <button style={{ background: "transparent", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 14, border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                Organize a Camp
              </button>
            </Link>
          </div>
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
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}