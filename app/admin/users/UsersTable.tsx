"use client";

import { useState } from "react";
import { Trash2, ShieldCheck, User, Loader2, UserPlus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface UserRow {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  isSuperAdmin: boolean;
  createdAt: string;
  _count: { registrations: number };
}

export function UsersTable({
  initialUsers,
  currentUserId,
  canCreateAdmins,
}: {
  initialUsers: UserRow[];
  currentUserId: string;
  canCreateAdmins: boolean;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [adminFormError, setAdminFormError] = useState("");
  const [adminFormSuccess, setAdminFormSuccess] = useState("");

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${name || "this user"}"? This will also delete all their registrations and cannot be undone.`,
      )
    )
      return;

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

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingAdmin(true);
    setAdminFormError("");
    setAdminFormSuccess("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: adminName,
          email: adminEmail,
          password: adminPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setAdminFormError(data.error || "Failed to create admin account.");
        return;
      }

      const createdUser: UserRow = {
        ...data.user,
        createdAt: new Date(data.user.createdAt).toISOString(),
      };

      setUsers((prev) => [createdUser, ...prev]);
      setAdminName("");
      setAdminEmail("");
      setAdminPassword("");
      setAdminFormSuccess("Admin account created successfully.");
    } catch {
      setAdminFormError("Something went wrong while creating admin.");
    } finally {
      setCreatingAdmin(false);
    }
  };

  return (
    <>
      <Navbar />
      {canCreateAdmins && (
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-5">
          <div className="mb-3 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Create Admin</h3>
          </div>

          <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Full name"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Temporary password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              minLength={6}
              required
            />
            <button
              type="submit"
              disabled={creatingAdmin}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              {creatingAdmin ? "Creating..." : "Create Admin"}
            </button>
          </form>

          {adminFormError && <p className="mt-2 text-sm text-red-600">{adminFormError}</p>}
          {adminFormSuccess && (
            <p className="mt-2 text-sm text-emerald-600">{adminFormSuccess}</p>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                User
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Role
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Registrations
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Joined
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                {/* User */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {u.image ? (
                      <img
                        src={u.image}
                        alt={u.name || ""}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                        {u.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {u.name || "—"}
                      </p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                      u.isSuperAdmin
                        ? "bg-rose-100 text-rose-700"
                        : u.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {u.role === "ADMIN" ? (
                      <ShieldCheck className="w-3 h-3" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                    {u.isSuperAdmin ? "SUPERADMIN" : u.role}
                  </span>
                </td>

                {/* Registrations count */}
                <td className="px-5 py-3.5">
                  <span className="text-sm font-semibold text-slate-700">
                    {u._count.registrations}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">events</span>
                </td>

                {/* Joined */}
                <td className="px-5 py-3.5 text-sm text-slate-500">
                  {new Date(u.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                {/* Delete */}
                <td className="px-5 py-3.5">
                  {u.id === currentUserId ? (
                    <span className="text-xs text-slate-400 italic">You</span>
                  ) : u.isSuperAdmin ? (
                    <span className="text-xs text-slate-400 italic">Protected</span>
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
      <Footer />
    </>
  );
}
