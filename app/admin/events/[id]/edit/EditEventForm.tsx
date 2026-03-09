"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle, Trash2 } from "lucide-react";
import Link from "next/link";

const categories = [
    { value: "FORMAL", label: "🎓 Formal" },
    { value: "INFORMAL", label: "🎉 Informal" },
    { value: "HACKATHON", label: "⚡ Hackathon" },
    { value: "CULTURAL", label: "🎭 Cultural" },
    { value: "SPORTS", label: "⚽ Sports" },
    { value: "WORKSHOP", label: "🔧 Workshop" },
    { value: "TECHNICAL", label: "💻 Technical" },
    { value: "LITERARY", label: "📚 Literary" },
];

const statuses = [
    { value: "UPCOMING", label: "Upcoming" },
    { value: "ONGOING", label: "Ongoing" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
];

function toDateTimeLocal(date: Date | null | undefined): string {
    if (!date) return "";
    const d = new Date(date);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditEventForm({ event }: { event: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        title: event.title,
        shortDescription: event.shortDescription || "",
        description: event.description,
        category: event.category,
        date: toDateTimeLocal(event.date),
        endDate: toDateTimeLocal(event.endDate),
        venue: event.venue,
        registrationDeadline: toDateTimeLocal(event.registrationDeadline),
        maxParticipants: event.maxParticipants?.toString() || "",
        prizeMoney: event.prizeMoney || "",
        teamSize: event.teamSize || "",
        image: event.image || "",
        tags: event.tags || "",
        isFeatured: event.isFeatured,
        status: event.status,
    });

    const update = (key: string, value: string | boolean) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/events/${event.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    maxParticipants: form.maxParticipants ? parseInt(form.maxParticipants) : null,
                }),
            });
            const data = await res.json();
            if (!res.ok) setError(data.error || "Failed to update event.");
            else { setSuccess(true); setTimeout(() => router.push("/admin/events"), 1500); }
        } catch { setError("Something went wrong."); }
        finally { setLoading(false); }
    };

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${event.title}"? This cannot be undone.`)) return;
        setDeleteLoading(true);
        try {
            const res = await fetch(`/api/admin/events/${event.id}`, { method: "DELETE" });
            if (res.ok) router.push("/admin/events");
            else setError("Failed to delete event.");
        } catch { setError("Something went wrong."); }
        finally { setDeleteLoading(false); }
    };

    const inputClass = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white";

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/events" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <ArrowLeft className="w-4 h-4 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900">Edit Event</h1>
                            <p className="text-xs text-slate-500 truncate max-w-xs">{event.title}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleDelete}
                        disabled={deleteLoading}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {deleteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        Delete
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {success ? (
                    <div className="flex flex-col items-center py-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Event Updated!</h2>
                        <p className="text-slate-500">Redirecting...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                            </div>
                        )}

                        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                            <h2 className="font-bold text-slate-900 pb-2 border-b border-slate-100">Event Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
                                <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} required className={inputClass} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
                                    <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
                                        {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Status *</label>
                                    <select value={form.status} onChange={(e) => update("status", e.target.value)} className={inputClass}>
                                        {statuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Venue *</label>
                                <input type="text" value={form.venue} onChange={(e) => update("venue", e.target.value)} required className={inputClass} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Description</label>
                                <input type="text" value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} className={inputClass} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Description *</label>
                                <textarea value={form.description} onChange={(e) => update("description", e.target.value)} required rows={5} className={`${inputClass} resize-none`} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date & Time *</label>
                                    <input type="datetime-local" value={form.date} onChange={(e) => update("date", e.target.value)} required className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">End Date & Time</label>
                                    <input type="datetime-local" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} className={inputClass} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Participants</label>
                                    <input type="number" value={form.maxParticipants} onChange={(e) => update("maxParticipants", e.target.value)} min={1} className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Prize Money</label>
                                    <input type="text" value={form.prizeMoney} onChange={(e) => update("prizeMoney", e.target.value)} placeholder="e.g. ₹50,000" className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Team Size</label>
                                    <input type="text" value={form.teamSize} onChange={(e) => update("teamSize", e.target.value)} placeholder="e.g. 2-4" className={inputClass} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Registration Deadline</label>
                                <input type="datetime-local" value={form.registrationDeadline} onChange={(e) => update("registrationDeadline", e.target.value)} className={`${inputClass} max-w-sm`} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags (comma separated)</label>
                                <input type="text" value={form.tags} onChange={(e) => update("tags", e.target.value)} className={inputClass} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Banner Image URL</label>
                                <input type="url" value={form.image} onChange={(e) => update("image", e.target.value)} className={inputClass} />
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={() => update("isFeatured", !form.isFeatured)}
                                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.isFeatured ? "bg-blue-600" : "bg-slate-200"}`}
                                >
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${form.isFeatured ? "translate-x-5" : ""}`} />
                                </button>
                                <label className="text-sm font-medium text-slate-700 cursor-pointer" onClick={() => update("isFeatured", !form.isFeatured)}>
                                    Featured on homepage
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pb-4">
                            <Link href="/admin/events" className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-7 py-2.5 rounded-xl transition-all text-sm shadow-md disabled:cursor-not-allowed"
                            >
                                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
