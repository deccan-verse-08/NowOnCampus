// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import {
//   BookOpen,
//   Star,
//   Zap,
//   Music,
//   Dumbbell,
//   PenTool,
//   Cpu,
// } from "lucide-react";

// const categories = [
//   {
//     label: "Formal Events",
//     value: "FORMAL",
//     icon: BookOpen,
//     emoji: "🎓",
//     bg: "#dbeafe",
//     border: "#93c5fd",
//     text: "#1e40af",
//     glow: "rgba(59,130,246,0.25)",
//   },
//   {
//     label: "Informal Events",
//     value: "INFORMAL",
//     icon: Star,
//     emoji: "🎉",
//     bg: "#ede9fe",
//     border: "#c4b5fd",
//     text: "#6d28d9",
//     glow: "rgba(139,92,246,0.25)",
//   },
//   {
//     label: "Hackathons",
//     value: "HACKATHON",
//     icon: Zap,
//     emoji: "⚡",
//     bg: "#ffedd5",
//     border: "#fdba74",
//     text: "#c2410c",
//     glow: "rgba(249,115,22,0.25)",
//   },
//   {
//     label: "Cultural Events",
//     value: "CULTURAL",
//     icon: Music,
//     emoji: "🎭",
//     bg: "#fce7f3",
//     border: "#f9a8d4",
//     text: "#be185d",
//     glow: "rgba(236,72,153,0.25)",
//   },
//   {
//     label: "Sports Events",
//     value: "SPORTS",
//     icon: Dumbbell,
//     emoji: "🏆",
//     bg: "#dcfce7",
//     border: "#86efac",
//     text: "#15803d",
//     glow: "rgba(34,197,94,0.25)",
//   },
//   {
//     label: "Workshops",
//     value: "WORKSHOP",
//     icon: PenTool,
//     emoji: "🛠️",
//     bg: "#cffafe",
//     border: "#67e8f9",
//     text: "#0e7490",
//     glow: "rgba(6,182,212,0.25)",
//   },
//   {
//     label: "Technical Events",
//     value: "TECHNICAL",
//     icon: Cpu,
//     emoji: "💻",
//     bg: "#e0e7ff",
//     border: "#a5b4fc",
//     text: "#3730a3",
//     glow: "rgba(99,102,241,0.25)",
//   },
//   {
//     label: "Literary Events",
//     value: "LITERARY",
//     icon: BookOpen,
//     emoji: "📖",
//     bg: "#fef9c3",
//     border: "#fde047",
//     text: "#a16207",
//     glow: "rgba(234,179,8,0.25)",
//   },
// ];

// export function CategoriesSection() {
//   return (
//     <>
//       <style jsx global>{`
//         .cat-card {
//           transition:
//             transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
//             box-shadow 0.3s ease;
//           will-change: transform;
//         }
//         .cat-card:hover {
//           transform: translateY(-10px) scale(1.02);
//         }
//         .cat-icon-wrap {
//           transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }
//         .cat-card:hover .cat-icon-wrap {
//           transform: rotate(-10deg) scale(1.1);
//         }
//         .cat-arrow {
//           opacity: 0;
//           transform: translate(-5px, 5px);
//           transition: all 0.3s ease;
//         }
//         .cat-card:hover .cat-arrow {
//           opacity: 1;
//           transform: translate(0, 0);
//         }
//       `}</style>

//       <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
//         {/* Background blobs for depth */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div
//             className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.05]"
//             style={{
//               background: "radial-gradient(circle, #84cc16, transparent 70%)",
//               filter: "blur(80px)",
//             }}
//           />
//           <div
//             className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-[0.05]"
//             style={{
//               background: "radial-gradient(circle, #f97316, transparent 70%)",
//               filter: "blur(80px)",
//             }}
//           />
//         </div>

//         <div className="max-w-7xl mx-auto relative z-10">
//           {/* Section Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mb-16"
//           >
//             <div
//               className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
//               style={{ background: "#0f172a", color: "#fff" }}
//             >
//               <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
//               Explore Categories
//             </div>

//             <h2 className="text-5xl sm:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-6">
//               Find Your <br />
//               <span
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #84cc16, #f97316, #b45309)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   backgroundClip: "text",
//                 }}
//               >
//                 Crowd
//               </span>
//             </h2>
//             <p className="text-slate-500 max-w-lg font-medium text-lg">
//               Dive into communities that match your vibe. From tech to culture,
//               your next big connection starts here.
//             </p>
//           </motion.div>

//           {/* Categories Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {categories.map(
//               ({ label, value, emoji, bg, border, text, glow }, i) => (
//                 <motion.div
//                   key={value}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.05 }}
//                 >
//                   <Link
//                     href={`/events?category=${value}`}
//                     className="cat-card group relative block rounded-[2rem] p-6 h-full border-2 transition-all"
//                     style={{
//                       background: bg,
//                       borderColor: border,
//                       boxShadow: `0 10px 30px -10px ${glow}`,
//                     }}
//                   >
//                     <div className="flex justify-between items-start mb-10">
//                       <div className="cat-icon-wrap w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm">
//                         {emoji}
//                       </div>
//                       <div
//                         className="cat-arrow w-8 h-8 rounded-full flex items-center justify-center text-white"
//                         style={{ background: text }}
//                       >
//                         <span className="text-lg font-bold">↗</span>
//                       </div>
//                     </div>

