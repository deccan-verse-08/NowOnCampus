import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CalendarPlus, ArrowLeft, Edit, Eye } from "lucide-react";

export default async function AdminEventsPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user?.role !== "ADMIN") redirect("/");

    const events = await prisma.event.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { registrations: true } } },
    });

    const statusColors: Record<string, string> = {
        UPCOMING: "bg-blue-100 text-blue-700",
        ONGOING: "bg-green-100 text-green-700",
        COMPLETED: "bg-slate-100 text-slate-500",
        CANCELLED: "bg-red-100 text-red-600",
    };

    const categoryColors: Record<string, string> = {
        FORMAL: "bg-blue-50 text-blue-700",
        INFORMAL: "bg-purple-50 text-purple-700",
        HACKATHON: "bg-orange-50 text-orange-700",
        CULTURAL: "bg-pink-50 text-pink-700",
        SPORTS: "bg-green-50 text-green-700",
        WORKSHOP: "bg-cyan-50 text-cyan-700",
        TECHNICAL: "bg-indigo-50 text-indigo-700",
        LITERARY: "bg-yellow-50 text-yellow-700",
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <ArrowLeft className="w-4 h-4 text-slate-600" />
                        </Link>
                        <h1 className="text-lg font-bold text-slate-900">Manage Events</h1>
                        <span className="text-sm text-slate-400">({events.length})</span>
                    </div>
                    <Link
                        href="/admin/events/new"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors text-sm shadow-sm"
                    >
                        <CalendarPlus className="w-4 h-4" /> Create Event
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    {["Event", "Category", "Date", "Venue", "Registered", "Featured", "Status", "Actions"].map((h) => (
                                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {events.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-16 text-center">
                                            <div className="text-4xl mb-3">📭</div>
                                            <p className="text-slate-500 text-sm">No events yet.</p>
                                            <Link href="/admin/events/new" className="mt-3 inline-block text-blue-600 font-medium text-sm hover:underline">
                                                Create your first event →
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    events.map((event) => (
                                        <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-5 py-4 max-w-[200px]">
                                                <p className="font-semibold text-slate-800 truncate">{event.title}</p>
                                                <p className="text-xs text-slate-400 mt-0.5 truncate">{event.shortDescription}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[event.category] || "bg-slate-100 text-slate-600"}`}>
                                                    {event.category}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-slate-600 text-xs">
                                                {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                            </td>
                                            <td className="px-5 py-4 max-w-[140px] truncate text-slate-600 text-xs">{event.venue}</td>
                                            <td className="px-5 py-4 text-center text-slate-600 font-medium">
                                                {event._count.registrations}
                                                {event.maxParticipants ? (
                                                    <span className="text-slate-400 text-xs"> / {event.maxParticipants}</span>
                                                ) : null}
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                {event.isFeatured ? (
                                                    <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2.5 py-1 rounded-full">⭐ Yes</span>
                                                ) : (
                                                    <span className="text-xs text-slate-400">—</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[event.status] || "bg-slate-100"}`}>
                                                    {event.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/admin/events/${event.id}/edit`}
                                                        className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/events/${event.id}`}
                                                        className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                                                        title="View public page"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
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
