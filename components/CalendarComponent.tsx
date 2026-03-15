// // "use client";

// // import { useEffect, useState } from "react";
// // import FullCalendar from "@fullcalendar/react";
// // import dayGridPlugin from "@fullcalendar/daygrid";

// // type CalendarEvent = {
// //   id: string;
// //   title: string;
// //   date: string;
// //   status: string;
// //   userStatus: string | null;
// // };

// // export default function CalendarComponent() {
// //   const [events, setEvents] = useState<CalendarEvent[]>([]);
// //   const [filter, setFilter] = useState("all");

// //   useEffect(() => {
// //     fetch("/api/calendar")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setEvents(data);
// //       });
// //   }, []);

// //   const filteredEvents = events.filter((event) => {
// //     if (filter === "registered") {
// //       return event.userStatus === "CONFIRMED";
// //     }

// //     if (filter === "attended") {
// //       return event.status === "COMPLETED";
// //     }

// //     return true;
// //   });

// //   const formattedEvents = filteredEvents.map((event) => {
// //     let color = "green";
// //     let badge = "🟢";

// //     if (event.userStatus === "CONFIRMED") {
// //       color = "blue";
// //       badge = "🔵";
// //     }

// //     if (event.status === "COMPLETED") {
// //       color = "gray";
// //       badge = "⚪";
// //     }

// //     return {
// //       id: event.id,
// //       title: `${event.title} ${badge}`,
// //       date: event.date,
// //       color: color,
// //     };
// //   });

// //   return (
// //     <div className="space-y-4">
// //       {/* Filters */}
// //       <div className="flex gap-3">
// //         <button
// //           onClick={() => setFilter("all")}
// //           className="px-3 py-1 bg-black text-white rounded"
// //         >
// //           All Events
// //         </button>

// //         <button
// //           onClick={() => setFilter("registered")}
// //           className="px-3 py-1 bg-blue-600 text-white rounded"
// //         >
// //           Registered Events
// //         </button>

// //         <button
// //           onClick={() => setFilter("attended")}
// //           className="px-3 py-1 bg-gray-600 text-white rounded"
// //         >
// //           Attended Events
// //         </button>
// //       </div>

// //       {/* Calendar */}
// //       <FullCalendar
// //         plugins={[dayGridPlugin]}
// //         initialView="dayGridMonth"
// //         events={formattedEvents}
// //         eventClick={(info) => {
// //           window.location.href = `/events/${info.event.id}`;
// //         }}
// //       />

// //       {/* Legend */}
// //       <div className="flex gap-6 text-sm mt-3">
// //         <div>🔵 Registered</div>
// //         <div>🟢 Upcoming</div>
// //         <div>⚪ Completed</div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

// type CalendarEvent = {
//   id: string;
//   title: string;
//   date: string;
//   status: string;
//   userStatus: string | null;
// };

// export default function CalendarComponent() {
//   const [events, setEvents] = useState<CalendarEvent[]>([]);
//   const [filter, setFilter] = useState("all");
//   const [mounted, setMounted] = useState(false);

//   // Prevent Hydration errors in Next.js
//   useEffect(() => {
//     setMounted(true);
//     fetch("/api/calendar")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) setEvents(data);
//       })
//       .catch((err) => console.error("Calendar fetch error:", err));
//   }, []);

//   const filteredEvents = events.filter((event) => {
//     if (filter === "registered") return event.userStatus === "CONFIRMED";
//     if (filter === "attended") return event.status === "COMPLETED";
//     return true;
//   });

//   const formattedEvents = filteredEvents.map((event) => {
//     let color = "#10b981"; // Green (Default/Upcoming)
//     let badge = "🟢";

//     if (event.userStatus === "CONFIRMED") {
//       color = "#2563eb"; // Blue (Registered)
//       badge = "🔵";
//     }

//     if (event.status === "COMPLETED") {
//       color = "#6b7280"; // Gray (Completed)
//       badge = "⚪";
//     }

