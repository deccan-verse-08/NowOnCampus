"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Megaphone } from "lucide-react";

interface HackathonOption {
    id: string;
    title: string;
    date: string | Date;
}

interface Props {
    hackathons: HackathonOption[];
}

export function CreateResultPostForm({ hackathons }: Props) {
    const router = useRouter();
    const [eventId, setEventId] = useState(hackathons[0]?.id ?? "");
    const [winningTeamName, setWinningTeamName] = useState("");
    const [announcement, setAnnouncement] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/hackathon-results", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId,
                    winningTeamName,
                    announcement,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to publish result.");
                return;
            }

            setWinningTeamName("");
            setAnnouncement("");
            setSuccess("Winner post published successfully.");
            router.refresh();
        } catch {
            setError("Something went wrong while publishing the result.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-orange-500" /> Publish Winner Post
            </h2>

            {hackathons.length === 0 ? (
                <p className="text-sm text-slate-500">
                    No hackathon events found. Create a hackathon event first.
                </p>
            ) : (
                <>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Hackathon
                        </label>
                        <select
                            value={eventId}
                            onChange={(e) => setEventId(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            {hackathons.map((event) => (
                                <option key={event.id} value={event.id}>
                                    {event.title} —{" "}
                                    {new Date(event.date).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Winning Team Name
                        </label>
                        <input
                            value={winningTeamName}
                            onChange={(e) => setWinningTeamName(e.target.value)}
                            placeholder="e.g. Code Warriors"
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Announcement
                        </label>
                        <textarea
                            value={announcement}
                            onChange={(e) => setAnnouncement(e.target.value)}
                            placeholder="e.g. Team Code Warriors won 1st place in HackSprint 2026."
                            rows={4}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            required
                        />
                    </div>
                </>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <button
                type="submit"
                disabled={loading || hackathons.length === 0}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
                    </>
                ) : (
                    "Publish Winner Post"
                )}
            </button>
        </form>
    );
}
