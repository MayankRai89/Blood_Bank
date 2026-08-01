import {
  ArrowRight,
  Heart,
  Users,
  MapPin,
  Clock,
  Droplets,
  Shield,
  Zap,
  Search,
  Bell,
  FileText,
  CheckCircle,
  Activity,
  RefreshCw,
  AlertTriangle,
  Stethoscope,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ─── SVG Blood Drop Illustration ───────────────────────────── */
function BloodDrop({ size = 180 }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.3)}
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="dropGrad" cx="38%" cy="28%" r="65%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="55%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        <radialGradient id="shineGrad" cx="30%" cy="25%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <path
        d="M50 5 C50 5 10 55 10 80 C10 103 28 120 50 120 C72 120 90 103 90 80 C90 55 50 5 50 5Z"
        fill="url(#dropGrad)"
      />
      <ellipse
        cx="37" cy="55" rx="9" ry="16"
        fill="url(#shineGrad)"
        transform="rotate(-20 37 55)"
      />
    </svg>
  );
}

/* ─── Organic Blob div ───────────────────────────────────────── */
function Blob({ style }) {
  return (
    <div
      style={{
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        ...style,
      }}
    />
  );
}

/* ─── Data ───────────────────────────────────────────────────── */
const STATS = [
  { icon: Users,    value: "10K+",   label: "Lives Saved"       },
  { icon: Heart,    value: "50K+",   label: "Blood Units"       },
  { icon: MapPin,   value: "150+",   label: "Partner Hospitals" },
  { icon: Clock,    value: "<30min", label: "Response Time"     },
];

const BLOOD_TYPES = [
  { type: "A+",  need: "High",     donors: "32%" },
  { type: "A-",  need: "Critical", donors: "8%"  },
  { type: "B+",  need: "Medium",   donors: "12%" },
  { type: "B-",  need: "High",     donors: "3%"  },
  { type: "O+",  need: "High",     donors: "35%" },
  { type: "O-",  need: "Critical", donors: "5%"  },
  { type: "AB+", need: "Low",      donors: "4%"  },
  { type: "AB-", need: "Medium",   donors: "1%"  },
];

const STEPS = [
  { n: "01", icon: FileText, title: "Register & Screen",   desc: "Quick health check and signup" },
  { n: "02", icon: Search,   title: "Find a Match",        desc: "AI matches you with nearby needs" },
  { n: "03", icon: Bell,     title: "Get Notified",        desc: "Instant alerts for urgent calls" },
  { n: "04", icon: Activity, title: "Donate & Save Lives", desc: "Visit a centre and be a hero" },
];

const FACTS = [
  { icon: Heart,         stat: "3 Lives",     title: "Per Donation",   desc: "One donation can save up to 3 lives." },
  { icon: RefreshCw,     stat: "48 hrs",       title: "Regeneration",   desc: "Your body replenishes plasma in 48 hours." },
  { icon: Users,         stat: "Every 2s",     title: "Someone Needs",  desc: "A patient needs blood every 2 seconds." },
  { icon: AlertTriangle, stat: "42 Days",      title: "Shelf Life",     desc: "RBCs expire in 42 days — donate regularly." },
];

const ELIGIBILITY = [
  {
    icon: CheckCircle,
    title: "Who Can Donate",
    items: ["Age 17–75", "Weight ≥ 50 kg", "Good general health", "No fever or cold"],
  },
  {
    icon: Stethoscope,
    title: "Health Benefits",
    items: ["Free health screening", "Burns 650 calories", "Lowers heart-disease risk", "Boosts blood-cell production"],
  },
  {
    icon: Shield,
    title: "100% Safe",
    items: ["Sterile single-use equipment", "Trained medical staff", "Comfortable environment", "Full post-care support"],
  },
];

function needStyle(need) {
  if (need === "Critical") return { dot: "#dc2626", bg: "#fef2f2", text: "#991b1b", ring: "#fca5a5" };
  if (need === "High")     return { dot: "#f97316", bg: "#fff7ed", text: "#9a3412", ring: "#fdba74" };
  if (need === "Medium")   return { dot: "#eab308", bg: "#fefce8", text: "#854d0e", ring: "#fde047" };
  return                          { dot: "#22c55e", bg: "#f0fdf4", text: "#166534", ring: "#86efac" };
}

