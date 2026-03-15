// import { auth } from "@/auth";
// import { prisma } from "@/lib/db";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import {
//   LayoutDashboard,
//   CalendarPlus,
//   Users,
//   Calendar,
//   CheckCircle,
//   Clock,
//   TrendingUp,
//   ArrowRight,
// } from "lucide-react";
// import { Footer } from "@/components/Footer";
// import { Navbar } from "@/components/Navbar";

// export default async function AdminDashboard() {
//   const session = await auth();
//   if (!session?.user?.id) redirect("/login");

//   const user = await prisma.user.findUnique({ where: { id: session.user.id } });
//   if (user?.role !== "ADMIN") redirect("/");

//   const [
//     totalEvents,
//     totalUsers,
//     totalRegistrations,
//     upcomingEvents,
//     recentEvents,
//   ] = await Promise.all([
//     prisma.event.count(),
//     prisma.user.count(),
//     prisma.registration.count(),
//     prisma.event.count({ where: { status: "UPCOMING" } }),
//     prisma.event.findMany({
//       orderBy: { createdAt: "desc" },
//       take: 5,
//       include: { _count: { select: { registrations: true } } },
//     }),
//   ]);

//   const stats = [
//     {
//       label: "Total Events",
//       value: totalEvents,
//       icon: Calendar,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//     },
//     {
//       label: "Upcoming Events",
//       value: upcomingEvents,
//       icon: Clock,
//       color: "text-orange-600",
//       bg: "bg-orange-50",
//     },
//     {
//       label: "Total Students",
//       value: totalUsers,
//       icon: Users,
//       color: "text-purple-600",
//       bg: "bg-purple-50",
//     },
//     {
//       label: "Total Registrations",
//       value: totalRegistrations,
//       icon: TrendingUp,
//       color: "text-green-600",
//       bg: "bg-green-50",
//     },
//   ];

//   const statusColors: Record<string, string> = {
//     UPCOMING: "bg-blue-100 text-blue-700",
//     ONGOING: "bg-green-100 text-green-700",
//     COMPLETED: "bg-slate-100 text-slate-600",
//     CANCELLED: "bg-red-100 text-red-700",
//   };

//   const categoryColors: Record<string, string> = {
//     FORMAL: "bg-blue-100 text-blue-700",
//     INFORMAL: "bg-purple-100 text-purple-700",
//     HACKATHON: "bg-orange-100 text-orange-700",
//     CULTURAL: "bg-pink-100 text-pink-700",
//     SPORTS: "bg-green-100 text-green-700",
//     WORKSHOP: "bg-cyan-100 text-cyan-700",
//     TECHNICAL: "bg-indigo-100 text-indigo-700",
//     LITERARY: "bg-yellow-100 text-yellow-700",
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-slate-50">
//         {/* Header */}
//         <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
//                 <LayoutDashboard className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-slate-900">
//                   Admin Dashboard
//                 </h1>
//                 <p className="text-sm text-slate-500">
//                   Welcome back, {session.user.name?.split(" ")[0]}
//                 </p>
//               </div>
//             </div>
//             <Link
//               href="/admin/events/new"
//               className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-blue-200 text-sm"
//             >
//               <CalendarPlus className="w-4 h-4" /> Create Event
//             </Link>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
//           {/* Stats Grid */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             {stats.map(({ label, value, icon: Icon, color, bg }) => (
//               <div
//                 key={label}
//                 className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
//               >
//                 <div
//                   className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}
//                 >
//                   <Icon className={`w-5 h-5 ${color}`} />
//                 </div>
//                 <p className="text-2xl font-extrabold text-slate-900">
//                   {value}
//                 </p>
//                 <p className="text-sm text-slate-500 mt-0.5">{label}</p>
//               </div>
//             ))}
//           </div>

