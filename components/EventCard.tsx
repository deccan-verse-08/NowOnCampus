"use client"
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Trophy,
  ArrowUpRight,
  Zap,
} from "lucide-react";

const categoryThemes: Record<
  string,
  {
    gradientFrom: string;
    gradientTo: string;
    border: string;
    softAccent: string;
    accent: string;
    emoji: string;
    label: string;
    cardBg: string;
    tape: string;
  }
> = {
  FORMAL: {
    gradientFrom: "#1e40af",
    gradientTo: "#3b82f6",
    border: "#bfdbfe",
    softAccent: "#dbeafe",
    accent: "#2563eb",
    emoji: "🎓",
    label: "Formal",
    cardBg: "#f0f7ff",
    tape: "#93c5fd",
  },
  INFORMAL: {
    gradientFrom: "#6d28d9",
    gradientTo: "#a78bfa",
    border: "#ddd6fe",
    softAccent: "#ede9fe",
    accent: "#7c3aed",
    emoji: "🎉",
    label: "Informal",
    cardBg: "#f9f5ff",
    tape: "#c4b5fd",
  },
  HACKATHON: {
    gradientFrom: "#c2410c",
    gradientTo: "#f97316",
    border: "#fed7aa",
    softAccent: "#ffedd5",
    accent: "#ea6c0a",
    emoji: "⚡",
    label: "Hackathon",
    cardBg: "#fff8f0",
    tape: "#fb923c",
  },
  CULTURAL: {
    gradientFrom: "#9d174d",
    gradientTo: "#ec4899",
    border: "#fbcfe8",
    softAccent: "#fce7f3",
    accent: "#db2777",
    emoji: "🎭",
    label: "Cultural",
    cardBg: "#fdf0f7",
    tape: "#f9a8d4",
  },
  SPORTS: {
    gradientFrom: "#15803d",
    gradientTo: "#22c55e",
    border: "#bbf7d0",
    softAccent: "#dcfce7",
    accent: "#16a34a",
    emoji: "🏆",
    label: "Sports",
    cardBg: "#f0fdf5",
    tape: "#86efac",
  },
  WORKSHOP: {
    gradientFrom: "#0e7490",
    gradientTo: "#06b6d4",
    border: "#a5f3fc",
    softAccent: "#cffafe",
    accent: "#0891b2",
    emoji: "🛠️",
    label: "Workshop",
    cardBg: "#ecfeff",
    tape: "#67e8f9",
  },
  TECHNICAL: {
    gradientFrom: "#3730a3",
    gradientTo: "#6366f1",
    border: "#c7d2fe",
    softAccent: "#e0e7ff",
    accent: "#4f46e5",
    emoji: "💻",
    label: "Technical",
    cardBg: "#eef1ff",
    tape: "#a5b4fc",
  },
  LITERARY: {
    gradientFrom: "#a16207",
    gradientTo: "#eab308",
    border: "#fde68a",
    softAccent: "#fef9c3",
    accent: "#ca8a04",
    emoji: "📖",
    label: "Literary",
    cardBg: "#fefce8",
    tape: "#fde047",
  },
};

export interface EventCardProps {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  date: string | Date;
  venue: string;
  maxParticipants?: number | null;
  currentParticipants?: number;
  image?: string | null;
  prizeMoney?: string | null;
  status: string;
  registrationDeadline?: string | Date | null;
}

