// "use client";
// import { prisma } from "@/lib/db";
// import { EventCard } from "@/components/EventCard";
// import Link from "next/link";
// import { Filter, Calendar } from "lucide-react";
// import { SearchBox } from "@/components/SearchBox";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";

// const categories = [
//   { value: "", label: "All Events" },
//   { value: "FORMAL", label: "Formal" },
//   { value: "INFORMAL", label: "Informal" },
//   { value: "HACKATHON", label: "Hackathons" },
//   { value: "CULTURAL", label: "Cultural" },
//   { value: "SPORTS", label: "Sports" },
//   { value: "WORKSHOP", label: "Workshops" },
//   { value: "TECHNICAL", label: "Technical" },
//   { value: "LITERARY", label: "Literary" },
// ];

// const statusFilters = [
//   { value: "", label: "All Status" },
//   { value: "UPCOMING", label: "Upcoming" },
//   { value: "ONGOING", label: "Ongoing" },
//   { value: "COMPLETED", label: "Completed" },
// ];

// interface Props {
//   searchParams: Promise<{
//     category?: string;
//     status?: string;
//     search?: string;
//   }>;
// }

// export default async function EventsPage({ searchParams }: Props) {
//   const { category, status, search } = await searchParams;

//   const eventsPromise = prisma.event.findMany({
//     where: {
//       ...(category ? { category: category as never } : {}),
//       ...(status ? { status: status as never } : {}),
//       ...(search
//         ? {
//             OR: [
//               { title: { contains: search } },
//               { description: { contains: search } },
//               { venue: { contains: search } },
//             ],
//           }
//         : {}),
//     },
//     orderBy: { date: "asc" },
//   });

//   const recentEventsPromise = prisma.event.findMany({
//     orderBy: { createdAt: "desc" },
//     take: 5,
//     select: {
//       id: true,
//       title: true,
//       date: true,
//       venue: true,
//       category: true,
//     },
//   });

//   const [events, recentEvents] = await Promise.all([
//     eventsPromise,
//     recentEventsPromise,
//   ]);

//   const activeCat = category || "";
//   const activeStatus = status || "";

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-slate-50">
//         {/* Header */}
//         <div className="bg-gradient-to-br from-blue-700 to-blue-900 py-16 px-4">
//           <div className="max-w-7xl mx-auto text-center">
//             <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
//               All Events
//             </h1>
//             <p className="text-blue-200 text-lg max-w-xl mx-auto">
//               Discover and register for events happening across campus
//             </p>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//           {/* Search & Filters */}
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8 space-y-4">
//             {/* Search bar */}
//             <SearchBox
//               initialSearch={search || ""}
//               category={category || ""}
//               status={status || ""}
//               recentEvents={recentEvents}
//             />

//             {/* Category filter */}
//             <div>
//               <div className="flex items-center gap-2 mb-3">
//                 <Filter className="w-4 h-4 text-slate-500" />
//                 <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                   Category
//                 </span>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.value}
//                     href={`/events?${cat.value ? `category=${cat.value}` : ""}${activeStatus ? `&status=${activeStatus}` : ""}${search ? `&search=${search}` : ""}`}
//                     className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
//                       activeCat === cat.value
//                         ? "bg-blue-600 text-white shadow-sm"
//                         : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
//                     }`}
//                   >
//                     {cat.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Status filter */}
//             <div>
//               <div className="flex items-center gap-2 mb-3">
//                 <Calendar className="w-4 h-4 text-slate-500" />
//                 <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
//                   Status
//                 </span>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {statusFilters.map((s) => (
//                   <Link
//                     key={s.value}
//                     href={`/events?${activeCat ? `category=${activeCat}` : ""}${s.value ? `&status=${s.value}` : ""}${search ? `&search=${search}` : ""}`}
//                     className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
//                       activeStatus === s.value
//                         ? "bg-blue-600 text-white shadow-sm"
//                         : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
//                     }`}
//                   >
//                     {s.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Results count */}
//           <div className="flex items-center justify-between mb-6">
//             <p className="text-sm text-slate-500">
//               <span className="font-semibold text-slate-800">
//                 {events.length}
//               </span>{" "}
//               event{events.length !== 1 ? "s" : ""} found
//             </p>
//             {(activeCat || activeStatus || search) && (
//               <Link
//                 href="/events"
//                 className="text-sm text-blue-600 hover:underline font-medium"
//               >
//                 Clear filters
//               </Link>
//             )}
//           </div>

