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
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
  const stats = [
    { icon: Users, label: "Lives Saved", value: "10,000+", from: "#f43f5e", to: "#dc2626" },
    { icon: Heart, label: "Blood Units", value: "50,000+", from: "#dc2626", to: "#9f1239" },
    { icon: MapPin, label: "Partner Hospitals", value: "150+", from: "#f97316", to: "#dc2626" },
    { icon: Clock, label: "Response Time", value: "< 30min", from: "#b91c1c", to: "#f43f5e" },
  ];

  const features = [
    {
      icon: Users,
      title: "Easy Donor Registration",
      description:
        "Simple and secure donor registration process with medical history tracking and eligibility verification.",
    },
    {
      icon: Droplets,
      title: "Real-time Inventory",
      description:
        "Monitor blood inventory levels, expiration dates, and distribution in real-time across all partner facilities.",
    },
    {
      icon: Zap,
      title: "Quick Response",
      description:
        "Emergency request system with automated matching and notification to ensure rapid response in critical situations.",
    },
  ];

  const processSteps = [
    { step: "01", icon: FileText, title: "Register & Screen", description: "Complete simple registration and health screening process" },
    { step: "02", icon: Search, title: "Find Match", description: "Our system matches blood needs with compatible donors" },
    { step: "03", icon: Bell, title: "Get Notified", description: "Receive instant alerts for urgent needs in your area" },
    { step: "04", icon: Activity, title: "Donate & Save Lives", description: "Visit approved centers and make your life-saving donation" },
  ];

  const bloodTypes = [
    { type: "A+", need: "High", donors: "32%" },
    { type: "A-", need: "Critical", donors: "8%" },
    { type: "B+", need: "Medium", donors: "12%" },
    { type: "B-", need: "High", donors: "3%" },
    { type: "O+", need: "High", donors: "35%" },
    { type: "O-", need: "Critical", donors: "5%" },
    { type: "AB+", need: "Low", donors: "4%" },
    { type: "AB-", need: "Medium", donors: "1%" },
  ];

  const donationFacts = [
    { icon: Heart, title: "One Donation, Multiple Lives", description: "A single blood donation can save up to 3 lives. Your one hour can give someone a lifetime.", stat: "3 Lives Saved" },
    { icon: RefreshCw, title: "Blood Regeneration", description: "Your body replaces the blood you donate within 24–48 hours. Red blood cells are fully replaced in 4–6 weeks.", stat: "48 Hours" },
    { icon: Users, title: "Constant Need", description: "Every 2 seconds, someone needs blood. Regular donations ensure continuous supply for emergencies.", stat: "Every 2 Seconds" },
    { icon: AlertTriangle, title: "Short Shelf Life", description: "Red blood cells last only 42 days, platelets just 5 days. Regular donations maintain supply.", stat: "42 Days" },
  ];

  const eligibilityInfo = [
    { icon: CheckCircle, title: "Who Can Donate", items: ["Age 17–75 (16 with parental consent)", "Weight at least 110 lbs (50 kg)", "Good general health", "No flu or cold symptoms"] },
    { icon: Stethoscope, title: "Health Benefits", items: ["Free health screening", "Burns 650 calories per donation", "Reduces risk of heart disease", "Stimulates blood cell production"] },
    { icon: Shield, title: "Safety First", items: ["Sterile, disposable equipment", "Trained medical staff", "Comfortable environment", "Post-donation care"] },
  ];

  const emergencyNeeds = [
    { type: "Accident Victims", units: "Up to 100 units", icon: AlertTriangle },
    { type: "Cancer Patients", units: "8 units weekly", icon: Heart },
    { type: "Surgery Patients", units: "5–10 units", icon: Stethoscope },
    { type: "Burn Victims", units: "20+ units", icon: Activity },
  ];

  const needColor = (need) => {
    if (need === "Critical") return { badge: "bg-red-600 text-white", text: "text-red-400" };
    if (need === "High")     return { badge: "bg-orange-500 text-white", text: "text-orange-400" };
    if (need === "Medium")   return { badge: "bg-yellow-500 text-white", text: "text-yellow-400" };
    return { badge: "bg-emerald-500 text-white", text: "text-emerald-400" };
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#030712" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <Header />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(220,38,38,0.38) 0%, transparent 68%), linear-gradient(180deg,#0a0a0f 0%,#030712 100%)",
        }}
      >
        {/* animated blobs */}
        <div
          className="absolute top-28 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#dc2626,#7f1d1d)", opacity: 0.18, animation: "blobPulse 4s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-36 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#f97316,#dc2626)", opacity: 0.14, animation: "blobPulse 5s ease-in-out infinite 1.2s" }}
        />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />

        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-red-300 text-sm font-semibold mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            Saving Lives Every Day
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6" style={{ letterSpacing: "-0.03em" }}>
            Connect{" "}
            <span style={{ background: "linear-gradient(135deg,#f87171 0%,#dc2626 50%,#f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Blood Donors
            </span>
            <br />with Those in Need
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our advanced blood bank management system ensures efficient donation, storage, and distribution
            of blood products to save lives when every second counts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <button
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300"
                style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 0 30px rgba(220,38,38,0.45)" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 50px rgba(220,38,38,0.65)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 30px rgba(220,38,38,0.45)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/about">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base border border-white/15 text-gray-300 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-300">
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* floating stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 hover:bg-white/10 hover:border-red-500/40 transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 mx-auto" style={{ background: `linear-gradient(135deg,${s.from},${s.to})` }}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-black">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom,transparent,#030712)" }} />
      </section>

      {/* ── BLOOD TYPES ──────────────────────────────────── */}
      <section className="py-24" style={{ background: "#030712" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Live Status</span>
            <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">Current Blood Needs</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Real-time blood type requirements across our network. Your donation matters now more than ever.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {bloodTypes.map((b, i) => {
              const c = needColor(b.need);
              return (
                <div key={i} className="rounded-2xl border border-white/8 bg-gray-900/70 backdrop-blur-sm p-5 text-center hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300">
                  <div className={`text-4xl font-black mb-2 ${c.text}`}>{b.type}</div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badge}`}>{b.need}</span>
                  <div className="text-gray-500 text-xs mt-2">{b.donors} of donors</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY DONATE ───────────────────────────────────── */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#030712,#0a0a0f)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Impact</span>
            <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">Why Your Blood Donation Matters</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Every donation creates a ripple effect of hope and healing in our community.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationFacts.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <div key={i} className="relative rounded-2xl border border-white/8 bg-gray-900/60 p-6 hover:border-red-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{fact.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{fact.description}</p>
                  <div className="text-red-400 font-black text-lg">{fact.stat}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY NEEDS ──────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#7f1d1d,#991b1b 40%,#7c2d12)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%,rgba(255,255,255,.3) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(255,255,255,.2) 0%,transparent 40%)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <span className="text-red-200 text-xs font-bold uppercase tracking-widest">Urgent</span>
            <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4 text-white">Who Needs Your Blood?</h2>
            <p className="text-red-200 max-w-xl mx-auto">Your donation directly impacts patients in critical situations.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {emergencyNeeds.map((need, i) => {
              const Icon = need.icon;
              return (
                <div key={i} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 text-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-1">{need.type}</h3>
                  <p className="text-red-200 text-sm">{need.units}</p>
                </div>
              );
            })}
          </div>
          <div className="max-w-2xl mx-auto rounded-2xl bg-black/25 backdrop-blur-md border border-white/15 p-6 text-center">
            <p className="text-white text-lg mb-2">
              <strong className="text-red-200">47%</strong> of the population is eligible to donate blood, but only <strong className="text-red-200">5%</strong> actually do.
            </p>
            <p className="text-red-200 text-sm">Your single donation can make all the difference.</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-24" style={{ background: "#030712" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Process</span>
            <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Simple steps to become a life-saver. Join thousands of donors making a difference.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative group">
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-px z-0" style={{ background: "linear-gradient(90deg,rgba(220,38,38,0.6),transparent)" }} />
                  )}
                  <div className="relative z-10 rounded-2xl border border-white/8 bg-gray-900/70 p-6 text-center hover:border-red-500/50 hover:-translate-y-2 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black mx-auto mb-4" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)" }}>
                      {step.step}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-white font-bold mb-2 text-sm">{step.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY ──────────────────────────────────── */}
      <section className="py-24" style={{ background: "#0a0a0f" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Eligibility</span>
            <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">Donor Eligibility & Benefits</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Safe, simple, and rewarding — discover the benefits of blood donation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {eligibilityInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="rounded-2xl border border-white/8 bg-gray-900/60 p-6 hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-4">{info.title}</h3>
                  <ul className="space-y-3">
                    {info.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-400 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
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

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#030712" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Platform</span>
            <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">Why Choose Our System?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">A comprehensive platform connecting donors, hospitals, and blood banks for efficient collection and distribution.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="group rounded-2xl border border-white/8 bg-gray-900/60 p-7 hover:border-red-500/50 hover:-translate-y-2 transition-all duration-300 overflow-hidden relative">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.06),transparent)" }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)" }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECURITY ─────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#0a0a0f" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Trust</span>
              <h2 className="text-3xl md:text-4xl font-black mt-2 mb-5">Secure & Compliant</h2>
              <p className="text-gray-400 mb-7 leading-relaxed">Our system meets all healthcare data security standards with end-to-end encryption and strict compliance to protect donor and patient information.</p>
              <ul className="space-y-3">
                {["HIPAA compliant data handling", "End-to-end encryption", "Regular security audits"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-red-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <div className="rounded-3xl border border-white/10 p-8 text-center" style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.1),rgba(153,27,27,0.16))" }}>
                <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <p className="text-white font-bold text-lg">Secure Blood Bank Management</p>
                <p className="text-gray-400 text-sm mt-2">Trusted by 150+ hospitals and healthcare facilities</p>
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%,rgba(220,38,38,0.3) 0%,transparent 70%),linear-gradient(180deg,#030712,#0a0a0f)" }}>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.2) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-red-300 text-sm font-semibold mb-8 backdrop-blur-md">
            <Heart className="w-4 h-4" /> Join 10,000+ lives saved
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ letterSpacing: "-0.03em" }}>Ready to Save Lives?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join our community of donors and healthcare professionals working together to ensure blood is available when and where it's needed most.
          </p>
          <Link to="/login">
            <button
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
              style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 0 40px rgba(220,38,38,0.5)" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 60px rgba(220,38,38,0.7)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 40px rgba(220,38,38,0.5)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Join Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes blobPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
