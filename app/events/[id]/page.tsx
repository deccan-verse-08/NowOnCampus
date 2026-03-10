// import { prisma } from "@/lib/db";
// import { auth } from "@/auth";
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import {
//     Calendar,
//     MapPin,
//     Users,
//     Clock,
//     Trophy,
//     ArrowLeft,
//     Share2,
//     CheckCircle,
//     Tag,
//     User,
// } from "lucide-react";
// import { RegisterButton } from "./RegisterButton";

// const categoryColors: Record<string, string> = {
//     FORMAL: "bg-blue-100 text-blue-700",
//     INFORMAL: "bg-purple-100 text-purple-700",
//     HACKATHON: "bg-orange-100 text-orange-700",
//     CULTURAL: "bg-pink-100 text-pink-700",
//     SPORTS: "bg-green-100 text-green-700",
//     WORKSHOP: "bg-cyan-100 text-cyan-700",
//     TECHNICAL: "bg-indigo-100 text-indigo-700",
//     LITERARY: "bg-yellow-100 text-yellow-700",
// };

// interface Props {
//     params: Promise<{ id: string }>;
// }

// export default async function EventDetailPage({ params }: Props) {
//     const { id } = await params;
//     const session = await auth();

//     const event = await prisma.event.findUnique({
//         where: { id },
//         include: {
//             organizer: { select: { name: true, email: true, image: true } },
//             registrations: { select: { userId: true } },
//         },
//     });

//     if (!event) notFound();

//     const isRegistered =
//         session?.user?.id
//             ? event.registrations.some((r) => r.userId === session.user?.id)
//             : false;

//     const spotsLeft = event.maxParticipants
//         ? event.maxParticipants - event.currentParticipants
//         : null;

//     const canRegister =
//         event.status === "UPCOMING" &&
//         (spotsLeft === null || spotsLeft > 0) &&
//         (!event.registrationDeadline || new Date(event.registrationDeadline) > new Date());

//     return (
//         <div className="min-h-screen bg-slate-50">
//             {/* Back Button */}
//             <div className="max-w-5xl mx-auto px-4 pt-6">
//                 <Link
//                     href="/events"
//                     className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 font-medium transition-colors"
//                 >
//                     <ArrowLeft className="w-4 h-4" /> Back to Events
//                 </Link>
//             </div>

//             <div className="max-w-5xl mx-auto px-4 py-6 pb-16">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2 space-y-6">
//                         {/* Banner */}
//                         <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
//                             {event.image ? (
//                                 <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
//                             ) : (
//                                 <div className="w-full h-full flex items-center justify-center text-8xl opacity-20">🎓</div>
//                             )}
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                             <div className="absolute bottom-4 left-4 flex items-center gap-2">
//                                 <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${categoryColors[event.category] || "bg-slate-100 text-slate-600"}`}>
//                                     {event.category}
//                                 </span>
//                                 <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${event.status === "UPCOMING" ? "bg-blue-600 text-white" :
//                                     event.status === "ONGOING" ? "bg-green-500 text-white" :
//                                         "bg-slate-500 text-white"
//                                     }`}>
//                                     {event.status}
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Title */}
//                         <div className="bg-white rounded-2xl border border-slate-200 p-6">
//                             <div className="flex items-start justify-between gap-4 mb-4">
//                                 <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{event.title}</h1>
//                                 <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex-shrink-0">
//                                     <Share2 className="w-4 h-4 text-slate-500" />
//                                 </button>
//                             </div>

//                             {event.tags && (
//                                 <div className="flex flex-wrap gap-2 mb-4">
//                                     {event.tags.split(",").map((tag) => (
//                                         <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
//                                             <Tag className="w-3 h-3" /> {tag.trim()}
//                                         </span>
//                                     ))}
//                                 </div>
//                             )}

//                             <p className="text-slate-600 leading-relaxed whitespace-pre-line">{event.description}</p>
//                         </div>