//           {/* Events Grid */}
//           {events.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {events.map((event) => (
//                 <EventCard
//                   key={event.id}
//                   id={event.id}
//                   title={event.title}
//                   description={event.shortDescription || event.description}
//                   category={event.category}
//                   date={event.date}
//                   venue={event.venue}
//                   maxParticipants={event.maxParticipants}
//                   currentParticipants={event.currentParticipants}
//                   image={event.image}
//                   prizeMoney={event.prizeMoney}
//                   status={event.status}
//                   registrationDeadline={event.registrationDeadline}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-200">
//               <div className="text-6xl mb-4">🔍</div>
//               <h3 className="text-xl font-semibold text-slate-700 mb-2">
//                 No events found
//               </h3>
//               <p className="text-slate-500 mb-6">
//                 {search
//                   ? `No events match "${search}"`
//                   : "No events in this category yet."}
//               </p>
//               <Link
//                 href="/events"
//                 className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
//               >
//                 View All Events
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

import { prisma } from "@/lib/db";
import { EventCard } from "@/components/EventCard";
import Link from "next/link";
import { Filter, Calendar, ArrowRight, Search } from "lucide-react";
import { SearchBox } from "@/components/SearchBox";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const categories = [
  { value: "", label: "All Events" },
  { value: "FORMAL", label: "Formal" },
  { value: "INFORMAL", label: "Informal" },
  { value: "HACKATHON", label: "Hackathons" },
  { value: "CULTURAL", label: "Cultural" },
  { value: "SPORTS", label: "Sports" },
  { value: "WORKSHOP", label: "Workshops" },
  { value: "TECHNICAL", label: "Technical" },
  { value: "LITERARY", label: "Literary" },
];

