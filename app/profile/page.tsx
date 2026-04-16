// import { auth } from "@/auth";
// import { prisma } from "@/lib/db";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import {
//   BookOpen,
//   Calendar,
//   CheckCircle,
//   GraduationCap,
//   MapPin,
//   Clock,
//   ArrowRight,
//   Zap,
// } from "lucide-react";
// import { RegisterPasskeyButton } from "@/components/RegisterPasskeyButton";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";

// const categoryColors: Record<string, string> = {
//   FORMAL: "bg-blue-100 text-blue-700",
//   INFORMAL: "bg-purple-100 text-purple-700",
//   HACKATHON: "bg-orange-100 text-orange-800",
//   CULTURAL: "bg-pink-100 text-pink-700",
//   SPORTS: "bg-green-100 text-green-700",
//   WORKSHOP: "bg-cyan-100 text-cyan-700",
//   TECHNICAL: "bg-indigo-100 text-indigo-700",
//   LITERARY: "bg-yellow-100 text-yellow-800",
// };

// const categoryEmoji: Record<string, string> = {
//   FORMAL: "🎓",
//   INFORMAL: "🎉",
//   HACKATHON: "⚡",
//   CULTURAL: "🎭",
//   SPORTS: "⚽",
//   WORKSHOP: "🔧",
//   TECHNICAL: "💻",
//   LITERARY: "📚",
// };

// const avatarColors = [
//   "#fbbf24",
//   "#34d399",
//   "#60a5fa",
//   "#f472b6",
//   "#f97316",
//   "#a78bfa",
// ];

// export default async function ProfilePage() {
//   const session = await auth();
//   if (!session?.user?.id) redirect("/login");

//   const user = await prisma.user.findUnique({
//     where: { id: session.user.id },
//     include: {
//       registrations: {
//         include: {
//           event: {
//             select: {
//               id: true,
//               title: true,
//               category: true,
//               date: true,
//               venue: true,
//               status: true,
//             },
//           },
//         },
//         orderBy: { registeredAt: "desc" },
//       },
//       Authenticator: true,
//     },
//   });

//   if (!user) redirect("/login");

//   const upcomingRegs = user.registrations.filter(
//     (r) => r.event.status === "UPCOMING",
//   );
//   const pastRegs = user.registrations.filter(
//     (r) => r.event.status !== "UPCOMING",
//   );
//   const initial = user.name?.charAt(0).toUpperCase() || "U";
//   const hasPasskey = user.Authenticator && user.Authenticator.length > 0;

//   // pick a deterministic color from name
//   const avatarColor =
//     avatarColors[(user.name?.charCodeAt(0) ?? 0) % avatarColors.length];

//   return (
//     <>
//       <Navbar />
//       <div className="profile-body min-h-screen bg-slate-50 pt-24 pb-16">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
//           {/* ── PROFILE HERO CARD ── */}
//           <div
//             className="relative overflow-hidden rounded-[2rem] bg-[#f97316]"
//             style={{ boxShadow: "0 24px 60px rgba(249,115,22,0.25)" }}
//           >
//             {/* background blobs */}
//             <div className="pointer-events-none absolute inset-0">
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "-80px",
//                   left: "-80px",
//                   width: "360px",
//                   height: "360px",
//                   borderRadius: "50%",
//                   background: "rgba(255,255,255,0.1)",
//                   filter: "blur(70px)",
//                 }}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "-60px",
//                   right: "-60px",
//                   width: "280px",
//                   height: "280px",
//                   borderRadius: "50%",
//                   background: "rgba(132,204,22,0.15)",
//                   filter: "blur(60px)",
//                 }}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   backgroundImage:
//                     "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
//                   backgroundSize: "36px 36px",
//                 }}
//               />
//             </div>

//             <div className="relative z-10 p-8 md:p-10">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-6">
//                 {/* Avatar */}
//                 {user.image ? (
//                   <img
//                     src={user.image}
//                     alt={user.name || ""}
//                     className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.25rem] object-cover flex-shrink-0"
//                     style={{
//                       boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//                       border: "4px solid rgba(255,255,255,0.3)",
//                     }}
//                   />
//                 ) : (
//                   <div
//                     className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.25rem] flex items-center justify-center text-white text-3xl sm:text-4xl flex-shrink-0"
//                     style={{
//                       background: avatarColor,
//                       boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//                       border: "4px solid rgba(255,255,255,0.25)",
//                       fontFamily: "'Bebas Neue', sans-serif",
//                     }}
//                   >
//                     {initial}
//                   </div>
//                 )}