export function EventCard({
  id,
  title,
  description,
  category,
  date,
  venue,
  maxParticipants,
  currentParticipants = 0,
  image,
  prizeMoney,
  status,
  registrationDeadline,
}: EventCardProps) {
  const eventDate = new Date(date);
  const isUpcoming = status === "UPCOMING";
  const isOngoing = status === "ONGOING";
  const spotsLeft = maxParticipants
    ? maxParticipants - currentParticipants
    : null;
  const t = categoryThemes[category] ?? categoryThemes["FORMAL"];
  const fillPct = maxParticipants
    ? Math.min(100, Math.round((currentParticipants / maxParticipants) * 100))
    : 0;

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap");

        /* Subtle paper texture via repeating noise */
        .cardboard-card {
          font-family: "DM Sans", sans-serif;
          transition:
            transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1),
            box-shadow 0.3s ease;
          will-change: transform;
          position: relative;
        }
        .cardboard-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }
        .cardboard-card:hover {
          transform: translateY(-8px) rotate(0.6deg);
        }
        .cardboard-card:hover .cb-img {
          transform: scale(1.06);
        }
        .cb-img {
          transition: transform 0.55s ease;
        }

        /* Tape strip on top */
        .tape-strip {
          position: absolute;
          top: -11px;
          left: 50%;
          transform: translateX(-50%) rotate(-1.5deg);
          width: 80px;
          height: 22px;
          border-radius: 3px;
          opacity: 0.82;
          z-index: 10;
        }

        /* Pin / tack circle */
        .pin-dot {
          position: absolute;
          top: 14px;
          right: 18px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          z-index: 10;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        }

        /* Torn bottom edge effect */
        .torn-edge {
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 10px;
          background-repeat: repeat-x;
          background-size: 20px 10px;
        }

        .cb-register-btn {
          transition:
            filter 0.2s ease,
            transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .cb-register-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          pointer-events: none;
        }
        .cb-register-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-2px) scale(1.02);
        }

        /* Handwritten-feel dashed border for image area */
        .sketch-border {
          border: 2px dashed rgba(0, 0, 0, 0.12);
        }
      `}</style>

      <Link href={`/events/${id}`} className="block pt-4">
        <div
          className="cardboard-card relative flex flex-col"
          style={{
            background: t.cardBg,
            border: `2px solid ${t.border}`,
            borderRadius: "18px",
            boxShadow: `4px 6px 0px ${t.border}, 0 16px 40px -8px rgba(0,0,0,0.12)`,
          }}
        >
          {/* ── Tape strip ── */}
          <div className="tape-strip" style={{ background: t.tape }} />

          {/* ── Push-pin ── */}
          <div className="pin-dot" style={{ background: t.accent }} />

          {/* ── Image area ── */}
          <div
            className="relative overflow-hidden mx-4 mt-6 sketch-border"
            style={{ borderRadius: "12px", height: "190px" }}
          >
            {image ? (
              <img
                src={image}
                alt={title}
                className="cb-img w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(150deg, ${t.gradientFrom} 0%, ${t.gradientTo} 100%)`,
                }}
              >
                <span
                  className="select-none"
                  style={{
                    fontSize: "80px",
                    filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.2))",
                    opacity: 0.85,
                  }}
                >
                  {t.emoji}
                </span>
              </div>
            )}

            {/* Category chip */}
            <div className="absolute top-3 left-3">
              <span
                className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  color: t.gradientFrom,
                  backdropFilter: "blur(8px)",
                }}
              >
                {t.emoji} {t.label}
              </span>
            </div>

            {/* Status */}
            {isOngoing && (
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500 text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />{" "}
                  Live
                </span>
              </div>
            )}
            {status === "COMPLETED" && (
              <div className="absolute top-3 right-3">
                <span
                  className="text-[10px] font-black px-2.5 py-1 rounded-full text-white"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                >
                  Ended
                </span>
              </div>
            )}

            {/* Prize */}
            {prizeMoney && (
              <div
                className="absolute bottom-3 right-3 flex items-center gap-1"
                style={{
                  background: "#fbbf24",
                  color: "#78350f",
                  borderRadius: "30px",
                  padding: "4px 10px",
                  fontSize: "10px",
                  fontWeight: 900,
                  boxShadow: "0 3px 10px rgba(251,191,36,0.4)",
                }}
              >
                <Trophy className="w-3 h-3" /> {prizeMoney}
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <div className="flex flex-col gap-2.5 px-5 pt-4 pb-2 relative z-[2]">
            {/* Title — slightly tilted feel via font */}
            <h3
              className="line-clamp-2"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "16px",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.3,
              }}
            >
              {title}
            </h3>

            {description && (
              <p
                className="line-clamp-2"
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                {description}
              </p>
            )}

            {/* Handwritten-feel divider */}
            <div
              style={{
                height: "1.5px",
                borderRadius: 99,
                background: `repeating-linear-gradient(90deg, ${t.border} 0px, ${t.border} 6px, transparent 6px, transparent 10px)`,
              }}
            />

            {/* Meta rows with tinted icon squares */}
            <div className="flex flex-col gap-1.5">
              {[
                {
                  icon: <Calendar className="w-3.5 h-3.5" />,
                  text: eventDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }),
                },
                { icon: <MapPin className="w-3.5 h-3.5" />, text: venue },
                ...(registrationDeadline && isUpcoming
                  ? [
                      {
                        icon: <Clock className="w-3.5 h-3.5" />,
                        text: `Register by ${new Date(registrationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`,
                      },
                    ]
                  : []),
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      background: t.softAccent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: t.accent,
                      flexShrink: 0,
                    }}
                  >
                    {row.icon}
                  </div>
                  <span
                    className="truncate"
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    {row.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Spots bar */}
            {maxParticipants && (
              <div className="mt-0.5">
                <div className="flex justify-between items-center mb-1">
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Users style={{ width: 10, height: 10 }} /> Spots
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 900,
                      color: t.accent,
                    }}
                  >
                    {spotsLeft === 0
                      ? "Full"
                      : spotsLeft !== null && spotsLeft <= 10
                        ? `${spotsLeft} left!`
                        : `${currentParticipants}/${maxParticipants}`}
                  </span>
                </div>
                <div
                  style={{
                    height: 5,
                    borderRadius: 99,
                    background: t.border,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 99,
                      width: `${fillPct}%`,
                      background:
                        spotsLeft === 0
                          ? "linear-gradient(90deg,#ef4444,#f87171)"
                          : spotsLeft !== null && spotsLeft <= 10
                            ? "linear-gradient(90deg,#f97316,#fb923c)"
                            : `linear-gradient(90deg,${t.gradientFrom},${t.gradientTo})`,
                      transition: "width 0.8s ease",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── CTA ── */}
          <div className="px-5 pt-2 pb-5 relative z-[2]">
            <button
              className="cb-register-btn w-full flex items-center justify-center gap-2 font-black uppercase"
              style={{
                borderRadius: "12px",
                padding: "12px 0",
                fontSize: "12px",
                letterSpacing: "0.1em",
                ...(isUpcoming || isOngoing
                  ? {
                      background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
                      color: "#fff",
                      boxShadow: `3px 3px 0px ${t.accent}88`,
                      border: `1.5px solid ${t.gradientFrom}`,
                    }
                  : {
                      background: "#f1f5f9",
                      color: "#94a3b8",
                      cursor: "not-allowed",
                      border: "1.5px solid #e2e8f0",
                    }),
              }}
            >
              {isUpcoming ? (
                "Register Now"
              ) : isOngoing ? (
                <>
                  <Zap className="w-3.5 h-3.5" /> Join Live
                </>
              ) : (
                "View Details"
              )}
              {(isUpcoming || isOngoing) && (
                <ArrowUpRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* ── Hard offset shadow (cardboard stack effect) ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "18px",
              border: `2px solid ${t.border}`,
              transform: "translate(5px, 6px)",
              zIndex: -1,
              background: t.cardBg,
              opacity: 0.5,
            }}
          />
        </div>
      </Link>
    </>
  );
}
