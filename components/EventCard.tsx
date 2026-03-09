import Link from "next/link";
import { Calendar, MapPin, Users, Clock, Trophy } from "lucide-react";

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

const categoryLabels: Record<string, string> = {
    FORMAL: "Formal",
    INFORMAL: "Informal",
    HACKATHON: "Hackathon",
    CULTURAL: "Cultural",
    SPORTS: "Sports",
    WORKSHOP: "Workshop",
    TECHNICAL: "Technical",
    LITERARY: "Literary",
};

export interface EventCardProps {
    id: string;
    title: string;
    description?: string | null;
    category: string;
    date: string | Date;
    venue: string;
    maxParticipants?: number | null;
    currentParticipants?: number;
    image?: string | null;
    prizeMoney?: string | null;
    status: string;
    registrationDeadline?: string | Date | null;
}

export function EventCard({
    id,
    title,
    description,
    category,
    date,
    venue,
    maxParticipants,
    currentParticipants = 0,
    image,
    prizeMoney,
    status,
    registrationDeadline,
}: EventCardProps) {
    const eventDate = new Date(date);
    const isUpcoming = status === "UPCOMING";
    const spotsLeft = maxParticipants ? maxParticipants - currentParticipants : null;

    return (
        <Link href={`/events/${id}`}>
            <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-5xl opacity-30">🎓</div>
                        </div>
                    )}

                    {/* Category Badge */}
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category] || "bg-slate-100 text-slate-600"}`}>
                        {categoryLabels[category] || category}
                    </span>

                    {/* Status Badge */}
                    {status === "ONGOING" && (
                        <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500 text-white flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Live
                        </span>
                    )}
                    {status === "COMPLETED" && (
                        <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-500 text-white">
                            Ended
                        </span>
                    )}

                    {prizeMoney && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">
                            <Trophy className="w-3 h-3" />
                            {prizeMoney}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-900 text-base mb-1.5 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                            {description}
                        </p>
                    )}

                    <div className="space-y-2 mt-auto">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                            <span>{eventDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-blue-500" />
                            <span className="truncate">{venue}</span>
                        </div>
                        {maxParticipants && (
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Users className="w-3.5 h-3.5 text-blue-500" />
                                <span>
                                    {spotsLeft !== null && spotsLeft <= 10 && spotsLeft > 0
                                        ? <span className="text-orange-600 font-semibold">Only {spotsLeft} spots left!</span>
                                        : spotsLeft === 0
                                            ? <span className="text-red-600 font-semibold">Fully booked</span>
                                            : `${currentParticipants}/${maxParticipants} registered`
                                    }
                                </span>
                            </div>
                        )}
                        {registrationDeadline && isUpcoming && (
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Clock className="w-3.5 h-3.5 text-orange-400" />
                                <span>Register by {new Date(registrationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <span className={`w-full block text-center py-2 rounded-xl text-sm font-semibold transition-colors duration-200 ${isUpcoming
                                ? "bg-blue-600 text-white group-hover:bg-blue-700"
                                : "bg-slate-100 text-slate-500 cursor-not-allowed"
                            }`}>
                            {isUpcoming ? "View & Register" : status === "ONGOING" ? "Join Now" : "View Details"}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
