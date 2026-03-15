"use client"
import Link from "next/link";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUpRight,
} from "lucide-react";

export function Footer() {
  const eventCategories = [
    { label: "Formal Events", href: "/events?category=FORMAL", emoji: "🎓" },
    {
      label: "Informal Events",
      href: "/events?category=INFORMAL",
      emoji: "🎉",
    },
    { label: "Hackathons", href: "/events?category=HACKATHON", emoji: "⚡" },
    {
      label: "Cultural Events",
      href: "/events?category=CULTURAL",
      emoji: "🎭",
    },
    { label: "Sports Events", href: "/events?category=SPORTS", emoji: "🏆" },
    { label: "Workshops", href: "/events?category=WORKSHOP", emoji: "🛠️" },
    { label: "Technical", href: "/events?category=TECHNICAL", emoji: "💻" },
    {
      label: "Literary Events",
      href: "/events?category=LITERARY",
      emoji: "📖",
    },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "All Events", href: "/events" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    // { label: "Register", href: "/login" },
    { label: "Sign In", href: "/login" },
  ];

  const socials = [
    { icon: <Instagram className="w-4 h-4" />, href: "#", label: "Instagram" },
    { icon: <Twitter className="w-4 h-4" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-4 h-4" />, href: "#", label: "LinkedIn" },
    { icon: <Github className="w-4 h-4" />, href: "#", label: "GitHub" },
  ];

  return (
    <>
      <style jsx global>{`
        .footer-link {
          position: relative;
          transition:
            color 0.2s ease,
            padding-left 0.2s ease;
          color: #94a3b8;
        }
        .footer-link:hover {
          color: #f97316;
          padding-left: 6px;
        }
        .social-btn {
          transition:
            background 0.2s ease,
            transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
            color 0.2s ease;
        }
        .social-btn:hover {
          background: #f97316 !important;
          color: #fff !important;
          transform: translateY(-3px) scale(1.1);
        }
        .footer-col-head {
          font-family: "Bebas Neue", sans-serif;
          letter-spacing: 0.08em;
          font-size: 18px;
          color: #fff;
        }
      `}</style>

      <footer
        style={{
          background: "#0a0c12",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* ── Top stripe ── */}
        <div style={{ background: "#f97316", height: "4px", width: "100%" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Brand — 4 cols */}
            <div className="md:col-span-4">
              <Link href="/" className="flex items-center gap-3 mb-5 group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "#fff" }}
                >
                  <GraduationCap
                    className="w-5 h-5"
                    style={{ color: "#0a0c12" }}
                  />
                </div>
                <span
                  className="text-xl font-black text-white tracking-tighter"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  NowOnCampus
                </span>
              </Link>

              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "#64748b", maxWidth: "280px" }}
              >
                Your one-stop platform to discover and participate in all
                college events — from hackathons to cultural fests.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="social-btn w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      color: "#64748b",
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Mini stat pills */}
              <div className="flex flex-wrap gap-2 mt-8">
                {[
                  ["500+", "Events"],
                  ["120+", "Colleges"],
                  ["50k+", "Students"],
                ].map(([val, lbl]) => (
                  <div
                    key={lbl}
                    className="px-3 py-1.5 rounded-full text-xs font-black"
                    style={{
                      background: "rgba(249,115,22,0.12)",
                      color: "#f97316",
                      border: "1px solid rgba(249,115,22,0.2)",
                    }}
                  >
                    {val}{" "}
                    <span style={{ color: "#64748b", fontWeight: 600 }}>
                      {lbl}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Categories — 3 cols */}
            <div className="md:col-span-3">
              <h3 className="footer-col-head mb-5">Categories</h3>
              <ul className="grid grid-cols-1 gap-2">
                {eventCategories.map((cat) => (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      className="footer-link text-sm flex items-center gap-2"
                    >
                      <span>{cat.emoji}</span>
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links — 2 cols */}
            <div className="md:col-span-2">
              <h3 className="footer-col-head mb-5">Quick Links</h3>
              <ul className="flex flex-col gap-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact — 3 cols */}
            <div className="md:col-span-3">
              <h3 className="footer-col-head mb-5">Contact</h3>
              <ul className="flex flex-col gap-4">
                {[
                  {
                    icon: <Mail className="w-4 h-4" />,
                    text: "support@nowoncampus.in",
                  },
                  {
                    icon: <Phone className="w-4 h-4" />,
                    text: "+91 98765 43210",
                  },
                  {
                    icon: <MapPin className="w-4 h-4" />,
                    text: "Campus Central, India",
                  },
                ].map(({ icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(249,115,22,0.12)",
                        color: "#f97316",
                      }}
                    >
                      {icon}
                    </div>
                    <span
                      className="text-sm pt-1.5 leading-tight"
                      style={{ color: "#64748b" }}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/register"
                className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-200"
                style={{ background: "#f97316", color: "#fff" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ea6c0a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 28px rgba(249,115,22,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f97316";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Get Started <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs font-medium" style={{ color: "#334155" }}>
              © {new Date().getFullYear()}{" "}
              <span style={{ color: "#f97316" }}>NowOnCampus</span>. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              {[
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs font-medium transition-colors duration-200"
                  style={{ color: "#334155" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f97316")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#334155")
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
