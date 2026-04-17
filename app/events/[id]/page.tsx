// import { prisma } from "@/lib/db";
// import { auth } from "@/auth";
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import {
//   Calendar,
//   MapPin,
//   Users,
//   Clock,
//   Trophy,
//   ArrowLeft,
//   Share2,
//   CheckCircle,
//   Tag,
//   User,
// } from "lucide-react";
// import { RegisterButton } from "./RegisterButton";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";

// const categoryColors: Record<string, string> = {
//   FORMAL: "bg-blue-100 text-blue-700",
//   INFORMAL: "bg-purple-100 text-purple-700",
//   HACKATHON: "bg-orange-100 text-orange-700",
//   CULTURAL: "bg-pink-100 text-pink-700",
//   SPORTS: "bg-green-100 text-green-700",
//   WORKSHOP: "bg-cyan-100 text-cyan-700",
//   TECHNICAL: "bg-indigo-100 text-indigo-700",
//   LITERARY: "bg-yellow-100 text-yellow-700",
// };

// interface Props {
//   params: Promise<{ id: string }>;
// }

// export default async function EventDetailPage({ params }: Props) {
//   const { id } = await params;
//   const session = await auth();

//   const event = await prisma.event.findUnique({
//     where: { id },
//     include: {
//       organizer: { select: { name: true, email: true, image: true } },
//       registrations: { select: { userId: true } },
//     },
//   });

//   if (!event) notFound();

//   const isRegistered = session?.user?.id
//     ? event.registrations.some((r) => r.userId === session.user?.id)
//     : false;

//   const spotsLeft = event.maxParticipants
//     ? event.maxParticipants - event.currentParticipants
//     : null;

//   const canRegister =
//     event.status === "UPCOMING" &&
//     (spotsLeft === null || spotsLeft > 0) &&
//     (!event.registrationDeadline ||
//       new Date(event.registrationDeadline) > new Date());

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-slate-50">
//         {/* Back Button */}
//         <div className="max-w-5xl mx-auto px-4 pt-6">
//           <Link
//             href="/events"
//             className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 font-medium transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back to Events
//           </Link>
//         </div>

//         <div className="max-w-5xl mx-auto px-4 py-6 pb-16">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Banner */}
//               <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
//                 {event.image ? (
//                   <img
//                     src={event.image}
//                     alt={event.title}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-8xl opacity-20">
//                     🎓
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                 <div className="absolute bottom-4 left-4 flex items-center gap-2">
//                   <span
//                     className={`text-xs font-semibold px-3 py-1.5 rounded-full ${categoryColors[event.category] || "bg-slate-100 text-slate-600"}`}
//                   >
//                     {event.category}
//                   </span>
//                   <span
//                     className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
//                       event.status === "UPCOMING"
//                         ? "bg-blue-600 text-white"
//                         : event.status === "ONGOING"
//                           ? "bg-green-500 text-white"
//                           : "bg-slate-500 text-white"
//                     }`}
//                   >
//                     {event.status}
//                   </span>
//                 </div>
//               </div>

//               {/* Title */}
//               <div className="bg-white rounded-2xl border border-slate-200 p-6">
//                 <div className="flex items-start justify-between gap-4 mb-4">
//                   <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
//                     {event.title}
//                   </h1>
//                   <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex-shrink-0">
//                     <Share2 className="w-4 h-4 text-slate-500" />
//                   </button>
//                 </div>

//                 {event.tags && (
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {event.tags.split(",").map((tag) => (
//                       <span
//                         key={tag}
//                         className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
//                       >
//                         <Tag className="w-3 h-3" /> {tag.trim()}
//                       </span>
//                     ))}
//                   </div>
//                 )}

//                 <p className="text-slate-600 leading-relaxed whitespace-pre-line">
//                   {event.description}
//                 </p>
//               </div>

//               {/* Organizer */}
//               <div className="bg-white rounded-2xl border border-slate-200 p-6">
//                 <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
//                   <User className="w-4 h-4 text-blue-600" /> Organized by
//                 </h3>
//                 <div className="flex items-center gap-3">
//                   {event.organizer.image ? (
//                     <img
//                       src={event.organizer.image}
//                       alt={event.organizer.name || ""}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
//                       {event.organizer.name?.charAt(0).toUpperCase() || "O"}
//                     </div>
//                   )}
//                   <div>
//                     <p className="font-medium text-slate-800">
//                       {event.organizer.name}
//                     </p>
//                     <p className="text-sm text-slate-500">
//                       {event.organizer.email}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-4">
//               {/* Registration Card */}
//               <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-20">
//                 <h3 className="font-bold text-slate-900 text-lg mb-5">
//                   Event Details
//                 </h3>

//                 <div className="space-y-3.5 mb-6">
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
//                       <Calendar className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-slate-500 mb-0.5">
//                         Date & Time
//                       </p>
//                       <p className="text-sm font-medium text-slate-800">
//                         {new Date(event.date).toLocaleDateString("en-IN", {
//                           weekday: "long",
//                           day: "numeric",
//                           month: "long",
//                           year: "numeric",
//                         })}
//                       </p>
//                       <p className="text-xs text-slate-500">
//                         {new Date(event.date).toLocaleTimeString("en-IN", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
//                       <MapPin className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-slate-500 mb-0.5">Venue</p>
//                       <p className="text-sm font-medium text-slate-800">
//                         {event.venue}
//                       </p>
//                     </div>
//                   </div>

//                   {event.maxParticipants && (
//                     <div className="flex items-start gap-3">
//                       <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
//                         <Users className="w-4 h-4 text-blue-600" />
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-xs text-slate-500 mb-0.5">
//                           Participants
//                         </p>
//                         <p className="text-sm font-medium text-slate-800">
//                           {event.currentParticipants} / {event.maxParticipants}{" "}
//                           registered
//                         </p>
//                         <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
//                             style={{
//                               width: `${Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)}%`,
//                             }}
//                           />
//                         </div>
//                         {spotsLeft !== null &&
//                           spotsLeft <= 20 &&
//                           spotsLeft > 0 && (
//                             <p className="text-xs text-orange-600 font-medium mt-1">
//                               Only {spotsLeft} spots left!
//                             </p>
//                           )}
//                       </div>
//                     </div>
//                   )}

//                   {event.registrationDeadline && (
//                     <div className="flex items-start gap-3">
//                       <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
//                         <Clock className="w-4 h-4 text-orange-500" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-500 mb-0.5">
//                           Registration Deadline
//                         </p>
//                         <p className="text-sm font-medium text-slate-800">
//                           {new Date(
//                             event.registrationDeadline,
//                           ).toLocaleDateString("en-IN", {
//                             day: "numeric",
//                             month: "long",
//                             year: "numeric",
//                           })}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {event.prizeMoney && (
//                     <div className="flex items-start gap-3">
//                       <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0">
//                         <Trophy className="w-4 h-4 text-yellow-600" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-500 mb-0.5">
//                           Prize Pool
//                         </p>
//                         <p className="text-sm font-bold text-yellow-700">
//                           {event.prizeMoney}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {event.teamSize && (
//                     <div className="flex items-start gap-3">
//                       <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
//                         <Users className="w-4 h-4 text-purple-600" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-500 mb-0.5">
//                           Team Size
//                         </p>
//                         <p className="text-sm font-medium text-slate-800">
//                           {event.teamSize}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* CTA */}
//                 {isRegistered ? (
//                   <div className="flex items-center gap-2 justify-center bg-green-50 border border-green-200 text-green-700 font-semibold py-3.5 rounded-xl text-sm">
//                     <CheckCircle className="w-5 h-5" /> You&apos;re Registered!
//                   </div>
//                 ) : canRegister ? (
//                   <RegisterButton
//                     eventId={event.id}
//                     isLoggedIn={!!session?.user}
//                   />
//                 ) : event.status === "COMPLETED" ? (
//                   <div className="text-center bg-slate-100 text-slate-500 font-medium py-3.5 rounded-xl text-sm">
//                     Event Ended
//                   </div>
//                 ) : spotsLeft === 0 ? (
//                   <div className="text-center bg-red-50 text-red-600 font-medium py-3.5 rounded-xl text-sm border border-red-200">
//                     Fully Booked
//                   </div>
//                 ) : (
//                   <div className="text-center bg-slate-100 text-slate-500 font-medium py-3.5 rounded-xl text-sm">
//                     Registration Closed
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
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
  ArrowRight,
} from "lucide-react";
import { RegisterButton } from "./RegisterButton";
import { EventComments } from "@/components/EventComments";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const categoryColors: Record<string, string> = {
  FORMAL: "bg-blue-100 text-blue-700",
  INFORMAL: "bg-purple-100 text-purple-700",
  HACKATHON: "bg-orange-100 text-orange-800",
  CULTURAL: "bg-pink-100 text-pink-700",
  SPORTS: "bg-green-100 text-green-700",
  WORKSHOP: "bg-cyan-100 text-cyan-700",
  TECHNICAL: "bg-indigo-100 text-indigo-700",
  LITERARY: "bg-yellow-100 text-yellow-800",
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
      registrations: {
        where: { userId: session?.user?.id ?? "__no_user__" },
        select: { userId: true, status: true },
      },
    },
  });

  if (!event) notFound();

  const myRegistration = session?.user?.id ? event.registrations[0] ?? null : null;
  const isRegistered = Boolean(myRegistration);

  const spotsLeft = event.maxParticipants
    ? event.maxParticipants - event.currentParticipants
    : null;

  const canRegister =
    event.status === "UPCOMING" &&
    (!event.registrationDeadline ||
      new Date(event.registrationDeadline) > new Date());

  const statusStyle: Record<string, { bg: string; color: string }> = {
    UPCOMING: { bg: "rgba(16,185,129,0.12)", color: "#10b981" },
    ONGOING: { bg: "rgba(249,115,22,0.12)", color: "#f97316" },
    COMPLETED: { bg: "rgba(100,116,139,0.12)", color: "#64748b" },
    CANCELLED: { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
  };
  const st = statusStyle[event.status] ?? statusStyle.COMPLETED;

  const fillPct = event.maxParticipants
    ? Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)
    : 0;

  const organizerInitial = event.organizer.name?.charAt(0).toUpperCase() || "O";

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap");

        .ed-root {
          font-family: "DM Sans", sans-serif;
          min-height: 100vh;
          background: #f8fafc;
        }
        .ed-heading {
          font-family: "Bebas Neue", sans-serif;
          letter-spacing: -0.01em;
        }

        /* ── Hero banner ── */
        .ed-hero {
          position: relative; overflow: hidden;
          background: #f97316;
          padding: 5.5rem 1rem 2.5rem;
        }
        .ed-hero-blob1 {
          position: absolute; top: -80px; left: -80px;
          width: 380px; height: 380px; border-radius: 50%;
          background: rgba(255,255,255,0.10); filter: blur(70px);
          pointer-events: none;
        }
        .ed-hero-blob2 {
          position: absolute; bottom: -60px; right: -60px;
          width: 300px; height: 300px; border-radius: 50%;
          background: rgba(132,204,22,0.15); filter: blur(65px);
          pointer-events: none;
        }
        .ed-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .ed-hero-inner {
          position: relative; z-index: 10;
          max-width: 62rem; margin: 0 auto;
        }
        .ed-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.8125rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.80); text-decoration: none;
          margin-bottom: 1.5rem;
          transition: color 0.15s;
        }
        .ed-back:hover { color: #fff; }
        .ed-hero-badges {
          display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .ed-badge {
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.12em; padding: 5px 14px; border-radius: 999px;
          display: inline-block;
        }
        .ed-hero-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(40px, 6vw, 80px);
          color: #fff; line-height: 0.88;
          text-transform: uppercase; letter-spacing: -0.01em;
          margin-bottom: 0.75rem;
        }
        .ed-hero-sub {
          color: rgba(255,255,255,0.72);
          font-size: 1rem; font-weight: 500;
          max-width: 38rem;
        }

        /* ── Page body ── */
        .ed-body {
          max-width: 62rem; margin: 0 auto;
          padding: 2rem 1rem 5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .ed-body { grid-template-columns: 1fr 340px; }
        }

        /* ── Cards ── */
        .ed-card {
          background: #fff; border-radius: 2rem;
          border: 1.5px solid #f1f5f9;
          box-shadow: 0 8px 32px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .ed-card-pad { padding: 1.75rem 2rem; }
        .ed-section-eyebrow {
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.18em; color: #f97316; margin-bottom: 4px;
        }
        .ed-section-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(24px, 3vw, 36px);
          color: #0f172a; line-height: 1; text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        /* ── Banner image ── */
        .ed-banner {
          position: relative; height: 280px; overflow: hidden;
          background: linear-gradient(135deg, #fed7aa, #fdba74);
        }
        @media (min-width: 640px) { .ed-banner { height: 340px; } }
        .ed-banner img, .ed-banner video {
          width: 100%; height: 100%; object-fit: cover;
        }
        .ed-banner-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,23,42,0.65) 0%, transparent 55%);
        }
        .ed-banner-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 6rem; opacity: 0.18;
        }
        .ed-banner-badges {
          position: absolute; bottom: 1.25rem; left: 1.25rem;
          display: flex; gap: 0.5rem; flex-wrap: wrap;
        }

        /* ── Share button ── */
        .ed-share {
          width: 40px; height: 40px; border-radius: 12px;
          border: 1.5px solid #f1f5f9; background: #f8fafc;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: border-color 0.15s, background 0.15s;
        }
        .ed-share:hover { border-color: #f97316; background: rgba(249,115,22,0.06); }

        /* ── Tags ── */
        .ed-tag {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 4px 12px; border-radius: 999px;
          background: rgba(249,115,22,0.08); color: #f97316;
          font-size: 0.75rem; font-weight: 700;
        }

        /* ── Description ── */
        .ed-desc {
          color: #475569; line-height: 1.75;
          font-size: 0.9375rem; font-weight: 400;
          white-space: pre-line;
        }

        /* ── Organizer ── */
        .ed-org-avatar {
          width: 44px; height: 44px; border-radius: 14px;
          object-fit: cover; flex-shrink: 0;
          border: 2px solid #f1f5f9;
        }
        .ed-org-avatar-initial {
          width: 44px; height: 44px; border-radius: 14px;
          background: #f97316; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-family: "Bebas Neue", sans-serif; font-size: 1.25rem;
        }

        /* ── Sidebar sticky ── */
        .ed-sidebar { display: flex; flex-direction: column; gap: 1rem; }
        @media (min-width: 1024px) {
          .ed-sidebar-sticky { position: sticky; top: 5rem; }
        }

        /* ── Detail rows ── */
        .ed-detail-list { display: flex; flex-direction: column; gap: 1rem; }
        .ed-detail-row { display: flex; align-items: flex-start; gap: 0.875rem; }
        .ed-detail-icon {
          width: 38px; height: 38px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ed-detail-label {
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.15em; color: #94a3b8; margin-bottom: 3px;
        }
        .ed-detail-value {
          font-size: 0.875rem; font-weight: 700; color: #1e293b;
        }
        .ed-detail-sub {
          font-size: 0.75rem; color: #94a3b8; font-weight: 500; margin-top: 1px;
        }

        /* ── Progress bar ── */
        .ed-progress-track {
          height: 6px; background: #f1f5f9;
          border-radius: 999px; overflow: hidden; margin-top: 8px;
        }
        .ed-progress-fill {
          height: 100%; border-radius: 999px;
          background: linear-gradient(90deg, #f97316, #fb923c);
          transition: width 0.4s ease;
        }
        .ed-spots-left {
          font-size: 0.75rem; font-weight: 800; color: #f97316; margin-top: 4px;
        }

        /* ── Divider ── */
        .ed-divider { height: 1px; background: #f1f5f9; margin: 1.25rem 0; }

        /* ── CTA states ── */
        .ed-cta-registered {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px; border-radius: 16px;
          background: rgba(16,185,129,0.08);
          border: 1.5px solid rgba(16,185,129,0.20);
          color: #10b981; font-weight: 800; font-size: 0.875rem;
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .ed-cta-closed {
          text-align: center; padding: 14px; border-radius: 16px;
          background: #f8fafc; border: 1.5px solid #f1f5f9;
          color: #94a3b8; font-weight: 700; font-size: 0.875rem;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .ed-cta-full {
          text-align: center; padding: 14px; border-radius: 16px;
          background: rgba(239,68,68,0.07);
          border: 1.5px solid rgba(239,68,68,0.15);
          color: #ef4444; font-weight: 800; font-size: 0.875rem;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .ed-cta-waitlist {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px; border-radius: 16px;
          background: rgba(249,115,22,0.08);
          border: 1.5px solid rgba(249,115,22,0.22);
          color: #f97316; font-weight: 800; font-size: 0.875rem;
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .ed-cta-view-teams {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 10px;
          margin-left: auto;
          padding: 14px;
          border-radius: 16px;
          background: #0f172a;
          border: 1.5px solid #0f172a;
          color: #ffffff;
          font-weight: 800;
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: background 0.15s, border-color 0.15s, transform 0.15s;
          text-decoration: none;
        }
        .ed-cta-view-teams:hover {
          background: #1e293b;
          border-color: #1e293b;
          transform: translateY(-1px);
        }
      `}</style>

      <Navbar />

      <div className="ed-root">
        {/* ── HERO ── */}
        <div className="ed-hero">
          <div className="ed-hero-blob1" />
          <div className="ed-hero-blob2" />
          <div className="ed-hero-grid" />
          <div className="ed-hero-inner">
            <Link href="/events" className="ed-back">
              <ArrowLeft style={{ width: "14px", height: "14px" }} />
              Back to Events
            </Link>

            <div className="ed-hero-badges">
              <span
                className={`ed-badge ${categoryColors[event.category] ?? "bg-slate-100 text-slate-600"}`}
              >
                {event.category}
              </span>
              <span
                className="ed-badge"
                style={{ background: st.bg, color: st.color }}
              >
                {event.status}
              </span>
            </div>

            <h1 className="ed-hero-title">{event.title}</h1>

            {event.shortDescription && (
              <p className="ed-hero-sub">{event.shortDescription}</p>
            )}
          </div>
        </div>

        {/* ── BODY GRID ── */}
        <div className="ed-body">
          {/* ── LEFT COLUMN ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Banner image */}
            <div className="ed-card">
              <div className="ed-banner">
                {event.image ? (
                  <img src={event.image} alt={event.title} />
                ) : (
                  <div className="ed-banner-placeholder">🎓</div>
                )}
                <div className="ed-banner-overlay" />
              </div>
            </div>

            {/* Description */}
            <div className="ed-card">
              <div className="ed-card-pad">
                {/* Title row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    <p className="ed-section-eyebrow">About</p>
                    <h2
                      className="ed-section-title"
                      style={{ marginBottom: 0 }}
                    >
                      Event Details
                    </h2>
                  </div>
                  <button className="ed-share" aria-label="Share">
                    <Share2
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#64748b",
                      }}
                    />
                  </button>
                </div>

                {/* Tags */}
                {event.tags && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {event.tags.split(",").map((tag) => (
                      <span key={tag} className="ed-tag">
                        <Tag style={{ width: "10px", height: "10px" }} />
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <p className="ed-desc">{event.description}</p>
              </div>
            </div>

            {/* Organizer */}
            <div className="ed-card">
              <div className="ed-card-pad">
                <p className="ed-section-eyebrow">Host</p>
                <h2 className="ed-section-title">Organized By</h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                  }}
                >
                  {event.organizer.image ? (
                    <img
                      src={event.organizer.image}
                      alt={event.organizer.name || ""}
                      className="ed-org-avatar"
                    />
                  ) : (
                    <div className="ed-org-avatar-initial">
                      {organizerInitial}
                    </div>
                  )}
                  <div>
                    <p
                      style={{
                        fontWeight: 800,
                        color: "#0f172a",
                        fontSize: "0.9375rem",
                      }}
                    >
                      {event.organizer.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: "#94a3b8",
                        fontWeight: 500,
                      }}
                    >
                      {event.organizer.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Component */}
            <EventComments eventId={event.id} />
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="ed-sidebar">
            <div className="ed-card ed-sidebar-sticky">
              <div className="ed-card-pad">
                <p className="ed-section-eyebrow">Register</p>
                <h2 className="ed-section-title">Event Info</h2>

                <div className="ed-detail-list">
                  {/* Date */}
                  <div className="ed-detail-row">
                    <div
                      className="ed-detail-icon"
                      style={{ background: "rgba(249,115,22,0.08)" }}
                    >
                      <Calendar
                        style={{
                          width: "18px",
                          height: "18px",
                          color: "#f97316",
                        }}
                      />
                    </div>
                    <div>
                      <p className="ed-detail-label">Date & Time</p>
                      <p className="ed-detail-value">
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="ed-detail-sub">
                        {new Date(event.date).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="ed-detail-row">
                    <div
                      className="ed-detail-icon"
                      style={{ background: "rgba(96,165,250,0.10)" }}
                    >
                      <MapPin
                        style={{
                          width: "18px",
                          height: "18px",
                          color: "#60a5fa",
                        }}
                      />
                    </div>
                    <div>
                      <p className="ed-detail-label">Venue</p>
                      <p className="ed-detail-value">{event.venue}</p>
                    </div>
                  </div>

                  {/* Participants */}
                  {event.maxParticipants && (
                    <div className="ed-detail-row">
                      <div
                        className="ed-detail-icon"
                        style={{ background: "rgba(139,92,246,0.10)" }}
                      >
                        <Users
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "#8b5cf6",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="ed-detail-label">Participants</p>
                        <p className="ed-detail-value">
                          {event.currentParticipants} / {event.maxParticipants}{" "}
                          registered
                        </p>
                        <div className="ed-progress-track">
                          <div
                            className="ed-progress-fill"
                            style={{ width: `${fillPct}%` }}
                          />
                        </div>
                        {spotsLeft !== null &&
                          spotsLeft <= 20 &&
                          spotsLeft > 0 && (
                            <p className="ed-spots-left">
                              Only {spotsLeft} spots left!
                            </p>
                          )}
                      </div>
                    </div>
                  )}

                  {/* Deadline */}
                  {event.registrationDeadline && (
                    <div className="ed-detail-row">
                      <div
                        className="ed-detail-icon"
                        style={{ background: "rgba(249,115,22,0.08)" }}
                      >
                        <Clock
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "#f97316",
                          }}
                        />
                      </div>
                      <div>
                        <p className="ed-detail-label">Registration Deadline</p>
                        <p className="ed-detail-value">
                          {new Date(
                            event.registrationDeadline,
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Prize */}
                  {event.prizeMoney && (
                    <div className="ed-detail-row">
                      <div
                        className="ed-detail-icon"
                        style={{ background: "rgba(251,191,36,0.12)" }}
                      >
                        <Trophy
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "#f59e0b",
                          }}
                        />
                      </div>
                      <div>
                        <p className="ed-detail-label">Prize Pool</p>
                        <p
                          className="ed-detail-value"
                          style={{ color: "#f59e0b" }}
                        >
                          {event.prizeMoney}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Team size */}
                  {event.teamSize && (
                    <div className="ed-detail-row">
                      <div
                        className="ed-detail-icon"
                        style={{ background: "rgba(139,92,246,0.10)" }}
                      >
                        <Users
                          style={{
                            width: "18px",
                            height: "18px",
                            color: "#8b5cf6",
                          }}
                        />
                      </div>
                      <div>
                        <p className="ed-detail-label">Team Size</p>
                        <p className="ed-detail-value">{event.teamSize}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ed-divider" />

                {/* CTA */}
                {isRegistered && myRegistration?.status === "WAITLISTED" ? (
                  <div className="ed-cta-waitlist">
                    <Clock style={{ width: "18px", height: "18px" }} />
                    You&apos;re Waitlisted
                  </div>
                ) : isRegistered ? (
                  <div className="ed-cta-registered">
                    <CheckCircle style={{ width: "18px", height: "18px" }} />
                    You&apos;re Registered!
                  </div>
                ) : canRegister ? (
                  <RegisterButton
                    eventId={event.id}
                    isLoggedIn={!!session?.user}
                    isHackathon={event.category === "HACKATHON"}
                    isWaitlistOnly={spotsLeft === 0}
                  />
                ) : event.status === "COMPLETED" ? (
                  <div className="ed-cta-closed">Event Ended</div>
                ) : spotsLeft === 0 ? (
                  <div className="ed-cta-full">Fully Booked</div>
                ) : (
                  <div className="ed-cta-closed">Registration Closed</div>
                )}

                <Link href={`/events/${event.id}/registered-teams`} className="ed-cta-view-teams">
                  View registered teams
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
