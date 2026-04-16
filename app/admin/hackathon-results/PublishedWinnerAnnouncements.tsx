"use client";

import { useState } from "react";
import { Loader2, Pencil, Save, Trash2, X } from "lucide-react";

interface WinnerPost {
    id: string;
    event: {
        id: string;
        title: string;
    };
    createdBy: {
        name: string | null;
    };
    winningTeamName: string;
    announcement: string;
    createdAt: string;
}

interface Props {
    initialPosts: WinnerPost[];
}

export function PublishedWinnerAnnouncements({ initialPosts }: Props) {
    const [posts, setPosts] = useState<WinnerPost[]>(initialPosts);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTeamName, setEditTeamName] = useState("");
    const [editAnnouncement, setEditAnnouncement] = useState("");
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [error, setError] = useState("");

    const startEdit = (post: WinnerPost) => {
        setEditingId(post.id);
        setEditTeamName(post.winningTeamName);
        setEditAnnouncement(post.announcement);
        setError("");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTeamName("");
        setEditAnnouncement("");
        setError("");
    };

    const saveEdit = async (id: string) => {
        const winningTeamName = editTeamName.trim();
        const announcement = editAnnouncement.trim();

        if (!winningTeamName || !announcement) {
            setError("Winning team name and announcement are required.");
            return;
        }

        setActionLoadingId(id);
        setError("");

        try {
            const res = await fetch(`/api/admin/hackathon-results/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ winningTeamName, announcement }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to update winner post.");
                return;
            }

            setPosts((prev) =>
                prev.map((post) =>
                    post.id === id
                        ? {
                            ...post,
                            winningTeamName: data.winningTeamName,
                            announcement: data.announcement,
                          }
                        : post,
                ),
            );
            cancelEdit();
        } catch {
            setError("Something went wrong while updating.");
        } finally {
            setActionLoadingId(null);
        }
    };

    const deletePost = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this winner announcement?",
        );
        if (!confirmed) return;

        setActionLoadingId(id);
        setError("");

        try {
            const res = await fetch(`/api/admin/hackathon-results/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to delete winner post.");
                return;
            }

            setPosts((prev) => prev.filter((post) => post.id !== id));
            if (editingId === id) cancelEdit();
        } catch {
            setError("Something went wrong while deleting.");
        } finally {
            setActionLoadingId(null);
        }
    };

    return (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
                Published Winner Announcements
            </h2>

            {error && (
                <p className="text-sm text-red-600 mb-4">{error}</p>
            )}

            {posts.length === 0 ? (
                <p className="text-sm text-slate-500">No winner posts yet.</p>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => {
                        const isEditing = editingId === post.id;
                        const isLoading = actionLoadingId === post.id;

                        return (
                            <div
                                key={post.id}
                                className="border border-slate-200 rounded-xl p-4 bg-slate-50/60"
                            >
                                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                                    {post.event.title}
                                </p>

                                {isEditing ? (
                                    <div className="mt-3 space-y-3">
                                        <input
                                            value={editTeamName}
                                            onChange={(e) => setEditTeamName(e.target.value)}
                                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Winning team name"
                                        />
                                        <textarea
                                            value={editAnnouncement}
                                            onChange={(e) => setEditAnnouncement(e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                            placeholder="Announcement"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-base font-bold text-slate-900 mt-1">
                                            Winning Team: {post.winningTeamName}
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            {post.announcement}
                                        </p>
                                    </>
                                )}

                                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                                    <p className="text-xs text-slate-400">
                                        Posted by {post.createdBy.name || "Admin"} on{" "}
                                        {new Date(post.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        {isEditing ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => saveEdit(post.id)}
                                                    disabled={isLoading}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                                                >
                                                    {isLoading ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : (
                                                        <Save className="w-3.5 h-3.5" />
                                                    )}
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={cancelEdit}
                                                    disabled={isLoading}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300"
                                                >
                                                    <X className="w-3.5 h-3.5" /> Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => startEdit(post)}
                                                    disabled={isLoading}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" /> Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => deletePost(post.id)}
                                                    disabled={isLoading}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100"
                                                >
                                                    {isLoading ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    )}
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
