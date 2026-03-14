"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EventCard } from "./EventCard";

export function FeaturedEvents({ displayEvents }: { displayEvents: any[] }) {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Background blobs — matching site theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 left-1/4 w-[500px] h-[400px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(ellipse, #f97316, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse, #84cc16, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Centered Header ── */}
        {/* <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center flex flex-col items-center"
        >
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ background: "#0f172a", color: "#fff" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Spotlight
          </div>

          <h2
            className="text-5xl sm:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-6 max-w-2xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Trending <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f97316, #b45309)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Right Now
            </span>
          </h2>

          <p className="text-slate-500 max-w-lg font-medium text-lg mx-auto">
            The most hyped events happening around you. Claim your spot before
            tickets run out.
          </p>
        </motion.div> */}
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
            Spotlight
          </div>

          <h2 className="text-5xl sm:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-6 max-w-2xl">
            Trending <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #84cc16, #f97316, #b45309)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Right Now
            </span>
          </h2>
          <p className="text-slate-500 max-w-lg font-medium text-lg mx-auto">
            The most hyped events happening around you. Claim your spot before
            tickets run out.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        {displayEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayEvents.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    delay: (i % 2) * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="group relative rounded-[2rem] overflow-hidden bg-white border-2 border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(249,115,22,0.2)] hover:border-orange-200">
                    {/* Index badge */}
                    <div
                      className="absolute top-6 left-6 z-20 w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shadow-lg"
                      style={{ background: "#0f172a", color: "#fff" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <EventCard {...event} />

                    {/* Bottom shimmer line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #f97316, #fbbf24, transparent)",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* ── Empty State ── */
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="text-center py-24 rounded-[3rem] bg-slate-50 border-2 border-dashed border-slate-200"
          >
            <div className="text-6xl mb-6 animate-bounce">📅</div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              Fresh Events Dropping Soon!
            </h3>
            <p className="text-slate-500 mt-2 font-medium">
              Our organizers are working on something incredible.
            </p>
          </motion.div>
        )}

        {/* ── Bottom CTA ── */}
        {displayEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-20 flex justify-center"
          >
            <Link
              href="/events"
              className="group px-10 py-5 bg-slate-900 text-white rounded-full font-black uppercase text-sm tracking-widest flex items-center gap-3 transition-all hover:bg-orange-600 hover:shadow-[0_15px_30px_rgba(249,115,22,0.4)] hover:-translate-y-1 active:scale-95"
            >
              View Full Calendar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
