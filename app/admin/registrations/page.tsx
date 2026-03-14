import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ClipboardList, User, Calendar, MapPin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const categoryColors: Record<string, string> = {
  FORMAL: "bg-blue-50 text-blue-700",
  INFORMAL: "bg-purple-50 text-purple-700",
  HACKATHON: "bg-orange-50 text-orange-700",
  CULTURAL: "bg-pink-50 text-pink-700",
  SPORTS: "bg-green-50 text-green-700",
  WORKSHOP: "bg-cyan-50 text-cyan-700",
  TECHNICAL: "bg-indigo-50 text-indigo-700",
  LITERARY: "bg-yellow-50 text-yellow-700",
};

const statusColors: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700",
  WAITLISTED: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-600",
};

export default async function AdminRegistrationsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (admin?.role !== "ADMIN") redirect("/");

  const registrations = await prisma.registration.findMany({
    orderBy: { registeredAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true, image: true } },
      event: {
        select: {
          id: true,
          title: true,
          category: true,
          date: true,
          venue: true,
          status: true,
        },
      },
    },
  });

  return (
      <>
          <Navbar/>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-2 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="w-6 h-6 text-blue-600" /> All
                Registrations
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {registrations.length} total registrations
              </p>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {registrations.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📋</div>
                <p className="text-slate-600 font-semibold">
                  No registrations yet
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  Students haven&apos;t registered for any events yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Student
                      </th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Event
                      </th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Category
                      </th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Registered On
                      </th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {registrations.map((reg) => (
                      <tr
                        key={reg.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        {/* Student */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            {reg.user.image ? (
                              <img
                                src={reg.user.image}
                                alt={reg.user.name || ""}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                {reg.user.name?.charAt(0).toUpperCase() || "U"}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {reg.user.name || "—"}
                              </p>
                              <p className="text-xs text-slate-400">
                                {reg.user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Event */}
                        <td className="px-5 py-3.5">
                          <Link
                            href={`/events/${reg.event.id}`}
                            className="group"
                          >
                            <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {reg.event.title}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                              <Calendar className="w-3 h-3" />
                              {new Date(reg.event.date).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                              <span className="mx-1">·</span>
                              <MapPin className="w-3 h-3" />
                              {reg.event.venue}
                            </div>
                          </Link>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-3.5">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[reg.event.category] || "bg-slate-100 text-slate-600"}`}
                          >
                            {reg.event.category}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-3.5 text-sm text-slate-500">
                          {new Date(reg.registeredAt).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-3.5">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[reg.status] || "bg-slate-100 text-slate-600"}`}
                          >
                            {reg.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
