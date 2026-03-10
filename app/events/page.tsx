// import { prisma } from "@/lib/db";
// import { EventCard } from "@/components/EventCard";
// import Link from "next/link";
// import { Search, Filter, Calendar } from "lucide-react";

// const categories = [
//     { value: "", label: "All Events" },
//     { value: "FORMAL", label: "Formal" },
//     { value: "INFORMAL", label: "Informal" },
//     { value: "HACKATHON", label: "Hackathons" },
//     { value: "CULTURAL", label: "Cultural" },
//     { value: "SPORTS", label: "Sports" },
//     { value: "WORKSHOP", label: "Workshops" },
//     { value: "TECHNICAL", label: "Technical" },
//     { value: "LITERARY", label: "Literary" },
// ];

// const statusFilters = [
//     { value: "", label: "All Status" },
//     { value: "UPCOMING", label: "Upcoming" },
//     { value: "ONGOING", label: "Ongoing" },
//     { value: "COMPLETED", label: "Completed" },
// ];

// interface Props {
//     searchParams: Promise<{ category?: string; status?: string; search?: string }>;
// }

// export default async function EventsPage({ searchParams }: Props) {
//     const { category, status, search } = await searchParams;

//     const events = await prisma.event.findMany({
//         where: {
//             ...(category ? { category: category as never } : {}),
//             ...(status ? { status: status as never } : {}),
//             ...(search
//                 ? {
//                     OR: [
//                         { title: { contains: search } },
//                         { description: { contains: search } },
//                         { venue: { contains: search } },
//                     ],
//                 }
//                 : {}),
//         },
//         orderBy: { date: "asc" },
//     });

//     const activeCat = category || "";
//     const activeStatus = status || "";

//     return (
//         <div className="min-h-screen bg-slate-50">
//             {/* Header */}
//             <div className="bg-gradient-to-br from-blue-700 to-blue-900 py-16 px-4">
//                 <div className="max-w-7xl mx-auto text-center">
//                     <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
//                         All Events
//                     </h1>
//                     <p className="text-blue-200 text-lg max-w-xl mx-auto">
//                         Discover and register for events happening across campus
//                     </p>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//                 {/* Search & Filters */}
//                 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8 space-y-4">
//                     {/* Search bar */}
//                     <form method="GET" action="/events" className="relative">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                         <input
//                             name="search"
//                             defaultValue={search || ""}
//                             type="text"
//                             placeholder="Search events by name, venue..."
//                             className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                         {category && <input type="hidden" name="category" value={category} />}
//                         {status && <input type="hidden" name="status" value={status} />}
//                     </form>

//                     {/* Category filter */}
//                     <div>
//                         <div className="flex items-center gap-2 mb-3">
//                             <Filter className="w-4 h-4 text-slate-500" />
//                             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</span>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                             {categories.map((cat) => (
//                                 <Link
//                                     key={cat.value}
//                                     href={`/events?${cat.value ? `category=${cat.value}` : ""}${activeStatus ? `&status=${activeStatus}` : ""}${search ? `&search=${search}` : ""}`}
//                                     className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCat === cat.value
//                                             ? "bg-blue-600 text-white shadow-sm"
//                                             : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
//                                         }`}
//                                 >
//                                     {cat.label}
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Status filter */}
//                     <div>
//                         <div className="flex items-center gap-2 mb-3">
//                             <Calendar className="w-4 h-4 text-slate-500" />
//                             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</span>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                             {statusFilters.map((s) => (
//                                 <Link
//                                     key={s.value}
//                                     href={`/events?${activeCat ? `category=${activeCat}` : ""}${s.value ? `&status=${s.value}` : ""}${search ? `&search=${search}` : ""}`}
//                                     className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeStatus === s.value
//                                             ? "bg-blue-600 text-white shadow-sm"
//                                             : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
//                                         }`}
//                                 >
//                                     {s.label}
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Results count */}
//                 <div className="flex items-center justify-between mb-6">
//                     <p className="text-sm text-slate-500">
//                         <span className="font-semibold text-slate-800">{events.length}</span>{" "}
//                         event{events.length !== 1 ? "s" : ""} found
//                     </p>
//                     {(activeCat || activeStatus || search) && (
//                         <Link href="/events" className="text-sm text-blue-600 hover:underline font-medium">
//                             Clear filters
//                         </Link>
//                     )}
//                 </div>