const statusFilters = [
  { value: "", label: "All Status" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
];

interface Props {
  searchParams: Promise<{
    category?: string;
    status?: string;
    search?: string;
  }>;
}

export default async function EventsPage({ searchParams }: Props) {
  const { category, status, search } = await searchParams;

  const eventsPromise = prisma.event.findMany({
    where: {
      ...(category ? { category: category as never } : {}),
      ...(status ? { status: status as never } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search } },
              { description: { contains: search } },
              { venue: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: { date: "asc" },
  });

  const recentEventsPromise = prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, title: true, date: true, venue: true, category: true },
  });

  const [events, recentEvents] = await Promise.all([
    eventsPromise,
    recentEventsPromise,
  ]);

  const activeCat = category || "";
  const activeStatus = status || "";
  const hasFilters = !!(activeCat || activeStatus || search);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap");

        .ev-root {
          font-family: "DM Sans", sans-serif;
          min-height: 100vh;
          background: #f8fafc;
        }
        .ev-heading {
          font-family: "Bebas Neue", sans-serif;
          letter-spacing: -0.01em;
        }

        /* ── Hero ── */
        .ev-hero {
          position: relative; overflow: hidden;
          background: #f97316;
          padding: 5rem 1rem 3.5rem;
        }
        .ev-hero-blob1 {
          position: absolute; top: -80px; left: -80px;
          width: 380px; height: 380px; border-radius: 50%;
          background: rgba(255,255,255,0.10); filter: blur(70px);
          pointer-events: none;
        }
        .ev-hero-blob2 {
          position: absolute; bottom: -60px; right: -60px;
          width: 300px; height: 300px; border-radius: 50%;
          background: rgba(132,204,22,0.15); filter: blur(65px);
          pointer-events: none;
        }
        .ev-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .ev-hero-inner {
          position: relative; z-index: 10;
          max-width: 80rem; margin: 0 auto;
          text-align: center;
        }
        .ev-hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #0f172a; color: #fff;
          font-size: 10px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.18em;
          padding: 5px 14px; border-radius: 999px; margin-bottom: 1.25rem;
        }
        .ev-hero-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(52px, 8vw, 100px);
          color: #fff; line-height: 0.85;
          text-transform: uppercase; letter-spacing: -0.01em;
          margin-bottom: 1rem;
        }
        .ev-hero-sub {
          color: rgba(255,255,255,0.75);
          font-size: 1.0625rem; font-weight: 500;
          max-width: 32rem; margin: 0 auto;
        }

        /* ── Body ── */
        .ev-body {
          max-width: 80rem; margin: 0 auto;
          padding: 2rem 1rem 4rem;
        }

        /* ── Filter panel ── */
        .ev-filters {
          background: #fff; border-radius: 2rem;
          border: 1.5px solid #f1f5f9;
          box-shadow: 0 8px 32px rgba(0,0,0,0.05);
          padding: 1.75rem 2rem;
          margin-bottom: 1.75rem;
          display: flex; flex-direction: column; gap: 1.25rem;
        }
        .ev-filter-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.18em;
          color: #94a3b8; margin-bottom: 0.625rem;
        }
        .ev-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }

        /* pill - inactive */
        .ev-pill {
          padding: 6px 16px; border-radius: 999px;
          font-size: 0.8125rem; font-weight: 700;
          text-decoration: none;
          border: 1.5px solid #f1f5f9;
          background: #f8fafc; color: #64748b;
          transition: border-color 0.15s, background 0.15s, color 0.15s, transform 0.15s;
          display: inline-block;
        }
        .ev-pill:hover {
          border-color: #f97316;
          background: rgba(249,115,22,0.06);
          color: #f97316;
          transform: translateY(-1px);
        }
        /* pill - active */
        .ev-pill-active {
          padding: 6px 16px; border-radius: 999px;
          font-size: 0.8125rem; font-weight: 800;
          text-decoration: none;
          border: 1.5px solid #f97316;
          background: #f97316; color: #fff;
          display: inline-block;
          box-shadow: 0 4px 14px rgba(249,115,22,0.30);
        }

        /* ── Results bar ── */
        .ev-results-bar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;
        }
        .ev-results-count {
          font-size: 0.875rem; color: #64748b; font-weight: 500;
        }
        .ev-results-count strong { color: #0f172a; font-weight: 800; }
        .ev-clear {
          font-size: 0.8125rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: #f97316; text-decoration: none;
          display: inline-flex; align-items: center; gap: 4px;
          transition: opacity 0.15s;
        }
        .ev-clear:hover { opacity: 0.7; }

        /* ── Events grid ── */
        .ev-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
        }
        @media (min-width: 640px)  { .ev-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .ev-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1280px) { .ev-grid { grid-template-columns: repeat(4, 1fr); } }

        /* ── Empty state ── */
        .ev-empty {
          text-align: center; padding: 5rem 2rem;
          background: #fff; border-radius: 2rem;
          border: 1.5px dashed #e2e8f0;
        }
        .ev-empty-icon {
          width: 80px; height: 80px; border-radius: 1.5rem;
          background: rgba(249,115,22,0.08); font-size: 2.5rem;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .ev-empty-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2.5rem; color: #0f172a;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .ev-empty-sub {
          color: #94a3b8; font-weight: 500;
          font-size: 0.9375rem; margin-bottom: 2rem;
        }
        .ev-empty-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: "DM Sans", sans-serif; font-weight: 800;
          font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.1em;
          color: #fff; background: #f97316; text-decoration: none;
          padding: 12px 32px; border-radius: 14px;
          box-shadow: 0 8px 28px rgba(249,115,22,0.28);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ev-empty-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(249,115,22,0.38);
        }

        /* filter divider */
        .ev-divider {
          height: 1px; background: #f1f5f9; margin: 0;
        }
      `}</style>

      <Navbar />
      <div className="ev-root">
        {/* ── HERO ── */}
        <div className="ev-hero">
          <div className="ev-hero-blob1" />
          <div className="ev-hero-blob2" />
          <div className="ev-hero-grid" />
          <div className="ev-hero-inner">
            <div className="ev-hero-badge">
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#84cc16",
                  display: "inline-block",
                }}
              />
              Campus Events
            </div>
            <h1 className="ev-hero-title">
              Discover
              <br />
              <span
                style={{
                  WebkitTextStroke: "2px rgba(255,255,255,0.45)",
                  color: "transparent",
                }}
              >
                Every
              </span>{" "}
              Event
            </h1>
            <p className="ev-hero-sub">
              Browse and register for events happening across campus — from
              hackathons to cultural fests.
            </p>
          </div>
        </div>

        <div className="ev-body">
          {/* ── FILTER PANEL ── */}
          <div className="ev-filters">
            {/* Search box */}
            <SearchBox
              initialSearch={search || ""}
              category={activeCat}
              status={activeStatus}
              recentEvents={recentEvents}
            />

            <div className="ev-divider" />

            {/* Category pills */}
            <div>
              <div className="ev-filter-label">
                <Filter style={{ width: "13px", height: "13px" }} />
                Category
              </div>
              <div className="ev-pills">
                {categories.map((cat) => {
                  const href = `/events?${cat.value ? `category=${cat.value}` : ""}${activeStatus ? `&status=${activeStatus}` : ""}${search ? `&search=${search}` : ""}`;
                  const isActive = activeCat === cat.value;
                  return (
                    <Link
                      key={cat.value}
                      href={href}
                      className={isActive ? "ev-pill-active" : "ev-pill"}
                    >
                      {cat.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="ev-divider" />

            {/* Status pills */}
            <div>
              <div className="ev-filter-label">
                <Calendar style={{ width: "13px", height: "13px" }} />
                Status
              </div>
              <div className="ev-pills">
                {statusFilters.map((s) => {
                  const href = `/events?${activeCat ? `category=${activeCat}` : ""}${s.value ? `&status=${s.value}` : ""}${search ? `&search=${search}` : ""}`;
                  const isActive = activeStatus === s.value;
                  return (
                    <Link
                      key={s.value}
                      href={href}
                      className={isActive ? "ev-pill-active" : "ev-pill"}
                    >
                      {s.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RESULTS BAR ── */}
          <div className="ev-results-bar">
            <p className="ev-results-count">
              <strong>{events.length}</strong> event
              {events.length !== 1 ? "s" : ""} found
              {search && (
                <>
                  {" "}
                  for &ldquo;<strong>{search}</strong>&rdquo;
                </>
              )}
            </p>
            {hasFilters && (
              <Link href="/events" className="ev-clear">
                Clear filters ×
              </Link>
            )}
          </div>

          {/* ── EVENTS GRID / EMPTY ── */}
          {events.length > 0 ? (
            // <div className="ev-grid">
            //   {events.map((event) => (
            //     <EventCard
            //       key={event.id}
            //       id={event.id}
            //       title={event.title}
            //       description={event.shortDescription || event.description}
            //       category={event.category}
            //       date={event.date}
            //       venue={event.venue}
            //       maxParticipants={event.maxParticipants}
            //       currentParticipants={event.currentParticipants}
            //       image={event.image}
            //       prizeMoney={event.prizeMoney}
            //       status={event.status}
            //       registrationDeadline={event.registrationDeadline}
            //     />
            //   ))}
            // </div>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <EventCard
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
                </div>
              ))}
            </div>
          ) : (
            <div className="ev-empty">
              <div className="ev-empty-icon">🔍</div>
              <h3 className="ev-empty-title">No Events Found</h3>
              <p className="ev-empty-sub">
                {search
                  ? `No events match "${search}"`
                  : "No events in this category yet."}
              </p>
              <Link href="/events" className="ev-empty-btn">
                View All Events
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
