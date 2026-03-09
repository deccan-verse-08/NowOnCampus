import { prisma } from "@/lib/db";
import { EventCard } from "@/components/EventCard";
import Link from "next/link";
import { Search, Filter, Calendar } from "lucide-react";

const categories = [
    { value: "", label: "All Events" },
    { value: "FORMAL", label: "Formal" },
    { value: "INFORMAL", label: "Informal" },
    { value: "HACKATHON", label: "Hackathons" },
    { value: "CULTURAL", label: "Cultural" },
    { value: "SPORTS", label: "Sports" },
    { value: "WORKSHOP", label: "Workshops" },
    { value: "TECHNICAL", label: "Technical" },
    { value: "LITERARY", label: "Literary" },
];

const statusFilters = [
    { value: "", label: "All Status" },
    { value: "UPCOMING", label: "Upcoming" },
    { value: "ONGOING", label: "Ongoing" },
    { value: "COMPLETED", label: "Completed" },
];

interface Props {
    searchParams: Promise<{ category?: string; status?: string; search?: string }>;
}

export default async function EventsPage({ searchParams }: Props) {
    const { category, status, search } = await searchParams;

    const events = await prisma.event.findMany({
        where: {
            ...(category ? { category: category as never } : {}),
            ...(status ? { status: status as never } : {}),
            ...(search
                ? {
                    OR: [
                        { title: { contains: search } },
                        { description: { contains: search } },
                        { venue: { contains: search } },
                    ],
                }
                : {}),
        },
        orderBy: { date: "asc" },
    });

    const activeCat = category || "";
    const activeStatus = status || "";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        All Events
                    </h1>
                    <p className="text-blue-200 text-lg max-w-xl mx-auto">
                        Discover and register for events happening across campus
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Search & Filters */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8 space-y-4">
                    {/* Search bar */}
                    <form method="GET" action="/events" className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            name="search"
                            defaultValue={search || ""}
                            type="text"
                            placeholder="Search events by name, venue..."
                            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {category && <input type="hidden" name="category" value={category} />}
                        {status && <input type="hidden" name="status" value={status} />}
                    </form>

                    {/* Category filter */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Filter className="w-4 h-4 text-slate-500" />
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.value}
                                    href={`/events?${cat.value ? `category=${cat.value}` : ""}${activeStatus ? `&status=${activeStatus}` : ""}${search ? `&search=${search}` : ""}`}
                                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCat === cat.value
                                            ? "bg-blue-600 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                                        }`}
                                >
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Status filter */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {statusFilters.map((s) => (
                                <Link
                                    key={s.value}
                                    href={`/events?${activeCat ? `category=${activeCat}` : ""}${s.value ? `&status=${s.value}` : ""}${search ? `&search=${search}` : ""}`}
                                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeStatus === s.value
                                            ? "bg-blue-600 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                                        }`}
                                >
                                    {s.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-800">{events.length}</span>{" "}
                        event{events.length !== 1 ? "s" : ""} found
                    </p>
                    {(activeCat || activeStatus || search) && (
                        <Link href="/events" className="text-sm text-blue-600 hover:underline font-medium">
                            Clear filters
                        </Link>
                    )}
                </div>

                {/* Events Grid */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {events.map((event) => (
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
                    <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">No events found</h3>
                        <p className="text-slate-500 mb-6">
                            {search
                                ? `No events match "${search}"`
                                : "No events in this category yet."}
                        </p>
                        <Link
                            href="/events"
                            className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            View All Events
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
