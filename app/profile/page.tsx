import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Calendar, CheckCircle, GraduationCap, MapPin, Clock } from "lucide-react";

const categoryColors: Record<string, string> = {
    FORMAL: "bg-blue-100 text-blue-700",
    INFORMAL: "bg-purple-100 text-purple-700",
    HACKATHON: "bg-orange-100 text-orange-700",
    CULTURAL: "bg-pink-100 text-pink-700",
    SPORTS: "bg-green-100 text-green-700",
    WORKSHOP: "bg-cyan-100 text-cyan-700",
    TECHNICAL: "bg-indigo-100 text-indigo-700",
    LITERARY: "bg-yellow-100 text-yellow-700",
};

const categoryEmoji: Record<string, string> = {
    FORMAL: "🎓",
    INFORMAL: "🎉",
    HACKATHON: "⚡",
    CULTURAL: "🎭",
    SPORTS: "⚽",
    WORKSHOP: "🔧",
    TECHNICAL: "💻",
    LITERARY: "📚",
};

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            registrations: {
                include: {
                    event: {
                        select: { id: true, title: true, category: true, date: true, venue: true, status: true },
                    },
                },
                orderBy: { registeredAt: "desc" },
            },
        },
    });

    if (!user) redirect("/login");

    const upcomingRegs = user.registrations.filter((r) => r.event.status === "UPCOMING");
    const pastRegs = user.registrations.filter((r) => r.event.status !== "UPCOMING");
    const initial = user.name?.charAt(0).toUpperCase() || "U";

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
                    <div className="px-6 sm:px-8 py-8">
                        {/* Avatar + Info row */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name || ""}
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md flex-shrink-0"
                                />
                            ) : (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-md flex-shrink-0">
                                    {initial}
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{user.name || "Student"}</h1>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full tracking-wide ${user.role === "ADMIN"
                                            ? "bg-purple-100 text-purple-700 border border-purple-200"
                                            : "bg-blue-100 text-blue-700 border border-blue-200"
                                        }`}>
                                        {user.role}
                                    </span>
                                </div>
                                <p className="text-slate-500 text-sm">{user.email}</p>
                                <p className="text-slate-400 text-xs mt-0.5">
                                    Member since {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-100 mb-5" />

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-5">
                            {[
                                { label: "Registrations", value: user.registrations.length, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
                                { label: "Upcoming", value: upcomingRegs.length, icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50" },
                                { label: "Attended", value: pastRegs.length, icon: CheckCircle, color: "text-violet-600", bg: "bg-violet-50" },
                            ].map(({ label, value, icon: Icon, color, bg }) => (
                                <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
                                    <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
                                    <p className={`text-2xl sm:text-3xl font-extrabold ${color}`}>{value}</p>
                                    <p className="text-xs text-slate-500 font-medium mt-1">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Registered Events */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center gap-2.5">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                        <h2 className="font-bold text-slate-900 text-lg">My Registered Events</h2>
                        {user.registrations.length > 0 && (
                            <span className="ml-auto text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                                {user.registrations.length}
                            </span>
                        )}
                    </div>

                    <div className="p-6 sm:p-8">
                        {user.registrations.length === 0 ? (
                            <div className="text-center py-14">
                                <div className="text-5xl mb-4">🎯</div>
                                <p className="text-slate-600 font-semibold mb-1">No events yet</p>
                                <p className="text-slate-400 text-sm mb-6">You haven&apos;t registered for any events yet.</p>
                                <Link
                                    href="/events"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                                >
                                    Browse Events →
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {user.registrations.map((reg) => {
                                    const emoji = categoryEmoji[reg.event.category] || "📋";
                                    const catColor = categoryColors[reg.event.category] || "bg-slate-100 text-slate-600";
                                    const isUpcoming = reg.event.status === "UPCOMING";
                                    const isOngoing = reg.event.status === "ONGOING";

                                    return (
                                        <Link
                                            key={reg.id}
                                            href={`/events/${reg.event.id}`}
                                            className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm transition-all duration-200 group"
                                        >
                                            {/* Emoji icon */}
                                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl flex-shrink-0">
                                                {emoji}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-slate-800 text-sm group-hover:text-blue-700 truncate transition-colors">
                                                    {reg.event.title}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(reg.event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                                        <MapPin className="w-3 h-3" />
                                                        {reg.event.venue}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Badges */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColor}`}>
                                                    {reg.event.category}
                                                </span>
                                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isUpcoming ? "bg-emerald-100 text-emerald-700" :
                                                    isOngoing ? "bg-blue-100 text-blue-700" :
                                                        "bg-slate-100 text-slate-500"
                                                    }`}>
                                                    {reg.event.status}
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
