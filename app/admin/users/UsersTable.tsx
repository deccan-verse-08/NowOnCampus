"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, ShieldCheck, User, Loader2 } from "lucide-react";

interface UserRow {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    createdAt: string;
    _count: { registrations: number };
}

export function UsersTable({ initialUsers, currentUserId }: { initialUsers: UserRow[]; currentUserId: string }) {
    const [users, setUsers] = useState(initialUsers);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name || "this user"}"? This will also delete all their registrations and cannot be undone.`)) return;

        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => prev.filter((u) => u.id !== id));
            } else {
                alert(data.error || "Failed to delete user.");
            }
        } catch {
            alert("Something went wrong.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">User</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Registrations</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Joined</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                            {/* User */}
                            <td className="px-5 py-3.5">
                                <div className="flex items-center gap-3">
                                    {u.image ? (
                                        <img src={u.image} alt={u.name || ""} className="w-9 h-9 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                            {u.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{u.name || "—"}</p>
                                        <p className="text-xs text-slate-400">{u.email}</p>
                                    </div>
                                </div>
                            </td>

                            {/* Role */}
                            <td className="px-5 py-3.5">
                                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${u.role === "ADMIN"
                                        ? "bg-purple-100 text-purple-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}>
                                    {u.role === "ADMIN" ? <ShieldCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                    {u.role}
                                </span>
                            </td>

                            {/* Registrations count */}
                            <td className="px-5 py-3.5">
                                <span className="text-sm font-semibold text-slate-700">{u._count.registrations}</span>
                                <span className="text-xs text-slate-400 ml-1">events</span>
                            </td>

                            {/* Joined */}
                            <td className="px-5 py-3.5 text-sm text-slate-500">
                                {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </td>

                            {/* Delete */}
                            <td className="px-5 py-3.5">
                                {u.id === currentUserId ? (
                                    <span className="text-xs text-slate-400 italic">You</span>
                                ) : (
                                    <button
                                        onClick={() => handleDelete(u.id, u.name || u.email)}
                                        disabled={deletingId === u.id}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-50"
                                    >
                                        {deletingId === u.id ? (
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-3.5 h-3.5" />
                                        )}
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
