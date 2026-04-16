"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EventCard } from "@/components/EventCard";
import {
  ArrowRight,
  Zap,
  Users,
  Calendar,
  Trophy,
  BookOpen,
  Music,
  Dumbbell,
  Cpu,
  PenTool,
  Star,
} from "lucide-react";
import { Session } from "next-auth";
import { HeroSection } from "./HeroSection";
import { StorySection } from "./StorySection";
import { CategoriesSection } from "./CategoriesSection";
import { FeaturedEvents } from "./FeaturedEvents";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const stats = [
  { label: "Events Hosted", value: "500+", icon: Calendar },
  { label: "Students Participated", value: "10K+", icon: Users },
  { label: "Prize Money Awarded", value: "₹50L+", icon: Trophy },
];

export default function AnimatedHome({
  session,
  displayEvents,
  winnerPosts,
}: {
  session: Session | null;
  displayEvents: any[];
  winnerPosts: any[];
}) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        {/* ── HERO SECTION ── */}
        <HeroSection session={session} />

        {/* ── STORY SECTION ── */}
        <StorySection />

        {/*Category Section  */}
        <CategoriesSection />

        {/* ── FEATURED EVENTS SHOWCASE ── */}
        {/* ── FEATURED EVENTS SHOWCASE ── */}
        {/*  */}
        <FeaturedEvents displayEvents={displayEvents} />

        {winnerPosts.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-100">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold uppercase tracking-wide">
                  <Trophy className="w-3.5 h-3.5" />
                  Winner Updates
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
                  Recent Hackathon Winners
                </h2>
              </div>

              <div className="space-y-4">
                {winnerPosts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                      {post.event.title}
                    </p>
                    <p className="text-lg font-extrabold text-slate-900 mt-1">
                      🏆 {post.winningTeamName}
                    </p>
                    <p className="text-sm text-slate-600 mt-1.5">
                      {post.announcement}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/hackathon-results"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View all winner announcements <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
        {/* ── IMMERSIVE CTA BANNER ── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto relative overflow-hidden"
            style={{
              background: "#f97316",
              borderRadius: "3rem",
              padding: "clamp(48px, 8vw, 80px) clamp(32px, 6vw, 80px)",
              boxShadow:
                "0 32px 80px rgba(249,115,22,0.3), 0 0 0 1.5px rgba(255,255,255,0.15) inset",
            }}
          >
            {/* Decorative background circles — matching site blobs */}
            <div
              className="absolute pointer-events-none overflow-hidden inset-0"
              style={{ borderRadius: "3rem" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-80px",
                  left: "-80px",
                  width: "360px",
                  height: "360px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  filter: "blur(60px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-60px",
                  right: "-60px",
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background: "rgba(132,204,22,0.18)",
                  filter: "blur(70px)",
                }}
              />
              {/* Subtle grid pattern */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  borderRadius: "3rem",
                }}
              />
            </div>

            {/* Floating tag chips */}
            <motion.div
              initial={{ opacity: 0, x: -20, rotate: -8 }}
              whileInView={{ opacity: 1, x: 0, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-8 left-8 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              🏆 Win Prizes
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 6 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-8 right-8 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              🤝 Meet People
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.45 }}
                className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
                style={{ background: "#0f172a", color: "#fff" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                Join the Community
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18, duration: 0.55 }}
                className="font-black uppercase tracking-tighter leading-[0.85] text-white mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(52px, 8vw, 100px)",
                }}
              >
                Your Campus <br />
                <span
                  style={{
                    WebkitTextStroke: "2px rgba(255,255,255,0.6)",
                    color: "transparent",
                  }}
                >
                  Legend
                </span>{" "}
                Starts Here
              </motion.h2>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="text-white/80 text-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed"
              >
                Join thousands of students already shaping their college story.
                Build your profile, RSVP instantly, and track every achievement.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.36, duration: 0.45 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href="/register"
                  className="group flex items-center gap-2 font-black uppercase text-sm tracking-widest transition-all duration-200 w-full sm:w-auto justify-center"
                  style={{
                    background: "#0f172a",
                    color: "#fff",
                    padding: "14px 36px",
                    borderRadius: "14px",
                    boxShadow: "0 8px 28px rgba(15,23,42,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 36px rgba(15,23,42,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 28px rgba(15,23,42,0.35)";
                  }}
                >
                  Sign Up Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/events"
                  className="group flex items-center gap-2 font-bold text-sm tracking-widest transition-all duration-200 w-full sm:w-auto justify-center"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    padding: "14px 36px",
                    borderRadius: "14px",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Explore Events
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.48, duration: 0.45 }}
                className="mt-10 flex items-center justify-center gap-3"
              >
                <div className="flex -space-x-2">
                  {["#fbbf24", "#34d399", "#60a5fa", "#f472b6"].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white"
                      style={{ background: c }}
                    >
                      {["A", "B", "C", "D"][i]}
                    </div>
                  ))}
                </div>
                <p className="text-white/70 text-sm font-semibold">
                  <span className="text-white font-black">10,000+</span>{" "}
                  students joined
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
}