//                 {/* Events Grid */}
//                 {events.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {events.map((event) => (
//                             <EventCard
//                                 key={event.id}
//                                 id={event.id}
//                                 title={event.title}
//                                 description={event.shortDescription || event.description}
//                                 category={event.category}
//                                 date={event.date}
//                                 venue={event.venue}
//                                 maxParticipants={event.maxParticipants}
//                                 currentParticipants={event.currentParticipants}
//                                 image={event.image}
//                                 prizeMoney={event.prizeMoney}
//                                 status={event.status}
//                                 registrationDeadline={event.registrationDeadline}
//                             />
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-200">
//                         <div className="text-6xl mb-4">🔍</div>
//                         <h3 className="text-xl font-semibold text-slate-700 mb-2">No events found</h3>
//                         <p className="text-slate-500 mb-6">
//                             {search
//                                 ? `No events match "${search}"`
//                                 : "No events in this category yet."}
//                         </p>
//                         <Link
//                             href="/events"
//                             className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
//                         >
//                             View All Events
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import { prisma } from "@/lib/db";
import { EventCard } from "@/components/EventCard";
import Link from "next/link";
import {
  Search,
  Filter,
  Calendar,
  Zap,
  BookOpen,
  Star,
  Music,
  Dumbbell,
  PenTool,
  Cpu,
  X,
} from "lucide-react";

const categories = [
  { value: "", label: "All Events", code: "00", accent: "#00ffc8" },
  {
    value: "FORMAL",
    label: "Formal",
    code: "01",
    accent: "#00aaff",
    icon: BookOpen,
  },
  {
    value: "INFORMAL",
    label: "Informal",
    code: "02",
    accent: "#bf80ff",
    icon: Star,
  },
  {
    value: "HACKATHON",
    label: "Hackathons",
    code: "03",
    accent: "#ffaa00",
    icon: Zap,
  },
  {
    value: "CULTURAL",
    label: "Cultural",
    code: "04",
    accent: "#ff5599",
    icon: Music,
  },
  {
    value: "SPORTS",
    label: "Sports",
    code: "05",
    accent: "#44ff88",
    icon: Dumbbell,
  },
  {
    value: "WORKSHOP",
    label: "Workshops",
    code: "06",
    accent: "#00ddff",
    icon: PenTool,
  },
  {
    value: "TECHNICAL",
    label: "Technical",
    code: "07",
    accent: "#ff6644",
    icon: Cpu,
  },
  {
    value: "LITERARY",
    label: "Literary",
    code: "08",
    accent: "#ffdd44",
    icon: BookOpen,
  },
];

