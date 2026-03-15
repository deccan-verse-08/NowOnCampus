import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

// GET  – admin: list all event requests
export async function GET() {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user?.role !== "ADMIN")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const requests = await prisma.eventRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      requester: { select: { id: true, name: true, email: true, image: true } },
      reviewedBy: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(requests);
}

// POST – student: submit a new event request
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const {
      title, shortDescription, description, category, date, endDate,
      venue, registrationDeadline, maxParticipants, prizeMoney,
      teamSize, image, tags, message,
    } = body;

    if (!title || !description || !category || !date || !venue) {
      return NextResponse.json(
        { error: "Title, description, category, date, and venue are required" },
        { status: 400 }
      );
    }

    const eventRequest = await prisma.eventRequest.create({
      data: {
        title: title.trim(),
        shortDescription: shortDescription?.trim() || null,
        description: description.trim(),
        category,
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        venue: venue.trim(),
        registrationDeadline: registrationDeadline
          ? new Date(registrationDeadline)
          : null,
        maxParticipants: maxParticipants ? Number(maxParticipants) : null,
        prizeMoney: prizeMoney?.trim() || null,
        teamSize: teamSize?.trim() || null,
        image: image?.trim() || null,
        tags: tags?.trim() || null,
        message: message?.trim() || null,
        status: "PENDING",
        requesterId: session.user.id,
      },
    });

    return NextResponse.json(eventRequest, { status: 201 });
  } catch (error) {
    console.error("Create event request error:", error);
    return NextResponse.json(
      { error: "Failed to submit event request" },
      { status: 500 }
    );
  }
}
