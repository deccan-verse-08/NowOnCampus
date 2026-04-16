import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { UsersTable } from "./UsersTable";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (admin?.role !== "ADMIN") redirect("/");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      _count: { select: { registrations: true } },
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" /> All Users
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {users.length} registered users
            </p>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                label: "Total Users",
                value: users.length,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Admins",
                value: users.filter((u) => u.role === "ADMIN").length,
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                label: "Students",
                value: users.filter((u) => u.role !== "ADMIN").length,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
                <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {users.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">👥</div>
                <p className="text-slate-600 font-semibold">No users yet</p>
              </div>
            ) : (
              <UsersTable
                initialUsers={users.map((u) => ({
                  ...u,
                  createdAt: u.createdAt.toISOString(),
                }))}
                currentUserId={session.user.id}
              />
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
