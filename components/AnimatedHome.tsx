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

const categories = [
  {
    label: "Formal Events",
    value: "FORMAL",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
    desc: "Seminars, conferences & professional events",
  },
  {
    label: "Informal Events",
    value: "INFORMAL",
    icon: Star,
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    text: "text-purple-700",
    desc: "Fun activities, quizzes & social events",
  },
  {
    label: "Hackathons",
    value: "HACKATHON",
    icon: Zap,
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50",
    text: "text-orange-700",
    desc: "Coding marathons & innovation sprints",
  },
  {
    label: "Cultural Events",
    value: "CULTURAL",
    icon: Music,
    color: "from-pink-500 to-pink-600",
    bg: "bg-pink-50",
    text: "text-pink-700",
    desc: "Dance, drama, music & art performances",
  },
  {
    label: "Sports Events",
    value: "SPORTS",
    icon: Dumbbell,
    color: "from-green-500 to-green-600",
    bg: "bg-green-50",
    text: "text-green-700",
    desc: "Inter-college sports & tournaments",
  },
  {
    label: "Workshops",
    value: "WORKSHOP",
    icon: PenTool,
    color: "from-cyan-500 to-cyan-600",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    desc: "Skill-building hands-on workshops",
  },
  {
    label: "Technical Events",
    value: "TECHNICAL",
    icon: Cpu,
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    desc: "Project expos & technical competitions",
  },
  {
    label: "Literary Events",
    value: "LITERARY",
    icon: BookOpen,
    color: "from-yellow-500 to-yellow-600",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    desc: "Debates, essay writing & literary fests",
  },
];

const stats = [
  { label: "Events Hosted", value: "500+", icon: Calendar },
  { label: "Students Participated", value: "10K+", icon: Users },
  { label: "Prize Money Awarded", value: "₹50L+", icon: Trophy },
];

export default function AnimatedHome({
  session,
  displayEvents,
}: {
  session: Session | null;
  displayEvents: any[];
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO SECTION ── */}
      <section className="relative w-full overflow-hidden">
        {/* Hero Video */}
        <div className="relative w-full h-[100svh] sm:h-[85vh] min-h-[580px]">
          <video
            src="/College_Event_Website_Hero_Video_Creation.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Campus Events, All in One Place
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight max-w-5xl mb-6 drop-shadow-2xl"
            >
              Discover Every{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="bg-[length:200%_auto] bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent inline-block"
              >
                Campus Event 
              </motion.span>{" "}
              in One Click
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-slate-200 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed font-light"
            >
              From hackathons to cultural fests, formal seminars to sports
              tournaments — your next great memory starts here.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4"
            >
              <Link
                href="/events"
                className="group relative inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:bg-blue-500 transition-all duration-300 text-sm sm:text-base w-auto"
              >
                Explore Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              {!session?.user && (
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 text-sm sm:text-base w-auto"
                >
                  Create Account
                </Link>
              )}
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 max-w-5xl mx-auto -mt-24 sm:-mt-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/50 overflow-hidden"
          >
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                className="px-6 py-5 sm:py-8 flex items-center justify-start sm:flex-col sm:justify-center gap-5 sm:gap-3 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex-shrink-0 p-3 sm:p-4 bg-blue-100/50 rounded-2xl">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <div className="text-left sm:text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5 sm:mb-1">{value}</p>
                  <p className="text-[11px] sm:text-sm font-bold text-slate-500 uppercase tracking-widest leading-tight">{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STORYTELLING INTERLUDE ── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Don't just attend college. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Experience it.
              </span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Every day on campus is an opportunity to learn something new, meet your future co-founder, or win big. We bring all these opportunities directly to your feed.
            </p>
          </motion.div>
        </div>
        {/* Decorative blur elements for story section */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* ── CATEGORIES SECTION ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Explore Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Find Your Crowd
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              There is a community waiting for you. Dive into categories that match your passion and start engaging.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(({ label, value, icon: Icon, color, bg, text, desc }, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/events?category=${value}`}
                  className={`group relative block ${bg} rounded-3xl p-6 border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full overflow-hidden`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-5`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="relative z-10">
                    <p className={`font-bold text-lg ${text} mb-2`}>{label}</p>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{desc}</p>
                  </div>
                  {/* Subtle background flair on hover */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED EVENTS SHOWCASE ── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 flex items-center gap-2 w-fit">
                <Star className="w-3.5 h-3.5 fill-orange-700" /> Spotlight
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {displayEvents === displayEvents /* placeholder logic to match original */ ? "Trending Now" : "Upcoming"}
              </h2>
              <p className="text-lg text-slate-500 mt-4 leading-relaxed">
                The most hyped events happening around you. Claim your spot before tickets run out.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-base font-semibold text-slate-900 hover:text-blue-600 group transition-colors"
            >
              View Full Calendar
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>

          {displayEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 items-stretch justify-center max-w-5xl mx-auto">
              {displayEvents.map((event, i) => {
                // Determine direction based on column index (even comes from left, odd comes from right)
                // In a 2-column layout, index 0, 2, 4 are left, 1, 3, 5 are right.
                const isEvenColumn = i % 2 === 0;
                const xOffset = isEvenColumn ? -100 : 100;
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: xOffset, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.1, type: "spring", bounce: 0.3 }}
                    className="flex"
                  >
                    <div className="w-full">
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
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm"
            >
              <div className="text-6xl mb-6 inline-block animate-bounce">📅</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Fresh Events Dropping Soon!</h3>
              <p className="text-slate-500 text-lg">Our organizers are working on something incredible. Check back shortly.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── IMMERSIVE CTA BANNER ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-[3rem] p-12 sm:p-20 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Animated Background Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[50%] -left-[10%] w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[50%] -right-[10%] w-[600px] h-[600px] bg-gradient-to-tl from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
              Your Campus Legend <br /> Starts Here
            </h2>
            <p className="text-blue-100/90 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join the thousands of students already shaping their college narrative. Build your profile, RSVP instantly, and track your achievements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href="/register"
                className="group relative px-10 py-4 bg-white text-blue-900 font-bold text-lg rounded-full hover:bg-slate-50 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 w-full sm:w-auto"
              >
                Sign Up for Free
                <span className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </span>
                <span className="w-4 h-4 inline-block opacity-0 group-hover:hidden transition-all pointer-events-none" />
              </Link>
              <Link
                href="/events"
                className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
              >
                Explore More
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
