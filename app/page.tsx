import Link from "next/link";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { EventCard } from "@/components/EventCard";
import {
  ArrowRight,
  Zap,
  Users,
  Calendar,
  Trophy,
  BookOpen,
  Music,
  Dumbbell,
  Cpu,
  PenTool,
  Star,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    label: "Formal Events",
    value: "FORMAL",
    icon: BookOpen,
    accent: "#00ffc8",
    glyph: "F",
  },
  {
    label: "Informal Events",
    value: "INFORMAL",
    icon: Star,
    accent: "#bf80ff",
    glyph: "I",
  },
  {
    label: "Hackathons",
    value: "HACKATHON",
    icon: Zap,
    accent: "#ffaa00",
    glyph: "H",
  },
  {
    label: "Cultural Events",
    value: "CULTURAL",
    icon: Music,
    accent: "#ff5599",
    glyph: "C",
  },
  {
    label: "Sports Events",
    value: "SPORTS",
    icon: Dumbbell,
    accent: "#44ff88",
    glyph: "S",
  },
  {
    label: "Workshops",
    value: "WORKSHOP",
    icon: PenTool,
    accent: "#00ddff",
    glyph: "W",
  },
  {
    label: "Technical Events",
    value: "TECHNICAL",
    icon: Cpu,
    accent: "#ff6644",
    glyph: "T",
  },
  {
    label: "Literary Events",
    value: "LITERARY",
    icon: BookOpen,
    accent: "#ffdd44",
    glyph: "L",
  },
];

const stats = [
  { label: "Events Hosted", value: "500+", icon: Calendar, accent: "#00ffc8" },
  {
    label: "Students Participated",
    value: "10K+",
    icon: Users,
    accent: "#00aaff",
  },
  {
    label: "Prize Money Awarded",
    value: "₹50L+",
    icon: Trophy,
    accent: "#ffaa00",
  },
];

