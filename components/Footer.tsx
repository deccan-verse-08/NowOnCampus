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

const eventCategories = [
  { label: "Formal Events", href: "/events?category=FORMAL", code: "01" },
  { label: "Informal Events", href: "/events?category=INFORMAL", code: "02" },
  { label: "Hackathons", href: "/events?category=HACKATHON", code: "03" },
  { label: "Cultural Events", href: "/events?category=CULTURAL", code: "04" },
  { label: "Sports Events", href: "/events?category=SPORTS", code: "05" },
  { label: "Workshops", href: "/events?category=WORKSHOP", code: "06" },
  { label: "Technical Events", href: "/events?category=TECHNICAL", code: "07" },
  { label: "Literary Events", href: "/events?category=LITERARY", code: "08" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Events", href: "/events" },
  { label: "Register", href: "/register" },
  { label: "Sign In", href: "/login" },
];

const socials = [
  { icon: Instagram, href: "#", label: "IG" },
  { icon: Twitter, href: "#", label: "TW" },
  { icon: Linkedin, href: "#", label: "LI" },
  { icon: Github, href: "#", label: "GH" },
];

export function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Syne:wght@400;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

        .footer-root {
          position: relative;
          background: #020810;
          overflow: hidden;
          font-family: 'Syne', sans-serif;
          border-top: 1px solid rgba(0,255,200,0.12);
        }

        /* Animated top beam */
        .footer-beam {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #00ffc8 25%, #00aaff 50%, #bf80ff 75%, transparent 100%);
          background-size: 300% 100%;
          animation: beamSlide 6s linear infinite;
        }

        @keyframes beamSlide {
          0% { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }

        /* Background grid */
        .footer-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,255,200,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,200,0.018) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        /* Radial fade over grid */
        .footer-grid-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 100% 80% at 50% 100%, #020810 40%, transparent 100%);
        }

        /* Background orbs */
        .footer-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }

        .footer-orb-1 {
          width: 500px; height: 350px;
          background: radial-gradient(ellipse, rgba(0,255,200,0.05), transparent 70%);
          bottom: -100px; left: -100px;
        }

        .footer-orb-2 {
          width: 400px; height: 300px;
          background: radial-gradient(ellipse, rgba(0,170,255,0.04), transparent 70%);
          top: 0; right: -80px;
        }

        /* ── BIG WORDMARK STRIP ── */
        .footer-wordmark {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(3.5rem, 12vw, 9rem);
          letter-spacing: -0.02em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,255,200,0.12);
          user-select: none;
          white-space: nowrap;
          line-height: 1;
          display: block;
          text-align: center;
          padding: 40px 0 0;
          position: relative;
        }

        /* ── MAIN GRID ── */
        .footer-main {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 64px 32px 0;
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.4fr;
          gap: 48px;
          border-bottom: 1px solid rgba(0,255,200,0.08);
          padding-bottom: 56px;
        }

        @media (max-width: 1024px) {
          .footer-main { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 640px) {
          .footer-main { grid-template-columns: 1fr; }
        }

        /* ── BRAND COLUMN ── */
        .footer-logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .footer-logo-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, rgba(0,255,200,0.12), rgba(0,170,255,0.12));
          border: 1px solid rgba(0,255,200,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          position: relative;
          animation: iconPulse 4s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(0,255,200,0.2); }
          50% { box-shadow: 0 0 24px rgba(0,255,200,0.4), 0 0 48px rgba(0,170,255,0.15); }
        }

        .footer-logo-name {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 1rem;
          letter-spacing: 0.08em;
          background: linear-gradient(90deg, #00ffc8, #00aaff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-brand-desc {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          line-height: 1.8;
          color: rgba(150,190,230,0.45);
          margin-bottom: 28px;
          max-width: 280px;
        }

        /* Status indicator */
        .footer-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(0,255,200,0.6);
          border: 1px solid rgba(0,255,200,0.15);
          background: rgba(0,255,200,0.04);
          padding: 5px 12px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          margin-bottom: 24px;
        }

        .status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #00ffc8;
          box-shadow: 0 0 6px #00ffc8;
          animation: statusBlink 2s ease-in-out infinite;
        }

        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Social icons */
        .footer-socials {
          display: flex;
          gap: 8px;
        }

        .social-btn {
          width: 36px; height: 36px;
          border: 1px solid rgba(0,255,200,0.18);
          background: rgba(0,255,200,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          color: rgba(150,190,230,0.5);
          transition: all 0.2s;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
        }

        .social-btn:hover {
          border-color: rgba(0,255,200,0.5);
          background: rgba(0,255,200,0.1);
          color: #00ffc8;
          box-shadow: 0 0 16px rgba(0,255,200,0.2);
        }

        /* ── COLUMN HEADERS ── */
        .footer-col-header {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(0,255,200,0.5);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-col-header::before {
          content: '';
          display: block;
          width: 20px; height: 1px;
          background: rgba(0,255,200,0.4);
          box-shadow: 0 0 6px rgba(0,255,200,0.3);
          flex-shrink: 0;
        }

        /* ── LINKS ── */
        .footer-link-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          text-decoration: none;
          transition: all 0.2s;
          group: true;
        }

        .footer-link-item:last-child {
          border-bottom: none;
        }

        .link-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          color: rgba(0,255,200,0.25);
          letter-spacing: 0.05em;
          flex-shrink: 0;
          transition: color 0.2s;
        }

        .link-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.82rem;
          color: rgba(180,210,240,0.5);
          transition: color 0.2s;
          flex: 1;
        }

        .link-arrow {
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.2s;
          color: #00ffc8;
        }

        .footer-link-item:hover .link-code { color: rgba(0,255,200,0.6); }
        .footer-link-item:hover .link-label { color: #fff; }
        .footer-link-item:hover .link-arrow { opacity: 1; transform: translateX(0); }

        /* ── CONTACT ── */
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }

        .contact-item:last-child { border-bottom: none; }

        .contact-icon-wrap {
          width: 28px; height: 28px;
          border: 1px solid rgba(0,255,200,0.2);
          background: rgba(0,255,200,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }

        .contact-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          color: rgba(150,190,230,0.45);
          line-height: 1.5;
          letter-spacing: 0.02em;
        }

        /* ── BOTTOM BAR ── */
        .footer-bottom {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-copyright {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: rgba(150,190,230,0.25);
          letter-spacing: 0.08em;
        }

        .footer-copyright span {
          color: rgba(0,255,200,0.4);
        }

        .footer-legal-links {
          display: flex;
          gap: 24px;
        }

        .footer-legal-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(150,190,230,0.25);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-legal-link:hover { color: rgba(0,255,200,0.6); }

        /* Coordinate display */
        .footer-coords {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          color: rgba(0,255,200,0.2);
          letter-spacing: 0.1em;
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-beam" />
        <div className="footer-grid-bg" />
        <div className="footer-orb footer-orb-1" />
        <div className="footer-orb footer-orb-2" />

        {/* Giant ghost wordmark */}
        <div className="footer-wordmark" aria-hidden="true">
          NOWONCAMPUS
        </div>

        {/* Main grid */}
        <div className="footer-main">
          {/* Brand */}
          <div>
            <div className="footer-logo-wrap">
              <div className="footer-logo-icon">
                <GraduationCap
                  style={{ width: 22, height: 22, color: "#00ffc8" }}
                />
              </div>
              <span className="footer-logo-name">NowOnCampus</span>
            </div>

            <div className="footer-status">
              <span className="status-dot" />
              All Systems Operational
            </div>

            <p className="footer-brand-desc">
              Your one-stop platform to discover and participate in all college
              events — hackathons, cultural fests, seminars, and more.
            </p>

            <div className="footer-socials">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="social-btn"
                  aria-label={label}
                >
                  <Icon style={{ width: 14, height: 14 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Event Categories */}
          <div>
            <div className="footer-col-header">Categories</div>
            <div>
              {eventCategories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="footer-link-item"
                >
                  <span className="link-code">{cat.code}</span>
                  <span className="link-label">{cat.label}</span>
                  <ArrowUpRight
                    className="link-arrow"
                    style={{ width: 12, height: 12 }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-col-header">Navigation</div>
            <div>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link-item"
                >
                  <span className="link-label">{link.label}</span>
                  <ArrowUpRight
                    className="link-arrow"
                    style={{ width: 12, height: 12 }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-header">Contact</div>
            <div>
              <div className="contact-item">
                <div className="contact-icon-wrap">
                  <Mail style={{ width: 12, height: 12, color: "#00ffc8" }} />
                </div>
                <span className="contact-text">support@nowoncampus.in</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrap">
                  <Phone style={{ width: 12, height: 12, color: "#00aaff" }} />
                </div>
                <span className="contact-text">+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrap">
                  <MapPin style={{ width: 12, height: 12, color: "#bf80ff" }} />
                </div>
                <span className="contact-text">Campus Central, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © <span>{new Date().getFullYear()}</span> NowOnCampus // All rights
            reserved
          </p>
          <div className="footer-coords">LAT 20.5937° N // LNG 78.9629° E</div>
          <div className="footer-legal-links">
            <Link href="/privacy" className="footer-legal-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-legal-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
