import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BarChart3, Clock, Download, TrendingUp, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const categoryOrder = [
  "FORMAL",
  "INFORMAL",
  "HACKATHON",
  "CULTURAL",
  "SPORTS",
  "WORKSHOP",
  "TECHNICAL",
  "LITERARY",
] as const;

function formatDateKey(date: Date) {
  return new Date(date).toISOString().slice(0, 10);
}

export default async function AdminAnalyticsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (admin?.role !== "ADMIN") redirect("/");

  const [events, registrations] = await Promise.all([
    prisma.event.findMany({
      orderBy: { date: "asc" },
      include: {
        registrations: {
          select: { id: true, status: true, registeredAt: true },
        },
      },
    }),
    prisma.registration.findMany({
      include: {
        event: {
          select: { category: true },
        },
      },
      orderBy: { registeredAt: "asc" },
    }),
  ]);

  const totalRegistrations = registrations.length;
  const confirmedCount = registrations.filter((r) => r.status === "CONFIRMED").length;
  const waitlistedCount = registrations.filter((r) => r.status === "WAITLISTED").length;
  const cancelledCount = registrations.filter((r) => r.status === "CANCELLED").length;

  const categoryTrendMap = new Map<string, number>();
  for (const category of categoryOrder) categoryTrendMap.set(category, 0);
  for (const registration of registrations) {
    if (registration.status === "CANCELLED") continue;
    categoryTrendMap.set(
      registration.event.category,
      (categoryTrendMap.get(registration.event.category) ?? 0) + 1,
    );
  }
  const categoryTrends = [...categoryTrendMap.entries()].map(([category, count]) => ({
    category,
    count,
  }));
  const maxCategoryCount = Math.max(...categoryTrends.map((item) => item.count), 1);

  const registrationsByDayMap = new Map<string, number>();
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    registrationsByDayMap.set(formatDateKey(date), 0);
  }
  for (const registration of registrations) {
    const key = formatDateKey(registration.registeredAt);
    if (registrationsByDayMap.has(key)) {
      registrationsByDayMap.set(key, (registrationsByDayMap.get(key) ?? 0) + 1);
    }
  }
  const registrationsOverTime = [...registrationsByDayMap.entries()].map(([date, count]) => ({
    date,
    count,
  }));
  const maxDailyCount = Math.max(...registrationsOverTime.map((item) => item.count), 1);

  const eventPerformance = events
    .map((event) => {
      const confirmed = event.registrations.filter((r) => r.status === "CONFIRMED").length;
      const waitlisted = event.registrations.filter((r) => r.status === "WAITLISTED").length;
      const cancelled = event.registrations.filter((r) => r.status === "CANCELLED").length;
      const total = event.registrations.length;
      return {
        id: event.id,
        title: event.title,
        category: event.category,
        date: event.date,
        total,
        confirmed,
        waitlisted,
        cancelled,
        fillPercent: event.maxParticipants
          ? Math.min(100, Math.round((confirmed / event.maxParticipants) * 100))
          : null,
      };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Analytics & Exports
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Track registration performance and export data for reports.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="/api/admin/exports/registrations"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Export Registrations CSV
              </a>
              <a
                href="/api/admin/exports/hackathon-teams"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Export Hackathon Teams CSV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Registrations", value: totalRegistrations, color: "text-blue-600", bg: "bg-blue-50", icon: Users },
              { label: "Confirmed", value: confirmedCount, color: "text-green-600", bg: "bg-green-50", icon: TrendingUp },
              { label: "Waitlisted", value: waitlistedCount, color: "text-orange-600", bg: "bg-orange-50", icon: Clock },
              { label: "Cancelled", value: cancelledCount, color: "text-red-600", bg: "bg-red-50", icon: BarChart3 },
            ].map(({ label, value, color, bg, icon: Icon }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className={`text-3xl font-black ${color}`}>{value}</p>
                <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Category Trends</h2>
              <div className="space-y-3">
                {categoryTrends.map((item) => (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-600">{item.category}</span>
                      <span className="text-xs font-bold text-slate-800">{item.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-orange-500"
                        style={{ width: `${(item.count / maxCategoryCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Registrations Over Time (Last 14 Days)
              </h2>
              <div className="space-y-3">
                {registrationsOverTime.map((item) => (
                  <div key={item.date}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600">
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{item.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                        style={{ width: `${(item.count / maxDailyCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Event Performance (Top 10)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["Event", "Category", "Date", "Total", "Confirmed", "Waitlisted", "Cancelled", "Fill %", "Actions"].map((head) => (
                      <th
                        key={head}
                        className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {eventPerformance.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3.5 font-semibold text-slate-800">{event.title}</td>
                      <td className="px-5 py-3.5 text-xs text-slate-600">{event.category}</td>
                      <td className="px-5 py-3.5 text-xs text-slate-600">
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-slate-700">{event.total}</td>
                      <td className="px-5 py-3.5 text-green-700 font-semibold">{event.confirmed}</td>
                      <td className="px-5 py-3.5 text-orange-700 font-semibold">{event.waitlisted}</td>
                      <td className="px-5 py-3.5 text-red-700 font-semibold">{event.cancelled}</td>
                      <td className="px-5 py-3.5 text-slate-700 font-semibold">
                        {event.fillPercent === null ? "—" : `${event.fillPercent}%`}
                      </td>
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/events/${event.id}`}
                          className="text-blue-600 hover:underline text-xs font-semibold"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
