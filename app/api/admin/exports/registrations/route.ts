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

  const registrations = await prisma.registration.findMany({
    orderBy: { registeredAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      event: { select: { title: true, category: true, date: true, venue: true } },
    },
  });

  const header = [
    "Event Title",
    "Event Category",
    "Event Date",
    "Venue",
    "Student Name",
    "Student Email",
    "Registration Status",
    "Team Name",
    "Registered At",
  ];

  const rows = registrations.map((registration) =>
    [
      registration.event.title,
      registration.event.category,
      registration.event.date.toISOString(),
      registration.event.venue,
      registration.user.name || "",
      registration.user.email,
      registration.status,
      registration.teamName || "",
      registration.registeredAt.toISOString(),
    ]
      .map(toCsvCell)
      .join(","),
  );

  const csv = [header.map(toCsvCell).join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations-export.csv"`,
    },
  });
}