//                         {/* Organizer */}
//                         <div className="bg-white rounded-2xl border border-slate-200 p-6">
//                             <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
//                                 <User className="w-4 h-4 text-blue-600" /> Organized by
//                             </h3>
//                             <div className="flex items-center gap-3">
//                                 {event.organizer.image ? (
//                                     <img src={event.organizer.image} alt={event.organizer.name || ""} className="w-10 h-10 rounded-full object-cover" />
//                                 ) : (
//                                     <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
//                                         {event.organizer.name?.charAt(0).toUpperCase() || "O"}
//                                     </div>
//                                 )}
//                                 <div>
//                                     <p className="font-medium text-slate-800">{event.organizer.name}</p>
//                                     <p className="text-sm text-slate-500">{event.organizer.email}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Sidebar */}
//                     <div className="space-y-4">
//                         {/* Registration Card */}
//                         <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-20">
//                             <h3 className="font-bold text-slate-900 text-lg mb-5">Event Details</h3>

//                             <div className="space-y-3.5 mb-6">
//                                 <div className="flex items-start gap-3">
//                                     <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
//                                         <Calendar className="w-4 h-4 text-blue-600" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs text-slate-500 mb-0.5">Date & Time</p>
//                                         <p className="text-sm font-medium text-slate-800">
//                                             {new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
//                                         </p>
//                                         <p className="text-xs text-slate-500">
//                                             {new Date(event.date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
//                                         <MapPin className="w-4 h-4 text-blue-600" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs text-slate-500 mb-0.5">Venue</p>
//                                         <p className="text-sm font-medium text-slate-800">{event.venue}</p>
//                                     </div>
//                                 </div>

//                                 {event.maxParticipants && (
//                                     <div className="flex items-start gap-3">
//                                         <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
//                                             <Users className="w-4 h-4 text-blue-600" />
//                                         </div>
//                                         <div className="flex-1">
//                                             <p className="text-xs text-slate-500 mb-0.5">Participants</p>
//                                             <p className="text-sm font-medium text-slate-800">
//                                                 {event.currentParticipants} / {event.maxParticipants} registered
//                                             </p>
//                                             <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                                                 <div
//                                                     className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
//                                                     style={{ width: `${Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)}%` }}
//                                                 />
//                                             </div>
//                                             {spotsLeft !== null && spotsLeft <= 20 && spotsLeft > 0 && (
//                                                 <p className="text-xs text-orange-600 font-medium mt-1">Only {spotsLeft} spots left!</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {event.registrationDeadline && (
//                                     <div className="flex items-start gap-3">
//                                         <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
//                                             <Clock className="w-4 h-4 text-orange-500" />
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-slate-500 mb-0.5">Registration Deadline</p>
//                                             <p className="text-sm font-medium text-slate-800">
//                                                 {new Date(event.registrationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {event.prizeMoney && (
//                                     <div className="flex items-start gap-3">
//                                         <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0">
//                                             <Trophy className="w-4 h-4 text-yellow-600" />
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-slate-500 mb-0.5">Prize Pool</p>
//                                             <p className="text-sm font-bold text-yellow-700">{event.prizeMoney}</p>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {event.teamSize && (
//                                     <div className="flex items-start gap-3">
//                                         <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
//                                             <Users className="w-4 h-4 text-purple-600" />
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-slate-500 mb-0.5">Team Size</p>
//                                             <p className="text-sm font-medium text-slate-800">{event.teamSize}</p>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* CTA */}
//                             {isRegistered ? (
//                                 <div className="flex items-center gap-2 justify-center bg-green-50 border border-green-200 text-green-700 font-semibold py-3.5 rounded-xl text-sm">
//                                     <CheckCircle className="w-5 h-5" /> You&apos;re Registered!
//                                 </div>
//                             ) : canRegister ? (
//                                 <RegisterButton eventId={event.id} isLoggedIn={!!session?.user} />
//                             ) : event.status === "COMPLETED" ? (
//                                 <div className="text-center bg-slate-100 text-slate-500 font-medium py-3.5 rounded-xl text-sm">
//                                     Event Ended
//                                 </div>
//                             ) : spotsLeft === 0 ? (
//                                 <div className="text-center bg-red-50 text-red-600 font-medium py-3.5 rounded-xl text-sm border border-red-200">
//                                     Fully Booked
//                                 </div>
//                             ) : (
//                                 <div className="text-center bg-slate-100 text-slate-500 font-medium py-3.5 rounded-xl text-sm">
//                                     Registration Closed
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Trophy,
  ArrowLeft,
  Share2,
  CheckCircle,
  Tag,
  User,
} from "lucide-react";
import { RegisterButton } from "./RegisterButton";