//           {/* Quick Actions */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {[
//               {
//                 label: "Create New Event",
//                 desc: "Add a new event to the platform",
//                 href: "/admin/events/new",
//                 icon: CalendarPlus,
//                 color: "blue",
//               },
//               {
//                 label: "Manage Events",
//                 desc: "Edit or delete existing events",
//                 href: "/admin/events",
//                 icon: Calendar,
//                 color: "purple",
//               },
//               {
//                 label: "Registrations",
//                 desc: "See all student registrations",
//                 href: "/admin/registrations",
//                 icon: CheckCircle,
//                 color: "green",
//               },
//               {
//                 label: "Manage Users",
//                 desc: "View and delete user accounts",
//                 href: "/admin/users",
//                 icon: Users,
//                 color: "orange",
//               },
//             ].map(({ label, desc, href, icon: Icon, color }) => (
//               <Link
//                 key={href}
//                 href={href}
//                 className={`group bg-white rounded-2xl border border-slate-200 p-5 hover:border-${color}-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
//               >
//                 <div
//                   className={`w-10 h-10 bg-${color}-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
//                 >
//                   <Icon className={`w-5 h-5 text-${color}-600`} />
//                 </div>
//                 <p className="font-semibold text-slate-800 mb-1">{label}</p>
//                 <p className="text-xs text-slate-500">{desc}</p>
//                 <div
//                   className={`flex items-center gap-1 mt-3 text-xs font-medium text-${color}-600 opacity-0 group-hover:opacity-100 transition-opacity`}
//                 >
//                   Go <ArrowRight className="w-3 h-3" />
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {/* Recent Events Table */}
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//             <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//               <h2 className="font-bold text-slate-900 flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-blue-600" /> Recent Events
//               </h2>
//               <Link
//                 href="/admin/events"
//                 className="text-sm text-blue-600 hover:underline font-medium"
//               >
//                 View all →
//               </Link>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-slate-50 border-b border-slate-100">
//                   <tr>
//                     {[
//                       "Event",
//                       "Category",
//                       "Date",
//                       "Registered",
//                       "Status",
//                       "Actions",
//                     ].map((h) => (
//                       <th
//                         key={h}
//                         className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide"
//                       >
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50">
//                   {recentEvents.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan={6}
//                         className="px-6 py-10 text-center text-slate-400 text-sm"
//                       >
//                         No events created yet.{" "}
//                         <Link
//                           href="/admin/events/new"
//                           className="text-blue-600 font-medium hover:underline"
//                         >
//                           Create one →
//                         </Link>
//                       </td>
//                     </tr>
//                   ) : (
//                     recentEvents.map((event) => (
//                       <tr
//                         key={event.id}
//                         className="hover:bg-slate-50 transition-colors"
//                       >
//                         <td className="px-6 py-4 font-medium text-slate-800 max-w-[200px] truncate">
//                           {event.title}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span
//                             className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[event.category] || "bg-slate-100 text-slate-600"}`}
//                           >
//                             {event.category}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
//                           {new Date(event.date).toLocaleDateString("en-IN", {
//                             day: "numeric",
//                             month: "short",
//                             year: "numeric",
//                           })}
//                         </td>
//                         <td className="px-6 py-4 text-slate-600">
//                           {event._count.registrations}
//                           {event.maxParticipants
//                             ? ` / ${event.maxParticipants}`
//                             : ""}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span
//                             className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[event.status] || "bg-slate-100"}`}
//                           >
//                             {event.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <Link
//                               href={`/admin/events/${event.id}/edit`}
//                               className="text-xs font-medium text-blue-600 hover:underline"
//                             >
//                               Edit
//                             </Link>
//                             <Link
//                               href={`/events/${event.id}`}
//                               className="text-xs font-medium text-slate-500 hover:underline"
//                             >
//                               View
//                             </Link>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
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
  LayoutDashboard,
  CalendarPlus,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user?.role !== "ADMIN") redirect("/");

  const [
    totalEvents,
    totalUsers,
    totalRegistrations,
    upcomingEvents,
    recentEvents,
  ] = await Promise.all([
    prisma.event.count(),
    prisma.user.count(),
    prisma.registration.count(),
    prisma.event.count({ where: { status: "UPCOMING" } }),
    prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { _count: { select: { registrations: true } } },
    }),
  ]);

  const statusStyle: Record<string, { bg: string; color: string }> = {
    UPCOMING: { bg: "rgba(16,185,129,0.10)", color: "#10b981" },
    ONGOING:  { bg: "rgba(249,115,22,0.10)", color: "#f97316" },
    COMPLETED:{ bg: "rgba(100,116,139,0.10)", color: "#64748b" },
    CANCELLED:{ bg: "rgba(239,68,68,0.10)", color: "#ef4444" },
  };

  const categoryColors: Record<string, string> = {
    FORMAL:    "bg-blue-100 text-blue-700",
    INFORMAL:  "bg-purple-100 text-purple-700",
    HACKATHON: "bg-orange-100 text-orange-800",
    CULTURAL:  "bg-pink-100 text-pink-700",
    SPORTS:    "bg-green-100 text-green-700",
    WORKSHOP:  "bg-cyan-100 text-cyan-700",
    TECHNICAL: "bg-indigo-100 text-indigo-700",
    LITERARY:  "bg-yellow-100 text-yellow-800",
  };

  const quickActions = [
    { label: "Create Event",      desc: "Add a new event",              href: "/admin/events/new",          icon: CalendarPlus, color: "#f97316", iconBg: "rgba(249,115,22,0.10)" },
    { label: "Manage Events",     desc: "Edit or delete events",         href: "/admin/events",               icon: Calendar,     color: "#8b5cf6", iconBg: "rgba(139,92,246,0.10)"  },
    { label: "Event Requests",    desc: "Review student event requests", href: "/admin/event-requests",       icon: CheckCircle,  color: "#f59e0b", iconBg: "rgba(245,158,11,0.10)"  },
    { label: "Registrations",     desc: "All student sign-ups",          href: "/admin/registrations",        icon: Zap,          color: "#10b981", iconBg: "rgba(16,185,129,0.10)"  },
    { label: "Manage Users",      desc: "View & delete accounts",        href: "/admin/users",                icon: Users,        color: "#60a5fa", iconBg: "rgba(96,165,250,0.10)"  },
  ];

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap");

        .adm-root {
          font-family: "DM Sans", sans-serif;
          min-height: 100vh;
          background: #f8fafc;
        }
        .adm-heading {
          font-family: "Bebas Neue", sans-serif;
          letter-spacing: -0.01em;
        }

        /* ── Hero banner ── */
        .adm-hero {
          position: relative; overflow: hidden;
          background: #f97316;
          padding: 2rem 1.5rem;
        }
        @media (min-width: 768px) { .adm-hero { padding: 2.5rem 3rem; } }
        .adm-hero-blob1 {
          position: absolute; top: -80px; left: -80px;
          width: 340px; height: 340px; border-radius: 50%;
          background: rgba(255,255,255,0.10); filter: blur(70px);
          pointer-events: none;
        }
        .adm-hero-blob2 {
          position: absolute; bottom: -60px; right: -60px;
          width: 260px; height: 260px; border-radius: 50%;
          background: rgba(132,204,22,0.15); filter: blur(60px);
          pointer-events: none;
        }
        .adm-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .adm-hero-inner {
          position: relative; z-index: 10;
          max-width: 80rem; margin: 0 auto;
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between; gap: 1rem;
        }
        .adm-hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #0f172a; color: #fff;
          font-size: 10px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.18em;
          padding: 5px 14px; border-radius: 999px; margin-bottom: 10px;
        }
        .adm-hero-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(36px, 5vw, 60px);
          color: #fff; line-height: 0.9;
          text-transform: uppercase; letter-spacing: -0.01em;
        }
        .adm-hero-sub {
          color: rgba(255,255,255,0.70);
          font-size: 0.875rem; font-weight: 500; margin-top: 4px;
        }
        .adm-create-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: "DM Sans", sans-serif; font-weight: 800;
          font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.1em;
          color: #f97316; background: #0f172a; text-decoration: none;
          padding: 12px 28px; border-radius: 14px;
          box-shadow: 0 8px 28px rgba(15,23,42,0.30);
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .adm-create-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(15,23,42,0.40);
        }

        /* ── Page body ── */
        .adm-body {
          max-width: 80rem; margin: 0 auto;
          padding: 2rem 1rem;
          display: flex; flex-direction: column; gap: 1.75rem;
        }

        /* ── Stat cards ── */
        .adm-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 1024px) {
          .adm-stats { grid-template-columns: repeat(4, 1fr); }
        }
        .adm-stat {
          background: #fff; border-radius: 1.5rem;
          border: 1.5px solid #f1f5f9;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .adm-stat-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
        }
        .adm-stat-value {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(32px, 4vw, 46px);
          line-height: 1; margin-bottom: 2px;
        }
        .adm-stat-label {
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.15em; color: #94a3b8;
        }

        /* ── Section header ── */
        .adm-section-eyebrow {
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.2em; color: #f97316; margin-bottom: 4px;
        }
        .adm-section-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(28px, 3vw, 40px);
          color: #0f172a; line-height: 1; text-transform: uppercase;
        }

        /* ── Quick action cards ── */
        .adm-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 1024px) {
          .adm-actions { grid-template-columns: repeat(4, 1fr); }
        }
        .adm-action {
          background: #fff; border-radius: 1.5rem;
          border: 1.5px solid #f1f5f9; padding: 1.5rem;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          display: flex; flex-direction: column;
        }
        .adm-action:hover {
          border-color: #f97316;
          box-shadow: 0 8px 32px rgba(249,115,22,0.12);
          transform: translateY(-4px);
        }
        .adm-action:hover .adm-action-arrow { opacity: 1; transform: translateX(0); }
        .adm-action-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px; flex-shrink: 0;
        }
        .adm-action-label {
          font-weight: 800; font-size: 0.9375rem; color: #0f172a; margin-bottom: 4px;
        }
        .adm-action-desc {
          font-size: 0.75rem; color: #94a3b8; font-weight: 500;
          flex: 1;
        }
        .adm-action-arrow {
          display: inline-flex; align-items: center; gap: 4px;
          margin-top: 14px; font-size: 0.75rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: #f97316;
          opacity: 0; transform: translateX(-6px);
          transition: opacity 0.2s, transform 0.2s;
        }

        /* ── Table panel ── */
        .adm-table-panel {
          background: #fff; border-radius: 2rem;
          border: 1.5px solid #f1f5f9; overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.05);
        }
        .adm-table-header {
          padding: 1.5rem 2rem; border-bottom: 1.5px solid #f1f5f9;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          flex-wrap: wrap;
        }
        .adm-table-header-left {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .adm-table-header-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(249,115,22,0.08); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .adm-viewall {
          font-size: 0.8125rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.1em; color: #f97316; text-decoration: none;
          display: inline-flex; align-items: center; gap: 4px;
          transition: gap 0.15s;
        }
        .adm-viewall:hover { gap: 8px; }

        /* table itself */
        .adm-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        .adm-table thead { background: #fafafa; border-bottom: 1.5px solid #f1f5f9; }
        .adm-table th {
          text-align: left; padding: 12px 20px;
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.15em; color: #94a3b8;
          white-space: nowrap;
        }
        .adm-table tbody tr {
          border-bottom: 1px solid #f8fafc;
          transition: background 0.15s;
        }
        .adm-table tbody tr:last-child { border-bottom: none; }
        .adm-table tbody tr:hover { background: #fff8f4; }
        .adm-table td { padding: 14px 20px; vertical-align: middle; }
        .adm-event-title {
          font-weight: 700; color: #1e293b;
          max-width: 200px; overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
        }
        .adm-badge {
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em; padding: 4px 10px; border-radius: 999px;
          display: inline-block;
        }
        .adm-table-date { color: #64748b; white-space: nowrap; font-weight: 500; }
        .adm-table-reg { color: #64748b; font-weight: 600; }
        .adm-link-edit {
          font-size: 0.75rem; font-weight: 800; color: #f97316;
          text-decoration: none; text-transform: uppercase; letter-spacing: 0.08em;
          transition: opacity 0.15s;
        }
        .adm-link-edit:hover { opacity: 0.7; }
        .adm-link-view {
          font-size: 0.75rem; font-weight: 800; color: #94a3b8;
          text-decoration: none; text-transform: uppercase; letter-spacing: 0.08em;
          transition: color 0.15s;
        }
        .adm-link-view:hover { color: #0f172a; }

        /* empty table state */
        .adm-empty-cell {
          padding: 3rem; text-align: center;
          color: #94a3b8; font-weight: 500;
        }
        .adm-empty-link {
          color: #f97316; font-weight: 800; text-decoration: none;
        }
        .adm-empty-link:hover { opacity: 0.75; }
      `}</style>

      <Navbar />

      <div className="adm-root">

        {/* ── HERO BANNER ── */}
        <div className="adm-hero">
          <div className="adm-hero-blob1" />
          <div className="adm-hero-blob2" />
          <div className="adm-hero-grid" />
          <div className="adm-hero-inner">
            <div>
              <div className="adm-hero-badge">
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#84cc16", display: "inline-block", animation: "pulse 2s infinite" }} />
                Admin Panel
              </div>
              <h1 className="adm-hero-title">
                Dashboard<br />
                <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.45)", color: "transparent" }}>
                  Overview
                </span>
              </h1>
              <p className="adm-hero-sub">
                Welcome back, {session.user.name?.split(" ")[0]} 👋
              </p>
            </div>
            <Link href="/admin/events/new" className="adm-create-btn">
              <CalendarPlus style={{ width: "16px", height: "16px" }} />
              Create Event
            </Link>
          </div>
        </div>

        <div className="adm-body">

          {/* ── STATS ── */}
          <div>
            <p className="adm-section-eyebrow">At a Glance</p>
            <h2 className="adm-section-title">Platform Stats</h2>
            <div className="adm-stats" style={{ marginTop: "1rem" }}>
              {[
                { label: "Total Events",        value: totalEvents,         icon: Calendar,   color: "#f97316", bg: "rgba(249,115,22,0.08)"  },
                { label: "Upcoming Events",      value: upcomingEvents,      icon: Clock,      color: "#10b981", bg: "rgba(16,185,129,0.08)"  },
                { label: "Total Students",       value: totalUsers,          icon: Users,      color: "#8b5cf6", bg: "rgba(139,92,246,0.08)"  },
                { label: "Total Registrations",  value: totalRegistrations,  icon: TrendingUp, color: "#60a5fa", bg: "rgba(96,165,250,0.08)"  },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="adm-stat">
                  <div className="adm-stat-icon" style={{ background: bg }}>
                    <Icon style={{ width: "20px", height: "20px", color }} />
                  </div>
                  <p className="adm-stat-value" style={{ color }}>{value}</p>
                  <p className="adm-stat-label">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── QUICK ACTIONS ── */}
          <div>
            <p className="adm-section-eyebrow">Shortcuts</p>
            <h2 className="adm-section-title">Quick Actions</h2>
            <div className="adm-actions" style={{ marginTop: "1rem" }}>
              {quickActions.map(({ label, desc, href, icon: Icon, color, iconBg }) => (
                <Link key={href} href={href} className="adm-action">
                  <div className="adm-action-icon" style={{ background: iconBg }}>
                    <Icon style={{ width: "20px", height: "20px", color }} />
                  </div>
                  <p className="adm-action-label">{label}</p>
                  <p className="adm-action-desc">{desc}</p>
                  <span className="adm-action-arrow" style={{ color }}>
                    Go <ArrowRight style={{ width: "12px", height: "12px" }} />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── RECENT EVENTS TABLE ── */}
          <div className="adm-table-panel">
            <div className="adm-table-header">
              <div className="adm-table-header-left">
                <div className="adm-table-header-icon">
                  <CheckCircle style={{ width: "18px", height: "18px", color: "#f97316" }} />
                </div>
                <div>
                  <p className="adm-section-eyebrow" style={{ marginBottom: "2px" }}>Latest</p>
                  <h2 className="adm-section-title" style={{ fontSize: "1.75rem" }}>Recent Events</h2>
                </div>
              </div>
              <Link href="/admin/events" className="adm-viewall">
                View All <ArrowRight style={{ width: "13px", height: "13px" }} />
              </Link>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="adm-table">
                <thead>
                  <tr>
                    {["Event", "Category", "Date", "Registered", "Status", "Actions"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="adm-empty-cell">
                        No events yet.{" "}
                        <Link href="/admin/events/new" className="adm-empty-link">
                          Create one →
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    recentEvents.map((event) => {
                      const st = statusStyle[event.status] ?? { bg: "rgba(100,116,139,0.10)", color: "#64748b" };
                      const catCls = categoryColors[event.category] ?? "bg-slate-100 text-slate-600";
                      return (
                        <tr key={event.id}>
                          <td>
                            <span className="adm-event-title">{event.title}</span>
                          </td>
                          <td>
                            <span className={`adm-badge ${catCls}`}>{event.category}</span>
                          </td>
                          <td className="adm-table-date">
                            {new Date(event.date).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </td>
                          <td className="adm-table-reg">
                            {event._count.registrations}
                            {event.maxParticipants ? ` / ${event.maxParticipants}` : ""}
                          </td>
                          <td>
                            <span
                              className="adm-badge"
                              style={{ background: st.bg, color: st.color }}
                            >
                              {event.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <Link href={`/admin/events/${event.id}/edit`} className="adm-link-edit">
                                Edit
                              </Link>
                              <Link href={`/events/${event.id}`} className="adm-link-view">
                                View
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}