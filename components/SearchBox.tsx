"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Clock, Calendar, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SearchBox({
    initialSearch,
    category,
    status,
    recentEvents,
}: {
    initialSearch: string;
    category: string;
    status: string;
    recentEvents: any[];
}) {
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLFormElement>(null);

    // Close the dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <form 
            ref={containerRef}
            method="GET" 
            action="/events" 
            className="relative w-full z-20"
        >
            <div className="relative z-20">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${isFocused ? 'text-blue-600' : 'text-slate-400'}`} />
                <input
                    name="search"
                    defaultValue={initialSearch}
                    type="text"
                    placeholder="Search events by name, venue..."
                    autoComplete="off"
                    onFocus={() => setIsFocused(true)}
                    className={`w-full pl-11 pr-4 py-3 bg-white border-2 transition-all duration-200 text-sm outline-none ${
                        isFocused 
                        ? 'border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)] rounded-t-xl rounded-b-none' 
                        : 'border-slate-200 hover:border-blue-300 rounded-xl'
                    }`}
                />
            </div>
            {category && <input type="hidden" name="category" value={category} />}
            {status && <input type="hidden" name="status" value={status} />}

            <AnimatePresence>
                {isFocused && recentEvents.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-white border-x-2 border-b-2 border-blue-500 rounded-b-xl shadow-xl overflow-hidden pt-1 z-10"
                    >
                        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest shrink-0">Recently Added Events</span>
                        </div>
                        <ul className="max-h-[300px] overflow-y-auto w-full">
                            {recentEvents.map((event) => (
                                <li key={event.id} className="border-b last:border-b-0 border-slate-100">
                                    <Link 
                                        href={`/events/${event.id}`}
                                        className="flex flex-col gap-1 p-3 hover:bg-blue-50 group transition-colors cursor-pointer w-full text-left"
                                        onClick={() => setIsFocused(false)}
                                    >
                                        <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 truncate w-full">
                                            {event.title}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                                            <span className="flex items-center gap-1 shrink-0">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                            </span>
                                            <span className="flex items-center gap-1 truncate max-w-[50%]">
                                                <MapPin className="w-3 h-3 shrink-0" />
                                                <span className="truncate">{event.venue}</span>
                                            </span>
                                            <span className="bg-slate-100 group-hover:bg-white text-slate-600 px-2 py-0.5 rounded-md font-medium shrink-0 ml-auto">
                                                {event.category}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}
