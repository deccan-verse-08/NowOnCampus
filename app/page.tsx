
import Link from "next/link";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
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

async function getFeaturedEvents() {
  try {
    return await prisma.event.findMany({
      where: { isFeatured: true, status: { not: "CANCELLED" } },
      orderBy: { date: "asc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

async function getUpcomingEvents() {
  try {
    return await prisma.event.findMany({
      where: { status: "UPCOMING" },
      orderBy: { date: "asc" },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [session, featuredEvents, upcomingEvents] = await Promise.all([
    auth(),
    getFeaturedEvents(),
    getUpcomingEvents(),
  ]);

  const displayEvents = featuredEvents.length > 0 ? featuredEvents : upcomingEvents;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO SECTION ── */}
      <section className="relative w-full overflow-hidden">
        {/* Hero Video */}
        <div className="relative w-full h-[85vh] min-h-[520px]">
          <video
            src="/College_Event_Website_Hero_Video_Creation.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Campus Events, All in One Place
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight max-w-4xl mb-6 drop-shadow-lg">
              Discover Every{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Campus Event
              </span>{" "}
              in One Click
            </h1>

            <p className="text-slate-200 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
              From hackathons to cultural fests, formal seminars to sports tournaments — participate, compete, and create unforgettable memories.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-xl shadow-blue-900/40 hover:shadow-blue-700/50 transition-all duration-300 text-base hover:-translate-y-0.5"
              >
                Explore Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              {!session?.user && (
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 text-base hover:-translate-y-0.5"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 max-w-4xl mx-auto -mt-16 px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 grid grid-cols-3 divide-x divide-slate-100">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="px-6 py-5 text-center">
                <div className="flex items-center justify-center mb-1.5">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES SECTION ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Explore Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Events for Every Interest
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Whether you code, dance, debate, or compete — there's something on campus for you.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(({ label, value, icon: Icon, color, bg, text, desc }) => (
              <Link
                key={value}
                href={`/events?category=${value}`}
                className={`group ${bg} rounded-2xl p-5 border border-transparent hover:border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3`}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${text} mb-0.5`}>{label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
                <div className="flex items-center gap-1 mt-auto">
                  <span className={`text-xs font-medium ${text} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                    Browse →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED / UPCOMING EVENTS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                {featuredEvents.length > 0 ? "Featured" : "Upcoming"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                {featuredEvents.length > 0 ? "Featured Events" : "Upcoming Events"}
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 px-4 py-2 rounded-lg transition-all duration-200"
            >
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {displayEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayEvents.map((event) => (
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
            <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Events Coming Soon!</h3>
              <p className="text-slate-500 text-sm">Check back for exciting upcoming events.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center shadow-2xl shadow-blue-200 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-32 translate-y-32" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Dive In?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of students already registered on NowOnCampus. Never miss an event again.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/events"
                className="px-8 py-3.5 bg-blue-500/30 border border-white/30 text-white font-semibold rounded-xl hover:bg-blue-500/50 transition-all duration-200 hover:-translate-y-0.5"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