/* ─── Component ──────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <Header />

      {/* ══════════ HERO ══════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(135deg,#0a0000 0%,#1a0000 35%,#7f1d1d 65%,#dc2626 100%)",
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          paddingTop: 80,
        }}
      >
        {/* Animated blob backgrounds */}
        <Blob style={{
          position: "absolute", width: 600, height: 600,
          background: "rgba(220,38,38,0.18)", top: -100, right: -150,
          filter: "blur(60px)", animation: "blobFloat 7s ease-in-out infinite",
        }} />
        <Blob style={{
          position: "absolute", width: 400, height: 400,
          background: "rgba(159,18,57,0.25)", bottom: -80, left: -80,
          filter: "blur(50px)", animation: "blobFloat 9s ease-in-out infinite reverse",
        }} />

        {/* Dot-grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px", pointerEvents: "none",
        }} />

        {/* Content grid */}
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 60, alignItems: "center", width: "100%",
        }}>

          {/* LEFT — text */}
          <div>
            {/* Live badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999,
              padding: "8px 18px", color: "#fca5a5",
              fontSize: 13, fontWeight: 600, marginBottom: 28,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#f87171", boxShadow: "0 0 8px #f87171",
                animation: "livePing 1.5s ease-in-out infinite",
                display: "inline-block",
              }} />
              Saving Lives Every Day
            </div>

            <h1 style={{
              fontSize: "clamp(2.8rem,5vw,4.5rem)", fontWeight: 900,
              color: "#fff", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 12,
            }}>
              DONATE<br />
              <span style={{
                background: "linear-gradient(90deg,#f87171,#fbbf24)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                BLOOD
              </span>
              <br />TODAY!
            </h1>

            <p style={{
              color: "#fca5a5", fontSize: 14, fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20,
            }}>
              YOU CAN HELP SAVE A LIFE
            </p>

            <p style={{
              color: "rgba(255,255,255,0.7)", fontSize: 16,
              lineHeight: 1.75, maxWidth: 420, marginBottom: 36,
            }}>
              Our advanced blood bank system connects donors with patients in need.
              Register today and become someone's reason to live.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link to="/login">
                <button
                  style={{
                    background: "#fff", color: "#dc2626", fontWeight: 800,
                    fontSize: 15, padding: "14px 32px", borderRadius: 14,
                    border: "none", cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 8,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)", transition: "all .25s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
                  }}
                >
                  Donate Now <ArrowRight size={16} />
                </button>
              </Link>
              <Link to="/about">
                <button
                  style={{
                    background: "transparent", color: "#fff", fontWeight: 700,
                    fontSize: 15, padding: "14px 28px", borderRadius: 14,
                    border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 8,
                    transition: "all .25s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                  }}
                >
                  Learn More <ChevronRight size={16} />
                </button>
              </Link>
            </div>

            {/* Mini stat row */}
            <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
              {STATS.map((s, i) => (
                <div key={i}>
                  <div style={{ color: "#fff", fontWeight: 900, fontSize: 22, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 500, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — illustrated blood drop */}
          <div style={{
            position: "relative", display: "flex",
            justifyContent: "center", alignItems: "center", height: 500,
          }}>
            {/* Glow halo */}
            <div style={{
              position: "absolute", width: 340, height: 340, borderRadius: "50%",
              background: "radial-gradient(circle,rgba(220,38,38,0.5),transparent 70%)",
              filter: "blur(30px)",
            }} />
            {/* Rotating rings */}
            <div style={{
              position: "absolute", width: 380, height: 380, borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.12)",
              animation: "spinSlow 20s linear infinite",
            }} />
            <div style={{
              position: "absolute", width: 310, height: 310, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.07)",
              animation: "spinSlow 15s linear infinite reverse",
            }} />

            {/* Main drop */}
            <div style={{
              position: "relative", zIndex: 2,
              filter: "drop-shadow(0 20px 60px rgba(220,38,38,0.6))",
              animation: "floatY 4s ease-in-out infinite",
            }}>
              <BloodDrop size={210} />
            </div>

            {/* Floating glass chips */}
            <div style={{
              position: "absolute", top: 50, left: 0,
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.25)", borderRadius: 16,
              padding: "12px 18px", color: "#fff", fontSize: 13, fontWeight: 700,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              animation: "floatY 4.5s ease-in-out infinite",
            }}>
              💉 10,000+ Donors
            </div>
            <div style={{
              position: "absolute", bottom: 70, right: 0,
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.25)", borderRadius: 16,
              padding: "12px 18px", color: "#fff", fontSize: 13, fontWeight: 700,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              animation: "floatY 5s ease-in-out infinite 1s",
            }}>
              🏥 150+ Hospitals
            </div>
            <div style={{
              position: "absolute", bottom: 160, left: 10,
              background: "#dc2626", borderRadius: 14,
              padding: "10px 16px", color: "#fff", fontSize: 12, fontWeight: 800,
              animation: "floatY 6s ease-in-out infinite 0.5s",
              boxShadow: "0 4px 20px rgba(220,38,38,0.5)",
            }}>
              ❤️ O- Critical
            </div>
          </div>
        </div>

        {/* Bottom wave into white */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ══════════ STATS BAR ═════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "28px 24px" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16,
        }}>
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "18px 20px", borderRadius: 18,
                background: "linear-gradient(135deg,#fff5f5,#fff)",
                border: "1.5px solid #fee2e2",
                boxShadow: "0 2px 12px rgba(220,38,38,0.08)",
                transition: "all .25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(220,38,38,0.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(220,38,38,0.08)"; }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                  background: "linear-gradient(135deg,#dc2626,#991b1b)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: "#111", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════ BLOOD TYPES ═══════════════════════════════ */}
      <section style={{ background: "#fafafa", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{
              background: "#fee2e2", color: "#dc2626",
              fontSize: 12, fontWeight: 700, padding: "6px 16px",
              borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Live Status
            </span>
            <h2 style={{
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900,
              color: "#111", marginTop: 16, marginBottom: 10, letterSpacing: "-0.02em",
            }}>
              Current Blood Needs
            </h2>
            <p style={{ color: "#6b7280", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
              Real-time requirements across our network — your donation matters right now.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {BLOOD_TYPES.map((b, i) => {
              const s = needStyle(b.need);
              return (
                <div key={i}
                  style={{
                    background: "#fff", borderRadius: 20, padding: "24px 16px",
                    textAlign: "center", border: `2px solid ${s.ring}`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)", transition: "all .25s", cursor: "default",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-7px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)"; }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: s.bg, border: `2px solid ${s.ring}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px",
                  }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: s.dot }}>{b.type}</span>
                  </div>
                  <span style={{
                    background: s.bg, color: s.text,
                    fontSize: 11, fontWeight: 700, padding: "4px 12px",
                    borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>
                    {b.need}
                  </span>
                  <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 8, fontWeight: 500 }}>
                    {b.donors} of donors
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg,#7f1d1d,#dc2626)",
        padding: "88px 24px", position: "relative", overflow: "hidden",
      }}>
        <Blob style={{
          position: "absolute", width: 500, height: 500,
          background: "rgba(0,0,0,0.15)", top: -100, right: -100, filter: "blur(60px)",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{
              background: "rgba(255,255,255,0.2)", color: "#fff",
              fontSize: 12, fontWeight: 700, padding: "6px 16px",
              borderRadius: 999, letterSpacing: "0.1em",
            }}>
              PROCESS
            </span>
            <h2 style={{
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900,
              color: "#fff", marginTop: 16, marginBottom: 10, letterSpacing: "-0.02em",
            }}>
              How It Works
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 440, margin: "0 auto" }}>
              Four simple steps to become a life-saver.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i}
                  style={{
                    background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.25)", borderRadius: 24,
                    padding: "28px 20px", textAlign: "center", transition: "all .3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.22)"; e.currentTarget.style.transform = "translateY(-7px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: "rgba(255,255,255,0.9)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px",
                  }}>
                    <Icon size={22} color="#dc2626" />
                  </div>
                  <div style={{
                    fontWeight: 900, fontSize: 34, color: "rgba(255,255,255,0.15)",
                    lineHeight: 1, marginBottom: 8,
                  }}>
                    {step.n}
                  </div>
                  <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ WHY DONATE ════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{
              background: "#fee2e2", color: "#dc2626",
              fontSize: 12, fontWeight: 700, padding: "6px 16px",
              borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Impact
            </span>
            <h2 style={{
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900,
              color: "#111", marginTop: 16, marginBottom: 10, letterSpacing: "-0.02em",
            }}>
              Why Your Donation Matters
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {FACTS.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i}
                  style={{
                    borderRadius: 24, overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                    border: "1.5px solid #fee2e2", transition: "all .3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-7px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(220,38,38,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)"; }}
                >
                  {/* Red top half */}
                  <div style={{
                    background: "linear-gradient(135deg,#dc2626,#991b1b)",
                    padding: "28px 20px", textAlign: "center",
                  }}>
                    <Icon size={30} color="rgba(255,255,255,0.85)" />
                    <div style={{
                      color: "#fff", fontWeight: 900, fontSize: 30,
                      marginTop: 10, lineHeight: 1,
                    }}>
                      {f.stat}
                    </div>
                  </div>
                  {/* White bottom half */}
                  <div style={{ background: "#fff", padding: "20px" }}>
                    <h3 style={{ fontWeight: 800, color: "#111", fontSize: 15, marginBottom: 6 }}>{f.title}</h3>
                    <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ ELIGIBILITY ═══════════════════════════════ */}
      <section style={{ background: "#fafafa", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{
              background: "#fee2e2", color: "#dc2626",
              fontSize: 12, fontWeight: 700, padding: "6px 16px",
              borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Eligibility
            </span>
            <h2 style={{
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900,
              color: "#111", marginTop: 16, marginBottom: 10, letterSpacing: "-0.02em",
            }}>
              Donor Eligibility &amp; Benefits
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {ELIGIBILITY.map((el, i) => {
              const Icon = el.icon;
              return (
                <div key={i}
                  style={{
                    background: "#fff", borderRadius: 24, padding: "32px 28px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    border: "1.5px solid #fee2e2", transition: "all .3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-7px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(220,38,38,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)"; }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: "linear-gradient(135deg,#dc2626,#991b1b)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 18,
                  }}>
                    <Icon size={24} color="#fff" />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, color: "#111", marginBottom: 18 }}>{el.title}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {el.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151" }}>
                        <span style={{
                          width: 20, height: 20, borderRadius: "50%",
                          background: "#fee2e2", display: "inline-flex",
                          alignItems: "center", justifyContent: "center",
                          flexShrink: 0, marginTop: 1,
                        }}>
                          <CheckCircle size={12} color="#dc2626" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg,#0a0000,#7f1d1d,#dc2626)",
        padding: "96px 24px", position: "relative", overflow: "hidden",
      }}>
        <Blob style={{
          position: "absolute", width: 500, height: 500,
          background: "rgba(255,255,255,0.05)", top: -100, left: -100, filter: "blur(60px)",
        }} />
        <Blob style={{
          position: "absolute", width: 400, height: 400,
          background: "rgba(0,0,0,0.2)", bottom: -80, right: -80, filter: "blur(50px)",
        }} />

        {/* Decorative floating drops */}
        <div style={{
          position: "absolute", top: 24, right: 80, opacity: 0.14,
          animation: "floatY 5s ease-in-out infinite",
        }}>
          <BloodDrop size={120} />
        </div>
        <div style={{
          position: "absolute", bottom: 16, left: 60, opacity: 0.09,
          animation: "floatY 7s ease-in-out infinite reverse",
        }}>
          <BloodDrop size={80} />
        </div>

        <div style={{
          maxWidth: 700, margin: "0 auto",
          textAlign: "center", position: "relative", zIndex: 1,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)",
            border: "2px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}>
            <Heart size={36} color="#fff" />
          </div>

          <h2 style={{
            fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900,
            color: "#fff", marginBottom: 16, letterSpacing: "-0.03em",
          }}>
            Ready to Save a Life?
          </h2>

          <p style={{
            color: "rgba(255,255,255,0.75)", fontSize: 17,
            lineHeight: 1.7, maxWidth: 480, margin: "0 auto 36px",
          }}>
            Join 10,000+ heroes who have already made a difference.
            One donation — three lives saved.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link to="/login">
              <button
                style={{
                  background: "#fff", color: "#dc2626", fontWeight: 800,
                  fontSize: 16, padding: "16px 36px", borderRadius: 16,
                  border: "none", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 8,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)", transition: "all .25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)"; }}
              >
                Join Today <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/about">
              <button
                style={{
                  background: "transparent", color: "#fff", fontWeight: 700,
                  fontSize: 16, padding: "16px 28px", borderRadius: 16,
                  border: "2px solid rgba(255,255,255,0.5)", cursor: "pointer",
                  transition: "all .25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Keyframe animations */}
      <style>{`
        @keyframes blobFloat {
          0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translateY(0) scale(1); }
          50%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translateY(-22px) scale(1.05); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-18px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes livePing {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.8); opacity: 0.3; }
        }
        @media (max-width: 900px) {
          /* hero two-col => single col */
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          /* 4-col grids => 2-col */
          section > div[style*="repeat(4,1fr)"] {
            grid-template-columns: repeat(2,1fr) !important;
          }
          /* 3-col grids => 1-col */
          section > div[style*="repeat(3,1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 550px) {
          section > div[style*="repeat(2,1fr)"] {
            grid-template-columns: 1fr !important;
          }
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