const categoryMeta: Record<
  string,
  { accent: string; label: string; code: string }
> = {
  FORMAL: { accent: "#00aaff", label: "Formal", code: "01" },
  INFORMAL: { accent: "#bf80ff", label: "Informal", code: "02" },
  HACKATHON: { accent: "#ffaa00", label: "Hackathon", code: "03" },
  CULTURAL: { accent: "#ff5599", label: "Cultural", code: "04" },
  SPORTS: { accent: "#44ff88", label: "Sports", code: "05" },
  WORKSHOP: { accent: "#00ddff", label: "Workshop", code: "06" },
  TECHNICAL: { accent: "#ff6644", label: "Technical", code: "07" },
  LITERARY: { accent: "#ffdd44", label: "Literary", code: "08" },
};

const statusMeta: Record<string, { accent: string; label: string }> = {
  UPCOMING: { accent: "#00ffc8", label: "Upcoming" },
  ONGOING: { accent: "#ffaa00", label: "Ongoing" },
  COMPLETED: { accent: "#555e77", label: "Completed" },
  CANCELLED: { accent: "#ff4444", label: "Cancelled" },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      organizer: { select: { name: true, email: true, image: true } },
      registrations: { select: { userId: true } },
    },
  });

  if (!event) notFound();

  const isRegistered = session?.user?.id
    ? event.registrations.some((r) => r.userId === session.user?.id)
    : false;

  const spotsLeft = event.maxParticipants
    ? event.maxParticipants - event.currentParticipants
    : null;

  const canRegister =
    event.status === "UPCOMING" &&
    (spotsLeft === null || spotsLeft > 0) &&
    (!event.registrationDeadline ||
      new Date(event.registrationDeadline) > new Date());

  const cat = categoryMeta[event.category] || {
    accent: "#00ffc8",
    label: event.category,
    code: "??",
  };
  const stat = statusMeta[event.status] || {
    accent: "#00ffc8",
    label: event.status,
  };
  const fillPct = event.maxParticipants
    ? Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)
    : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

        .ed-root {
          min-height: 100vh;
          background: #020810;
          font-family: 'Syne', sans-serif;
          color: rgba(200,230,255,0.85);
          position: relative;
          overflow-x: hidden;
        }

        .ed-grid-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(0,255,200,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,200,0.016) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* ── BACK BAR ── */
        .ed-back-bar {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 28px 24px 0;
        }

        .ed-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(0,255,200,0.5);
          border: 1px solid rgba(0,255,200,0.15);
          padding: 6px 14px;
          clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
          transition: all 0.2s;
          text-decoration: none;
        }

        .ed-back-link:hover {
          color: #00ffc8;
          border-color: rgba(0,255,200,0.4);
          background: rgba(0,255,200,0.06);
        }

        /* ── HERO BANNER ── */
        .ed-hero {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 24px auto 0;
          padding: 0 24px;
        }

        .ed-banner {
          position: relative;
          height: 380px;
          overflow: hidden;
          background: #060f1e;
          border: 1px solid rgba(0,255,200,0.1);
        }

        .ed-banner img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.55;
          filter: saturate(0.7);
        }

        .ed-banner-fallback {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(0,255,200,0.04), rgba(0,170,255,0.04));
        }

        .ed-banner-fallback-glyph {
          font-family: 'Orbitron', monospace;
          font-size: 8rem;
          font-weight: 900;
          color: rgba(0,255,200,0.06);
          user-select: none;
          letter-spacing: -0.05em;
        }

        /* Vignette */
        .ed-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, #020810 0%, rgba(2,8,16,0.6) 40%, transparent 70%),
            linear-gradient(to right, #020810 0%, transparent 20%),
            linear-gradient(to left, #020810 0%, transparent 20%);
        }

        /* Animated top line on banner */
        .ed-banner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cat-accent), transparent);
          z-index: 2;
        }

        /* Badges overlaid on banner */
        .ed-banner-badges {
          position: absolute;
          bottom: 24px;
          left: 24px;
          display: flex;
          gap: 8px;
          z-index: 3;
        }

        .ed-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 14px;
          border: 1px solid var(--badge-accent);
          background: color-mix(in srgb, var(--badge-accent) 14%, #020810);
          color: var(--badge-accent);
          clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
          box-shadow: 0 0 12px color-mix(in srgb, var(--badge-accent) 20%, transparent);
        }

        /* Share button */
        .ed-share-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 3;
          width: 38px; height: 38px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(2,8,16,0.6);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(200,230,255,0.5);
          clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
          transition: all 0.2s;
          cursor: pointer;
        }

        .ed-share-btn:hover {
          border-color: rgba(0,255,200,0.4);
          color: #00ffc8;
          background: rgba(0,255,200,0.1);
        }

        /* ── LAYOUT ── */
        .ed-layout {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          margin-top: 32px;
        }

        @media (max-width: 900px) {
          .ed-layout { grid-template-columns: 1fr; }
          .ed-banner { height: 260px; }
        }

        /* ── PANEL ── */
        .ed-panel {
          background: rgba(6,15,30,0.85);
          border: 1px solid rgba(0,255,200,0.1);
          backdrop-filter: blur(20px);
          padding: 28px;
          position: relative;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .ed-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,200,0.25), transparent);
        }

        .ed-panel-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(0,255,200,0.4);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .ed-panel-label::before {
          content: '//';
          color: rgba(0,255,200,0.2);
        }

        /* ── TITLE AREA ── */
        .ed-title {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(1.4rem, 4vw, 2rem);
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }

        /* Tags */
        .ed-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }

        .ed-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: rgba(0,255,200,0.5);
          border: 1px solid rgba(0,255,200,0.15);
          background: rgba(0,255,200,0.04);
          padding: 4px 10px;
          clip-path: polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);
        }

        /* Description */
        .ed-desc {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          color: rgba(170,200,230,0.6);
          line-height: 1.85;
          white-space: pre-line;
        }

        /* ── ORGANIZER ── */
        .ed-organizer {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .ed-org-avatar {
          width: 46px; height: 46px;
          border-radius: 50%;
          border: 1px solid rgba(0,255,200,0.3);
          object-fit: cover;
          position: relative;
        }

        .ed-org-avatar-fallback {
          width: 46px; height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(0,255,200,0.15), rgba(0,170,255,0.15));
          border: 1px solid rgba(0,255,200,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          font-weight: 700;
          color: #00ffc8;
          flex-shrink: 0;
        }

        .ed-org-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          color: rgba(220,235,255,0.85);
          margin-bottom: 3px;
        }

        .ed-org-email {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          color: rgba(100,150,200,0.4);
          letter-spacing: 0.04em;
        }

        /* ── SIDEBAR ── */
        .ed-sidebar {
          position: sticky;
          top: 88px;
          align-self: start;
        }

        /* Detail rows */
        .ed-detail-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(0,255,200,0.06);
        }

        .ed-detail-row:last-child { border-bottom: none; }

        .ed-detail-icon {
          width: 34px; height: 34px;
          border: 1px solid var(--icon-accent);
          background: color-mix(in srgb, var(--icon-accent) 10%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
        }

        .ed-detail-key {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(100,150,200,0.35);
          margin-bottom: 4px;
        }

        .ed-detail-val {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(210,230,255,0.85);
          line-height: 1.3;
        }

        .ed-detail-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: rgba(100,150,200,0.4);
          margin-top: 2px;
        }

        /* Capacity bar */
        .ed-cap-bar-track {
          height: 3px;
          background: rgba(255,255,255,0.07);
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }

        .ed-cap-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--bar-accent), color-mix(in srgb, var(--bar-accent) 60%, #fff));
          box-shadow: 0 0 8px var(--bar-accent);
          transition: width 0.6s ease;
        }

        .ed-spots-warn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: #ffaa00;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ed-spots-warn::before {
          content: '!';
          width: 14px; height: 14px;
          border: 1px solid #ffaa00;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.55rem;
          font-weight: 700;
        }

        /* Prize highlight */
        .ed-prize-val {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 1rem;
          color: #ffdd44;
          text-shadow: 0 0 20px rgba(255,221,68,0.4);
        }

        /* ── CTA BUTTONS ── */
        .ed-cta-wrap {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(0,255,200,0.08);
        }

        .ed-cta-register {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Orbitron', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #020810;
          padding: 15px;
          background: linear-gradient(135deg, #00ffc8, #00aaff);
          clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
          transition: all 0.25s;
          border: none;
          cursor: pointer;
        }

        .ed-cta-register:hover {
          box-shadow: 0 0 30px rgba(0,255,200,0.4), 0 0 60px rgba(0,255,200,0.15);
          transform: translateY(-1px);
        }

        .ed-cta-registered {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Orbitron', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #44ff88;
          padding: 15px;
          border: 1px solid rgba(68,255,136,0.35);
          background: rgba(68,255,136,0.06);
          clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
          box-shadow: 0 0 20px rgba(68,255,136,0.1);
        }

        .ed-cta-closed {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Orbitron', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(100,130,170,0.4);
          padding: 15px;
          border: 1px solid rgba(100,130,170,0.12);
          clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
        }

        .ed-cta-full {
          color: rgba(255,80,80,0.6);
          border-color: rgba(255,80,80,0.15);
          background: rgba(255,80,80,0.04);
          box-shadow: none;
        }

        /* Sidebar header */
        .ed-sidebar-header {
          font-family: 'Orbitron', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(200,230,255,0.6);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ed-sidebar-header::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(0,255,200,0.2), transparent);
        }
      `}</style>

      <div className="ed-root">
        <div className="ed-grid-bg" />

        {/* Back */}
        <div className="ed-back-bar">
          <Link href="/events" className="ed-back-link">
            <ArrowLeft style={{ width: 13, height: 13 }} />
            Back to Events
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="ed-hero">
          <div
            className="ed-banner"
            style={{ "--cat-accent": cat.accent } as React.CSSProperties}
          >
            {event.image ? (
              <img src={event.image} alt={event.title} />
            ) : (
              <div className="ed-banner-fallback">
                <span className="ed-banner-fallback-glyph">{cat.code}</span>
              </div>
            )}

            <button className="ed-share-btn" aria-label="Share">
              <Share2 style={{ width: 15, height: 15 }} />
            </button>

            <div className="ed-banner-badges">
              <span
                className="ed-badge"
                style={{ "--badge-accent": cat.accent } as React.CSSProperties}
              >
                {cat.label}
              </span>
              <span
                className="ed-badge"
                style={{ "--badge-accent": stat.accent } as React.CSSProperties}
              >
                {stat.label}
              </span>
            </div>
          </div>
        </div>

        {/* Content layout */}
        <div className="ed-layout">
          {/* ── MAIN ── */}
          <div>
            {/* Title panel */}
            <div className="ed-panel">
              <div className="ed-panel-label">Event Overview</div>
              <h1 className="ed-title">{event.title}</h1>

              {event.tags && (
                <div className="ed-tags">
                  {event.tags.split(",").map((tag) => (
                    <span key={tag} className="ed-tag">
                      <Tag style={{ width: 10, height: 10 }} />
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              <p className="ed-desc">{event.description}</p>
            </div>

            {/* Organizer panel */}
            <div className="ed-panel">
              <div className="ed-panel-label">Organized By</div>
              <div className="ed-organizer">
                {event.organizer.image ? (
                  <img
                    src={event.organizer.image}
                    alt={event.organizer.name || ""}
                    className="ed-org-avatar"
                  />
                ) : (
                  <div className="ed-org-avatar-fallback">
                    {event.organizer.name?.charAt(0).toUpperCase() || "O"}
                  </div>
                )}
                <div>
                  <div className="ed-org-name">{event.organizer.name}</div>
                  <div className="ed-org-email">{event.organizer.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="ed-sidebar">
            <div className="ed-panel">
              <div className="ed-sidebar-header">Event Data</div>

              {/* Date */}
              <div className="ed-detail-row">
                <div
                  className="ed-detail-icon"
                  style={{ "--icon-accent": "#00aaff" } as React.CSSProperties}
                >
                  <Calendar
                    style={{ width: 14, height: 14, color: "#00aaff" }}
                  />
                </div>
                <div>
                  <div className="ed-detail-key">Date & Time</div>
                  <div className="ed-detail-val">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="ed-detail-sub">
                    {new Date(event.date).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              {/* Venue */}
              <div className="ed-detail-row">
                <div
                  className="ed-detail-icon"
                  style={{ "--icon-accent": cat.accent } as React.CSSProperties}
                >
                  <MapPin
                    style={{ width: 14, height: 14, color: cat.accent }}
                  />
                </div>
                <div>
                  <div className="ed-detail-key">Venue</div>
                  <div className="ed-detail-val">{event.venue}</div>
                </div>
              </div>

              {/* Participants */}
              {event.maxParticipants && (
                <div className="ed-detail-row">
                  <div
                    className="ed-detail-icon"
                    style={
                      { "--icon-accent": "#00ffc8" } as React.CSSProperties
                    }
                  >
                    <Users
                      style={{ width: 14, height: 14, color: "#00ffc8" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="ed-detail-key">Participants</div>
                    <div className="ed-detail-val">
                      {event.currentParticipants} / {event.maxParticipants}
                    </div>
                    <div
                      className="ed-cap-bar-track"
                      style={
                        {
                          "--bar-accent": fillPct > 80 ? "#ff6644" : "#00ffc8",
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="ed-cap-bar-fill"
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                    {spotsLeft !== null && spotsLeft <= 20 && spotsLeft > 0 && (
                      <div className="ed-spots-warn">
                        Only {spotsLeft} spots remaining
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Deadline */}
              {event.registrationDeadline && (
                <div className="ed-detail-row">
                  <div
                    className="ed-detail-icon"
                    style={
                      { "--icon-accent": "#ffaa00" } as React.CSSProperties
                    }
                  >
                    <Clock
                      style={{ width: 14, height: 14, color: "#ffaa00" }}
                    />
                  </div>
                  <div>
                    <div className="ed-detail-key">Registration Deadline</div>
                    <div className="ed-detail-val">
                      {new Date(event.registrationDeadline).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "long", year: "numeric" },
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Prize */}
              {event.prizeMoney && (
                <div className="ed-detail-row">
                  <div
                    className="ed-detail-icon"
                    style={
                      { "--icon-accent": "#ffdd44" } as React.CSSProperties
                    }
                  >
                    <Trophy
                      style={{ width: 14, height: 14, color: "#ffdd44" }}
                    />
                  </div>
                  <div>
                    <div className="ed-detail-key">Prize Pool</div>
                    <div className="ed-prize-val">{event.prizeMoney}</div>
                  </div>
                </div>
              )}

              {/* Team size */}
              {event.teamSize && (
                <div className="ed-detail-row">
                  <div
                    className="ed-detail-icon"
                    style={
                      { "--icon-accent": "#bf80ff" } as React.CSSProperties
                    }
                  >
                    <Users
                      style={{ width: 14, height: 14, color: "#bf80ff" }}
                    />
                  </div>
                  <div>
                    <div className="ed-detail-key">Team Size</div>
                    <div className="ed-detail-val">{event.teamSize}</div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="ed-cta-wrap">
                {isRegistered ? (
                  <div className="ed-cta-registered">
                    <CheckCircle style={{ width: 16, height: 16 }} />
                    Registered
                  </div>
                ) : canRegister ? (
                  <RegisterButton
                    eventId={event.id}
                    isLoggedIn={!!session?.user}
                  />
                ) : event.status === "COMPLETED" ? (
                  <div className="ed-cta-closed">Event Ended</div>
                ) : spotsLeft === 0 ? (
                  <div className="ed-cta-closed ed-cta-full">Fully Booked</div>
                ) : (
                  <div className="ed-cta-closed">Registration Closed</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}