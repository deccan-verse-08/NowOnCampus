import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    Trophy,
    ArrowLeft,
    Share2,
    CheckCircle,
    Tag,
    User,
} from "lucide-react";
import { RegisterButton } from "./RegisterButton";

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

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: Props) {
    const { id } = await params;
    const session = await auth();

    const event = await prisma.event.findUnique({
        where: { id },
        include: {
            organizer: { select: { name: true, email: true, image: true } },
            registrations: { select: { userId: true } },
        },
    });

    if (!event) notFound();

    const isRegistered =
        session?.user?.id
            ? event.registrations.some((r) => r.userId === session.user?.id)
            : false;

    const spotsLeft = event.maxParticipants
        ? event.maxParticipants - event.currentParticipants
        : null;

    const canRegister =
        event.status === "UPCOMING" &&
        (spotsLeft === null || spotsLeft > 0) &&
        (!event.registrationDeadline || new Date(event.registrationDeadline) > new Date());

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Back Button */}
            <div className="max-w-5xl mx-auto px-4 pt-6">
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Events
                </Link>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-6 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Banner */}
                        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                            {event.image ? (
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-8xl opacity-20">🎓</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${categoryColors[event.category] || "bg-slate-100 text-slate-600"}`}>
                                    {event.category}
                                </span>
                                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${event.status === "UPCOMING" ? "bg-blue-600 text-white" :
                                    event.status === "ONGOING" ? "bg-green-500 text-white" :
                                        "bg-slate-500 text-white"
                                    }`}>
                                    {event.status}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{event.title}</h1>
                                <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex-shrink-0">
                                    <Share2 className="w-4 h-4 text-slate-500" />
                                </button>
                            </div>

                            {event.tags && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {event.tags.split(",").map((tag) => (
                                        <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                            <Tag className="w-3 h-3" /> {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{event.description}</p>
                        </div>

                        {/* Organizer */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-600" /> Organized by
                            </h3>
                            <div className="flex items-center gap-3">
                                {event.organizer.image ? (
                                    <img src={event.organizer.image} alt={event.organizer.name || ""} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                        {event.organizer.name?.charAt(0).toUpperCase() || "O"}
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-slate-800">{event.organizer.name}</p>
                                    <p className="text-sm text-slate-500">{event.organizer.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Registration Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-20">
                            <h3 className="font-bold text-slate-900 text-lg mb-5">Event Details</h3>

                            <div className="space-y-3.5 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">Date & Time</p>
                                        <p className="text-sm font-medium text-slate-800">
                                            {new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(event.date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">Venue</p>
                                        <p className="text-sm font-medium text-slate-800">{event.venue}</p>
                                    </div>
                                </div>

                                {event.maxParticipants && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <Users className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-500 mb-0.5">Participants</p>
                                            <p className="text-sm font-medium text-slate-800">
                                                {event.currentParticipants} / {event.maxParticipants} registered
                                            </p>
                                            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                                    style={{ width: `${Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)}%` }}
                                                />
                                            </div>
                                            {spotsLeft !== null && spotsLeft <= 20 && spotsLeft > 0 && (
                                                <p className="text-xs text-orange-600 font-medium mt-1">Only {spotsLeft} spots left!</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {event.registrationDeadline && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-4 h-4 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 mb-0.5">Registration Deadline</p>
                                            <p className="text-sm font-medium text-slate-800">
                                                {new Date(event.registrationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {event.prizeMoney && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0">
                                            <Trophy className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 mb-0.5">Prize Pool</p>
                                            <p className="text-sm font-bold text-yellow-700">{event.prizeMoney}</p>
                                        </div>
                                    </div>
                                )}

                                {event.teamSize && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                                            <Users className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 mb-0.5">Team Size</p>
                                            <p className="text-sm font-medium text-slate-800">{event.teamSize}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CTA */}
                            {isRegistered ? (
                                <div className="flex items-center gap-2 justify-center bg-green-50 border border-green-200 text-green-700 font-semibold py-3.5 rounded-xl text-sm">
                                    <CheckCircle className="w-5 h-5" /> You&apos;re Registered!
                                </div>
                            ) : canRegister ? (
                                <RegisterButton eventId={event.id} isLoggedIn={!!session?.user} />
                            ) : event.status === "COMPLETED" ? (
                                <div className="text-center bg-slate-100 text-slate-500 font-medium py-3.5 rounded-xl text-sm">
                                    Event Ended
                                </div>
                            ) : spotsLeft === 0 ? (
                                <div className="text-center bg-red-50 text-red-600 font-medium py-3.5 rounded-xl text-sm border border-red-200">
                                    Fully Booked
                                </div>
                            ) : (
                                <div className="text-center bg-slate-100 text-slate-500 font-medium py-3.5 rounded-xl text-sm">
                                    Registration Closed
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