//                 {/* Info */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex flex-wrap items-center gap-2 mb-1">
//                     <h1
//                       className="profile-heading text-white uppercase leading-none"
//                       style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
//                     >
//                       {user.name || "Student"}
//                     </h1>
//                     <span
//                       className="text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full"
//                       style={{
//                         background:
//                           user.role === "ADMIN"
//                             ? "#a78bfa22"
//                             : "rgba(255,255,255,0.15)",
//                         color: "#fff",
//                         border: "1.5px solid rgba(255,255,255,0.25)",
//                       }}
//                     >
//                       {user.role}
//                     </span>
//                   </div>
//                   <p className="text-white/70 text-sm font-medium">
//                     {user.email}
//                   </p>
//                   <p className="text-white/50 text-xs mt-0.5">
//                     Member since{" "}
//                     {new Date(user.createdAt).toLocaleDateString("en-IN", {
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </p>
//                 </div>

//                 {/* Passkey button */}
//                 <div className="sm:ml-auto flex-shrink-0">
//                   <RegisterPasskeyButton
//                     hasPasskey={hasPasskey}
//                     email={user.email}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── STATS ROW ── */}
//           <div className="grid grid-cols-3 gap-4">
//             {[
//               {
//                 label: "Registrations",
//                 value: user.registrations.length,
//                 icon: BookOpen,
//                 color: "#f97316",
//                 bg: "rgba(249,115,22,0.08)",
//               },
//               {
//                 label: "Upcoming",
//                 value: upcomingRegs.length,
//                 icon: Calendar,
//                 color: "#10b981",
//                 bg: "rgba(16,185,129,0.08)",
//               },
//               {
//                 label: "Attended",
//                 value: pastRegs.length,
//                 icon: CheckCircle,
//                 color: "#8b5cf6",
//                 bg: "rgba(139,92,246,0.08)",
//               },
//             ].map(({ label, value, icon: Icon, color, bg }) => (
//               <div
//                 key={label}
//                 className="bg-white rounded-[1.5rem] p-5 sm:p-7 text-center border border-slate-100"
//                 style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}
//               >
//                 <div
//                   className="w-11 h-11 rounded-xl mx-auto mb-3 flex items-center justify-center"
//                   style={{ background: bg }}
//                 >
//                   <Icon className="w-5 h-5" style={{ color }} />
//                 </div>
//                 <p
//                   className="profile-heading leading-none mb-1"
//                   style={{ fontSize: "clamp(28px, 4vw, 42px)", color }}
//                 >
//                   {value}
//                 </p>
//                 <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
//                   {label}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* ── REGISTERED EVENTS ── */}
//           <div
//             className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden"
//             style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.05)" }}
//           >
//             {/* Header */}
//             <div className="px-8 py-6 border-b border-slate-100 flex items-center gap-3">
//               <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
//                 <GraduationCap className="w-5 h-5 text-[#f97316]" />
//               </div>
//               <div>
//                 <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#f97316]">
//                   Dashboard
//                 </p>
//                 <h2 className="profile-heading text-slate-900 text-3xl uppercase leading-none">
//                   My Events
//                 </h2>
//               </div>
//               {user.registrations.length > 0 && (
//                 <span
//                   className="ml-auto text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
//                   style={{ background: "#f97316", color: "#fff" }}
//                 >
//                   {user.registrations.length} total
//                 </span>
//               )}
//             </div>

