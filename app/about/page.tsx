

"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Eye,
  Users,
  Zap,
  Trophy,
  Calendar,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Events Hosted", value: "500+", icon: Calendar },
  { label: "Students Participated", value: "10K+", icon: Users },
  { label: "Prize Money Awarded", value: "₹50L+", icon: Trophy },
];

const team = [
  { name: "Arjun Mehta", role: "Founder & CEO", color: "#fbbf24" },
  { name: "Priya Sharma", role: "Head of Events", color: "#34d399" },
  { name: "Rahul Verma", role: "Tech Lead", color: "#60a5fa" },
  { name: "Sneha Patil", role: "Community Manager", color: "#f472b6" },
];

export default function AboutPage() {
  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap");
        .about-heading {
          font-family: "Bebas Neue", sans-serif;
          letter-spacing: -0.01em;
        }
        .about-body {
          font-family: "DM Sans", sans-serif;
        }
      `}</style>

      <Navbar />

      <div className="about-body min-h-screen bg-slate-50 pt-24">
        {/* ── HERO BANNER ── */}
        <section className="relative overflow-hidden bg-[#f97316] px-4 py-20 sm:py-28">
          {/* Background blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div
              style={{
                position: "absolute",
                top: "-100px",
                left: "-100px",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                filter: "blur(80px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-80px",
                right: "-60px",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "rgba(132,204,22,0.15)",
                filter: "blur(80px)",
              }}
            />
            {/* Grid overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-slate-900 text-white text-[11px] font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
              Who We Are
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="about-heading text-white uppercase leading-[0.85] mb-6"
              style={{ fontSize: "clamp(64px, 10vw, 120px)" }}
            >
              About <br />
              <span
                style={{
                  WebkitTextStroke: "2px rgba(255,255,255,0.5)",
                  color: "transparent",
                }}
              >
                NowOn
              </span>
              Campus
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-white/80 text-lg font-medium max-w-2xl mx-auto leading-relaxed"
            >
              We're on a mission to connect every student with the campus
              moments that shape their story — from hackathons to cultural
              fests, all in one place.
            </motion.p>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="relative z-10 max-w-5xl mx-auto px-4 -mt-10 mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-[1.5rem] p-7 shadow-xl border border-slate-100 flex items-center gap-5"
              >
                <div className="p-3.5 bg-orange-50 rounded-2xl">
                  <Icon className="w-6 h-6 text-[#f97316]" />
                </div>
                <div>
                  <p className="about-heading text-3xl text-slate-900">
                    {value}
                  </p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── MISSION & VISION ── */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-10"
              style={{ boxShadow: "0 24px 60px rgba(15,23,42,0.2)" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: "rgba(249,115,22,0.15)",
                  filter: "blur(50px)",
                }}
              />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f97316] mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-3">
                  Our Mission
                </p>
                <h2 className="about-heading text-white text-5xl uppercase leading-none mb-5">
                  Bridge
                  <br />
                  The Gap
                </h2>
                <p className="text-slate-400 leading-relaxed font-medium">
                  To create a centralized platform that bridges the gap between
                  students and life-changing campus events, empowering them to
                  discover, engage, and excel in their academic and
                  extracurricular pursuits.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-[2rem] bg-[#f97316] p-10"
              style={{ boxShadow: "0 24px 60px rgba(249,115,22,0.25)" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  filter: "blur(50px)",
                }}
              />
              {/* grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "2rem",
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 mb-6">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-3">
                  Our Vision
                </p>
                <h2 className="about-heading text-slate-900 text-5xl uppercase leading-none mb-5">
                  Connected
                  <br />
                  Campus
                </h2>
                <p className="text-slate-900/75 leading-relaxed font-medium">
                  Envisioning a connected student ecosystem where every campus
                  activity is easily accessible, driving holistic personal
                  growth, professional development, and lifelong memories.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STORY STRIP ── */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 p-10 md:p-14"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}
          >
            <div
              style={{
                position: "absolute",
                top: "-40px",
                left: "-40px",
                width: "260px",
                height: "260px",
                borderRadius: "50%",
                background: "rgba(249,115,22,0.07)",
                filter: "blur(60px)",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f97316] mb-4">
                  Our Story
                </p>
                <h2
                  className="about-heading text-slate-900 uppercase leading-none mb-5"
                  style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
                >
                  Born From
                  <br />A Student's
                  <br />
                  Frustration
                </h2>
              </div>
              <div>
                <p className="text-slate-600 leading-relaxed mb-5 font-medium">
                  NowOnCampus started when a group of students kept missing out
                  on incredible events simply because there was no single place
                  to find them all. Flyers got lost, emails went unread, and
                  amazing opportunities slipped by.
                </p>
                <p className="text-slate-600 leading-relaxed font-medium">
                  We built the platform we wished existed — one that puts every
                  hackathon, cultural fest, sports tournament, and seminar right
                  in your pocket, so no student ever has to say "I didn't know
                  about it."
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── TEAM ── */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f97316] mb-3">
              The People
            </p>
            <h2
              className="about-heading text-slate-900 uppercase leading-none"
              style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
            >
              Meet The Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map(({ name, role, color }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-[1.5rem] p-6 shadow-lg border border-slate-100 text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center font-black text-xl text-white"
                  style={{ background: color }}
                >
                  {name[0]}
                </div>
                <p className="font-black text-slate-900 text-sm leading-tight">
                  {name}
                </p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">
                  {role}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto relative overflow-hidden text-center"
            style={{
              background: "#0f172a",
              borderRadius: "3rem",
              padding: "clamp(48px, 8vw, 80px) clamp(32px, 6vw, 80px)",
              boxShadow: "0 32px 80px rgba(15,23,42,0.3)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
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
                  background: "rgba(249,115,22,0.12)",
                  filter: "blur(70px)",
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
                  background: "rgba(132,204,22,0.1)",
                  filter: "blur(70px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  borderRadius: "3rem",
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-[#f97316] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                Be Part of the Story
              </div>

              <h2
                className="about-heading font-black uppercase tracking-tighter leading-[0.85] text-white mb-6"
                style={{ fontSize: "clamp(48px, 7vw, 90px)" }}
              >
                Ready to Make
                <br />
                <span
                  style={{
                    WebkitTextStroke: "2px rgba(255,255,255,0.4)",
                    color: "transparent",
                  }}
                >
                  Memories?
                </span>
              </h2>

              <p className="text-white/60 text-lg font-medium max-w-lg mx-auto mb-10 leading-relaxed">
                Join thousands of students already discovering the best campus
                has to offer.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/events"
                  className="group flex items-center gap-2 font-black uppercase text-sm tracking-widest w-full sm:w-auto justify-center transition-all duration-200"
                  style={{
                    background: "#f97316",
                    color: "#fff",
                    padding: "14px 36px",
                    borderRadius: "14px",
                    boxShadow: "0 8px 28px rgba(249,115,22,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 36px rgba(249,115,22,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 28px rgba(249,115,22,0.35)";
                  }}
                >
                  Explore Events
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/register"
                  className="group flex items-center gap-2 font-bold text-sm tracking-widest w-full sm:w-auto justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    padding: "14px 36px",
                    borderRadius: "14px",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Sign Up Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
}