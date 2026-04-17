import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

function normalizeDateToUtcDay(rawDate: string) {
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Date(
    Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate()),
  );
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes = await prisma.calendarNote.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "asc" },
    select: { id: true, date: true, note: true },
  });

  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { date, note } = (await request.json()) as {
    date?: string;
    note?: string;
  };

  if (!date || typeof note !== "string") {
    return NextResponse.json(
      { error: "Date and note are required." },
      { status: 400 },
    );
  }

  const normalizedDate = normalizeDateToUtcDay(date);
  if (!normalizedDate) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  const cleanedNote = note.trim();
  if (!cleanedNote) {
    return NextResponse.json({ error: "Note cannot be empty." }, { status: 400 });
  }

  const savedNote = await prisma.calendarNote.upsert({
    where: {
      userId_date: {
        userId: session.user.id,
        date: normalizedDate,
      },
    },
    update: { note: cleanedNote },
    create: {
      userId: session.user.id,
      date: normalizedDate,
      note: cleanedNote,
    },
    select: { id: true, date: true, note: true },
  });

  return NextResponse.json(savedNote, { status: 201 });
}