//             <div className="p-6 sm:p-8">
//               {user.registrations.length === 0 ? (
//                 /* Empty state */
//                 <div className="text-center py-16">
//                   <div
//                     className="w-20 h-20 rounded-[1.5rem] mx-auto mb-6 flex items-center justify-center text-4xl"
//                     style={{ background: "rgba(249,115,22,0.08)" }}
//                   >
//                     🎯
//                   </div>
//                   <h3 className="profile-heading text-slate-900 text-4xl uppercase mb-2">
//                     No Events Yet
//                   </h3>
//                   <p className="text-slate-400 font-medium text-sm mb-8">
//                     You haven't registered for any events yet.
//                   </p>
//                   <Link
//                     href="/events"
//                     className="inline-flex items-center gap-2 font-black uppercase text-sm tracking-widest transition-all duration-200"
//                     style={{
//                       background: "#f97316",
//                       color: "#fff",
//                       padding: "12px 32px",
//                       borderRadius: "14px",
//                       boxShadow: "0 8px 28px rgba(249,115,22,0.3)",
//                     }}
//                   >
//                     Browse Events
//                     <ArrowRight className="w-4 h-4" />
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {user.registrations.map((reg) => {
//                     const emoji = categoryEmoji[reg.event.category] || "📋";
//                     const catColor =
//                       categoryColors[reg.event.category] ||
//                       "bg-slate-100 text-slate-600";
//                     const isUpcoming = reg.event.status === "UPCOMING";
//                     const isOngoing = reg.event.status === "ONGOING";

//                     return (
//                       <Link
//                         key={reg.id}
//                         href={`/events/${reg.event.id}`}
//                         className="group flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-[1.25rem] border border-slate-100 transition-all duration-200"
//                         style={{ background: "#fff" }}
//                         onMouseEnter={(e) => {
//                           (e.currentTarget as HTMLElement).style.borderColor =
//                             "#f97316";
//                           (e.currentTarget as HTMLElement).style.boxShadow =
//                             "0 4px 20px rgba(249,115,22,0.1)";
//                         }}
//                         onMouseLeave={(e) => {
//                           (e.currentTarget as HTMLElement).style.borderColor =
//                             "#f1f5f9";
//                           (e.currentTarget as HTMLElement).style.boxShadow =
//                             "none";
//                         }}
//                       >
//                         {/* Emoji */}
//                         <div
//                           className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
//                           style={{ background: "rgba(249,115,22,0.07)" }}
//                         >
//                           {emoji}
//                         </div>

//                         {/* Details */}
//                         <div className="flex-1 min-w-0">
//                           <p className="font-bold text-slate-800 text-sm truncate group-hover:text-[#f97316] transition-colors">
//                             {reg.event.title}
//                           </p>
//                           <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
//                             <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
//                               <Clock className="w-3 h-3" />
//                               {new Date(reg.event.date).toLocaleDateString(
//                                 "en-IN",
//                                 {
//                                   day: "numeric",
//                                   month: "short",
//                                   year: "numeric",
//                                 },
//                               )}
//                             </span>
//                             <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
//                               <MapPin className="w-3 h-3" />
//                               {reg.event.venue}
//                             </span>
//                           </div>
//                         </div>

//                         {/* Badges */}
//                         <div className="flex items-center gap-2 flex-shrink-0">
//                           <span
//                             className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${catColor}`}
//                           >
//                             {reg.event.category}
//                           </span>
//                           <span
//                             className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
//                             style={{
//                               background: isUpcoming
//                                 ? "rgba(16,185,129,0.1)"
//                                 : isOngoing
//                                   ? "rgba(249,115,22,0.1)"
//                                   : "rgba(100,116,139,0.1)",
//                               color: isUpcoming
//                                 ? "#10b981"
//                                 : isOngoing
//                                   ? "#f97316"
//                                   : "#64748b",
//                             }}
//                           >
//                             {reg.event.status}
//                           </span>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  GraduationCap,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Ticket,
  User as UserIcon,
  LayoutDashboard,
} from "lucide-react";
import { RegisterPasskeyButton } from "@/components/RegisterPasskeyButton";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegistrationLifecycleManager } from "./RegistrationLifecycleManager";

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

const categoryEmoji: Record<string, string> = {
  FORMAL: "🎓",
  INFORMAL: "🎉",
  HACKATHON: "⚡",
  CULTURAL: "🎭",
  SPORTS: "⚽",
  WORKSHOP: "🔧",
  TECHNICAL: "💻",
  LITERARY: "📚",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      registrations: {
        include: {
          teamParticipants: {
            select: {
              id: true,
              name: true,
              rollNumber: true,
              course: true,
              phoneNumber: true,
            },
          },
          event: {
            select: {
              id: true,
              title: true,
              category: true,
              date: true,
              venue: true,
              status: true,
              registrationDeadline: true,
            },
          },
        },
        orderBy: { registeredAt: "desc" },
      },
      Authenticator: true,
    },
  });

  if (!user) redirect("/login");

  const hasPasskey = user.Authenticator && user.Authenticator.length > 0;
  const initial = user.name?.charAt(0).toUpperCase() || "U";
  const upcomingCount = user.registrations.filter(
    (r) => r.event.status === "UPCOMING",
  ).length;
  const lifecycleRegistrations = user.registrations.map((registration) => ({
    id: registration.id,
    eventId: registration.event.id,
    eventTitle: registration.event.title,
    eventCategory: registration.event.category,
    eventVenue: registration.event.venue,
    eventDate: registration.event.date.toISOString(),
    eventStatus: registration.event.status,
    registrationDeadline: registration.event.registrationDeadline
      ? registration.event.registrationDeadline.toISOString()
      : null,
    status: registration.status,
    teamName: registration.teamName,
    teamParticipants: registration.teamParticipants,
  }));

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] selection:bg-orange-100"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* --- HEADER SECTION --- */}
        <section className="flex flex-col md:flex-row gap-8 items-end justify-between mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                {user.role} Account
              </span>
              {hasPasskey && (
                <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <ShieldCheck className="w-3.5 h-3.5" /> Biometrics Active
                </div>
              )}
            </div>
            <h1
              className="text-7xl md:text-8xl text-slate-900 leading-[0.8] tracking-tighter"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              HEY,{" "}
              <span className="text-orange-500">
                {user.name?.split(" ")[0] || "STUDENT"}
              </span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              Your portal for campus events and achievements.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <RegisterPasskeyButton hasPasskey={hasPasskey} email={user.email} />
          </div>
        </section>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-12 gap-6">
          {/* 1. Profile Identity Card */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-5">
                <div
                  className="w-20 h-20 rounded-3xl overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl shadow-lg border-4 border-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {initial}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {user.name}
                  </h2>
                  <p className="text-sm text-slate-500 truncate w-48">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Student Rank
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    Standard Member
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Joined
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {new Date(user.createdAt).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
            <UserIcon className="absolute -right-8 -bottom-8 text-slate-50 w-48 h-48 -rotate-12" />
          </div>

          {/* 2. Stats Grid */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-orange-500 rounded-[2.5rem] p-8 text-white flex flex-col justify-between group cursor-default">
              <Ticket className="w-10 h-10 opacity-50 group-hover:scale-110 transition-transform" />
              <div>
                <div
                  className="text-5xl font-black mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {user.registrations.length}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80">
                  Total Registrations
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 flex flex-col justify-between">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <div
                  className="text-5xl font-black text-slate-900 mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {upcomingCount}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Upcoming Events
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <div
                  className="text-5xl font-black text-white mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  100%
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                  Attendance Rate
                </div>
              </div>
            </div>
          </div>

          {/* 3. Event List - Full Width Bento */}
          <div className="col-span-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-10 py-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="text-orange-500 w-6 h-6" />
                </div>
                <h2
                  className="text-4xl font-black text-slate-900"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  My Scheduled Events
                </h2>
              </div>
              <Link
                href="/events"
                className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-all"
              >
                Explore Events{" "}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="p-8">
              {user.registrations.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <p className="text-6xl">🎯</p>
                  <p className="text-xl font-bold text-slate-400 uppercase tracking-tighter">
                    Your schedule is currently empty
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.registrations.map((reg) => (
                    <Link
                      key={reg.id}
                      href={`/events/${reg.event.id}`}
                      className="group p-6 rounded-[2rem] bg-slate-50 border border-transparent hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {categoryEmoji[reg.event.category] || "🎯"}
                        </span>
                        <span
                          className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${categoryColors[reg.event.category]}`}
                        >
                          {reg.event.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 mb-4">
                        {reg.event.title}
                      </h3>
                      <div className="flex flex-col gap-2 border-t border-slate-200/60 pt-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-orange-500" />
                          {new Date(reg.event.date).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-orange-500" />
                          {reg.event.venue}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-12">
            <RegistrationLifecycleManager registrations={lifecycleRegistrations} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