//     return {
//       id: event.id,
//       title: `${badge} ${event.title}`,
//       start: event.date, // FullCalendar uses 'start' for the date field
//       backgroundColor: color,
//       borderColor: color,
//       textColor: "#ffffff",
//     };
//   });

//   if (!mounted)
//     return (
//       <div className="p-8 text-center text-gray-500">Loading Calendar...</div>
//     );

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
//       {/* Header & Filters */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <h2 className="text-xl font-bold text-gray-800">Event Schedule</h2>

//         <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
//           <button
//             onClick={() => setFilter("all")}
//             className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
//               filter === "all"
//                 ? "bg-white text-blue-600 shadow-sm"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilter("registered")}
//             className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
//               filter === "registered"
//                 ? "bg-white text-blue-600 shadow-sm"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             Registered
//           </button>
//           <button
//             onClick={() => setFilter("attended")}
//             className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
//               filter === "attended"
//                 ? "bg-white text-blue-600 shadow-sm"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             Attended
//           </button>
//         </div>
//       </div>

//       {/* Calendar Wrapper */}
//       <div className="calendar-container overflow-hidden rounded-xl border border-gray-100">
//         <FullCalendar
//           plugins={[dayGridPlugin]}
//           initialView="dayGridMonth"
//           events={formattedEvents}
//           height="auto"
//           headerToolbar={{
//             left: "prev,next today",
//             center: "title",
//             right: "",
//           }}
//           eventClick={(info) => {
//             window.location.href = `/events/${info.event.id}`;
//           }}
//           eventClassNames="cursor-pointer hover:opacity-90 transition-opacity rounded-md border-none text-xs p-1"
//         />
//       </div>

//       {/* Legend */}
//       <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
//         <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
//           <span className="w-3 h-3 rounded-full bg-blue-600"></span> Registered
//         </div>
//         <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
//           <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Upcoming
//         </div>
//         <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
//           <span className="w-3 h-3 rounded-full bg-gray-500"></span> Completed
//         </div>
//       </div>

//       <style jsx global>{`
//         .fc .fc-toolbar-title {
//           font-size: 1.1rem;
//           font-weight: 700;
//           color: #1f2937;
//         }
//         .fc .fc-button-primary {
//           background-color: #ffffff;
//           border-color: #e5e7eb;
//           color: #374151;
//           font-weight: 600;
//           text-transform: capitalize;
//         }
//         .fc .fc-button-primary:hover {
//           background-color: #f9fafb;
//           border-color: #d1d5db;
//           color: #111827;
//         }
//         .fc .fc-button-primary:not(:disabled).fc-button-active {
//           background-color: #f3f4f6;
//           border-color: #d1d5db;
//           color: #111827;
//         }
//         .fc-daygrid-event {
//           border-radius: 6px !important;
//           margin-top: 2px !important;
//           padding: 2px 4px !important;
//         }
//         .fc-theme-standard td,
//         .fc-theme-standard th {
//           border-color: #f3f4f6 !important;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  status: string;
  userStatus: string | null;
};

const filters = [
  { value: "all", label: "All Events" },
  { value: "registered", label: "Registered" },
  { value: "attended", label: "Attended" },
];