async function getFeaturedEvents() {
  try {
    return await prisma.event.findMany({
      where: { isFeatured: true, status: { not: "CANCELLED" } },
      orderBy: { date: "asc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

async function getUpcomingEvents() {
  try {
    return await prisma.event.findMany({
      where: { status: "UPCOMING" },
      orderBy: { date: "asc" },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [session, featuredEvents, upcomingEvents] = await Promise.all([
    auth(),
    getFeaturedEvents(),
    getUpcomingEvents(),
  ]);
  const displayEvents =
    featuredEvents.length > 0 ? featuredEvents : upcomingEvents;
  const isFeatured = featuredEvents.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          --cyan: #00ffc8;
          --blue: #00aaff;
          --dark: #020810;
          --dark2: #060f1e;
          --dark3: #0a1628;
          --border: rgba(0,255,200,0.12);
        }

        .home-root {
          background: var(--dark);
          min-height: 100vh;
          font-family: 'Syne', sans-serif;
          color: rgba(200,230,255,0.85);
          overflow-x: hidden;
        }

        /* ─── GRID OVERLAY ─── */
        .grid-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(0,255,200,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,200,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .grid-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,255,200,0.04), transparent 70%),
                      radial-gradient(ellipse 60% 80% at 100% 50%, rgba(0,170,255,0.03), transparent 60%);
        }

        /* ─── HERO ─── */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 60px;
          overflow: hidden;
        }

        .hero-video-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-video-wrap video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.18;
          filter: saturate(0.3) brightness(0.8);
        }

        /* layered dark vignette */
        .hero-video-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, var(--dark) 0%, transparent 20%, transparent 70%, var(--dark) 100%),
            linear-gradient(90deg, var(--dark) 0%, transparent 30%, transparent 70%, var(--dark) 100%);
        }

        /* Animated horizontal scan line */
        .hero-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,255,200,0.4), transparent);
          animation: scanDown 8s linear infinite;
          z-index: 2;
          pointer-events: none;
        }

        @keyframes scanDown {
          0% { top: -2px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* Floating orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,255,200,0.08), transparent 70%);
          top: -100px; left: -150px;
          animation: orbFloat1 12s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0,170,255,0.07), transparent 70%);
          bottom: 0; right: -100px;
          animation: orbFloat2 15s ease-in-out infinite alternate;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(191,128,255,0.06), transparent 70%);
          top: 40%; left: 60%;
          animation: orbFloat1 10s ease-in-out infinite alternate-reverse;
        }

        @keyframes orbFloat1 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(40px, 60px) scale(1.1); }
        }
        @keyframes orbFloat2 {
          from { transform: translate(0, 0); }
          to { transform: translate(-50px, -40px); }
        }

        /* Hero badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--cyan);
          border: 1px solid rgba(0,255,200,0.3);
          background: rgba(0,255,200,0.06);
          padding: 6px 16px;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          margin-bottom: 32px;
          animation: fadeUp 0.8s ease both;
        }

        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 8px var(--cyan);
          animation: dotPulse 2s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px var(--cyan); }
          50% { opacity: 0.4; box-shadow: 0 0 2px var(--cyan); }
        }

        /* Hero headline */
        .hero-h1 {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(2.4rem, 7vw, 5.5rem);
          line-height: 1.05;
          text-align: center;
          letter-spacing: -0.01em;
          color: #fff;
          max-width: 900px;
          margin-bottom: 28px;
          animation: fadeUp 0.8s 0.15s ease both;
        }

        .hero-h1 .highlight {
          position: relative;
          display: inline-block;
          background: linear-gradient(135deg, var(--cyan) 0%, var(--blue) 50%, #bf80ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Glitch effect on highlight */
        .hero-h1 .highlight::before {
          content: attr(data-text);
          position: absolute;
          left: 2px; top: 0;
          background: linear-gradient(135deg, #ff0088, #ff4400);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glitch 6s infinite;
          opacity: 0;
        }

        @keyframes glitch {
          0%, 94%, 100% { opacity: 0; clip-path: inset(0 0 100% 0); }
          95% { opacity: 0.7; clip-path: inset(20% 0 60% 0); transform: translateX(-3px); }
          96% { opacity: 0.5; clip-path: inset(50% 0 30% 0); transform: translateX(3px); }
          97% { opacity: 0; }
        }

        .hero-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(0.85rem, 2vw, 1.05rem);
          color: rgba(180, 220, 255, 0.55);
          text-align: center;
          max-width: 560px;
          line-height: 1.8;
          margin-bottom: 48px;
          animation: fadeUp 0.8s 0.3s ease both;
        }

        /* CTA Buttons */
        .cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 0.8s 0.45s ease both;
        }

        .btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Orbitron', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #020810;
          padding: 14px 32px;
          background: linear-gradient(135deg, var(--cyan), var(--blue));
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
          transition: all 0.25s;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #fff2, transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .btn-primary:hover { box-shadow: 0 0 30px rgba(0,255,200,0.4), 0 0 60px rgba(0,255,200,0.15); transform: translateY(-2px); }
        .btn-primary:hover::before { opacity: 1; }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Orbitron', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0,255,200,0.8);
          padding: 13px 32px;
          border: 1px solid rgba(0,255,200,0.25);
          background: rgba(0,255,200,0.04);
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
          transition: all 0.25s;
        }

        .btn-secondary:hover {
          color: var(--cyan);
          border-color: rgba(0,255,200,0.5);
          background: rgba(0,255,200,0.08);
          box-shadow: 0 0 20px rgba(0,255,200,0.12);
          transform: translateY(-2px);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ─── STATS BAR ─── */
        .stats-bar {
          position: relative;
          z-index: 10;
          max-width: 900px;
          margin: 60px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid var(--border);
          background: rgba(6,15,30,0.9);
          backdrop-filter: blur(20px);
          clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
          overflow: hidden;
          animation: fadeUp 0.8s 0.6s ease both;
        }

        .stats-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), var(--blue), transparent);
        }

        .stat-cell {
          padding: 28px 20px;
          text-align: center;
          border-right: 1px solid var(--border);
          position: relative;
          transition: background 0.2s;
        }

        .stat-cell:last-child { border-right: none; }

        .stat-cell:hover {
          background: rgba(0,255,200,0.03);
        }

        .stat-value {
          font-family: 'Orbitron', monospace;
          font-size: 1.9rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(150,190,230,0.5);
        }

        /* ─── SECTION HEADERS ─── */
        .section-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--cyan);
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .section-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: var(--cyan);
          box-shadow: 0 0 8px var(--cyan);
        }

        .section-title {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        /* ─── CATEGORIES ─── */
        .categories-section {
          position: relative;
          z-index: 1;
          padding: 120px 24px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          margin-top: 56px;
        }

        @media (max-width: 1024px) { .categories-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px) { .categories-grid { grid-template-columns: repeat(2, 1fr); } }

        .cat-card {
          position: relative;
          padding: 28px 24px;
          background: rgba(6,15,30,0.7);
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.3s;
          overflow: hidden;
          group: true;
        }

        .cat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .cat-card:hover {
          border-color: var(--cat-accent);
          transform: translateY(-4px);
          z-index: 2;
          box-shadow: 0 0 0 1px var(--cat-accent), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px color-mix(in srgb, var(--cat-accent) 15%, transparent);
        }

        .cat-card:hover::before {
          opacity: 1;
          background: radial-gradient(ellipse 80% 80% at 50% 100%, color-mix(in srgb, var(--cat-accent) 8%, transparent), transparent);
        }

        .cat-glyph {
          font-family: 'Orbitron', monospace;
          font-size: 4rem;
          font-weight: 900;
          line-height: 1;
          color: var(--cat-accent);
          opacity: 0.06;
          position: absolute;
          top: 8px;
          right: 12px;
          transition: opacity 0.3s, transform 0.3s;
          pointer-events: none;
        }

        .cat-card:hover .cat-glyph {
          opacity: 0.14;
          transform: scale(1.1) rotate(-5deg);
        }

        .cat-icon-wrap {
          width: 44px;
          height: 44px;
          border: 1px solid var(--cat-accent);
          background: color-mix(in srgb, var(--cat-accent) 10%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.3s;
        }

        .cat-card:hover .cat-icon-wrap {
          background: color-mix(in srgb, var(--cat-accent) 20%, transparent);
          box-shadow: 0 0 20px color-mix(in srgb, var(--cat-accent) 30%, transparent);
        }

        .cat-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }

        .cat-arrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cat-accent);
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
        }

        .cat-card:hover .cat-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ─── EVENTS SECTION ─── */
        .events-section {
          position: relative;
          z-index: 1;
          padding: 0 24px 120px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .events-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }

        .view-all-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0,255,200,0.6);
          border: 1px solid rgba(0,255,200,0.2);
          padding: 8px 20px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .view-all-btn:hover {
          color: var(--cyan);
          border-color: rgba(0,255,200,0.5);
          background: rgba(0,255,200,0.06);
        }

        /* ─── TERMINAL / CTA SECTION ─── */
        .cta-section {
          position: relative;
          z-index: 1;
          padding: 0 24px 120px;
        }

        .cta-inner {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          padding: 72px 60px;
          border: 1px solid rgba(0,255,200,0.2);
          background: rgba(6,15,30,0.8);
          backdrop-filter: blur(30px);
          overflow: hidden;
          clip-path: polygon(24px 0%, 100% 0%, calc(100% - 24px) 100%, 0% 100%);
        }

        .cta-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan) 30%, var(--blue) 70%, transparent);
        }

        .cta-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,255,200,0.05), transparent);
          pointer-events: none;
        }

        .cta-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,255,200,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,200,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* Corner decorations */
        .cta-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: rgba(0,255,200,0.5);
          border-style: solid;
        }
        .cta-corner-tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
        .cta-corner-tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
        .cta-corner-bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
        .cta-corner-br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

        .cta-terminal-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          color: rgba(0,255,200,0.5);
          letter-spacing: 0.15em;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cta-terminal-label::before {
          content: '>';
          color: var(--cyan);
          animation: blink 1.2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .cta-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .cta-title span {
          background: linear-gradient(135deg, var(--cyan), var(--blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: rgba(180,220,255,0.45);
          line-height: 1.8;
          max-width: 500px;
          margin-bottom: 40px;
        }

        /* ─── DIVIDER ─── */
        .section-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border) 30%, var(--border) 70%, transparent);
          margin: 0 24px;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 640px) {
          .stats-bar { grid-template-columns: 1fr; clip-path: none; }
          .stat-cell { border-right: none; border-bottom: 1px solid var(--border); }
          .cta-inner { padding: 48px 28px; clip-path: none; }
          .cta-group { flex-direction: column; align-items: stretch; }
          .btn-primary, .btn-secondary { text-align: center; justify-content: center; }
        }
      `}</style>

      <div className="home-root">
        {/* Global grid overlay */}
        <div className="grid-overlay" />

        {/* ── HERO ── */}
        <section className="hero-section">
          <div className="hero-video-wrap">
            <video
              src="/College_Event_Website_Hero_Video_Creation.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          {/* Orbs */}
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="hero-scanline" />

          <div
            style={{
              position: "relative",
              zIndex: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="hero-badge">
              <span className="badge-dot" />
              Campus Events
            </div>

            <h1 className="hero-h1">
              Discover Every{" "}
              <span className="highlight" data-text="Campus Event">
                Campus Event
              </span>
              <br />
              in One Click
            </h1>

            <p className="hero-sub">
              Hackathons · Cultural Fests · Seminars · Tournaments
              <br />
              Participate. Compete. Create Memories.
            </p>

            <div className="cta-group">
              <Link href="/events" className="btn-primary">
                Explore Events
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              {!session?.user && (
                <Link href="/register" className="btn-secondary">
                  Create Account
                  <ChevronRight style={{ width: 14, height: 14 }} />
                </Link>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div
            className="stats-bar"
            style={{
              position: "relative",
              zIndex: 5,
              width: "100%",
              padding: "0 24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                border: "1px solid rgba(0,255,200,0.12)",
                background: "rgba(6,15,30,0.92)",
                backdropFilter: "blur(20px)",
                clipPath:
                  "polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)",
                overflow: "hidden",
                position: "relative",
                maxWidth: 860,
                margin: "60px auto 0",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, #00ffc8, #00aaff, transparent)",
                }}
              />
              {stats.map(({ label, value, icon: Icon, accent }, i) => (
                <div
                  key={label}
                  style={{
                    padding: "28px 20px",
                    textAlign: "center",
                    borderRight:
                      i < 2 ? "1px solid rgba(0,255,200,0.1)" : "none",
                  }}
                >
                  <Icon
                    style={{
                      width: 18,
                      height: 18,
                      color: accent,
                      margin: "0 auto 10px",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "1.9rem",
                      fontWeight: 900,
                      color: accent,
                      lineHeight: 1,
                      marginBottom: 6,
                      textShadow: `0 0 20px ${accent}55`,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.67rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(150,190,230,0.5)",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="categories-section">
          <div style={{ marginBottom: 56 }}>
            <div className="section-eyebrow">Explore Categories</div>
            <h2 className="section-title">
              Events for
              <br />
              Every Interest
            </h2>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.82rem",
                color: "rgba(150,190,230,0.45)",
                marginTop: 16,
                maxWidth: 400,
                lineHeight: 1.7,
              }}
            >
              Code, dance, debate, or compete — there's a stage for every
              talent.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map(({ label, value, icon: Icon, accent, glyph }) => (
              <Link
                key={value}
                href={`/events?category=${value}`}
                className="cat-card"
                style={{ "--cat-accent": accent } as React.CSSProperties}
              >
                <div className="cat-glyph">{glyph}</div>
                <div className="cat-icon-wrap">
                  <Icon style={{ width: 18, height: 18, color: accent }} />
                </div>
                <div className="cat-label">{label}</div>
                <div className="cat-arrow">
                  Browse <ArrowRight style={{ width: 12, height: 12 }} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* ── EVENTS ── */}
        <section className="events-section" style={{ paddingTop: 120 }}>
          <div className="events-header">
            <div>
              <div className="section-eyebrow">
                {isFeatured ? "Featured" : "Upcoming"}
              </div>
              <h2 className="section-title">
                {isFeatured ? "Featured Events" : "Upcoming Events"}
              </h2>
            </div>
            <Link href="/events" className="view-all-btn">
              View All <ArrowRight style={{ width: 12, height: 12 }} />
            </Link>
          </div>

          {displayEvents.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 2,
              }}
            >
              {displayEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  description={event.shortDescription || event.description}
                  category={event.category}
                  date={event.date}
                  venue={event.venue}
                  maxParticipants={event.maxParticipants}
                  currentParticipants={event.currentParticipants}
                  image={event.image}
                  prizeMoney={event.prizeMoney}
                  status={event.status}
                  registrationDeadline={event.registrationDeadline}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "80px 40px",
                border: "1px dashed rgba(0,255,200,0.15)",
                background: "rgba(6,15,30,0.5)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "3rem",
                  marginBottom: 16,
                  color: "rgba(0,255,200,0.2)",
                }}
              >
                [ ]
              </div>
              <h3
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 8,
                }}
              >
                Events Incoming
              </h3>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "rgba(150,190,230,0.3)",
                }}
              >
                Stand by. Exciting events loading soon.
              </p>
            </div>
          )}
        </section>

        {/* ── CTA BANNER ── */}
        <section className="cta-section">
          <div className="cta-inner">
            <div className="cta-grid-lines" />
            <div className="cta-corner cta-corner-tl" />
            <div className="cta-corner cta-corner-tr" />
            <div className="cta-corner cta-corner-bl" />
            <div className="cta-corner cta-corner-br" />

            <div
              style={{ position: "relative", zIndex: 2, textAlign: "center" }}
            >
              <div
                className="cta-terminal-label"
                style={{ justifyContent: "center" }}
              >
                SYSTEM_READY // USER_AUTH_REQUIRED
              </div>
              <h2 className="cta-title">
                Ready to <span>Dive In?</span>
              </h2>
              <p className="cta-sub" style={{ margin: "0 auto 40px" }}>
                Join thousands of students already registered on NowOnCampus.
                Never miss an event again.
              </p>
              <div className="cta-group">
                <Link href="/register" className="btn-primary">
                  Get Started Free
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </Link>
                <Link href="/events" className="btn-secondary">
                  Browse Events
                  <ChevronRight style={{ width: 14, height: 14 }} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
