import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

function toCsvCell(value: string | number | null | undefined) {
  const stringValue = String(value ?? "");
  const escaped = stringValue.replace(/"/g, '""');
  return `"${escaped}"`;
}

async function ensureAdmin() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  return user?.role === "ADMIN" ? session : null;
}

export async function GET() {
  const adminSession = await ensureAdmin();
  if (!adminSession) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const hackathonRegistrations = await prisma.registration.findMany({
    where: { event: { category: "HACKATHON" } },
    orderBy: { registeredAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      event: { select: { title: true, date: true } },
      teamParticipants: {
        select: {
          name: true,
          rollNumber: true,
          course: true,
          phoneNumber: true,
        },
      },
    },
  });

  const header = [
    "Hackathon",
    "Hackathon Date",
    "Registration Status",
    "Registered By",
    "Registered By Email",
    "Team Name",
    "Participant Name",
    "Participant Roll Number",
    "Participant Course",
    "Participant Phone Number",
    "Registered At",
  ];

  const rows: string[] = [];

  for (const registration of hackathonRegistrations) {
    if (registration.teamParticipants.length === 0) {
      rows.push(
        [
          registration.event.title,
          registration.event.date.toISOString(),
          registration.status,
          registration.user.name || "",
          registration.user.email,
          registration.teamName || "",
          "",
          "",
          "",
          "",
          registration.registeredAt.toISOString(),
        ]
          .map(toCsvCell)
          .join(","),
      );
      continue;
    }

    for (const participant of registration.teamParticipants) {
      rows.push(
        [
          registration.event.title,
          registration.event.date.toISOString(),
          registration.status,
          registration.user.name || "",
          registration.user.email,
          registration.teamName || "",
          participant.name,
          participant.rollNumber,
          participant.course,
          participant.phoneNumber,
          registration.registeredAt.toISOString(),
        ]
          .map(toCsvCell)
          .join(","),
      );
    }
  }

  const csv = [header.map(toCsvCell).join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="hackathon-teams-export.csv"`,
    },
  });
}