export default function CalendarComponent() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filter, setFilter] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data);
      })
      .catch((err) => console.error("Calendar fetch error:", err));
  }, []);

  const filteredEvents = events.filter((e) => {
    if (filter === "registered") return e.userStatus === "CONFIRMED";
    if (filter === "attended") return e.status === "COMPLETED";
    return true;
  });

  const formattedEvents = filteredEvents.map((e) => {
    let color = "#10b981";
    if (e.userStatus === "CONFIRMED") color = "#f97316";
    if (e.status === "COMPLETED") color = "#94a3b8";
    return {
      id: e.id,
      title: e.title,
      start: e.date,
      backgroundColor: color,
      borderColor: "transparent",
      textColor: "#ffffff",
    };
  });

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap");

        .cal-root {
          font-family: "DM Sans", sans-serif;
          background: #fff;
          border-radius: 2rem;
          border: 1.5px solid #f1f5f9;
          box-shadow: 0 8px 40px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        /* ── Top bar ── */
        .cal-topbar {
          position: relative; overflow: hidden;
          background: #f97316;
          padding: 1.75rem 2rem;
        }
        .cal-topbar-blob1 {
          position: absolute; top: -50px; left: -50px;
          width: 200px; height: 200px; border-radius: 50%;
          background: rgba(255,255,255,0.10); filter: blur(50px);
          pointer-events: none;
        }
        .cal-topbar-blob2 {
          position: absolute; bottom: -40px; right: -40px;
          width: 160px; height: 160px; border-radius: 50%;
          background: rgba(132,204,22,0.15); filter: blur(45px);
          pointer-events: none;
        }
        .cal-topbar-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .cal-topbar-inner {
          position: relative; z-index: 10;
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between; gap: 1rem;
        }
        .cal-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #0f172a; color: #fff;
          font-size: 10px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.18em;
          padding: 4px 12px; border-radius: 999px; margin-bottom: 6px;
        }
        .cal-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          color: #fff; line-height: 0.9;
          text-transform: uppercase; letter-spacing: -0.01em;
        }

        /* ── Filter pills ── */
        .cal-filters {
          display: flex; gap: 0.375rem;
          background: rgba(0,0,0,0.15);
          padding: 4px; border-radius: 14px;
        }
        .cal-pill {
          padding: 6px 16px; border-radius: 10px;
          font-size: 0.75rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.08em;
          border: none; cursor: pointer;
          transition: background 0.15s, color 0.15s, box-shadow 0.15s;
          background: transparent; color: rgba(255,255,255,0.70);
        }
        .cal-pill:hover { color: #fff; background: rgba(255,255,255,0.12); }
        .cal-pill-active {
          background: #0f172a !important;
          color: #fff !important;
          box-shadow: 0 4px 14px rgba(15,23,42,0.25);
        }

        /* ── Calendar body ── */
        .cal-body { padding: 1.5rem; }

        /* ── Legend ── */
        .cal-legend {
          display: flex; flex-wrap: wrap; gap: 1rem;
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1.5px solid #f1f5f9;
        }
        .cal-legend-item {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.75rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em; color: #64748b;
        }
        .cal-dot {
          width: 10px; height: 10px; border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Loading skeleton ── */
        .cal-loading {
          display: flex; align-items: center; justify-content: center;
          padding: 4rem 2rem; gap: 0.75rem;
          font-size: 0.875rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em; color: #94a3b8;
        }
        .cal-loading-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #f97316;
          animation: calBounce 1.2s infinite ease-in-out;
        }
        .cal-loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .cal-loading-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes calBounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1;   }
        }

        /* ── FullCalendar overrides ── */
        .fc {
          font-family: "DM Sans", sans-serif !important;
        }

        /* toolbar */
        .fc .fc-toolbar {
          margin-bottom: 1rem !important;
          flex-wrap: wrap; gap: 0.5rem;
        }
        .fc .fc-toolbar-title {
          font-family: "Bebas Neue", sans-serif !important;
          font-size: 1.75rem !important;
          letter-spacing: -0.01em;
          color: #0f172a !important;
          text-transform: uppercase;
        }

        /* nav buttons */
        .fc .fc-button {
          background: #f8fafc !important;
          border: 1.5px solid #f1f5f9 !important;
          color: #475569 !important;
          font-family: "DM Sans", sans-serif !important;
          font-weight: 800 !important;
          font-size: 0.75rem !important;
          text-transform: uppercase !important;
          letter-spacing: 0.08em !important;
          border-radius: 10px !important;
          padding: 6px 14px !important;
          box-shadow: none !important;
          transition: border-color 0.15s, color 0.15s !important;
        }
        .fc .fc-button:hover {
          border-color: #f97316 !important;
          color: #f97316 !important;
          background: rgba(249,115,22,0.05) !important;
        }
        .fc .fc-button:focus { box-shadow: none !important; }
        .fc .fc-today-button {
          background: #f97316 !important;
          border-color: #f97316 !important;
          color: #fff !important;
        }
        .fc .fc-today-button:hover {
          background: #ea580c !important;
          border-color: #ea580c !important;
          color: #fff !important;
        }
        .fc .fc-button-primary:not(:disabled).fc-button-active,
        .fc .fc-button-primary:not(:disabled):active {
          background: #0f172a !important;
          border-color: #0f172a !important;
          color: #fff !important;
        }

        /* header cells */
        .fc .fc-col-header-cell {
          padding: 8px 0 !important;
          background: #fafafa !important;
          border-color: #f1f5f9 !important;
        }
        .fc .fc-col-header-cell-cushion {
          font-size: 10px !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.15em !important;
          color: #94a3b8 !important;
          text-decoration: none !important;
        }

        /* day cells — make them compact */
        .fc .fc-daygrid-day {
          border-color: #f1f5f9 !important;
        }
        .fc .fc-daygrid-day-frame {
          min-height: 60px !important;   /* smaller rows */
        }
        .fc .fc-daygrid-day-number {
          font-size: 0.75rem !important;
          font-weight: 700 !important;
          color: #64748b !important;
          text-decoration: none !important;
          padding: 4px 6px !important;
        }
        .fc .fc-day-today {
          background: rgba(249,115,22,0.05) !important;
        }
        .fc .fc-day-today .fc-daygrid-day-number {
          background: #f97316 !important;
          color: #fff !important;
          border-radius: 8px !important;
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
        }

        /* grid lines */
        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: #f1f5f9 !important;
        }

        /* events */
        .fc-daygrid-event {
          border-radius: 6px !important;
          border: none !important;
          margin: 1px 2px !important;
          padding: 2px 6px !important;
          font-size: 0.7rem !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          transition: opacity 0.15s, transform 0.15s !important;
        }
        .fc-daygrid-event:hover {
          opacity: 0.85 !important;
          transform: translateY(-1px) !important;
        }
        .fc-event-title {
          font-weight: 700 !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
        .fc .fc-daygrid-more-link {
          font-size: 0.7rem !important;
          font-weight: 800 !important;
          color: #f97316 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.06em !important;
        }

        /* scrollbar */
        .calendar-container ::-webkit-scrollbar { width: 4px; height: 4px; }
        .calendar-container ::-webkit-scrollbar-track { background: transparent; }
        .calendar-container ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 4px; }
      `}</style>

      <div className="cal-root">
        {/* ── TOP BAR ── */}
        <div className="cal-topbar">
          <div className="cal-topbar-blob1" />
          <div className="cal-topbar-blob2" />
          <div className="cal-topbar-grid" />
          <div className="cal-topbar-inner">
            <div>
              <div className="cal-badge">
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#84cc16",
                    display: "inline-block",
                  }}
                />
                Schedule
              </div>
              <h2 className="cal-title">
                Event
                <br />
                Calendar
              </h2>
            </div>

            {/* Filter pills */}
            <div className="cal-filters">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`cal-pill ${filter === f.value ? "cal-pill-active" : ""}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CALENDAR ── */}
        {!mounted ? (
          <div className="cal-loading">
            <div className="cal-loading-dot" />
            <div className="cal-loading-dot" />
            <div className="cal-loading-dot" />
            <span>Loading calendar</span>
          </div>
        ) : (
          <div className="cal-body calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={formattedEvents}
              height="auto"
              dayMaxEvents={3}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "",
              }}
              eventClick={(info) => {
                window.location.href = `/events/${info.event.id}`;
              }}
            />
          </div>
        )}

        {/* ── LEGEND ── */}
        <div className="cal-legend">
          {[
            { color: "#f97316", label: "Registered" },
            { color: "#10b981", label: "Upcoming" },
            { color: "#94a3b8", label: "Completed" },
          ].map(({ color, label }) => (
            <div key={label} className="cal-legend-item">
              <span className="cal-dot" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}