//                     <div>
//                       <h3
//                         className="text-xl font-black leading-tight mb-2 uppercase tracking-tight"
//                         style={{ color: text }}
//                       >
//                         {label}
//                       </h3>
//                       <p
//                         className="text-[10px] font-bold uppercase tracking-widest opacity-60"
//                         style={{ color: text }}
//                       >
//                         Discover Events
//                       </p>
//                     </div>

//                     {/* Inner Hover Glow */}
//                     <div
//                       className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
//                       style={{ boxShadow: `inset 0 0 40px ${glow}` }}
//                     />
//                   </Link>
//                 </motion.div>
//               ),
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Star,
  Zap,
  Music,
  Dumbbell,
  PenTool,
  Cpu,
} from "lucide-react";

const categories = [
  {
    label: "Formal Events",
    value: "FORMAL",
    emoji: "🎓",
    bg: "#dbeafe",
    border: "#93c5fd",
    text: "#1e40af",
    glow: "rgba(59,130,246,0.25)",
  },
  {
    label: "Informal Events",
    value: "INFORMAL",
    emoji: "🎉",
    bg: "#ede9fe",
    border: "#c4b5fd",
    text: "#6d28d9",
    glow: "rgba(139,92,246,0.25)",
  },
  {
    label: "Hackathons",
    value: "HACKATHON",
    emoji: "⚡",
    bg: "#ffedd5",
    border: "#fdba74",
    text: "#c2410c",
    glow: "rgba(249,115,22,0.25)",
  },
  {
    label: "Cultural Events",
    value: "CULTURAL",
    emoji: "🎭",
    bg: "#fce7f3",
    border: "#f9a8d4",
    text: "#be185d",
    glow: "rgba(236,72,153,0.25)",
  },
  {
    label: "Sports Events",
    value: "SPORTS",
    emoji: "🏆",
    bg: "#dcfce7",
    border: "#86efac",
    text: "#15803d",
    glow: "rgba(34,197,94,0.25)",
  },
  {
    label: "Workshops",
    value: "WORKSHOP",
    emoji: "🛠️",
    bg: "#cffafe",
    border: "#67e8f9",
    text: "#0e7490",
    glow: "rgba(6,182,212,0.25)",
  },
  {
    label: "Technical Events",
    value: "TECHNICAL",
    emoji: "💻",
    bg: "#e0e7ff",
    border: "#a5b4fc",
    text: "#3730a3",
    glow: "rgba(99,102,241,0.25)",
  },
  {
    label: "Literary Events",
    value: "LITERARY",
    emoji: "📖",
    bg: "#fef9c3",
    border: "#fde047",
    text: "#a16207",
    glow: "rgba(234,179,8,0.25)",
  },
];

export function CategoriesSection() {
  return (
    <>
      <style jsx global>{`
        .cat-card {
          transition:
            transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.3s ease;
          will-change: transform;
        }
        .cat-card:hover {
          transform: translateY(-10px) scale(1.02);
        }
        .cat-icon-wrap {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cat-card:hover .cat-icon-wrap {
          transform: rotate(-10deg) scale(1.1);
        }
        .cat-arrow {
          opacity: 0;
          transform: translate(-5px, 5px);
          transition: all 0.3s ease;
        }
        .cat-card:hover .cat-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }
      `}</style>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.05]"
            style={{
              background: "radial-gradient(circle, #84cc16, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-[0.05]"
            style={{
              background: "radial-gradient(circle, #f97316, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* --- Centered Header --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center flex flex-col items-center"
          >
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ background: "#0f172a", color: "#fff" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
              Explore Categories
            </div>

            <h2 className="text-5xl sm:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-6 max-w-2xl">
              Find Your <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #84cc16, #f97316, #b45309)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Crowd
              </span>
            </h2>
            <p className="text-slate-500 max-w-lg font-medium text-lg mx-auto">
              Dive into communities that match your vibe. From tech to culture,
              your next big connection starts here.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map(
              ({ label, value, emoji, bg, border, text, glow }, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/events?category=${value}`}
                    className="cat-card group relative block rounded-[2rem] p-6 h-full border-2 transition-all"
                    style={{
                      background: bg,
                      borderColor: border,
                      boxShadow: `0 10px 30px -10px ${glow}`,
                    }}
                  >
                    <div className="flex justify-between items-start mb-10">
                      <div className="cat-icon-wrap w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm">
                        {emoji}
                      </div>
                      <div
                        className="cat-arrow w-8 h-8 rounded-full flex items-center justify-center text-white"
                        style={{ background: text }}
                      >
                        <span className="text-lg font-bold">↗</span>
                      </div>
                    </div>

                    <div>
                      <h3
                        className="text-xl font-black leading-tight mb-2 uppercase tracking-tight"
                        style={{ color: text }}
                      >
                        {label}
                      </h3>
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest opacity-60"
                        style={{ color: text }}
                      >
                        Discover Events
                      </p>
                    </div>

                    <div
                      className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ boxShadow: `inset 0 0 40px ${glow}` }}
                    />
                  </Link>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}