const statusFilters = [
  { value: "", label: "All Status", accent: "#00ffc8" },
  { value: "UPCOMING", label: "Upcoming", accent: "#00ffc8" },
  { value: "ONGOING", label: "Ongoing", accent: "#ffaa00" },
  { value: "COMPLETED", label: "Completed", accent: "#666e88" },
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

  const events = await prisma.event.findMany({
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

  const activeCat = category || "";
  const activeStatus = status || "";
  const hasFilters = !!(activeCat || activeStatus || search);
  const activeCatData =
    categories.find((c) => c.value === activeCat) || categories[0];
  const activeStatusData =
    statusFilters.find((s) => s.value === activeStatus) || statusFilters[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

        .events-root {
          min-height: 100vh;
          background: #020810;
          font-family: 'Syne', sans-serif;
          color: rgba(200,230,255,0.85);
          position: relative;
          overflow-x: hidden;
        }

        /* Grid background */
        .ev-grid-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(0,255,200,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,200,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* ── HERO HEADER ── */
        .ev-header {
          position: relative;
          z-index: 1;
          padding: 72px 24px 56px;
          border-bottom: 1px solid rgba(0,255,200,0.08);
          overflow: hidden;
        }

        .ev-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffc8 30%, #00aaff 70%, transparent);
        }

        /* Animated orb behind header */
        .ev-header-orb {
          position: absolute;
          width: 700px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,255,200,0.05), transparent 70%);
          filter: blur(80px);
          top: -100px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          animation: orbPulse 8s ease-in-out infinite alternate;
        }

        @keyframes orbPulse {
          from { opacity: 0.6; transform: translateX(-50%) scale(1); }
          to { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }

        .ev-header-inner {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .ev-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #00ffc8;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .ev-eyebrow::before {
          content: '';
          display: block;
          width: 32px; height: 1px;
          background: #00ffc8;
          box-shadow: 0 0 8px #00ffc8;
        }

        .ev-h1 {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(2.2rem, 6vw, 4rem);
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1.05;
          margin-bottom: 16px;
        }

        .ev-h1 span {
          background: linear-gradient(135deg, #00ffc8, #00aaff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ev-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          color: rgba(150,190,230,0.45);
          max-width: 420px;
          line-height: 1.8;
        }

        /* Count badge */
        .ev-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: rgba(0,255,200,0.7);
          border: 1px solid rgba(0,255,200,0.18);
          background: rgba(0,255,200,0.05);
          padding: 5px 14px;
          clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
          margin-top: 24px;
        }

        /* ── CONTROLS PANEL ── */
        .ev-controls {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        .ev-panel {
          background: rgba(6,15,30,0.85);
          border: 1px solid rgba(0,255,200,0.1);
          backdrop-filter: blur(20px);
          padding: 28px;
          position: relative;
          overflow: hidden;
        }

        .ev-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,200,0.4), transparent);
        }

        /* Search input */
        .ev-search-wrap {
          position: relative;
          margin-bottom: 28px;
        }

        .ev-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(0,255,200,0.4);
          pointer-events: none;
        }

        .ev-search-input {
          width: 100%;
          background: rgba(2,8,16,0.8);
          border: 1px solid rgba(0,255,200,0.15);
          color: rgba(200,230,255,0.9);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          padding: 14px 16px 14px 48px;
          outline: none;
          clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .ev-search-input::placeholder {
          color: rgba(100,140,180,0.35);
          letter-spacing: 0.06em;
        }

        .ev-search-input:focus {
          border-color: rgba(0,255,200,0.4);
          box-shadow: 0 0 0 1px rgba(0,255,200,0.15), 0 0 20px rgba(0,255,200,0.06);
        }

        /* Filter section label */
        .filter-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,255,200,0.4);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .filter-label::before {
          content: '//';
          color: rgba(0,255,200,0.25);
        }

        /* Filter chips */
        .filter-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }

        .filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          padding: 6px 14px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          color: rgba(150,190,230,0.5);
          clip-path: polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);
          transition: all 0.2s;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .filter-chip:hover {
          border-color: rgba(0,255,200,0.3);
          color: rgba(200,230,255,0.8);
          background: rgba(0,255,200,0.05);
        }

        .filter-chip.active {
          border-color: var(--chip-accent);
          background: color-mix(in srgb, var(--chip-accent) 12%, transparent);
          color: var(--chip-accent);
          box-shadow: 0 0 12px color-mix(in srgb, var(--chip-accent) 20%, transparent);
        }

        .chip-code {
          opacity: 0.4;
          font-size: 0.58rem;
        }

        .chip-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.7;
        }

        /* Divider */
        .filter-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,200,0.08), transparent);
          margin: 24px 0;
        }

        /* Clear filter link */
        .clear-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,100,100,0.5);
          border: 1px solid rgba(255,100,100,0.15);
          padding: 4px 12px;
          clip-path: polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);
          transition: all 0.2s;
          text-decoration: none;
        }

        .clear-btn:hover {
          color: rgba(255,100,100,0.9);
          border-color: rgba(255,100,100,0.4);
          background: rgba(255,100,100,0.05);
        }

        /* ── RESULTS BAR ── */
        .results-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .results-count {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          color: rgba(150,190,230,0.4);
          letter-spacing: 0.08em;
        }

        .results-count strong {
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          color: #00ffc8;
          font-weight: 700;
        }

        /* ── EVENTS GRID ── */
        .ev-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2px;
        }

        /* ── EMPTY STATE ── */
        .ev-empty {
          text-align: center;
          padding: 80px 40px;
          border: 1px solid rgba(0,255,200,0.08);
          background: rgba(6,15,30,0.6);
          position: relative;
          overflow: hidden;
        }

        .ev-empty::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,200,0.2), transparent);
        }

        .ev-empty-glyph {
          font-family: 'Orbitron', monospace;
          font-size: 4rem;
          font-weight: 900;
          color: rgba(0,255,200,0.07);
          margin-bottom: 20px;
          line-height: 1;
        }

        .ev-empty-title {
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          margin-bottom: 10px;
          letter-spacing: 0.05em;
        }

        .ev-empty-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: rgba(150,190,230,0.3);
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .ev-empty-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Orbitron', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #020810;
          padding: 12px 28px;
          background: linear-gradient(135deg, #00ffc8, #00aaff);
          clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
          transition: all 0.2s;
          text-decoration: none;
        }

        .ev-empty-btn:hover {
          box-shadow: 0 0 24px rgba(0,255,200,0.35);
          transform: translateY(-2px);
        }

        /* Active filter summary tags */
        .active-filters {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .active-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: rgba(0,255,200,0.7);
          border: 1px solid rgba(0,255,200,0.2);
          background: rgba(0,255,200,0.05);
          padding: 3px 10px;
          clip-path: polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);
        }

        .active-tag-label {
          opacity: 0.5;
          margin-right: 2px;
        }
      `}</style>

      <div className="events-root">
        <div className="ev-grid-bg" />

        {/* ── HEADER ── */}
        <header className="ev-header">
          <div className="ev-header-orb" />
          <div className="ev-header-inner">
            <div className="ev-eyebrow">Event Directory</div>
            <h1 className="ev-h1">
              All <span>Events</span>
            </h1>
            <p className="ev-sub">
              Discover and register for events happening across campus. Filter
              by category, status, or search by name.
            </p>
            <div className="ev-count-badge">
              <span style={{ color: "#00ffc8", fontWeight: 700 }}>
                {events.length}
              </span>
              &nbsp;event{events.length !== 1 ? "s" : ""} in system
            </div>
          </div>
        </header>

        {/* ── CONTROLS ── */}
        <div className="ev-controls">
          <div className="ev-panel">
            {/* Search */}
            <form method="GET" action="/events" className="ev-search-wrap">
              <Search
                className="ev-search-icon"
                style={{ width: 16, height: 16 }}
              />
              <input
                name="search"
                defaultValue={search || ""}
                type="text"
                placeholder="// search by name, venue, description..."
                className="ev-search-input"
              />
              {category && (
                <input type="hidden" name="category" value={category} />
              )}
              {status && <input type="hidden" name="status" value={status} />}
            </form>

            {/* Category filters */}
            <div className="filter-label">
              <Filter style={{ width: 12, height: 12 }} /> Category Filter
            </div>
            <div className="filter-chips">
              {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href={`/events?${cat.value ? `category=${cat.value}` : ""}${activeStatus ? `&status=${activeStatus}` : ""}${search ? `&search=${search}` : ""}`}
                  className={`filter-chip ${activeCat === cat.value ? "active" : ""}`}
                  style={{ "--chip-accent": cat.accent } as React.CSSProperties}
                >
                  {activeCat === cat.value && <span className="chip-dot" />}
                  <span className="chip-code">{cat.code}</span>
                  {cat.label}
                </Link>
              ))}
            </div>

            <div className="filter-divider" />

            {/* Status filters */}
            <div className="filter-label">
              <Calendar style={{ width: 12, height: 12 }} /> Status Filter
            </div>
            <div className="filter-chips" style={{ marginBottom: 0 }}>
              {statusFilters.map((s) => (
                <Link
                  key={s.value}
                  href={`/events?${activeCat ? `category=${activeCat}` : ""}${s.value ? `&status=${s.value}` : ""}${search ? `&search=${search}` : ""}`}
                  className={`filter-chip ${activeStatus === s.value ? "active" : ""}`}
                  style={{ "--chip-accent": s.accent } as React.CSSProperties}
                >
                  {activeStatus === s.value && <span className="chip-dot" />}
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Results bar */}
          <div className="results-bar" style={{ marginTop: 28 }}>
            <div className="results-count">
              <strong>{events.length}</strong>&nbsp;event
              {events.length !== 1 ? "s" : ""} found
              {hasFilters && (
                <span style={{ marginLeft: 12, opacity: 0.5 }}>
                  with active filters
                </span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Active filter tags */}
              {hasFilters && (
                <div className="active-filters">
                  {activeCat && (
                    <span
                      className="active-tag"
                      style={{
                        borderColor: `${activeCatData.accent}44`,
                        color: activeCatData.accent,
                        background: `${activeCatData.accent}0d`,
                      }}
                    >
                      <span className="active-tag-label">CAT:</span>
                      {activeCatData.label}
                    </span>
                  )}
                  {activeStatus && (
                    <span
                      className="active-tag"
                      style={{
                        borderColor: `${activeStatusData.accent}44`,
                        color: activeStatusData.accent,
                        background: `${activeStatusData.accent}0d`,
                      }}
                    >
                      <span className="active-tag-label">STATUS:</span>
                      {activeStatusData.label}
                    </span>
                  )}
                  {search && (
                    <span className="active-tag">
                      <span className="active-tag-label">QUERY:</span>"{search}"
                    </span>
                  )}
                  <Link href="/events" className="clear-btn">
                    <X style={{ width: 10, height: 10 }} /> Clear
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Events grid */}
          {events.length > 0 ? (
            <div className="ev-grid">
              {events.map((event) => (
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
            <div className="ev-empty">
              <div className="ev-empty-glyph">[ 0 ]</div>
              <h3 className="ev-empty-title">No Events Found</h3>
              <p className="ev-empty-sub">
                {search
                  ? `No results matching "${search}" in the database.`
                  : "No events match the current filter configuration."}
                <br />
                Adjust filters or clear to browse all events.
              </p>
              <Link href="/events" className="ev-empty-btn">
                Reset Filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}