import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RegisteredTeamsPage({ params }: Props) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      registrations: {
        where: { status: { not: "CANCELLED" } },
        orderBy: { registeredAt: "asc" },
        select: {
          id: true,
          teamName: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          _count: {
            select: { teamParticipants: true },
          },
        },
      },
    },
  });

  if (!event) notFound();

  const teams = event.registrations.map((registration, index) => ({
    id: registration.id,
    teamName:
      registration.teamName?.trim() ||
      `${registration.user.name?.trim() || "Team Leader"}'s Team`,
    leaderName: registration.user.name?.trim() || "N/A",
    leaderEmail: registration.user.email,
    memberCount: registration._count.teamParticipants + 1,
    serial: index + 1,
  }));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href={`/events/${event.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Event
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
                  Team Registrations
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {event.title}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {teams.length} registered team{teams.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            {teams.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-14 text-center">
                <p className="text-slate-600 font-semibold">No teams registered yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      Team #{team.serial}
                    </p>
                    <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                      {team.teamName}
                    </h2>

                    <div className="mt-4 space-y-2 text-sm">
                      <p className="text-slate-700">
                        <span className="font-semibold">Team Leader:</span>{" "}
                        {team.leaderName}
                      </p>
                      <p className="text-slate-700 inline-flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        {team.leaderEmail}
                      </p>
                      <p className="text-slate-700 inline-flex items-center gap-2">
                        <br />
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="font-semibold">{team.memberCount}</span>{" "}
                        member{team.memberCount === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
