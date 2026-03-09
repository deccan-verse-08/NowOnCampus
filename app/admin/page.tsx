import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    CalendarPlus,
    Users,
    Calendar,
    CheckCircle,
    Clock,
    TrendingUp,
    ArrowRight,
} from "lucide-react";

export default async function AdminDashboard() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user?.role !== "ADMIN") redirect("/");

    const [totalEvents, totalUsers, totalRegistrations, upcomingEvents, recentEvents] =
        await Promise.all([
            prisma.event.count(),
            prisma.user.count(),
            prisma.registration.count(),
            prisma.event.count({ where: { status: "UPCOMING" } }),
            prisma.event.findMany({
                orderBy: { createdAt: "desc" },
                take: 5,
                include: { _count: { select: { registrations: true } } },
            }),
        ]);

    const stats = [
        { label: "Total Events", value: totalEvents, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Upcoming Events", value: upcomingEvents, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
        { label: "Total Students", value: totalUsers, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Total Registrations", value: totalRegistrations, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    ];

    const statusColors: Record<string, string> = {
        UPCOMING: "bg-blue-100 text-blue-700",
        ONGOING: "bg-green-100 text-green-700",
        COMPLETED: "bg-slate-100 text-slate-600",
        CANCELLED: "bg-red-100 text-red-700",
    };

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

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
                            <p className="text-sm text-slate-500">Welcome back, {session.user.name?.split(" ")[0]}</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/events/new"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-blue-200 text-sm"
                    >
                        <CalendarPlus className="w-4 h-4" /> Create Event
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map(({ label, value, icon: Icon, color, bg }) => (
                        <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                                <Icon className={`w-5 h-5 ${color}`} />
                            </div>
                            <p className="text-2xl font-extrabold text-slate-900">{value}</p>
                            <p className="text-sm text-slate-500 mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Create New Event", desc: "Add a new event to the platform", href: "/admin/events/new", icon: CalendarPlus, color: "blue" },
                        { label: "Manage Events", desc: "Edit or delete existing events", href: "/admin/events", icon: Calendar, color: "purple" },
                        { label: "Registrations", desc: "See all student registrations", href: "/admin/registrations", icon: CheckCircle, color: "green" },
                        { label: "Manage Users", desc: "View and delete user accounts", href: "/admin/users", icon: Users, color: "orange" },
                    ].map(({ label, desc, href, icon: Icon, color }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`group bg-white rounded-2xl border border-slate-200 p-5 hover:border-${color}-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
                        >
                            <div className={`w-10 h-10 bg-${color}-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                                <Icon className={`w-5 h-5 text-${color}-600`} />
                            </div>
                            <p className="font-semibold text-slate-800 mb-1">{label}</p>
                            <p className="text-xs text-slate-500">{desc}</p>
                            <div className={`flex items-center gap-1 mt-3 text-xs font-medium text-${color}-600 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                Go <ArrowRight className="w-3 h-3" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Recent Events Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                        <h2 className="font-bold text-slate-900 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600" /> Recent Events
                        </h2>
                        <Link href="/admin/events" className="text-sm text-blue-600 hover:underline font-medium">
                            View all →
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    {["Event", "Category", "Date", "Registered", "Status", "Actions"].map((h) => (
                                        <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentEvents.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-slate-400 text-sm">
                                            No events created yet.{" "}
                                            <Link href="/admin/events/new" className="text-blue-600 font-medium hover:underline">Create one →</Link>
                                        </td>
                                    </tr>
                                ) : (
                                    recentEvents.map((event) => (
                                        <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-800 max-w-[200px] truncate">{event.title}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[event.category] || "bg-slate-100 text-slate-600"}`}>
                                                    {event.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                                                {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                {event._count.registrations}
                                                {event.maxParticipants ? ` / ${event.maxParticipants}` : ""}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[event.status] || "bg-slate-100"}`}>
                                                    {event.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Link href={`/admin/events/${event.id}/edit`} className="text-xs font-medium text-blue-600 hover:underline">Edit</Link>
                                                    <Link href={`/events/${event.id}`} className="text-xs font-medium text-slate-500 hover:underline">View</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
